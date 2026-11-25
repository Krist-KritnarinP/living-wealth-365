import { useState } from 'react';
import { Sparkles, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../components/mutelu/ProductCard';
import StoneCalculator from '../../components/mutelu/StoneCalculator';
import LeadCaptureForm from '../../components/forms/LeadCaptureForm';

export default function MuteluPage() {
  const { products } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [selectedInterest, setSelectedInterest] = useState('หินมงคล & ปรึกษาเสริมดวงชะตา');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    'ทั้งหมด',
    'ดึงดูดทรัพย์ & โชคลาภ',
    'อำนาจ & การเงิน',
    'เมตตามหานิยม',
    'ปัญญา & ความคิดสร้างสรรค์',
    'ความสงบ & สุขภาพใจ',
    'เจรจาค้าขาย & คุ้มครอง',
  ];

  const filteredProducts = products.filter((p) => {
    if (!p.isActive) return false;
    if (selectedCategory === 'ทั้งหมด') return true;
    return p.category === selectedCategory;
  });

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    setSelectedInterest(`สอบถามชิ้นงานแร่ธาตุ: ${prod.name} (฿${prod.price})`);
    const formEl = document.getElementById('consult-form');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCalculatedStone = (stoneName) => {
    setSelectedProduct({ name: `แร่ธาตุประจำวันเกิด: ${stoneName}` });
    setSelectedInterest(`สอบถามแร่ธาตุประจำวันเกิด: ${stoneName}`);
    const formEl = document.getElementById('consult-form');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full space-y-16 lg:space-y-24 py-8">
      {/* Header Banner */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full rounded-3xl zen-surface p-8 sm:p-12 lg:p-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs sm:text-sm font-black shadow-xs">
            <Sparkles className="w-4 h-4 text-secondary shrink-0" />
            <span>MU-TAE-LU & AUSPICIOUS PROSPERITY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary leading-tight">
            แคตตาล็อกหินมงคล & เสริมพลังดวงชะตา 365 วัน
          </h1>
          <p className="text-base sm:text-lg text-base-content/80 max-w-2xl mx-auto leading-relaxed">
            คัดสรรหินธรรมชาติแท้บริสุทธิ์ ผสานพลังงานแห่งธรรมชาติและดวงดาว
            เพื่อช่วยดึงดูดกระแสทรัพย์ เสริมบารมีการค้า และสร้างความสงบสุขในใจ
          </p>
        </div>
      </section>

      {/* Stone Calculator Section */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <StoneCalculator onSelectStone={handleSelectCalculatedStone} />
      </section>

      {/* Catalog & Filter Section */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-base-300 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-primary">
              รายการหินมงคลทั้งหมด ({filteredProducts.length})
            </h2>
            <p className="text-sm text-base-content/70">
              บันทึกรายการที่สนใจ หรือเลือกชิ้นงานเพื่อสอบถามรายละเอียดเพิ่มเติม
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-base-content/60 hidden sm:inline" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-xs sm:btn-sm rounded-xl font-bold transition-all ${
                  selectedCategory === cat
                    ? 'btn-primary text-white shadow-xs'
                    : 'btn-ghost text-base-content/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelectForLead={handleSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* Lead Form */}
      <section id="consult-form" className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 scroll-mt-24">
        <LeadCaptureForm
          selection={selectedProduct}
          defaultInterest={selectedInterest}
          title="สอบถามรายละเอียดหรือสั่งซื้อชิ้นงานแร่ธรรมชาติ"
          subtitle="แจ้งขนาดข้อมือ หรือขอคำแนะนำการเลือกแร่ธรรมชาติเฉพาะบุคคลจากที่ปรึกษา"
        />
      </section>
    </div>
  );
}
