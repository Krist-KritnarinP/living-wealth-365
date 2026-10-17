import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  authApi,
  insurancePlansApi,
  leadsApi,
  postsApi,
  productsApi,
  wishlistApi,
} from '../api';
import { INITIAL_PRODUCTS, INITIAL_POSTS, INITIAL_LEADS, INITIAL_INSURANCE_PLANS, MOCK_USERS } from '../constants/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('lw365_theme') || 'zen-light';
  });

  // Current user state (Guest by default, or loaded from localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('lw365_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Data states
  const [insurancePlans, setInsurancePlans] = useState(() => {
    const saved = localStorage.getItem('lw365_plans');
    return saved ? JSON.parse(saved) : (INITIAL_INSURANCE_PLANS || []);
  });
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('lw365_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('lw365_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('lw365_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('lw365_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(true);

  // Sync theme to document html
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lw365_theme', theme);
  }, [theme]);

  // Persist user and token
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('lw365_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('lw365_user');
      localStorage.removeItem('lw365_token');
    }
  }, [currentUser]);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem('lw365_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Persist leads
  useEffect(() => {
    localStorage.setItem('lw365_leads', JSON.stringify(leads));
  }, [leads]);

  // Persist posts
  useEffect(() => {
    localStorage.setItem('lw365_posts', JSON.stringify(posts));
  }, [posts]);

  // Persist products
  useEffect(() => {
    localStorage.setItem('lw365_products', JSON.stringify(products));
  }, [products]);

  // 🔄 ดึงข้อมูล Live จาก Backend API
  const refreshData = useCallback(async () => {
    try {
      setLoading(true);

      // ดึงข้อมูลสาธารณะ (Plans, Posts, Products) จาก API
      const [fetchedPlans, fetchedPosts, fetchedProducts] = await Promise.allSettled([
        insurancePlansApi.getAll(),
        postsApi.getAll(),
        productsApi.getAll(),
      ]);

      if (fetchedPlans.status === 'fulfilled' && Array.isArray(fetchedPlans.value)) {
        setInsurancePlans(fetchedPlans.value);
      }
      if (fetchedPosts.status === 'fulfilled' && Array.isArray(fetchedPosts.value)) {
        const normalizedPosts = fetchedPosts.value.map((p) => ({
          ...p,
          author:
            typeof p.author === 'object'
              ? p.author?.name || p.author?.username || 'ทีมที่ปรึกษา Living Wealth 365'
              : p.author || 'ทีมที่ปรึกษา Living Wealth 365',
          publishedAt:
            p.publishedAt ||
            (p.createdAt
              ? new Date(p.createdAt).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : 'ล่าสุด'),
        }));
        setPosts(normalizedPosts);
      }
      if (fetchedProducts.status === 'fulfilled' && Array.isArray(fetchedProducts.value)) {
        setProducts(fetchedProducts.value);
      }

      // หากมี Token ล็อกอิน ดึงข้อมูล Leads & Wishlist ของผู้ใช้
      const token = localStorage.getItem('lw365_token');
      if (token) {
        const [userRes, leadsRes, wishlistRes] = await Promise.allSettled([
          authApi.getMe(),
          leadsApi.getAll(),
          wishlistApi.getAll(),
        ]);

        if (userRes.status === 'fulfilled' && userRes.value?.user) {
          setCurrentUser(userRes.value.user);
        }
        if (leadsRes.status === 'fulfilled' && Array.isArray(leadsRes.value)) {
          setLeads(leadsRes.value);
        }
        if (wishlistRes.status === 'fulfilled' && wishlistRes.value?.productIds) {
          setWishlist(wishlistRes.value.productIds);
        }
      }
    } catch (err) {
      console.warn('[Data Fetch Notice] ใช้ข้อมูลแคชในเบราว์เซอร์ชั่วคราว:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'zen-light' ? 'zen-dark' : 'zen-light'));
  };

  // 🔐 Authentication Actions
  const login = async ({ identifier, password }) => {
    try {
      const res = await authApi.login({ identifier, password });
      if (res.token) {
        localStorage.setItem('lw365_token', res.token);
      }
      setCurrentUser(res.user);
      await refreshData();
      return res;
    } catch (err) {
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const res = await authApi.register(userData);
      if (res.token) {
        localStorage.setItem('lw365_token', res.token);
      }
      setCurrentUser(res.user);
      await refreshData();
      return res;
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem('lw365_token');
      setCurrentUser(null);
      setWishlist([]);
    }
  };

  // 1-Click Fast Login Presets (สำหรับทดสอบ)
  const loginAsCustomer = async (customData) => {
    try {
      await login({ identifier: 'somchai_lw', password: 'Customer1234!' });
      if (customData) {
        setCurrentUser((prev) => ({ ...prev, ...customData }));
      }
    } catch {
      // Fallback
      setCurrentUser(customData ? { ...MOCK_USERS.customer, ...customData } : MOCK_USERS.customer);
    }
  };

  const loginAsAdmin = async () => {
    try {
      await login({ identifier: 'admin_lw', password: 'Admin1234!' });
    } catch {
      // Fallback
      setCurrentUser(MOCK_USERS.admin);
    }
  };

  const updateUser = async (updates) => {
    try {
      const res = await authApi.updateProfile(updates);
      setCurrentUser(res.user);
    } catch {
      setCurrentUser((prev) => (prev ? { ...prev, ...updates } : prev));
    }
  };

  // 💖 Wishlist Actions
  const toggleWishlist = async (productId) => {
    setWishlist((prev) => {
      const isExist = prev.includes(productId);
      return isExist ? prev.filter((id) => id !== productId) : [...prev, productId];
    });

    if (currentUser) {
      try {
        await wishlistApi.toggle(productId);
      } catch (err) {
        console.error('Wishlist toggle error:', err);
      }
    }
  };

  // 🤝 Leads Actions
  const addLead = async (leadData) => {
    const localId = `lead-${Date.now()}`;
    const newLead = {
      id: localId,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'NEW',
      notes: 'ลูกค้าส่งฟอร์มผ่านหน้าเว็บ',
      userId: currentUser?.id || null,
      ...leadData,
    };
    setLeads((prev) => [newLead, ...prev]);

    try {
      const serverLead = await leadsApi.create({
        name: leadData.name,
        phone: leadData.phone,
        interest: leadData.interest,
        preferredTime: leadData.preferredTime,
        notes: leadData.notes,
      });
      if (serverLead?.id) {
        setLeads((prev) => prev.map((l) => (l.id === localId ? serverLead : l)));
        return serverLead;
      }
    } catch (err) {
      console.warn('บันทึก Lead ในโหมด Offline Local:', err.message);
    }
    return newLead;
  };

  const updateLeadStatus = async (leadId, newStatus, newNotes) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              status: newStatus !== undefined ? newStatus : l.status,
              notes: newNotes !== undefined ? newNotes : l.notes,
            }
          : l
      )
    );

    try {
      await leadsApi.updateStatus(leadId, { status: newStatus, notes: newNotes });
    } catch (err) {
      console.error('Update lead status error:', err);
    }
  };

  // 📋 Insurance Plans Actions (CRUD)
  const addInsurancePlan = async (planData) => {
    const newPlan = await insurancePlansApi.create(planData);
    setInsurancePlans((prev) => [newPlan, ...prev]);
    return newPlan;
  };

  const updateInsurancePlan = async (planId, updates) => {
    const updated = await insurancePlansApi.update(planId, updates);
    setInsurancePlans((prev) => prev.map((p) => (p.id === planId ? updated : p)));
    return updated;
  };

  const deleteInsurancePlan = async (planId) => {
    await insurancePlansApi.delete(planId);
    setInsurancePlans((prev) => prev.filter((p) => p.id !== planId));
  };

  // 📰 Blog Posts Actions
  const addPost = async (postData) => {
    const newPost = {
      id: `post-${Date.now()}`,
      slug: postData.title.toLowerCase().replace(/[^a-z0-9ก-๙]+/g, '-'),
      author: currentUser?.name || 'ทีมงาน Living Wealth 365',
      publishedAt: new Date().toISOString().substring(0, 10),
      published: true,
      ...postData,
    };
    setPosts((prev) => [newPost, ...prev]);

    try {
      const serverPost = await postsApi.create(postData);
      if (serverPost) {
        setPosts((prev) => prev.map((p) => (p.id === newPost.id ? serverPost : p)));
        return serverPost;
      }
    } catch {
      // Local fallback
    }
    return newPost;
  };

  const updatePost = async (postId, updates) => {
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, ...updates } : p)));
    try {
      await postsApi.update(postId, updates);
    } catch {
      // Local fallback
    }
  };

  const deletePost = async (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    try {
      await postsApi.delete(postId);
    } catch {
      // Local fallback
    }
  };

  // 💎 Products Actions
  const addProduct = async (prodData) => {
    const newProd = {
      id: `prod-${Date.now()}`,
      isActive: true,
      ...prodData,
    };
    setProducts((prev) => [newProd, ...prev]);
    try {
      const serverProd = await productsApi.create(prodData);
      if (serverProd) {
        setProducts((prev) => prev.map((p) => (p.id === newProd.id ? serverProd : p)));
        return serverProd;
      }
    } catch {
      // Local fallback
    }
    return newProd;
  };

  const updateProduct = async (prodId, updates) => {
    setProducts((prev) => prev.map((p) => (p.id === prodId ? { ...p, ...updates } : p)));
    try {
      await productsApi.update(prodId, updates);
    } catch {
      // Local fallback
    }
  };

  const deleteProduct = async (prodId) => {
    setProducts((prev) => prev.filter((p) => p.id !== prodId));
    try {
      await productsApi.delete(prodId);
    } catch {
      // Local fallback
    }
  };

  return (
    <AuthContext.Provider
      value={{
        theme,
        toggleTheme,
        currentUser,
        loading,
        refreshData,
        login,
        register,
        loginAsCustomer,
        loginAsAdmin,
        updateUser,
        logout,
        wishlist,
        toggleWishlist,
        leads,
        addLead,
        updateLeadStatus,
        insurancePlans,
        addInsurancePlan,
        updateInsurancePlan,
        deleteInsurancePlan,
        posts,
        addPost,
        updatePost,
        deletePost,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
