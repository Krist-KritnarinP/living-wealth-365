import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Send,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { ROUTES } from '../../constants/routes';
import { resolveAssetUrl } from '../../api';
import DashboardLayout from '../../components/common/DashboardLayout';

export default function AccountCartPage() {
  const { currentUser, addLead } = useAuth();
  const {
    cartItems,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const buildOrderSummary = () => {
    const lines = cartItems.map(
      (item, idx) =>
        `${idx + 1}. ${item.name} x${item.quantity} (฿${(
          item.price * item.quantity
        ).toLocaleString()})`
    );
    return `รายการสั่งซื้อ/บูชาจากตะกร้า:\n${lines.join(
      '\n'
    )}\nยอดรวม: ฿${cartTotal.toLocaleString()}`;
  };

  const handleCheckoutWithAdvisor = () => {
    if (cartItems.length === 0) return;
    const itemSummary = cartItems
      .map((i) => `${i.name} (x${i.quantity})`)
      .join(', ');

    const newLead = addLead({
      name: currentUser?.name || 'ลูกค้าสมาชิก',
      phone: currentUser?.phone || 'ไม่ระบุเบอร์โทร',
      interest: `สั่งซื้อจากตะกร้า: ${itemSummary} (รวม ฿${cartTotal.toLocaleString()})`,
      preferredTime: 'ช่วงบ่าย (13:00 - 17:00)',
      notes: buildOrderSummary(),
    });

    clearCart();
    showToast('ส่งคำสั่งซื้อไปยังที่ปรึกษาเรียบร้อยแล้ว', 'success');
    navigate(
      `${ROUTES.THANK_YOU}?leadId=${newLead.id}&interest=${encodeURIComponent(
        `คำสั่งซื้อ ${cartCount} รายการ (฿${cartTotal.toLocaleString()})`
      )}`
    );
  };

  const handleSendToLine = async () => {
    if (cartItems.length === 0) return;
    const text = `สวัสดีครับ/ค่ะ สนใจบูชา & สั่งซื้อรายการจาก Living Wealth 365:\n${buildOrderSummary()}\nรบกวน Admin B แนะนำรายละเอียดและการจัดส่งครับ/ค่ะ`;
    try {
      await navigator.clipboard.writeText(text);
      showToast('คัดลอกสรุปออเดอร์แล้ว กำลังเปิด LINE...', 'success');
    } catch {
      showToast('กำลังเปิดหน้าต่าง LINE...', 'info');
    }
    window.open(
      `https://line.me/R/share?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <DashboardLayout type="customer">
      <div className="space-y-8 w-full">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-base-300/60 pb-4">
          <div>
            <span className="text-xs font-semibold text-secondary block">
              จัดการรายการที่เลือกไว้
            </span>
            <h1 className="editorial-display text-2xl sm:text-3xl font-bold text-primary">
              ตะกร้าสินค้า ({cartCount})
            </h1>
          </div>

          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="btn btn-ghost btn-sm text-error/80 hover:text-error"
            >
              ล้างตะกร้าทั้งหมด
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="zen-surface rounded-3xl p-10 sm:p-14 border border-base-300/60 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="editorial-display text-xl font-bold text-primary">
                ยังไม่มีรายการสินค้าในตะกร้า
              </h2>
              <p className="text-sm text-base-content/70 leading-relaxed">
                เลือกชมผลึกแร่ธาตุธรรมชาติและชิ้นงานมงคลที่คัดสรรโดย Admin B แล้วกดเพิ่มลงตะกร้าเพื่อสรุปรายการได้เลยครับ
              </p>
            </div>
            <Link
              to={ROUTES.EARTH_ENERGY}
              className="btn btn-primary rounded-xl font-bold gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>เลือกชมสินค้าพลังงานธรรมชาติ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left: Item List (8 cols) */}
            <div className="lg:col-span-8 space-y-4 min-w-0">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="zen-surface rounded-2xl p-4 sm:p-5 border border-base-300/60 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <img
                    src={resolveAssetUrl(
                      item.imageUrl,
                      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=80'
                    )}
                    alt={item.name}
                    className="w-full sm:w-24 h-44 sm:h-24 rounded-xl object-cover shrink-0 bg-base-200"
                  />

                  <div className="flex-1 min-w-0 space-y-1.5">
                    {item.category && (
                      <span className="badge badge-sm badge-ghost text-[11px]">
                        {item.category}
                      </span>
                    )}
                    <h3 className="text-base sm:text-lg font-bold text-primary leading-snug break-words">
                      {item.name}
                    </h3>
                    <p className="text-sm text-base-content/65">
                      ราคาต่อชิ้น: ฿{item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="w-full sm:w-auto flex items-center justify-between sm:flex-col sm:items-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-base-300/40">
                    <span className="text-lg font-black text-secondary">
                      ฿{(item.price * item.quantity).toLocaleString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center gap-1 bg-base-200/70 rounded-xl border border-base-300/70 p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="btn btn-ghost btn-xs btn-square"
                          aria-label="ลดจำนวน"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-bold px-2.5 min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="btn btn-ghost btn-xs btn-square"
                          aria-label="เพิ่มจำนวน"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="btn btn-ghost btn-sm btn-square text-error/80 hover:text-error"
                        aria-label="ลบรายการ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Order Summary Card (4 cols) */}
            <div className="lg:col-span-4 zen-surface rounded-3xl p-6 border border-secondary/35 space-y-5 sticky top-24">
              <h2 className="editorial-display text-xl font-bold text-primary border-b border-base-300/50 pb-3">
                สรุปรายการสั่งซื้อ
              </h2>

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-base-content/75">
                  <span>จำนวนชิ้นงานรวม</span>
                  <span className="font-bold">{cartCount} ชิ้น</span>
                </div>
                <div className="flex justify-between text-base-content/75">
                  <span>บริการจัดเตรียม & พลังงาน</span>
                  <span className="font-semibold text-success">ฟรี</span>
                </div>
                <div className="pt-3 border-t border-base-300/50 flex justify-between items-baseline">
                  <span className="font-bold text-base-content">ยอดรวมสุทธิ</span>
                  <span className="text-2xl font-black text-primary">
                    ฿{cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleCheckoutWithAdvisor}
                  className="btn btn-primary w-full rounded-xl font-bold gap-2 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ยืนยันคำสั่งซื้อให้ที่ปรึกษาติดต่อกลับ</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendToLine}
                  className="btn btn-secondary btn-outline w-full rounded-xl font-bold gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>ส่งสรุปออเดอร์ทาง LINE</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
