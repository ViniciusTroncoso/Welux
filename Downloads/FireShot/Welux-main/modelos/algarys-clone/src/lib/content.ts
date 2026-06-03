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
  { value: "+50",   label: "Operações Otimizadas" },
  { value: "52",    label: "Sistemas em Produção" },
  { value: "10%",   label: "Aumento Médio em Conversão" },
  { value: "+600h", label: "Liberadas por Mês" },
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
    title: "1. Descoberta",
    label: "Descoberta",
    description:
      "Investigamos seus processos para encontrar onde o esforço humano está sendo desperdiçado em trabalho de máquina. Cruzamos seus gargalos com o que há de mais avançado em IA.",
    image: "/pages/home/metodologia/diagnostico.webp",
  },
  {
    number: "2",
    title: "2. Projeção de ROI",
    label: "Projeção de ROI",
    description:
      "Calculamos o retorno sobre o investimento com os seus dados reais. Se a conta da automação não gerar lucro líquido ou economia drástica, nós mesmos vetamos o projeto.",
    image: "/pages/home/metodologia/priorizacao.webp",
  },
  {
    number: "3",
    title: "3. Engenharia de Software",
    label: "Engenharia de Software",
    description:
      "Construção técnica profunda. Código proprietário, APIs conectadas, segurança de dados blindada. Nada de ferramenta de automação no-code vestida de IA.",
    image: "/pages/home/metodologia/construcao.webp",
  },
  {
    number: "4",
    title: "4. Adoção em Produção",
    label: "Adoção em Produção",
    description:
      "IA não gera ROI se a equipe ignorá-la. Treinamos seu time e calibramos o sistema no campo até atingir a meta prometida. Monitoramos o uso em tempo real pós-deploy.",
    image: "/pages/home/metodologia/medicao.webp",
  },
];

export const objections: { tag: string; title: string; body: string }[] = [
  {
    tag: "Objeção 1",
    title: "\"Nós já tentamos IA antes e não funcionou.\"",
    body: "A culpa não foi da IA. Foi da falta de arquitetura. O mercado entrega prompts genéricos de ChatGPT e chama de automação. A Welux faz engenharia de software: conectamos modelos de linguagem aos seus bancos de dados internos para executar fluxos complexos e específicos do seu negócio.",
  },
  {
    tag: "Objeção 2",
    title: "\"Não temos tempo para parar a operação e implementar isso.\"",
    body: "Sua falta de tempo é o sintoma exato da doença que viemos curar. Você não tem tempo porque tem humanos fazendo trabalho robótico. Absorvemos 95% do atrito: mapeamos, desenhamos e construímos. Sua equipe só entra para validar e desfrutar do tempo liberado.",
  },
  {
    tag: "Objeção 3",
    title: "\"Não sei se o investimento se paga.\"",
    body: "Nenhum contrato da Welux é assinado no escuro. A Fase 1 (Diagnóstico) existe exatamente para isso. Você recebe uma planilha provando matematicamente o retorno sobre o investimento. Você sabe o lucro antes de gastar com o código.",
  },
];

export const differentials: { icon: string; alt: string; title: string; body: string }[] = [
  {
    icon: "/pages/home/diferenciais/search.svg",
    alt: "Ícone de lupa",
    title: "Diagnóstico Baseado em Dados",
    body: "Achismo destrói orçamentos. Antes de construir qualquer coisa, usamos a matemática dos seus dados para provar onde o ROI está.",
  },
  {
    icon: "/pages/home/diferenciais/atom.svg",
    alt: "Ícone de átomo",
    title: "Foco Exclusivo em IA",
    body: "Não fazemos sites. Não fazemos tráfego. Somos uma força-tarefa de engenharia de IA — sem distrações, sem serviços genéricos.",
  },
  {
    icon: "/pages/home/diferenciais/hard-hat.svg",
    alt: "Ícone de capacete",
    title: "Engenharia de Ponta",
    body: "Infraestrutura escalável, segura e conectada ao seu ecossistema. Código proprietário por engenheiros seniores, não automações frágeis.",
  },
  {
    icon: "/pages/home/diferenciais/chart-bars.svg",
    alt: "Ícone de gráfico de barras",
    title: "Risco Mitigado",
    body: "O ROI é a nossa métrica norte. Se o projeto não gerar lucro líquido ou economia drástica, nós mesmos vetamos antes de começar.",
  },
  {
    icon: "/pages/home/diferenciais/settings.svg",
    alt: "Ícone de engrenagem",
    title: "Adoção Garantida",
    body: "Monitoramos o uso em tempo real pós-deploy. A IA não fecha o contrato quando vai para produção — fecha quando a equipe usa e o número aparece.",
  },
];

export const WHATSAPP_URL =
  "https://wa.me/5561986666370?text=Ol%C3%A1%2C%20quero%20entender%20onde%20a%20IA%20pode%20gerar%20retorno%20na%20minha%20opera%C3%A7%C3%A3o%20em%2030%20dias.";
