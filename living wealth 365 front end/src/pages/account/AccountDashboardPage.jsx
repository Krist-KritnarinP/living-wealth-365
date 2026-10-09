import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Calendar, Heart, FileText, Sparkles, Edit3, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { ROUTES } from '../../constants/routes';
import DashboardLayout from '../../components/common/DashboardLayout';

export default function AccountDashboardPage() {
  const { currentUser, wishlist, leads } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser?.name || 'คุณสมชาย ใจดี',
    phone: currentUser?.phone || '081-234-5678',
    birthDate: currentUser?.birthDate || '1990-08-15',
  });

  const myLeads = leads.filter(
    (l) => l.userId === currentUser?.id || l.phone === currentUser?.phone
  );

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
    showToast(t('saveSuccess'), 'success');
  };

  return (
    <DashboardLayout type="customer">
      <div className="space-y-8 max-w-6xl">
        {/* Header Title */}
        <div className="border-b border-base-300/60 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            {t('customerRole')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-primary">
            {profile.name}
          </h1>
          <p className="text-sm text-base-content/70">
            {t('profileOverview')} • Living Wealth 365 Personal Space
          </p>
        </div>

        {/* Stats Summary Cards using daisyUI stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="zen-surface rounded-3xl p-6 border border-base-300/60 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-base-content/60">{t('status')}</div>
              <div className="text-lg font-black text-primary">AIA VIP Customer</div>
            </div>
          </div>

          <Link
            to={ROUTES.ACCOUNT_HISTORY}
            className="zen-surface rounded-3xl p-6 border border-base-300/60 shadow-xs flex items-center gap-4 hover:border-primary/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-base-content/60">{t('consultationHistory')}</div>
              <div className="text-2xl font-black text-primary">{myLeads.length} รายการ</div>
            </div>
          </Link>

          <Link
            to={ROUTES.ACCOUNT_WISHLIST}
            className="zen-surface rounded-3xl p-6 border border-base-300/60 shadow-xs flex items-center gap-4 hover:border-error/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-error/15 text-error flex items-center justify-center group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 fill-error" />
            </div>
            <div>
              <div className="text-xs font-semibold text-base-content/60">{t('savedWishlist')}</div>
              <div className="text-2xl font-black text-primary">{wishlist.length} ชิ้น</div>
            </div>
          </Link>
        </div>

        {/* Profile Details Card */}
        <div className="zen-surface rounded-3xl p-6 sm:p-8 border border-base-300/60 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-base-300/50 pb-4">
            <h2 className="text-xl font-black text-primary flex items-center gap-2">
              <User className="w-5 h-5 text-secondary" />
              <span>{t('profileOverview')}</span>
            </h2>
            <button
              onClick={() => setEditing(!editing)}
              className="btn btn-sm btn-outline rounded-xl font-bold gap-1.5"
            >
              {editing ? <Check className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              <span>{editing ? t('cancel') : t('edit')}</span>
            </button>
          </div>

          {editing ? (
            <form onSubmit={handleSave} className="space-y-4 max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text text-xs font-bold">ชื่อ-นามสกุล</span>
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="input input-bordered w-full rounded-xl bg-base-100"
                  />
                </div>

                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text text-xs font-bold">เบอร์โทรศัพท์</span>
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="input input-bordered w-full rounded-xl bg-base-100"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-bold">วันเดือนปีเกิด (สำหรับคำนวณสายมู)</span>
                </label>
                <input
                  type="date"
                  value={profile.birthDate}
                  onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                  className="input input-bordered w-full rounded-xl bg-base-100"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-sm rounded-xl font-bold px-6">
                {t('save')}
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="space-y-1">
                <span className="text-xs text-base-content/60">ชื่อ-นามสกุล:</span>
                <p className="font-bold text-primary text-base">{profile.name}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-base-content/60">อีเมลสมาชิก:</span>
                <p className="font-bold text-primary text-base">{currentUser?.email}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-base-content/60">เบอร์โทรติดต่อ (Auto-fill ฟอร์ม):</span>
                <p className="font-bold text-primary text-base">{profile.phone}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-base-content/60">วันเกิด (ใช้คำนวณหินเสริมดวง):</span>
                <p className="font-bold text-secondary text-base flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{profile.birthDate}</span>
                </p>
              </div>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-secondary shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-primary">คำนวณหินมงคลประจำดวงชะตา</h4>
                <p className="text-xs text-base-content/70">
                  ระบบเชื่อมต่อวันเกิดของคุณเพื่อแนะนำหินนำโชคที่เหมาะสมโดยอัตโนมัติ
                </p>
              </div>
            </div>
            <Link
              to={ROUTES.MUTELU}
              className="btn btn-secondary btn-sm text-white rounded-xl font-bold shrink-0 self-start sm:self-auto"
            >
              ดูหินของฉัน
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
