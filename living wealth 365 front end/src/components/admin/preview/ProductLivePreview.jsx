import {
  Gem,
  ShoppingBag,
  MessageCircle,
  Atom,
  Sparkles,
  Calendar,
  Layers,
  ShieldCheck,
  Send,
} from 'lucide-react';
import FramedImage from '../../common/FramedImage';

/**
 * ProductLivePreview — Renders a product exactly as viewers see it on ProductDetailPage.
 */
export default function ProductLivePreview({ product = {} }) {
  const name = product.name || 'ชื่อชิ้นงานแร่ธาตุ / คริสตัล';
  const category = product.category || 'อำนาจ & ความมั่งคั่ง';
  const price = product.price || '1,990';
  const description = product.description || 'คำอธิบายคุณสมบัติและพลังงานของผลึกแร่ธรรมชาติ...';
  const mineralFormula = product.mineralFormula || 'SiO₂';
  const chakra = product.chakra || 'จักระที่ 3 มณีปุระ';
  const dayOfWeek = product.dayOfWeek || 'วันพฤหัสบดี';
  const stoneType = product.stoneType || 'ผลึกธรรมชาติแท้';
  const imageUrl = product.imageUrl || '';

  return (
    <div className="w-full space-y-8 bg-base-100 p-4 sm:p-8 rounded-3xl border border-base-300">
      {/* Mode Callout */}
      <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-black text-primary">
          <Sparkles className="w-4 h-4 text-secondary shrink-0" />
          <span>มุมมองเสมือนจริงของสินค้า (Public Audience View)</span>
        </div>
        <span className="badge badge-primary badge-outline text-[11px] font-bold">
          {category}
        </span>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb Mock */}
        <div className="text-xs text-base-content/60 flex items-center gap-2">
          <span>หน้าหลัก</span>
          <span>/</span>
          <span>Earth & Energy Curation (แร่ธาตุ & พลังธรรมชาติ)</span>
          <span>/</span>
          <span className="text-primary font-bold truncate max-w-xs">{name}</span>
        </div>

        {/* Product Showcase Card */}
        <div className="zen-surface rounded-[2rem] border border-base-300/60 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Image Column */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-base-200 border border-base-300/50 shadow-md">
                {imageUrl ? (
                  <FramedImage
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                    fallback="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-base-content/50">
                    ไม่มีรูปภาพสินค้า
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="badge badge-secondary text-[11px] font-bold shadow-xs">
                    💎 คัดสรรพิเศษ
                  </span>
                  <span className="badge badge-primary text-[11px] font-bold shadow-xs">
                    {category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-bold">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ของแท้ 100%</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md">
                    คัดสรรโดย Admin B
                  </span>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-black shadow-xs">
                <Gem className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>PILLAR 5: EARTH & ENERGY CURATION</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-primary leading-tight break-words [overflow-wrap:anywhere]">
                {name}
              </h1>

              <div className="p-3.5 rounded-2xl bg-base-200/60 border border-base-300/60 flex items-baseline justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold text-base-content/65 block">
                    ราคาบูชาและครอบครอง:
                  </span>
                  <span className="text-2xl font-black text-secondary">
                    ฿{typeof price === 'number' ? price.toLocaleString() : price}
                  </span>
                </div>
                <span className="text-xs font-bold text-success bg-success/10 px-2.5 py-0.5 rounded-full">
                  มีใบรับรองแหล่งกำเนิด
                </span>
              </div>

              <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed break-words [overflow-wrap:anywhere]">
                {description}
              </p>

              {/* 4 Spec Tiles */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {mineralFormula && (
                  <div className="p-2.5 rounded-xl bg-base-200/40 border border-base-300/40 space-y-0.5">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-primary">
                      <Atom className="w-3.5 h-3.5 text-info" />
                      <span>สูตรโครงสร้าง</span>
                    </div>
                    <p className="text-[11px] font-mono font-semibold text-base-content/80 truncate">
                      {mineralFormula}
                    </p>
                  </div>
                )}
                {chakra && (
                  <div className="p-2.5 rounded-xl bg-base-200/40 border border-base-300/40 space-y-0.5">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-secondary">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>พลังจักระ</span>
                    </div>
                    <p className="text-[11px] font-semibold text-base-content/80 truncate">
                      {chakra}
                    </p>
                  </div>
                )}
                {dayOfWeek && (
                  <div className="p-2.5 rounded-xl bg-base-200/40 border border-base-300/40 space-y-0.5">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-primary">
                      <Calendar className="w-3.5 h-3.5 text-secondary" />
                      <span>วันประจำตัว</span>
                    </div>
                    <p className="text-[11px] font-semibold text-base-content/80 truncate">
                      {dayOfWeek}
                    </p>
                  </div>
                )}
                {stoneType && (
                  <div className="p-2.5 rounded-xl bg-base-200/40 border border-base-300/40 space-y-0.5">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-primary">
                      <Layers className="w-3.5 h-3.5 text-emerald-600" />
                      <span>ลักษณะผลึก</span>
                    </div>
                    <p className="text-[11px] font-semibold text-base-content/80 truncate">
                      {stoneType}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons Mock */}
              <div className="pt-3 border-t border-base-300/60 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="btn btn-primary btn-sm rounded-xl font-bold gap-1.5 pointer-events-none opacity-90">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>เพิ่มลงในตะกร้า</span>
                  </div>
                  <div className="btn btn-secondary btn-outline btn-sm rounded-xl font-bold gap-1.5 pointer-events-none opacity-90">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>สั่งซื้อผ่าน LINE</span>
                  </div>
                </div>
                <div className="text-center text-[11px] text-base-content/65 flex items-center justify-center gap-1 font-semibold">
                  <Send className="w-3 h-3 text-secondary" />
                  <span>มีปุ่มปรึกษา Admin B ส่งแบบฟอร์มวัดขนาดข้อมือ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Dimensions of Curation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl zen-surface border border-base-300 space-y-1">
            <div className="text-base">🔬</div>
            <h4 className="font-bold text-xs text-primary">วิทยาศาสตร์แร่</h4>
            <p className="text-[11px] text-base-content/70">โครงสร้างผลึกธรรมชาติ</p>
          </div>
          <div className="p-3.5 rounded-2xl zen-surface border border-base-300 space-y-1">
            <div className="text-base">✨</div>
            <h4 className="font-bold text-xs text-primary">จักระ & สมาธิ</h4>
            <p className="text-[11px] text-base-content/70">เจริญสติ Mindful Anchor</p>
          </div>
          <div className="p-3.5 rounded-2xl zen-surface border border-base-300 space-y-1">
            <div className="text-base">🏛️</div>
            <h4 className="font-bold text-xs text-primary">อารยธรรมโบราณ</h4>
            <p className="text-[11px] text-base-content/70">ตำนานจากแหล่งกำเนิด</p>
          </div>
          <div className="p-3.5 rounded-2xl zen-surface border border-base-300 space-y-1">
            <div className="text-base">🌿</div>
            <h4 className="font-bold text-xs text-primary">การล้างพลังงาน</h4>
            <p className="text-[11px] text-base-content/70">น้ำไหล แสงจันทร์ ขันคลื่นเสียง</p>
          </div>
        </div>
      </div>
    </div>
  );
}
