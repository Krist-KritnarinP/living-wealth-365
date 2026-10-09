import { CORE_VALUES } from '../constants/content';

export default function CoreValues() {
  return (
    <section className="w-full">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {CORE_VALUES.map((val) => {
          const Icon = val.icon;
          return (
            <div
              key={val.label}
              className="card zen-surface p-4 sm:p-5 text-center flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-base-300/50 hover:scale-102 transition-transform duration-200"
            >
              <Icon className="w-6 h-6 text-secondary mb-0.5" />
              <span className="font-extrabold text-xs sm:text-sm lg:text-base tracking-wider text-primary">
                {val.label}
              </span>
              <span className="text-xs sm:text-sm zen-muted font-medium">
                {val.text}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
