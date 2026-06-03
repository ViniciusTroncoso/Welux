export default function CtaSection() {
  return (
    <section
      className="bg-black text-white pt-20 pb-20 relative overflow-hidden max-w-7xl md:max-w-9xl mx-auto"
      id="contact"
    >
      <div className="absolute left-0 bottom-0 w-full h-full bg-gradient-to-tr from-[#05d664]/20 to-transparent" />
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6">
        <div className="text-center mb-12 max-w-3xl">
          <h3 className="text-[32px] sm:text-4xl lg:text-5xl font-medium leading-tight mb-4">
            Pronto para Construir seu MVP?
          </h3>
          <p className="text-[18px] sm:text-xl text-white/70 font-normal leading-relaxed">
            Agende uma sessão de estratégia gratuita. Transforme seu conceito em
            um MVP pronto para o mercado em 2-3 semanas. Faça parceria conosco
            para acelerar o lançamento do seu produto e escalar sua startup
            globalmente.
          </p>
          <div className="mt-8 flex justify-center">
            <button className="inline-flex items-center justify-center gap-2 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-300 uppercase font-medium text-sm px-6 py-2.5 rounded-lg">
              Agende uma Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
