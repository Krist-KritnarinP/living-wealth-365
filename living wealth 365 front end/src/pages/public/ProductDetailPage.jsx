import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Gem,
  ArrowLeft,
  ShoppingBag,
  Heart,
  Send,
  Sparkles,
  Atom,
  CheckCircle2,
  Calendar,
  Layers,
  ShieldCheck,
  Compass,
  Plus,
  Minus,
  MessageCircle,
  Share2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { ROUTES } from '../../constants/routes';
import { resolveAssetUrl } from '../../api';
import { flyToCart } from '../../utils/flyToCart';
import FramedImage from '../../components/common/FramedImage';
import LeadCaptureForm from '../../components/forms/LeadCaptureForm';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, wishlist, toggleWishlist, currentUser } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [showConsultModal, setShowConsultModal] = useState(false);

  // Find product by id (or slug match)
  const product = useMemo(() => {
    return products.find((p) => String(p.id) === String(id) || p.slug === id);
  }, [products, id]);

  const isWishlisted = product ? wishlist.includes(product.id) : false;

  const handleWishlistClick = () => {
    if (!product) return;
    if (!currentUser) {
      navigate(`${ROUTES.LOGIN}?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e) => {
    if (!product) return;
    const buttonEl = e.currentTarget;
    const imageEl = document.getElementById('product-hero-image');

    // Trigger Fly-to-Cart animation from button/image to Navbar cart icon
    flyToCart({
      sourceEl: buttonEl || imageEl,
      imageUrl: resolveAssetUrl(product.imageUrl),
      targetSelector: '#nav-cart-btn',
      onComplete: () => {
        // animation finished
      },
    });

    // Add to cart without opening drawer
    addToCart(product, quantity, { openDrawer: false });
    showToast(`เพิ่ม "${product.name}" (${quantity} ชิ้น) ลงในตะกร้าแล้ว`, 'success');
  };

  const handleLineOrder = () => {
    if (!product) return;
    const priceFormatted = typeof product.price === 'number' ? product.price.toLocaleString() : product.price;
    const text = `สวัสดี Admin B สนใจสั่งซื้อและสอบถามข้อมูลแร่ธาตุคัดสรร:\n\n• ชิ้นงาน: ${product.name}\n• รหัสสินค้า: ${product.id}\n• จำนวน: ${quantity} ชิ้น\n• ราคาโดยประมาณ: ฿${priceFormatted}\n\nรบกวนแนะนำขนาดข้อมือและขั้นตอนการจัดส่งเพิ่มเติม`;
    const lineUrl = `https://line.me/R/ti/p/@livingwealth365?text=${encodeURIComponent(text)}`;
    window.open(lineUrl, '_blank', 'noopener,noreferrer');
  };

  // Curated Related Items
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id && (p.category === product.category || p.aspect === product.aspect))
      .slice(0, 4);
  }, [products, product]);

  if (!product) {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <Gem className="w-8 h-8 text-secondary" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-primary">
          ไม่พบข้อมูลแร่ธาตุที่คุณต้องการ
        </h1>
        <p className="text-sm text-base-content/75 max-w-md mx-auto">
          ชิ้นงานนี้อาจถูกปิดการแสดงผลหรือรหัสสินค้าไม่ถูกต้อง
        </p>
        <Link
          to={ROUTES.EARTH_ENERGY}
          className="btn btn-primary rounded-xl font-bold gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปคลังแร่ธาตุและคริสตัลทั้งหมด</span>
        </Link>
      </div>
    );
  }

  // Aspect Badge Details
  const getAspectBadge = (aspect) => {
    switch (aspect) {
      case 'SCIENCE':
        return { label: 'วิทยาศาสตร์ & โครงสร้างแร่', color: 'badge-info' };
      case 'HISTORY':
        return { label: 'อารยธรรม & ประวัติศาสตร์', color: 'badge-neutral' };
      case 'CHAKRA_ENERGY':
        return { label: 'จักระ & การเจริญสติ', color: 'badge-secondary' };
      case 'CULTURE':
        return { label: 'วัฒนธรรม & จิตวิญญาณ', color: 'badge-accent' };
      default:
        return { label: 'คัดสรรเฉพาะบุคคล', color: 'badge-secondary' };
    }
  };

  const aspectInfo = getAspectBadge(product.aspect);

  return (
    <div className="w-full space-y-12 lg:space-y-16 py-6 sm:py-10">
      {/* 1. TOP BREADCRUMB & BACK BUTTON */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(ROUTES.EARTH_ENERGY)}
            className="btn btn-ghost btn-sm rounded-full font-bold gap-2 text-primary hover:bg-primary/10 px-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับไปคลังแร่ธาตุทั้งหมด (Earth & Energy)</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleWishlistClick}
              className={`btn btn-sm btn-ghost rounded-full font-bold gap-1.5 ${
                isWishlisted ? 'text-error' : 'text-neutral'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? 'fill-error text-error' : ''
                }`}
              />
              <span>{isWishlisted ? 'บันทึกแล้ว' : 'บันทึกลง Wishlist'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. MAIN HERO PRODUCT SHOWCASE */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="zen-surface rounded-[2rem] border border-base-300/60 p-6 sm:p-10 lg:p-12 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Image Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square sm:aspect-4/3 lg:aspect-square w-full rounded-3xl overflow-hidden bg-base-200 border border-base-300/50 shadow-md">
                <FramedImage
                  id="product-hero-image"
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  fallback="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000&auto=format&fit=crop&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 max-w-[85%]">
                  <span className={`badge ${aspectInfo.color} font-bold text-xs py-1 px-3 shadow-sm`}>
                    {aspectInfo.label}
                  </span>
                  {product.category && (
                    <span className="badge badge-primary font-bold text-xs py-1 px-3 shadow-sm">
                      {product.category}
                    </span>
                  )}
                </div>

                {/* Authenticity Watermark */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-bold drop-shadow-md">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ผลึกแร่ธรรมชาติแท้ 100% (Natural Authentic)</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md">
                    คัดสรรโดย Admin B
                  </span>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Pillar Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs sm:text-sm font-black tracking-wide shadow-xs">
                  <Gem className="w-4 h-4 text-secondary shrink-0" />
                  <span>PILLAR 5: EARTH & ENERGY CURATION • คลังผลึกแร่คัดสรร</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary leading-tight break-words [overflow-wrap:anywhere]">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-base-200/60 border border-base-300/60 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold text-base-content/65 block">
                      ราคา (รวมภาษีมูลค่าเพิ่ม):
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-secondary">
                      ฿{typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-success bg-success/10 border border-success/20 px-3 py-1 rounded-full">
                    พร้อมส่งมอบ • มีใบรับรองแหล่งกำเนิด
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-base-content/80 leading-relaxed break-words [overflow-wrap:anywhere]">
                  {product.description}
                </p>

                {/* 4 Scientific & Energetic Spec Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {product.mineralFormula && (
                    <div className="p-3.5 rounded-2xl bg-base-200/40 border border-base-300/40 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                        <Atom className="w-4 h-4 text-info shrink-0" />
                        <span>สูตรโครงสร้างแร่ (Formula)</span>
                      </div>
                      <p className="text-xs font-mono font-semibold text-base-content/85 break-words">
                        {product.mineralFormula}
                      </p>
                    </div>
                  )}

                  {product.chakra && (
                    <div className="p-3.5 rounded-2xl bg-base-200/40 border border-base-300/40 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-secondary">
                        <Sparkles className="w-4 h-4 shrink-0" />
                        <span>จักระและคลื่นพลังงาน (Chakra)</span>
                      </div>
                      <p className="text-xs font-semibold text-base-content/85 break-words">
                        {product.chakra}
                      </p>
                    </div>
                  )}

                  {product.dayOfWeek && (
                    <div className="p-3.5 rounded-2xl bg-base-200/40 border border-base-300/40 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                        <Calendar className="w-4 h-4 text-secondary shrink-0" />
                        <span>ความสอดคล้องตามวันเกิด</span>
                      </div>
                      <p className="text-xs font-semibold text-base-content/85 break-words">
                        {product.dayOfWeek}
                      </p>
                    </div>
                  )}

                  {product.stoneType && (
                    <div className="p-3.5 rounded-2xl bg-base-200/40 border border-base-300/40 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                        <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>ขนาดและลักษณะเฉพาะ</span>
                      </div>
                      <p className="text-xs font-semibold text-base-content/85 break-words">
                        {product.stoneType}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Purchase Actions & Quantity Selector */}
              <div className="pt-6 border-t border-base-300/60 space-y-3.5">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-base-content/75">
                    จำนวนชิ้น:
                  </span>
                  <div className="flex items-center rounded-xl border border-base-300 bg-base-100 p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="btn btn-ghost btn-xs btn-circle"
                      aria-label="ลดจำนวน"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-black text-sm text-primary">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="btn btn-ghost btn-xs btn-circle"
                      aria-label="เพิ่มจำนวน"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="btn btn-primary btn-md rounded-2xl font-bold shadow-md gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>เพิ่มลงในตะกร้า</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLineOrder}
                    className="btn btn-secondary btn-outline btn-md rounded-2xl font-bold gap-2 hover:btn-secondary hover:text-white"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>สั่งซื้อผ่าน LINE Official</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowConsultModal(true)}
                  className="btn btn-ghost btn-sm w-full rounded-xl font-bold text-xs gap-1.5 text-base-content/75 hover:text-primary"
                >
                  <Send className="w-3.5 h-3.5 text-secondary" />
                  <span>ต้องการคำแนะนำขนาดข้อมือ หรือปรึกษา Admin B โดยตรง</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4 DIMENSIONS OF CRYSTAL SCIENCE ACCORDION/CARDS */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-primary">
              4 มิติแห่งการคัดสรร โดย Living Wealth 365
            </h2>
            <p className="text-xs sm:text-sm text-base-content/70 mt-1">
              เรามองลึกกว่าความเชื่อทั่วไป สู่ความกลมกลืนระหว่างวิทยาศาสตร์และจิตวิญญาณ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl zen-surface border border-base-300/60 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-info/10 text-info flex items-center justify-center font-black">
                🔬
              </div>
              <h3 className="font-black text-base text-primary">
                1. วิทยาศาสตร์แร่ธาตุ
              </h3>
              <p className="text-xs text-base-content/75 leading-relaxed">
                โครงสร้างผลึกธรรมชาติ (Crystal Lattice) มีคุณสมบัติเพียโซอิเล็กทริก (Piezoelectricity) ช่วยสร้างความถี่การสั่นพ้องที่เสถียร
              </p>
            </div>

            <div className="p-5 rounded-3xl zen-surface border border-base-300/60 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-800 dark:text-amber-300 flex items-center justify-center font-black">
                ✨
              </div>
              <h3 className="font-black text-base text-primary">
                2. จักระและการเจริญสติ
              </h3>
              <p className="text-xs text-base-content/75 leading-relaxed">
                ใช้เป็นเครื่องเตือนสติสัมปชัญญะ (Mindful Anchor) ขณะทำงานหรือนั่งสมาธิ ช่วยดึงจิตใจกลับคืนสู่ปัจจุบันขณะ
              </p>
            </div>

            <div className="p-5 rounded-3xl zen-surface border border-base-300/60 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-neutral/10 text-neutral flex items-center justify-center font-black">
                🏛️
              </div>
              <h3 className="font-black text-base text-primary">
                3. ประวัติศาสตร์อารยธรรม
              </h3>
              <p className="text-xs text-base-content/75 leading-relaxed">
                หินธรรมชาติแต่ละชนิดมีตำนานเล่าขานกว่าพันปีจากอียิปต์ กรีซ และราชสำนักตะวันออก สะท้อนอำนาจบารมีและความรุ่งเรือง
              </p>
            </div>

            <div className="p-5 rounded-3xl zen-surface border border-base-300/60 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center font-black">
                🌿
              </div>
              <h3 className="font-black text-base text-primary">
                4. การดูแลและล้างพลังงาน
              </h3>
              <p className="text-xs text-base-content/75 leading-relaxed">
                แนะนำการทำความสะอาดด้วยน้ำไหล แสงจันทร์ หรือขันคลื่นเสียง (Singing Bowl) เพื่อรักษาความบริสุทธิ์ของพลังงาน
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RELATED CURATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-primary">
                  ชิ้นงานแร่ธาตุที่คุณอาจสนใจ
                </h2>
                <p className="text-xs sm:text-sm text-base-content/70 mt-0.5">
                  คัดสรรตามมิติพลังงานและหมวดหมู่ที่สอดคล้องกัน
                </p>
              </div>
              <Link
                to={ROUTES.EARTH_ENERGY}
                className="btn btn-ghost btn-sm font-bold text-primary gap-1"
              >
                <span>ดูทั้งหมด</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  to={`/earth-energy/product/${item.id}`}
                  className="card zen-surface border border-base-300/60 rounded-3xl overflow-hidden hover-card-elevate group flex flex-col justify-between"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-base-200">
                    <img
                      src={resolveAssetUrl(item.imageUrl)}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="badge badge-secondary text-[11px] font-bold shadow-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-black text-primary text-sm line-clamp-1 group-hover:text-secondary transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-base-content/70 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-extrabold text-secondary text-sm">
                        ฿{typeof item.price === 'number' ? item.price.toLocaleString() : item.price}
                      </span>
                      <span className="text-[11px] font-bold text-primary hover:underline">
                        ดูรายละเอียด →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. CONSULTATION MODAL */}
      {showConsultModal && (
        <div className="modal modal-open z-50">
          <div className="modal-box rounded-3xl zen-surface border border-base-300 max-w-lg p-6 sm:p-8">
            <h3 className="font-black text-xl text-primary">
              ปรึกษา Admin B เรื่อง {product.name}
            </h3>
            <p className="py-2 text-sm text-base-content/80">
              กรอกข้อมูลเพื่อให้ทีมงาน Living Wealth 365 ติดต่อกลับเพื่อวัดขนาดข้อมือ ส่งรูปผลึกมุมใกล้ และคำแนะนำการดูแล
            </p>

            <div className="mt-4">
              <LeadCaptureForm
                defaultInterest={`ปรึกษาแร่ธาตุ: ${product.name} (รหัส: ${product.id})`}
                onSuccess={() => setShowConsultModal(false)}
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                onClick={() => setShowConsultModal(false)}
                className="btn btn-ghost btn-sm rounded-xl"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop bg-black/40"
            onClick={() => setShowConsultModal(false)}
          />
        </div>
      )}
    </div>
  );
}
