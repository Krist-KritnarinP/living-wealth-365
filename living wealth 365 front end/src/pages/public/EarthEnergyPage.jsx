import { useState } from 'react';
import {
  Sparkles,
  Filter,
  Gem,
  Atom,
  Compass,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../components/mutelu/ProductCard';
import StoneCalculator from '../../components/mutelu/StoneCalculator';
import LeadCaptureForm from '../../components/forms/LeadCaptureForm';

export default function EarthEnergyPage() {
  const { products } = useAuth();
  const [selectedAspect, setSelectedAspect] = useState('ALL');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const aspectFilters = [
    { id: 'ALL', label: 'ทั้งหมด' },
    { id: 'SCIENCE', label: '🔬 วิทยาศาสตร์แร่ธาตุ' },
    { id: 'CHAKRA_ENERGY', label: '✨ จักระ & สมาธิ' },
    { id: 'HISTORY', label: '🏛️ ประวัติศาสตร์ 6,000 ปี' },
    { id: 'CULTURE', label: '📜 วัฒนธรรมและความเชื่อ' },
  ];

  const filteredProducts = products.filter((p) => {
    if (!p.isActive) return false;
    if (selectedAspect === 'ALL') return true;
    return p.aspect === selectedAspect;
  });

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    const formEl = document.getElementById('consult-form');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCalculatedStone = (stoneName) => {
    setSelectedProduct({ name: `หินมงคลตามวันเกิด: ${stoneName}` });
    const formEl = document.getElementById('consult-form');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full space-y-16 lg:space-y-24 py-8">
      {/* 1. HERO SECTION */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface border border-base-300/60 p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-xs">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs sm:text-sm font-bold tracking-wide">
              <Gem className="w-4 h-4" />
              <span>PILLAR 5: EARTH & ENERGY CURATION • แร่ธาตุ & พลังธรรมชาติ</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-[1.15] tracking-tight">
              เมื่อวิทยาศาสตร์แร่ธาตุ <br />
              <span className="text-secondary">บรรจบกับพลังงานแห่งการตระหนักรู้</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-base-content/80 leading-relaxed">
              เราไม่นำเสนอความงมงาย แต่คัดสรรชิ้นงานแร่ธรรมชาติและคริสตัลที่งดงามผ่าน 4 มิติที่จับต้องได้:
              <strong> วิทยาศาสตร์ฟิสิกส์แร่ธาตุ (SiO₂ Piezoelectricity)</strong>,
              <strong> ประวัติศาสตร์อารยธรรมโบราณ</strong>,
              <strong> พลังจักระและการเจริญสติ</strong>,
              และ <strong>สุนทรียศาสตร์ของธรรมชาติ</strong> คัดสรรโดย Joy & Top
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#calculator"
                className="btn btn-primary btn-md rounded-2xl font-bold px-6 shadow-xs gap-2"
              >
                <span>ค้นหาแร่ธาตุคู่บารมี (3D Visualizer)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#catalog"
                className="btn btn-secondary btn-outline btn-md rounded-2xl font-bold px-6 gap-2"
              >
                <span>สำรวจคลังแร่คัดสรร ({products.length} ชิ้น)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STONE CALCULATOR & 3D VISUALIZER */}
      <section id="calculator" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24">
        <StoneCalculator onSelectStone={handleSelectCalculatedStone} />
      </section>

      {/* 3. CURATED MINERALS CATALOG WITH ASPECT FILTERS */}
      <section id="catalog" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-base-300 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              คลังแร่ธาตุและคริสตัลคัดสรรพิเศษ ({filteredProducts.length})
            </h2>
            <p className="text-sm zen-muted mt-0.5">
              กดรูปหัวใจ ❤️ เพื่อบันทึกเข้า Wishlist หรือเลือกดูตามมิติที่สนใจ
            </p>
          </div>

          {/* Aspect Filters */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-base-200/80 border border-base-300/40">
            {aspectFilters.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedAspect(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedAspect === tab.id
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-base-content/75 hover:bg-base-100 hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelectForLead={handleSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* 4. CONSULTATION & ORDER MODAL */}
      {selectedProduct && (
        <div className="modal modal-open z-50">
          <div className="modal-box rounded-3xl zen-surface border border-base-300 max-w-lg p-6 sm:p-8">
            <h3 className="font-black text-xl text-primary">
              สนใจชิ้นงาน {selectedProduct.name}
            </h3>
            <p className="py-2 text-sm text-base-content/80">
              กรอกข้อมูลเพื่อให้คุณจอยหรือทีมงาน Living Wealth ติดต่อกลับเพื่อส่งมอบข้อมูลผลึก ขนาดข้อมือ และคำแนะนำการใช้งาน
            </p>

            <div className="mt-4">
              <LeadCaptureForm
                defaultInterest={`แร่ธาตุคัดสรร: ${selectedProduct.name}`}
                onSuccess={() => setSelectedProduct(null)}
              />
            </div>

            <div className="modal-action">
              <button
                onClick={() => setSelectedProduct(null)}
                className="btn btn-ghost btn-sm rounded-xl"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/40" onClick={() => setSelectedProduct(null)}></div>
        </div>
      )}
    </div>
  );
}
