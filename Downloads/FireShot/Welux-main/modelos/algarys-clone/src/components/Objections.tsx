import { objections } from "@/lib/content";

const CORNER = "absolute z-10 size-[14px] bg-background border border-[#807f7f]";
const TAG =
  "bg-[rgba(255,255,255,0.1)] border-[0.637px] border-[#ffffff] inline-flex items-center justify-center px-[14px] py-[7.645px] rounded-[3.823px] w-fit";
const TAG_TXT = "font-semibold text-[9.556px] tracking-[2px] uppercase text-[#ffffff] leading-1.1";

export default function Objections() {
  return (
    <section id="objecoes" className="relative section-px scroll-mt-25 pb-12 md:pb-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-20px] left-0 right-0 h-[120px] z-20"
        style={{ background: "linear-gradient(to top, rgba(5,5,5,0) 0%, rgb(5,5,5) 60.274%)" }}
      />
      <div className="section-container relative">
        {/* Desktop */}
        <div className="hidden md:flex md:flex-col">
          <div className="animate-fade-up relative flex h-[384px] flex-col items-center justify-center gap-[25px] border border-[#454545] px-[80px] pt-[149px] pb-[70px]">
            <span aria-hidden className={`${CORNER} -top-[7px] -left-[7px]`} />
            <span aria-hidden className={`${CORNER} -top-[7px] -right-[7px]`} />
            <p className="font-medium leading-1.1 text-[#b3b3b3] text-center text-[40px] w-[832px]">
              Os <span className="text-white">principais bloqueios</span> que impedem empresas de implementar IA com segurança.
            </p>
            <p className="font-light leading-1.4 text-[#b3b3b3] text-center text-[20px] w-[520px]">
              Não se trata de convencer. Se trata de mostrar, com clareza, onde está o risco e onde está o retorno.
            </p>
          </div>

          <div className="relative -mt-px flex h-[312px]">
            {[objections[0], objections[1]].map((o, i) => (
              <article
                key={o.tag}
                className={`animate-fade-up flex flex-1 flex-col items-start gap-[25px] border border-[#454545] px-[80px] py-[35px] ${i === 1 ? "-ml-px" : ""}`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className={TAG}>
                  <span className={TAG_TXT}>{o.tag}</span>
                </span>
                <div className="flex flex-col gap-[12px]">
                  <h3 className="font-bold text-[20px] leading-1.1 text-white w-[476px]">{o.title}</h3>
                  <p className="font-light text-[18px] leading-1.4 text-[#b3b3b3] w-[476px]">{o.body}</p>
                </div>
              </article>
            ))}
            <span aria-hidden className={`${CORNER} -top-[7px] -left-[7px]`} />
            <span aria-hidden className={`${CORNER} -top-[7px] -right-[7px]`} />
            <span aria-hidden className={`${CORNER} -top-[7px] left-1/2 -translate-x-1/2`} />
            <span aria-hidden className={`${CORNER} -bottom-[7px] -left-[7px]`} />
            <span aria-hidden className={`${CORNER} -bottom-[7px] -right-[7px]`} />
            <span aria-hidden className={`${CORNER} -bottom-[7px] left-1/2 -translate-x-1/2`} />
          </div>

          <article
            className="animate-fade-up relative -mt-px flex h-[241px] flex-col items-start gap-[25px] border border-[#454545] px-[80px] py-[35px]"
            style={{ animationDelay: "160ms" }}
          >
            <span aria-hidden className={`${CORNER} -bottom-[7px] -left-[7px]`} />
            <span aria-hidden className={`${CORNER} -bottom-[7px] -right-[7px]`} />
            <span className={TAG}>
              <span className={TAG_TXT}>{objections[2].tag}</span>
            </span>
            <div className="flex flex-col gap-[12px]">
              <h3 className="font-semibold text-[20px] leading-1.1 text-white">{objections[2].title}</h3>
              <p className="font-light text-[18px] leading-1.4 text-[#b3b3b3] w-[730px] whitespace-pre-wrap">{objections[2].body}</p>
            </div>
          </article>
        </div>

        {/* Mobile */}
        <div className="flex flex-col md:hidden">
          <div className="animate-fade-up relative flex h-[250px] flex-col items-center justify-center gap-[25px] border border-[#454545] px-[20px] py-[30px]">
            <span aria-hidden className={`${CORNER} -top-[7px] -left-[7px]`} />
            <span aria-hidden className={`${CORNER} -top-[7px] -right-[7px]`} />
            <p className="font-medium leading-1.1 text-[#b3b3b3] text-center text-[25px] w-full mt-[40px] z-30">
              Os <span className="text-white">principais bloqueios</span> que impedem empresas de implementar IA com segurança.
            </p>
            <p className="font-light leading-1.4 text-[#b3b3b3] text-center text-[12px] w-full">
              Não se trata de convencer. Se trata de mostrar, com clareza, onde está o risco e onde está o retorno.
            </p>
          </div>
          {objections.map((o, i) => (
            <article
              key={o.tag}
              className="animate-fade-up relative -mt-px flex flex-col items-start gap-[25px] border border-[#454545] p-[25px]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span aria-hidden className={`${CORNER} -top-[7px] -left-[7px]`} />
              <span aria-hidden className={`${CORNER} -top-[7px] -right-[7px]`} />
              <span aria-hidden className={`${CORNER} -bottom-[7px] -left-[7px]`} />
              <span aria-hidden className={`${CORNER} -bottom-[7px] -right-[7px]`} />
              <span className={TAG}>
                <span className={TAG_TXT}>{o.tag}</span>
              </span>
              <div className="flex w-full flex-col gap-[12px]">
                <h3 className={`text-[20px] leading-1.1 text-white w-full ${i === 0 ? "font-bold" : "font-semibold"}`}>{o.title}</h3>
                <p className="font-light text-[12px] leading-1.4 text-[#b3b3b3] w-full whitespace-pre-wrap">{o.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
