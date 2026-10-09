import { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_POSTS, INITIAL_LEADS, MOCK_USERS } from '../constants/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('lw365_theme') || 'zen-light';
  });

  // Current user state (Guest by default, or loaded from localStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('lw365_user');
    return saved ? JSON.parse(saved) : null; // null = Guest
  });

  // Wishlist state (Product IDs)
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('lw365_wishlist');
    return saved ? JSON.parse(saved) : ['prod-4', 'prod-1'];
  });

  // Leads CRM state
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('lw365_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  // Posts CMS state
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('lw365_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  // Products CMS state
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('lw365_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Sync theme to document html
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lw365_theme', theme);
  }, [theme]);

  // Persist user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('lw365_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('lw365_user');
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'zen-light' ? 'zen-dark' : 'zen-light'));
  };

  const loginAsCustomer = () => {
    setCurrentUser(MOCK_USERS.customer);
  };

  const loginAsAdmin = () => {
    setCurrentUser(MOCK_USERS.admin);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const addLead = (leadData) => {
    const newLead = {
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'NEW',
      notes: 'ลูกค้าส่งฟอร์มผ่านหน้าเว็บ',
      userId: currentUser?.id || null,
      ...leadData,
    };
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = (leadId, newStatus, newNotes) => {
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
  };

  const addPost = (postData) => {
    const newPost = {
      id: `post-${Date.now()}`,
      slug: postData.title.toLowerCase().replace(/[^a-z0-9ก-๙]+/g, '-'),
      author: currentUser?.name || 'ทีมงาน Living Wealth 365',
      publishedAt: new Date().toISOString().substring(0, 10),
      published: true,
      ...postData,
    };
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  };

  const updatePost = (postId, updates) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, ...updates } : p))
    );
  };

  const deletePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  const addProduct = (prodData) => {
    const newProd = {
      id: `prod-${Date.now()}`,
      isActive: true,
      ...prodData,
    };
    setProducts((prev) => [newProd, ...prev]);
    return newProd;
  };

  const updateProduct = (prodId, updates) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === prodId ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (prodId) => {
    setProducts((prev) => prev.filter((p) => p.id !== prodId));
  };

  return (
    <AuthContext.Provider
      value={{
        theme,
        toggleTheme,
        currentUser,
        loginAsCustomer,
        loginAsAdmin,
        logout,
        wishlist,
        toggleWishlist,
        leads,
        addLead,
        updateLeadStatus,
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
