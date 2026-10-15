import { Heart, Sparkles, Send, Atom, Compass, BookOpen, Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { resolveAssetUrl } from '../../api';

export default function ProductCard({ product, onSelectForLead }) {
  const { wishlist, toggleWishlist, currentUser } = useAuth();
  const navigate = useNavigate();
  const isWishlisted = wishlist.includes(product.id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (!currentUser) {
      navigate(`${ROUTES.LOGIN}?redirect=${encodeURIComponent(ROUTES.EARTH_ENERGY)}`);
      return;
    }
    toggleWishlist(product.id);
  };

  // Aspect Badge Helper
  const getAspectBadge = (aspect) => {
    switch (aspect) {
      case 'SCIENCE':
        return { label: '🔬 วิทย์ & แร่ธาตุ', color: 'badge-info' };
      case 'HISTORY':
        return { label: '🏛️ ประวัติศาสตร์', color: 'badge-neutral' };
      case 'CHAKRA_ENERGY':
        return { label: '✨ พลังจักระ', color: 'badge-secondary' };
      case 'CULTURE':
        return { label: '📜 วัฒนธรรม', color: 'badge-accent' };
      default:
        return { label: '💎 คัดสรรพิเศษ', color: 'badge-secondary' };
    }
  };

  const aspectBadge = getAspectBadge(product.aspect);

  return (
    <div className="card zen-surface border border-base-300/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
      {/* Image & Badges Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-base-200">
        <img
          src={resolveAssetUrl(
            product.imageUrl,
            'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80'
          )}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
          onClick={handleWishlistClick}
          className="btn btn-circle btn-sm absolute top-3 right-3 bg-base-100/80 backdrop-blur-md border border-base-300 hover:scale-110 transition-transform shadow-xs"
          title={isWishlisted ? 'ลบออกจากสิ่งที่สนใจ' : '❤️ บันทึกไว้ดูทีหลัง'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'text-error fill-error' : 'text-neutral'
            }`}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-base sm:text-lg font-black text-primary leading-snug group-hover:text-secondary transition-colors">
              {product.name}
            </h4>
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
            <div className="mt-2 space-y-1">
              {product.mineralFormula && (
                <div className="text-[11px] font-mono text-base-content/70 flex items-center gap-1.5 truncate">
                  <Atom className="w-3.5 h-3.5 text-info shrink-0" />
                  <span>สูตรแร่: {product.mineralFormula}</span>
                </div>
              )}
              {product.chakra && (
                <div className="text-[11px] font-semibold text-secondary flex items-center gap-1.5 truncate">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{product.chakra}</span>
                </div>
              )}
            </div>
          )}

          <p className="text-xs sm:text-sm text-base-content/75 mt-2.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {product.dayOfWeek && (
            <div className="mt-3 text-xs font-semibold text-primary/80 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
              <span>สัมพันธ์กับ: {product.dayOfWeek}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => onSelectForLead && onSelectForLead(product)}
            className="btn btn-secondary btn-outline btn-sm w-full rounded-xl font-bold gap-1.5 hover:btn-secondary hover:text-white"
          >
            <Send className="w-3.5 h-3.5" />
            <span>ปรึกษา & บูชาชิ้นงาน</span>
          </button>
        </div>
      </div>
    </div>
  );
}
