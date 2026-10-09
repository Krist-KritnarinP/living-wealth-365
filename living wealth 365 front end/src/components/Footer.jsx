export default function Footer() {
  return (
    <footer className="w-full mt-10 border-t border-base-300/60 py-6 px-4 sm:px-8 lg:px-12 xl:px-16 bg-base-100">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span className="font-bold text-primary text-base sm:text-lg">
            Living Wealth <span className="text-secondary">365</span>
          </span>
          <span className="text-xs zen-muted hidden sm:inline">•</span>
          <span className="text-xs sm:text-sm zen-muted font-medium">
            Financial & Insurance Advisor (มั่นคง • มั่งคั่ง • ยั่งยืน)
          </span>
        </div>
        <div className="text-xs zen-muted">
          © {new Date().getFullYear()} Living Wealth 365. แสดงผลเต็มหน้าจอ 100% ทุกอุปกรณ์.
        </div>
      </div>
    </footer>
  );
}
