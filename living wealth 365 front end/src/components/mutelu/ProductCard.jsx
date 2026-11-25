import { Heart, Sparkles, Send, Atom, ShoppingBag, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { resolveAssetUrl } from '../../api';
import { flyToCart } from '../../utils/flyToCart';
import FramedImage from '../common/FramedImage';

export default function ProductCard({ product, onSelectForLead }) {
  const { wishlist, toggleWishlist, currentUser } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const isWishlisted = wishlist.includes(product.id);
  const detailUrl = `/earth-energy/product/${product.id}`;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) {
      navigate(`${ROUTES.LOGIN}?redirect=${encodeURIComponent(ROUTES.EARTH_ENERGY)}`);
      return;
    }
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const btn = e.currentTarget;
    const cardImg = btn.closest('.card')?.querySelector('img');

    // Trigger fly-to-cart warp animation to #nav-cart-btn
    flyToCart({
      sourceEl: btn || cardImg,
      imageUrl: resolveAssetUrl(product.imageUrl),
      targetSelector: '#nav-cart-btn',
    });

    // Add to cart with openDrawer: false
    addToCart(product, 1, { openDrawer: false });
    showToast(`เพิ่ม "${product.name}" ลงในตะกร้าแล้ว`, 'success');
  };

  // Aspect Badge Helper
  const getAspectBadge = (aspect) => {
    switch (aspect) {
      case 'SCIENCE':
        return { label: 'วิทย์ & แร่ธาตุ', color: 'badge-info' };
      case 'HISTORY':
        return { label: 'ประวัติศาสตร์', color: 'badge-neutral' };
      case 'CHAKRA_ENERGY':
        return { label: 'พลังจักระ', color: 'badge-secondary' };
      case 'CULTURE':
        return { label: 'วัฒนธรรม', color: 'badge-accent' };
      default:
        return { label: 'คัดสรรพิเศษ', color: 'badge-secondary' };
    }
  };

  const aspectBadge = getAspectBadge(product.aspect);

  return (
    <div className="card zen-surface hover-card-elevate border border-base-300/60 rounded-3xl overflow-hidden shadow-xs group flex flex-col justify-between min-w-0">
      {/* Clickable Image & Badges Container */}
      <Link to={detailUrl} className="relative aspect-4/3 w-full overflow-hidden bg-base-200 block">
        <FramedImage
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          fallback="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
          <span className={`badge ${aspectBadge.color} text-[11px] font-bold shadow-xs py-0.5`}>
            {aspectBadge.label}
          </span>
          {product.category && (
            <span className="badge badge-primary text-[11px] font-bold shadow-xs py-0.5">
              {product.category}
            </span>
          )}
        </div>

        {/* Favorite Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className="btn btn-circle btn-sm absolute top-3 right-3 bg-base-100/80 backdrop-blur-md border border-base-300 hover:scale-110 transition-transform shadow-xs z-10"
          title={isWishlisted ? 'ลบออกจากรายการที่สนใจ' : 'บันทึกรายการที่สนใจ'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'text-error fill-error' : 'text-neutral'
            }`}
          />
        </button>
      </Link>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 min-w-0">
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-2 min-w-0">
            <Link to={detailUrl} className="block flex-1 min-w-0">
              <h4 className="text-base sm:text-lg font-black text-primary leading-snug group-hover:text-secondary transition-colors wrap-anywhere">
                {product.name}
              </h4>
            </Link>
            {product.price && (
              <div className="text-right shrink-0">
                <span className="text-base font-extrabold text-secondary">
                  ฿{typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
                </span>
              </div>
            )}
          </div>

          {/* Mineral Formula & Chakra Tag */}
          {(product.mineralFormula || product.chakra) && (
            <div className="mt-2 space-y-1 min-w-0">
              {product.mineralFormula && (
                <div className="text-[11px] font-mono text-base-content/70 flex items-center gap-1.5 truncate">
                  <Atom className="w-3.5 h-3.5 text-info shrink-0" />
                  <span className="truncate">สูตรแร่: {product.mineralFormula}</span>
                </div>
              )}
              {product.chakra && (
                <div className="text-[11px] font-semibold text-secondary flex items-center gap-1.5 truncate">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{product.chakra}</span>
                </div>
              )}
            </div>
          )}

          <p className="text-xs sm:text-sm text-base-content/75 mt-2.5 line-clamp-2 leading-relaxed wrap-anywhere">
            {product.description}
          </p>

          <div className="mt-3 flex items-center justify-between text-xs min-w-0">
            {product.dayOfWeek ? (
              <div className="font-semibold text-primary/80 flex items-center gap-1.5 truncate min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                <span className="truncate">สัมพันธ์: {product.dayOfWeek}</span>
              </div>
            ) : <span />}
            <Link
              to={detailUrl}
              className="font-bold text-primary hover:text-secondary inline-flex items-center gap-1 shrink-0 ml-auto group-hover:translate-x-0.5 transition-transform"
            >
              <span>ดูข้อมูลแร่</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-wrap sm:flex-nowrap items-center gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="btn btn-primary btn-sm flex-1 rounded-xl font-bold gap-1.5 min-w-[110px]"
            title="เพิ่มลงในตะกร้า (ไม่เปิดหน้าต่าง)"
          >
            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
            <span>ใส่ตะกร้า</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectForLead && onSelectForLead(product)}
            className="btn btn-secondary btn-outline btn-sm rounded-xl font-bold gap-1.5 hover:btn-secondary hover:text-white shrink-0"
            title="สอบถามรายละเอียดชิ้นงาน"
          >
            <Send className="w-3.5 h-3.5 shrink-0" />
            <span className="sm:hidden lg:inline">ปรึกษา</span>
          </button>
        </div>
      </div>
    </div>
  );
}
