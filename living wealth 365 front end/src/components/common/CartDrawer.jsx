import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Send,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { ROUTES } from '../../constants/routes';
import { resolveAssetUrl } from '../../api';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartTotal,
  } = useCart();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isCartOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const buildOrderText = () => {
    const lines = cartItems.map(
      (item, idx) =>
        `${idx + 1}. ${item.name} x${item.quantity} (฿${(
          item.price * item.quantity
        ).toLocaleString()})`
    );
    return `สวัสดีครับ/ค่ะ สนใจบูชา & สั่งซื้อรายการจาก Living Wealth 365:\n${lines.join(
      '\n'
    )}\nยอดรวม: ฿${cartTotal.toLocaleString()}\nรบกวนคุณจอยแนะนำรายละเอียดและการจัดส่งเพิ่มเติมครับ/ค่ะ`;
  };

  const handleCopyAndLine = async () => {
    const summary = buildOrderText();
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      showToast('คัดลอกสรุปคำสั่งซื้อแล้ว กำลังเปิด LINE...', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast('เปิดหน้าต่าง LINE เพื่อส่งรายการให้ที่ปรึกษา', 'info');
    }
    const lineShareUrl = `https://line.me/R/share?text=${encodeURIComponent(
      summary
    )}`;
    window.open(lineShareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="ตะกร้าสินค้า"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-base-content/30 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      {/* Slide-over Panel */}
      <aside className="relative z-10 w-full max-w-md h-full liquid-glass-solid border-l border-base-300/60 shadow-2xl flex flex-col justify-between animate-pop-in">
        {/* Header */}
        <div className="p-5 border-b border-base-300/50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="editorial-display text-lg font-bold text-primary leading-tight">
                รายการที่เลือกไว้
              </h2>
              <p className="text-xs text-base-content/65">
                {cartCount} รายการในตะกร้า
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="btn btn-ghost btn-circle btn-sm"
            aria-label="ปิดตะกร้าสินค้า"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-base-200 flex items-center justify-center text-base-content/40">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-primary">
                  ยังไม่มีรายการในตะกร้า
                </p>
                <p className="text-xs text-base-content/65 max-w-xs">
                  เลือกชมผลึกแร่ธาตุและชิ้นงานพลังงานธรรมชาติที่คัดสรรโดยคุณจอย แล้วกดเพิ่มลงตะกร้าได้เลยครับ
                </p>
              </div>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-base-200/45 border border-base-300/50 flex gap-3 items-center"
              >
                <img
                  src={resolveAssetUrl(
                    item.imageUrl,
                    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=80'
                  )}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-base-300"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-xs sm:text-sm font-bold text-primary leading-snug break-words">
                    {item.name}
                  </p>
                  <p className="text-xs font-extrabold text-secondary">
                    ฿{(item.price * item.quantity).toLocaleString()}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <div className="inline-flex items-center gap-1 bg-base-100 rounded-lg border border-base-300/70 p-0.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="btn btn-ghost btn-xs btn-square min-h-6 h-6 w-6"
                        aria-label="ลดจำนวน"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-2 min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="btn btn-ghost btn-xs btn-square min-h-6 h-6 w-6"
                        aria-label="เพิ่มจำนวน"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="btn btn-ghost btn-xs text-error/80 hover:text-error px-2"
                      aria-label="ลบรายการ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout Summary */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-base-300/50 bg-base-200/30 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-base-content/75 font-medium">ยอดรวมโดยประมาณ</span>
              <span className="text-xl font-black text-primary">
                ฿{cartTotal.toLocaleString()}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyAndLine}
              className="btn btn-primary w-full rounded-xl font-bold gap-2 shadow-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              <span>ส่งสรุปรายการสั่งซื้อทาง LINE</span>
            </button>

            <div className="flex items-center justify-between gap-2">
              <Link
                to={ROUTES.ACCOUNT_CART}
                onClick={closeCart}
                className="btn btn-ghost btn-xs text-primary gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>เปิดหน้าตะกร้าเต็ม</span>
              </Link>

              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(buildOrderText());
                    setCopied(true);
                    showToast('คัดลอกข้อความสรุปรายการแล้ว', 'success');
                    setTimeout(() => setCopied(false), 2000);
                  } catch {
                    // ignore
                  }
                }}
                className="btn btn-ghost btn-xs text-base-content/70 gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>คัดลอก</span>
              </button>

              <button
                type="button"
                onClick={clearCart}
                className="btn btn-ghost btn-xs text-error/70 hover:text-error"
              >
                ล้าง
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
