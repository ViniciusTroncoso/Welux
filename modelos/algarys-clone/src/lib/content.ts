// Real content extracted from welux.com.br

export const partnerLogos: { src: string; alt: string }[] = [
  { src: "/pages/home/logos/vida.svg", alt: "Logo 1" },
  { src: "/pages/home/logos/ilza.svg", alt: "Logo 2" },
  { src: "/pages/home/logos/san.svg", alt: "Logo 3" },
  { src: "/pages/home/logos/clinica.svg", alt: "Logo 4" },
  { src: "/pages/home/logos/3 [Vectorized].svg", alt: "Logo 5" },
  { src: "/pages/home/logos/3.svg", alt: "Logo 6" },
  { src: "/pages/home/logos/Group 1000001113.svg", alt: "Logo 7" },
  { src: "/pages/home/logos/Logotipo_da_JBS_(2023) 1 [Vectorized].svg", alt: "Logo 8" },
  { src: "/pages/home/logos/Group 1000001128.webp", alt: "Logo 9" },
  { src: "/pages/home/logos/Mask group.webp", alt: "Logo 10" },
  { src: "/pages/home/logos/Group 1000001129.webp", alt: "Logo 11" },
  { src: "/pages/home/logos/Group 1000001130.webp", alt: "Logo 12" },
  { src: "/pages/home/logos/ALC.svg", alt: "Logo 13" },
  { src: "/pages/home/logos/beegames.svg", alt: "Logo 14" },
  { src: "/pages/home/logos/bew.svg", alt: "Logo 15" },
  { src: "/pages/home/logos/blox.svg", alt: "Logo 16" },
  { src: "/pages/home/logos/bonapp.svg", alt: "Logo 17" },
  { src: "/pages/home/logos/brasil.svg", alt: "Logo 18" },
  { src: "/pages/home/logos/clip.svg", alt: "Logo 19" },
  { src: "/pages/home/logos/dou.svg", alt: "Logo 20" },
  { src: "/pages/home/logos/focus.svg", alt: "Logo 21" },
  { src: "/pages/home/logos/GOMD.svg", alt: "Logo 22" },
  { src: "/pages/home/logos/grow.svg", alt: "Logo 23" },
  { src: "/pages/home/logos/influ.svg", alt: "Logo 24" },
  { src: "/pages/home/logos/jexs.svg", alt: "Logo 25" },
  { src: "/pages/home/logos/maximeta.svg", alt: "Logo 26" },
  { src: "/pages/home/logos/milano.svg", alt: "Logo 27" },
  { src: "/pages/home/logos/oq.svg", alt: "Logo 28" },
  { src: "/pages/home/logos/resaltar.svg", alt: "Logo 29" },
  { src: "/pages/home/logos/seilf.svg", alt: "Logo 30" },
  { src: "/pages/home/logos/slove.svg", alt: "Logo 31" },
  { src: "/pages/home/logos/thar.svg", alt: "Logo 32" },
  { src: "/pages/home/logos/veex.svg", alt: "Logo 33" },
  { src: "/pages/home/logos/zou.svg", alt: "Logo 34" },
];

export const stats: { value: string; label: string }[] = [
  { value: "+50", label: "Empresas transformadas" },
  { value: "52", label: "Projetos" },
  { value: "10%", label: "mais conversão" },
  { value: "+600h", label: "economizadas" },
  { value: "100", label: "funcionários realocados" },
];

export interface MethodStep {
  number: string;
  title: string;
  label: string;
  description: string;
  image: string;
}

export const methodSteps: MethodStep[] = [
  {
    number: "1",
    title: "1. Diagnóstico",
    label: "Diagnóstico",
    description:
      "Em 30 dias, mapeamos sua operação, identificamos onde IA gera resultado e calculamos o retorno de cada oportunidade. Você sai com clareza total, antes de investir em desenvolvimento.",
    image: "/pages/home/metodologia/diagnostico.webp",
  },
  {
    number: "2",
    title: "2. Priorização",
    label: "Priorização",
    description:
      "Definimos juntos quais oportunidades trazem retorno mais rápido e maior impacto na sua operação.",
    image: "/pages/home/metodologia/priorizacao.webp",
  },
  {
    number: "3",
    title: "3. Construção",
    label: "Construção",
    description:
      "Engenharia real, integrada à sua operação e com qualidade acompanhada do início ao fim.",
    image: "/pages/home/metodologia/construcao.webp",
  },
  {
    number: "4",
    title: "4. Medição",
    label: "Medição",
    description:
      "Acompanhamos o retorno em produção, ajustando o que for preciso até a IA gerar o resultado prometido.",
    image: "/pages/home/metodologia/medicao.webp",
  },
];

export const objections: { tag: string; title: string; body: string }[] = [
  {
    tag: "Objeção 1",
    title: "“Já tentei IA antes e não funcionou.”",
    body: "A culpa não foi da IA. Foi da falta de método antes de construir. Solução genérica, sem análise do negócio, sem engenheiro real por trás é isso que o mercado entrega. A Welux faz diferente: diagnóstico antes, engenharia por trás, resultado medido depois.",
  },
  {
    tag: "Objeção 2",
    title: "“Não tenho tempo pra implementar IA agora.”",
    body: "A culpa não foi da IA. Foi da falta de método antes de construir. Solução genérica, sem análise do negócio, sem engenheiro real por trás é isso que o mercado entrega. A Welux faz diferente: diagnóstico antes, engenharia por trás, resultado medido depois.",
  },
  {
    tag: "Objeção 3",
    title: "“Não sei se o retorno justifica o investimento.”",
    body: "Nenhum projeto da Welux começa sem retorno calculado. Você sabe o que vai gerar antes de investir não depois. Se o número não fechar, a gente te diz antes. Não depois.",
  },
];

export const differentials: { icon: string; alt: string; title: string; body: string }[] = [
  {
    icon: "/pages/home/diferenciais/search.svg",
    alt: "Ícone de lupa",
    title: "Método próprio de diagnóstico",
    body: "Na Welux, antes de desenvolver, diagnosticamos onde IA gera retorno e provamos com seus dados.",
  },
  {
    icon: "/pages/home/diferenciais/atom.svg",
    alt: "Ícone de átomo",
    title: "Foco exclusivo\nem IA",
    body: "Enquanto o mercado adiciona IA, a Welux nasceu para gerar resultado real no cliente.",
  },
  {
    icon: "/pages/home/diferenciais/hard-hat.svg",
    alt: "Ícone de capacete",
    title: "Engenheiros especializados",
    body: "Welux entrega engenharia, profundidade técnica, responsabilidade e resultado em produção.",
  },
  {
    icon: "/pages/home/diferenciais/chart-bars.svg",
    alt: "Ícone de gráfico de barras",
    title: "Resultado calculado antes de começar",
    body: "Antes de investir, você sabe o impacto exato da solução ou avisamos antes.",
  },
  {
    icon: "/pages/home/diferenciais/settings.svg",
    alt: "Ícone de engrenagem",
    title: "Acompanhamento pós-entrega",
    body: "A Welux monitora a IA em produção e garante resultado real na operação.",
  },
];

export const WHATSAPP_URL =
  "https://wa.me/5561986666370?text=Ol%C3%A1%2C%20quero%20entender%20onde%20a%20IA%20pode%20gerar%20retorno%20na%20minha%20opera%C3%A7%C3%A3o%20em%2030%20dias.";
