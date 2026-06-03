import { Fragment } from "react";
import { stats } from "@/lib/content";

export default function Stats() {
  return (
    <section id="prova-social" className="section-px py-16 md:py-24">
      <div className="section-container flex justify-center">
        <ul className="flex flex-col w-full gap-5 md:flex-row md:flex-wrap md:items-center md:justify-between">
          {stats.map((s, i) => (
            <Fragment key={s.label}>
              <li className="w-full border-b border-[#343434] pb-[15px] md:w-auto md:border-0 md:pb-0">
                <div
                  className="animate-fade-up flex items-end justify-between gap-3 leading-[1.4] md:flex-col md:items-center md:justify-center md:text-center"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <p className="font-bold text-primary text-[60px] tracking-[-1.2px] whitespace-nowrap md:text-[51.536px] md:tracking-[-0.02em]">
                    {s.value}
                  </p>
                  <p className="capitalize font-normal text-muted text-[15px] tracking-[-0.3px] whitespace-nowrap md:text-base md:tracking-[-0.02em] md:normal-case">
                    {s.label}
                  </p>
                </div>
              </li>
              {i < stats.length - 1 && (
                <li aria-hidden="true" className="hidden md:block w-px h-[102px] bg-white/15" />
              )}
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
}
