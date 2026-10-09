import { Link, useNavigate } from 'react-router-dom';
import { Heart, Trash2, Send, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { ROUTES } from '../../constants/routes';
import DashboardLayout from '../../components/common/DashboardLayout';

export default function AccountWishlistPage() {
  const { wishlist, products, toggleWishlist, addLead, currentUser } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleRemove = (productId) => {
    toggleWishlist(productId);
    showToast(t('wishlistRemoved'), 'info');
  };

  const handleOrder = (product) => {
    const newLead = addLead({
      name: currentUser?.name || 'ลูกค้าสมาชิก',
      phone: currentUser?.phone || '081-234-5678',
      interest: `บูชาหินมงคลจาก Wishlist: ${product.name} (฿${product.price})`,
      preferredTime: 'ช่วงบ่าย (13:00 - 17:00)',
      notes: 'ส่งคำขอจากหน้า Wishlist ส่วนตัว',
    });

    showToast(t('leadSuccess'), 'success');
    navigate(`${ROUTES.THANK_YOU}?leadId=${newLead.id}&interest=${encodeURIComponent(product.name)}`);
  };

  return (
    <DashboardLayout type="customer">
      <div className="space-y-8 w-full">
        {/* Header */}
        <div className="border-b border-base-300/60 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            {t('savedWishlist')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-primary">
            {t('savedWishlist')} ({wishlistedProducts.length})
          </h1>
          <p className="text-sm text-base-content/70">
            วัตถุมงคลและหินนำโชคที่คุณเคยกดหัวใจ ❤️ ไว้ สามารถกดสั่งบูชาได้ทันที
          </p>
        </div>

        {/* Wishlist Items Grid */}
        {wishlistedProducts.length === 0 ? (
          <div className="zen-surface rounded-3xl p-12 text-center border border-base-300 max-w-2xl mx-auto space-y-4">
            <Heart className="w-12 h-12 text-base-content/40 mx-auto" />
            <h3 className="text-lg font-bold text-primary">
              ยังไม่มีรายการหินมงคลที่บันทึกไว้
            </h3>
            <p className="text-sm text-base-content/70">
              คุณสามารถเข้าไปเลือกชมหินมงคลและกดหัวใจ ❤️ เพื่อบันทึกมาไว้ดูภายหลังได้
            </p>
            <Link to={ROUTES.MUTELU} className="btn btn-secondary btn-sm text-white rounded-xl font-bold">
              ไปชมแคตตาล็อกสายมู
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistedProducts.map((prod) => (
              <div
                key={prod.id}
                className="zen-surface rounded-3xl overflow-hidden border border-base-300/60 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-4/3 w-full overflow-hidden bg-base-200 relative">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="badge badge-primary absolute top-3 left-3 text-xs font-bold">
                      {prod.category}
                    </span>
                    <button
                      onClick={() => handleRemove(prod.id)}
                      className="btn btn-circle btn-sm absolute top-3 right-3 bg-base-100/80 text-error hover:bg-error hover:text-white"
                      title="ลบออกจากรายการที่บันทึก"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-black text-primary">
                        {prod.name}
                      </h4>
                      <span className="text-base font-extrabold text-secondary">
                        ฿{prod.price}
                      </span>
                    </div>

                    <p className="text-xs text-base-content/70 line-clamp-2">
                      {prod.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleOrder(prod)}
                    className="btn btn-secondary btn-sm text-white w-full rounded-xl font-bold gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>ปรึกษาและสั่งบูชาชิ้นนี้</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
