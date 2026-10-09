import { Heart, Sparkles, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function ProductCard({ product, onSelectForLead }) {
  const { wishlist, toggleWishlist, currentUser } = useAuth();
  const navigate = useNavigate();
  const isWishlisted = wishlist.includes(product.id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (!currentUser) {
      // Save intent and navigate to login
      navigate(`${ROUTES.LOGIN}?redirect=${encodeURIComponent(ROUTES.MUTELU)}`);
      return;
    }
    toggleWishlist(product.id);
  };

  return (
    <div className="card zen-surface border border-base-300/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
      {/* Image & Badges Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-base-200">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="badge badge-primary text-xs font-bold shadow-xs">
            {product.category}
          </span>
          <span className="badge badge-secondary text-xs font-semibold text-white shadow-xs">
            {product.element}
          </span>
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
            <h4 className="text-lg font-black text-primary leading-snug">
              {product.name}
            </h4>
            <div className="text-right">
              <span className="text-base font-extrabold text-secondary">
                ฿{product.price}
              </span>
            </div>
          </div>

          <p className="text-sm text-base-content/70 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-3 text-xs font-semibold text-primary/80 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span>เหมาะกับ: {product.dayMatch}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => onSelectForLead && onSelectForLead(product)}
            className="btn btn-primary btn-sm w-full rounded-xl font-bold gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>ปรึกษาและบูชา</span>
          </button>
        </div>
      </div>
    </div>
  );
}
