<script setup>
import imgMonitorizacao from '@/assets/Imagens/monitorizacao.png';
import imgOperacoes from '@/assets/Imagens/operacoes.png';
import imgAnalitica from '@/assets/Imagens/analitica.png';
import imgPassaporte from '@/assets/Imagens/passaporte.png';
import seta from '@/assets/Imagens/arrow.png';
import dashboard from '@/assets/Imagens/dashboard.png';
import bgImagem from '@/assets/Imagens/hero.jpg';
import logoioIndustry from '@/assets/Imagens/logo_ioindustry.png';
import logoioTech from '@/assets/Imagens/Logo_IOTech.png';
import logoMr from '@/assets/Imagens/Logos_Clientes/mr.png';
import logoRifer from '@/assets/Imagens/Logos_Clientes/rifer.png';
import logoSucorema from '@/assets/Imagens/Logos_Clientes/sucorema.svg';
import logoTroficolor from '@/assets/Imagens/Logos_Clientes/troficolor_logo.svg';
import imgAtivo from '@/assets/Imagens/Print/ativo.png';
import imgEnergy from '@/assets/Imagens/Print/energy.png';
import imgDashboard from '@/assets/Imagens/Print/dashboard.png';
import imgHome from '@/assets/Imagens/Print/home.png';


import Questionario from '@/components/Questionario.vue';

import { useRouter } from 'vue-router';

import { ref, onMounted, onUnmounted } from 'vue';

// Navbar
// Estado do menu mobile
const showMobileMenu = ref(false)

// Alternar visibilidade do menu
function toggleMobileMenu() {
    showMobileMenu.value = !showMobileMenu.value
}

// Fechar menu quando o utilizador clica num link
function closeMobileMenu() {
    showMobileMenu.value = false
}


// Questionário
const categoriasQuestionario = ref([
    { id: 'eficienciaOperacional', nome: 'Eficiência Operacional' },
    { id: 'gestao', nome: 'Gestão Baseada em Dados' },
    { id: 'sustentabilidade', nome: 'Sustentabilidade' },
    { id: 'integracaoDigital', nome: 'Integração Digital' }
])

// Função para redirecionar para o questionário
// const abrirQuestionario = (categoriaId) => {
//     router.push({ name: 'Questionario', query: { categoria: categoriaId } })
// }

//Ver mais
const cardStates = ref({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false
});

function toggleCard(cardNumber) {
    cardStates.value[cardNumber] = !cardStates.value[cardNumber];
}


function onQuestionarioSubmitted(payload) {
    // fetch('/api/questionario', { method:'POST', body: JSON.stringify(payload) })
    console.log('Questionário enviado:', payload);
}

// Oferta
const cardsOferecemos = ref([
    { img: imgMonitorizacao, titulo: 'Monitorização', texto: 'Sensorize e monitorize o chão de fábrica em tempo real, integrando sensores IoT em máquinas e equipamentos para acompanhar parâmetros críticos — como consumo de água, eletricidade, gás e ar comprimido — assegurando eficiência, controlo operacional e monitorização precisa.', expandido: false },
    { img: imgAnalitica, titulo: 'Analítica', texto: 'Transforme dados em decisões estratégicas. Explore dashboards interativos com análises multidimensionais e utilize Inteligência Artificial para criar modelos preditivos personalizados, capazes de antecipar falhas, avarias, paragens e identificar oportunidades de otimização.', expandido: false },
    { img: imgPassaporte, titulo: 'Passaporte Digital do Produto', texto: 'Crie automaticamente o Passaporte Digital dos seus produtos, com base em dados recolhidos no chão de fábrica. Realize a rastreabilidade e o cálculo parcial do LCA (Avaliação do Ciclo de Vida) de forma simples e rápida, cumprindo as exigências ambientais em vigor na União Europeia.', expandido: false },
    { img: imgOperacoes, titulo: 'Operações', texto: 'Assuma o controlo total da produção com um módulo que gere todas as etapas de forma centralizada, associando cada máquina às ordens de fabrico/serviço em execução. A solução integra-se facilmente com ERP, MES e CRM, garantindo rastreabilidade, visibilidade em tempo real e controlo de custos e desempenho.', expandido: false },
])


// Diferencial
const diferenciais = ref([
    'Interoperável, integrador, escalável e personalizável',
    'Monitorização inteligente, alertas e relatórios em tempo real',
    'Análise inteligente de consumos',
    'Modelos preditivos de otimização e eficiência',
    'Sensores IoT globais e locais altamente escaláveis',
    'Multiplataforma'
])

// Carrossel
const carouselImages = ref([
    { src: imgAtivo, alt: 'Ativos' },
    { src: imgEnergy, alt: 'Dashboard Energy' },
    { src: imgDashboard, alt: 'Dashboard' },
    { src: imgHome, alt: 'Home' },
]);

// Carousel state
const currentSlide = ref(0);
const autoPlayInterval = ref(null);

// Carousel functions
function nextSlide() {
    currentSlide.value = (currentSlide.value + 1) % carouselImages.value.length;
}

function prevSlide() {
    currentSlide.value = currentSlide.value === 0 ? carouselImages.value.length - 1 : currentSlide.value - 1;
}

function goToSlide(index) {
    currentSlide.value = index;
}

// Auto-play functionality
function startAutoPlay() {
    if (autoPlayInterval.value) {
        clearInterval(autoPlayInterval.value);
    }
    autoPlayInterval.value = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
    if (autoPlayInterval.value) {
        clearInterval(autoPlayInterval.value);
        autoPlayInterval.value = null;
    }
}

// Start auto-play when component mounts
onMounted(() => {
    startAutoPlay();
});

onUnmounted(() => {
    stopAutoPlay();
});

//FAQ's

const faq = ref([{
    question: 'O que é que o ioIndustry monitoriza?', answer: 'O ioIndustry é um módulo de monitorização avançado que permite acompanhar o consumo energético em tempo real. Ele monitoriza uma variedade de parâmetros, incluindo o consumo de energia elétrica, água, gás e ar comprimido, padrões de uso, eficiência energética e até mesmo identifica potenciais desperdícios de energia.'
},
{ question: 'É possível integrar os meus sistemas, máquinas e sensores no ioIndustry?', answer: 'Sim, o ioIndustry foi projetado para ser altamente flexível e compatível com uma variedade de sistemas, máquinas e sensores. Através de protocolos de comunicação padrão, como MQTT e Modbus, é possível integrar facilmente os seus dispositivos existentes no sistema ioIndustry, permitindo uma visão abrangente e unificada do seu consumo energético.' },
{
    question: 'O que preciso fazer para instalar o ioIndustry?', answer: 'A instalação do ioIndustry não necessita de uma plataforma própria. A solução está disponível na cloud e será acedida como um serviço. Na reunião inicial comprometemos-nos, sem qualquer obrigação, de fazer uma análise da fábrica, dos processos e das necessidades. Após isso iremos identificar as necessidades de sensorização (caso existam) e customizar a plataforma (caso seja necessário algumas especificidades) e calcular as necessidades extra. Após conclusão do processo, a solução será disponibilizada de forma imediata.'
},
{
    question: 'É possível criar os meus próprios dashboards e reports?', answer: 'Sim, com o ioIndustry, os utilizadores têm a capacidade de personalizar completamente os seus dashboards e relatórios de acordo com as suas necessidades específicas. Através de uma variedade de configurações e ferramentas de visualização de dados, é possível criar dashboards personalizados para monitorizar e analisar os dados energéticos de forma eficaz.'
},
{
    question: 'Posso ligar as minhas máquinas do chão de fábrica, mesmo as mais antigas?', answer: 'Sim, o ioIndustry permite fazer uma ligação com as máquinas existentes permitindo a sua monitorização para efeitos de cálculo do ciclo de vida do produto, ou mesmo para controlo e atuação.'
},
{
    question: 'Posso obter outros dados para além da energia elétrica?', answer: 'Sim, o ioIndustry permite monitorizar diversos tipos de energia como a elétrica, água, ar comprimido ou gás. Além disso, e como a energia normalmente é afetada por questões ambiente ou da máquina, também é possível monitorizar a temperatura e humidade. Por fim, ainda é possível obter dados da máquina como número de ciclos e outras informações.'
},
{
    question: 'Com o ioIndustry é possível prever consumos e falhas ou erros?', answer: 'O ioIndustry é composto por um modelo de inteligência artificial que permite prever os consumos energéticos, de acordo com os processos e produtos, bem como ajudar na manutenção preventida e previsão de erros ou defeito. Após a análise dos dados e tratamento da qualidade, esses modelos irão aprender para ajudar na decisão.'
},
{
    question: 'O que é LCA?', answer: 'LCA, Life Cycle Assessment ou Análise do Ciclo de Vida, é uma metodologia utilizada para avaliar o impacto ambiental de um produto ou serviço ao longo de todo o seu ciclo de vida, desde a extração de matérias-primas até ao seu descarte. O ioIndustry integra a LCA para fornecer aos utilizadores uma compreensão abrangente do impacto ambiental associado ao consumo de energia.'
},
{
    question: 'Quanto custa a solução?', answer: 'A solução tem um custo adequado ao tamanho de cada organização e as suas necessidades. O facto de ser um software global e modular com capacidades de personalização faz com que os valores sejam competitivos e acessíveis, pois apenas pagam o que realmente precisam.'
},
{
    question: 'Qual o retorno de investimento?', answer: 'O retorno de investimento é algo que depende dos custos atuais, necessidades de aquisição e benefícios com a solução. Ainda não nos é possível identificar a percentagem, mas brevemente contamos ter um valor. Se considera que gasta muita energia, imagine o que é ter um sistema que além de alertar para consumos excessivos pode atuar de forma imediata. Consegue imaginar o impacto? então o retorno será rápido.'
},
{
    question: 'Como funciona o módulo da alarmística?', answer: 'O módulo de alarmística do ioIndustry permite aos utilizadores configurar alertas personalizados com base em critérios específicos, como consumo energético anormalmente alto, falhas de equipamento ou tendências preocupantes. Quando um alarme é acionado, os utilizadores são notificados imediatamente, permitindo uma resposta rápida e eficaz para evitar problemas mais graves.'
},
]);

const activeIndex = ref(null);

function toggleAccordion(index) {
    activeIndex.value = activeIndex.value === index ? null : index;
}

//Clientes
const clientes = ref([
    { name: "Rifer", logo: logoRifer, modulos: 'Monitorização, Analítica e Operações' },
    { name: "Marinho e Rocha", logo: logoMr, modulos: 'Monitorização e Analítica' },
    { name: "Troficolor", logo: logoTroficolor, modulos: 'Passaporte Digital do Produto' },
    { name: "Sucorema", logo: logoSucorema, modulos: 'Operações' },

]);

// Questionário
const router = useRouter()

const mostrarQuestionario = ref(false)
const categoriaSelecionada = ref(null)

const categorias = [
    'Eficiência Operacional',
    'Gestão Baseada em Dados',
    'Integração Digital',
    'Sustentabilidade'
]

const botaoClicado = ref(false)

function abrirQuestionario(categoria) {
    categoriaSelecionada.value = categoria
    mostrarQuestionario.value = true
    botaoClicado.value = true
}

// Links e-mail e redes sociais
const email = "ioIndustry@iotech.pt"
const socialMedia = [
    { name: "Instagram", link: "https://www.instagram.com/iotechpis/" },
    { name: "Facebook", link: "https://www.facebook.com/iotechpis/?locale=pt_PT" },
    { name: "Linkedin", link: "https://www.linkedin.com/company/iotechpis//" },

]

</script>

<template>

    <div class="font-sans background">

        <!-- Navbar -->

        <nav
            class="bg-[#F2F2F2] dark:bg-gray-900 fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div class=" mx-auto flex justify-between items-center px-4 py-3">

                <!-- Logo -->
                <div class="flex items-center">
                    <a href="#" class="flex items-center">
                        <img class="w-32 lg:w-44" :src="logoioIndustry" alt="Logo ioIndustry">
                    </a>
                </div>

                <!-- Links do Navbar - Desktop -->
                <div class="hidden lg:flex items-center space-x-8 px-11">
                    <a href="#ioIndustry" class="text-[#224335] hover:text-[#669b73] font-medium transition-colors">
                        O que é
                    </a>
                    <a href="#oferta" class="text-[#224335] hover:text-[#669b73] font-medium transition-colors">
                        Oferta
                    </a>
                    <a href="#razoes" class="text-[#224335] hover:text-[#669b73] font-medium transition-colors">
                        Por que o ioIndustry?
                    </a>
                    <a href="#diferencial" class="text-[#224335] hover:text-[#669b73] font-medium transition-colors">
                        Diferencial
                    </a>
                    <a href="#faq" class="text-[#224335] hover:text-[#669b73] font-medium transition-colors">
                        FAQ
                    </a>
                    <a href="#clientes" class="text-[#224335] hover:text-[#669b73] font-medium transition-colors">
                        Nossos clientes
                    </a>
                    <a href="#questionario" class="text-[#224335] hover:text-[#669b73] font-medium transition-colors">
                        Questionário
                    </a>
                    <a href="#contacto" class="text-[#224335] hover:text-[#669b73] font-medium transition-colors">
                        Contacto
                    </a>
                </div>

                <!-- Menu mobile/tablet -->
                <div class="lg:hidden">
                    <button @click="toggleMobileMenu" class="text-[#224335] hover:text-[#669b73] transition-color mt-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Menu mobile/tablet dropdown -->
            <transition name="slide-fade">
                <div v-show="showMobileMenu"
                    class="lg:hidden bg-[#F2F2F2] dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600">
                    <div class=" mx-auto px-8 py-5">
                        <div class="flex flex-col space-y-4 text-end">
                            <a href="#ioIndustry" @click="closeMobileMenu"
                                class="text-[#224335] hover:text-[#669b73] font-medium py-1 transition-colors">
                                O que é
                            </a>
                            <a href="#oferta" @click="closeMobileMenu"
                                class="text-[#224335] hover:text-[#669b73] font-medium py-1 transition-colors">
                                Oferta
                            </a>
                            <a href="#razoes" @click="closeMobileMenu"
                                class="text-[#224335] hover:text-[#669b73] font-medium py-1 transition-colors">
                                Por que o ioIndustry?
                            </a>
                            <a href="#diferencial" @click="closeMobileMenu"
                                class="text-[#224335] hover:text-[#669b73] font-medium py-1 transition-colors">
                                Diferencial
                            </a>
                            <a href="#faq" @click="closeMobileMenu"
                                class="text-[#224335] hover:text-[#669b73] font-medium py-1 transition-colors">
                                FAQ
                            </a>
                            <a href="#clientes" @click="closeMobileMenu"
                                class="text-[#224335] hover:text-[#669b73] font-medium py-1 transition-colors">
                                Nossos clientes
                            </a>
                            <a href="#questionario" @click="closeMobileMenu"
                                class="text-[#224335] hover:text-[#669b73] font-medium py-1 transition-colors">
                                Questionário
                            </a>
                            <a href="#contacto" @click="closeMobileMenu"
                                class="text-[#224335] hover:text-[#669b73] font-medium py-1 transition-colors">
                                Contacto
                            </a>
                        </div>
                    </div>
                </div>
            </transition>
        </nav>

        <!-- Hero -->

        <div class="hero min-h-screen bg-cover bg-center flex items-center justify-start "
            :style="{ backgroundImage: `url(${bgImagem})` }">
            <div class="hero-overlay bg-slate-700 bg-opacity-40 absolute inset-0"></div>

            <!-- Logo ioIndustry -->
            <!-- <div class="absolute top-1 left-2 w-96">
                <img :src="logoioIndustry" alt="Logo ioIndustry">
            </div> -->

            <!-- Texto -->
            <div class=" container mx-auto px-8 md:px-32 text-[#F2F2F2] z-10">
                <div class="max-w-2xl">
                    <br>
                    <h2 class="mb-9 leading-tight text-5xl font-bold">A sua indústria está preparada para a nova
                        revolução?</h2>
                    <p class="mb-5 text-lg">
                        Prepare-se para a nova era digital no setor industrial com uma solução de gestão que
                        monitoriza
                        e otimiza a eficiência da sua fábrica, garantindo maior controlo, sustentabilidade e
                        rentabilidade.
                    </p>
                </div>
            </div>
        </div>

        <br><br>

        <!-- ioIndustry -->

        <section id="ioIndustry" class=" scroll-mt-32 px-8 py-3">
            <div class=" md:mx-64 md:my-6">
                <h2 class="text-5xl font-bold text-center mb-6 leading-tight pt-5">
                    O que é o ioIndustry?
                </h2>
                <br>
                <p class="text-lg max-w-3xl mx-auto md:leading-relaxed">
                    O <strong>ioIndustry</strong> é uma aplicação web para <strong>monitorização</strong> de
                    dispositivos e
                    de consumos — como água,
                    eletricidade, gás e ar comprimido — bem como para a <strong>gestão</strong> de fábricas, processos,
                    operações e
                    equipamentos.
                </p>
                <br>
                <p class="text-lg max-w-3xl mx-auto md:leading-relaxed"> Com o ioIndustry, pode prever consumos,
                    identificar padrões e calcular a pegada de
                    carbono dos seus
                    processos e produtos, simplificando a gestão energética e tornando a sua indústria mais sustentável
                    e
                    competitiva.</p>
            </div>
            <br>
        </section>


        <!-- Módulos / Oferta -->

        <section id="oferta">

            <!-- Transição arredondada -->
            <div class="relative w-full overflow-hidden leading-none">
                <svg class="w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
                    preserveAspectRatio="none">
                    <path fill="#224335" d="M0,224 Q720,0 1440,224V320H0Z"></path>
                </svg>
            </div>


            <div class="bg-[#224335] md:h-auto md:py-10 px-8">
                <br>
                <div class=" md:mx-32 my-4 text-[#F2F2F2]">
                    <h2
                        class=" md:text-5xl text-4xl text-center font-bold md:leading-relaxed leading-tight md:pb-8 pb-9">
                        O que oferecemos?
                    </h2>
                    <h2 class="md:text-3xl text-xl font-bold pb-5">
                        Uma aplicação totalmente personalizada às necessidades do seu negócio.
                    </h2>
                    <h3 class="md:text-lg text-md pb-3">
                        O ioIndustry dispõe de <strong>4 módulos independentes e complementares</strong>, que podem ser
                        implementados de
                        forma progressiva e adaptada à sua realidade.
                    </h3>
                </div>


                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-1 md:px-12">

                    <!-- Ícone, título e texto dos módulos -->
                    <div v-for="(card, i) in cardsOferecemos" :key="i"
                        class="mx-3 md:px-3 mt-6 flex flex-col rounded-lg bg-[#e1fae8] text-surface shadow-slate-700 shadow-lg hover:shadow-xl hover:shadow-slate-800 hover:scale-105 transition-transform duration-300 shadow-secondary-1 dark:bg-surface-dark dark:text-white sm:shrink-0 sm:grow sm:basis-0">
                        <img class="rounded-t-lg size-22 object-center mx-auto mt-7 md:pb-3" :src="card.img"
                            alt="Ícones dos módulos">
                        <h5 class="mb-6 text-xl font-bold leading-tight text-center">{{ card.titulo }}</h5>
                        <p class="pb-5 px-6 md:px-3 text-base">{{ card.texto }}</p>
                    </div>
                    <br><br>
                </div>
            </div>
        </section>


        <!-- 8 Razões -->

        <section id="razoes" class="scroll-mt-18">
            <div class="bg-[#F2F2F2] h-auto md:p-10 px-8 md:py-16 py-16">
                <h2 class="md:text-5xl text-4xl font-bold text-center text-[#224335] mx-10 m-10 mb-16">8 razões para
                    escolher o ioIndustry</h2>

                <!-- Cards em diferentes tamanhos -->

                <div
                    class="grid grid-cols-1 md:grid-cols-6 md:grid-rows-3 md:gap-x-4 md:gap-y-6 md:m-10 gap-6 items-stretch">

                    <!-- Card 01 -->
                    <div
                        class="md:col-span-3 md:row-span-1 bg-[#e1fae8] text-[#262626] rounded-xl p-6 shadow-lg shadow-slate-500 hover:shadow-xl hover:shadow-slate-600 min-min-h-24 md:h-auto">
                        <h2 class="text-4xl font-bold pb-1">01</h2>
                        <p class="text-xl">APOIO À DECISÃO</p>
                        <br>
                        <!-- Texto escondido em mobile e aparece em desktop -->
                        <p class="hidden md:block mt-3">Aceda, em tempo real, a dashboards interativos, mapas, análises
                            e relatórios de gestão para
                            decisões rápidas e fundamentadas.</p>

                        <!-- Versão mobile expansível -->
                        <div class="block md:hidden text-end">

                            <button v-if="!cardStates[1]" class="text-[#224335] font-medium underline"
                                @click="toggleCard(1)">
                                Ver mais
                            </button>

                            <div v-else>
                                <p class="mt-1 text-sm text-start">
                                    Aceda, em tempo real, a dashboards interativos, mapas, análises e relatórios de
                                    gestão
                                    para decisões rápidas e fundamentadas.
                                </p>
                                <button class="text-[#224335] font-medium underline block mt-2" @click="toggleCard(1)">
                                    Ver menos
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Card 02 -->
                    <div
                        class="md:col-span-3 md:row-span-1 bg-[#224335] text-[#F2F2F2] rounded-xl p-6 shadow-lg shadow-slate-500 hover:shadow-xl hover:shadow-slate-600 min-h-24 md:h-auto">
                        <h2 class="text-4xl font-bold pb-1">02</h2>
                        <p class="text-xl">MODULAR E ESCALÁVEL</p>
                        <br>
                        <p class="hidden md:block mt-3">Cada componente é personalizável de acordo com as necessidades
                            específicas da sua indústria.
                            Integra-se facilmente em sistemas de gestão existentes, independentemente da plataforma
                            (SCADA,
                            MES, ERP, CRM).</p>

                        <div class="block md:hidden text-end">

                            <button v-if="!cardStates[2]" class="text-[#F2F2F2] font-medium underline"
                                @click="toggleCard(2)">
                                Ver mais
                            </button>

                            <div v-else>
                                <p class="mt-1 text-sm text-start">
                                    Cada componente é personalizável de acordo com as necessidades específicas da sua
                                    indústria.
                                    Integra-se facilmente em sistemas de gestão existentes, independentemente da
                                    plataforma
                                    (SCADA,
                                    MES, ERP, CRM).
                                </p>
                                <button class="text-[#F2F2F2] font-medium underline block mt-2" @click="toggleCard(2)">
                                    Ver menos
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Card 03 -->
                    <div
                        class="md:col-span-2 md:row-span-2 bg-[#669b73] text-[#F2F2F2] rounded-xl p-6 shadow-lg shadow-slate-500 hover:shadow-xl hover:shadow-slate-600 min-h-24 md:h-auto">
                        <h2 class="text-4xl font-bold pb-1">03</h2>
                        <p class=" md:text-l text-xl">MULTIPLATAFORMA</p>
                        <br>
                        <p class="hidden md:block mt-3">Aceda ao sistema em qualquer dispositivo — computador,
                            tablet ou
                            smartphone — em qualquer
                            lugar.
                        </p>

                        <div class="block md:hidden text-end">

                            <button v-if="!cardStates[3]" class="text-[#F2F2F2] font-medium underline"
                                @click="toggleCard(3)">
                                Ver mais
                            </button>

                            <div v-else>
                                <p class="mt-1 text-sm text-start">
                                    Aceda ao sistema em qualquer dispositivo — computador, tablet ou smartphone — em
                                    qualquer
                                    lugar.
                                </p>
                                <button class="text-[#F2F2F2] font-medium underline block mt-2" @click="toggleCard(3)">
                                    Ver menos
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Card 04 -->
                    <div
                        class="md:col-span-2 md:row-span-1 bg-[#224335] text-[#F2F2F2] rounded-xl p-6 shadow-lg shadow-slate-500 hover:shadow-xl hover:shadow-slate-600 min-h-24 md:h-auto">
                        <h2 class="text-4xl font-bold pb-1">04</h2>
                        <p class="md:text-l text-xl">ALERTAS INTELIGENTES</p>
                        <br>
                        <p class="hidden md:block mt-3">Sistema de alarmística com notificações em vários
                            níveis,
                            permitindo resposta imediata a
                            anomalias.</p>

                        <div class="block md:hidden text-end">

                            <button v-if="!cardStates[4]" class="text-[#F2F2F2] font-medium underline"
                                @click="toggleCard(4)">
                                Ver mais
                            </button>

                            <div v-else>
                                <p class="mt-1 text-sm text-start">
                                    Sistema de alarmística com notificações em vários níveis, permitindo
                                    resposta
                                    imediata a
                                    anomalias.
                                </p>
                                <button class="text-[#F2F2F2] font-medium underline block mt-2" @click="toggleCard(4)">
                                    Ver menos
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Card 05 -->
                    <div
                        class="md:col-span-2 md:row-span-1 bg-[#669b73] text-[#F2F2F2] rounded-xl p-6 shadow-lg shadow-slate-500 hover:shadow-xl hover:shadow-slate-600 min-h-24 md:h-auto">
                        <h2 class="text-4xl font-bold pb-1">05</h2>
                        <p class="md:text-l text-xl">MODELOS INTELIGENTES DE PREVISÃO E OTIMIZAÇÃO</p>
                        <br>
                        <p class="hidden md:block mt-3">Antecipe padrões futuros e otimize o consumo de
                            energia,
                            maximizando a eficiência e reduzindo
                            custos operacionais. Previna falhas e avarias em equipamentos com recurso a
                            Inteligência
                            Artificial.</p>

                        <div class="block md:hidden text-end">

                            <button v-if="!cardStates[5]" class="text-[#F2F2F2] font-medium underline"
                                @click="toggleCard(5)">
                                Ver mais
                            </button>

                            <div v-else>
                                <p class="mt-1 text-sm text-start">
                                    Antecipe padrões futuros e otimize o consumo de energia, maximizando a
                                    eficiência e
                                    reduzindo
                                    custos operacionais. Previna falhas e avarias em equipamentos com
                                    recurso a
                                    Inteligência
                                    Artificial.
                                </p>
                                <button class="text-[#F2F2F2] font-medium underline block mt-2" @click="toggleCard(5)">
                                    Ver menos
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Card 06 -->
                    <div
                        class="md:col-span-4 md:row-span-1 bg-[#e1fae8] text-[#262626] rounded-xl p-6 shadow-lg shadow-slate-500 hover:shadow-xl hover:shadow-slate-600 min-h-24 md:h-auto">
                        <h2 class="text-4xl font-bold pb-1">06</h2>
                        <p class="text-xl">MONITORIZAÇÃO EM TEMPO REAL</p>
                        <br>
                        <p class="hidden md:block mt-3">Acompanhe, em tempo real, consumos e custos
                            energéticos
                            (água,
                            eletricidade, gás, ar
                            comprimido)
                            e variáveis ambientais e de processo (temperatura, humidade, CO₂, peso, pH,
                            entre
                            outras).
                        </p>

                        <div class="block md:hidden text-end">

                            <button v-if="!cardStates[6]" class="text-[#262626] font-medium underline"
                                @click="toggleCard(6)">
                                Ver mais
                            </button>
                            <div v-else>
                                <p class="mt-1 text-sm text-start">
                                    Acompanhe, em tempo real, consumos e custos energéticos (água,
                                    eletricidade,
                                    gás, ar
                                    comprimido)
                                    e variáveis ambientais e de processo (temperatura, humidade, CO₂,
                                    peso, pH,
                                    entre
                                    outras).
                                </p>
                                <button class="text-[#262626] font-medium underline block mt-2" @click="toggleCard(6)">
                                    Ver menos
                                </button>
                            </div>


                        </div>
                    </div>

                    <!-- Card 07 -->
                    <div
                        class="md:col-span-4 md:row-span-1 bg-[#224335] text-[#F2F2F2] rounded-xl p-6 shadow-lg shadow-slate-500 hover:shadow-xl hover:shadow-slate-600 min-h-24 md:h-auto">
                        <h2 class="text-4xl font-bold pb-1">07</h2>
                        <p class="text-xl">CRIAÇÃO DO PASSAPORTE DIGITAL DO PRODUTO</p>
                        <br>
                        <p class="hidden md:block mt-3">Automatize a criação do Passaporte Digital,
                            calcule a
                            pegada de
                            carbono e obtenha o ciclo de
                            vida
                            (LCA) parcial dos seus produtos.</p>

                        <div class="block md:hidden text-end">

                            <button v-if="!cardStates[7]" class="text-[#F2F2F2] font-medium underline"
                                @click="toggleCard(7)">
                                Ver mais
                            </button>
                            <div v-else>
                                <p class="mt-1 text-sm text-start">
                                    Automatize a criação do Passaporte Digital, calcule a pegada de
                                    carbono e obtenha
                                    o ciclo
                                    de
                                    vida
                                    (LCA) parcial dos seus produtos.
                                </p>
                                <button class="text-[#F2F2F2] font-medium underline block mt-2" @click="toggleCard(7)">
                                    Ver menos
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Card 08 -->
                    <div
                        class="md:col-span-2 md:row-span-1 bg-[#669b73] text-[#F2F2F2] rounded-xl p-6 shadow-lg shadow-slate-500 hover:shadow-xl hover:shadow-slate-600 min-h-24 md:h-auto">
                        <h2 class="text-4xl font-bold pb-1">08</h2>
                        <p class="md:text-l text-xl">GÊMEO DIGITAL</p>
                        <br>
                        <p class="hidden md:block mt-3 ">Tenha uma réplica virtual dinâmica dos seus equipamentos para
                            monitorizar, em tempo real, o seu comportamento, prevenir falhas, simular cenários e
                            otimizar o seu desempenho.</p>

                        <div class="block md:hidden text-end">

                            <button v-if="!cardStates[8]" class="text-[#F2F2F2] font-medium underline"
                                @click="toggleCard(8)">
                                Ver mais
                            </button>

                            <div v-else>
                                <p class="mt-1 text-sm text-start">
                                    Tenha uma réplica virtual dinâmica dos seus equipamentos para monitorizar, em tempo
                                    real, o seu comportamento, prevenir falhas, simular cenários e otimizar o seu
                                    desempenho.
                                </p>
                                <button class="text-[#F2F2F2] font-medium underline block mt-2" @click="toggleCard(8)">
                                    Ver menos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>

        <!-- Diferencial-->

        <section id="diferencial" class=" scroll-mt-24 px-8 py-16 pt-20 md:pt-16">
            <div class="md:mx-20 md:mt-8 md:pb-12 ">
                <h2 class="md:text-5xl text-4xl font-bold text-[#224335] text-center">
                    O que nos diferencia
                </h2>
            </div>

            <div
                class="flex flex-col md:flex-row items-center md:items-center md:justify-between md:gap-6 md:mx-20 space-y-8 ">

                <!-- Tópicos -->
                <div class="order-2 md:order-1 w-full md:w-2/3 space-y-4 text-[#262626] pt-3">
                    <div v-for="(item, i) in diferenciais" :key="i"
                        class="flex items-center gap-4 rounded-lg p-1 transition-transform duration-300 hover:translate-x-2 hover:shadow-md">
                        <img :src="seta" alt="Seta" class="w-10 h-10 rounded-md" />
                        <h2 class="text-lg md:text-xl dark:text-gray-300">
                            {{ item }}
                        </h2>
                    </div>
                </div>

                <!-- Imagem -->
                <div class="order-1 lg:order-2 w-full lg:w-1/2 flex justify-center lg:justify-end">

                    <div id="default-carousel" class="relative w-full" @mouseenter="stopAutoPlay"
                        @mouseleave="startAutoPlay">

                        <!-- Carrossel -->
                        <div class="relative h-80 w-auto overflow-hidden flex items-center justify-center rounded-lg">

                            <div v-for="(img, index) in carouselImages" :key="index"
                                class="absolute inset-0 duration-700 ease-in-out flex items-center justify-center"
                                :class="{ 'opacity-100': index === currentSlide, 'opacity-0': index !== currentSlide }">
                                <img :src="img.src" :alt="img.alt"
                                    class="block h-72 w-full object-contain mx-auto rounded-lg select-none" />
                            </div>
                        </div>

                        <!-- Indicadores de slides -->
                        <div
                            class="carousel-indicators absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                            <button v-for="(img, index) in carouselImages" :key="'indicator-' + index" type="button"
                                class="indicator w-3 h-3 rounded-full" :aria-label="'Slide ' + (index + 1)"
                                :aria-current="index === currentSlide ? 'true' : 'false'"
                                @click="goToSlide(index)"></button>
                        </div>

                        <!-- Controles Anterior / Próximo  -->
                        <button type="button"
                            class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            @click="prevSlide">
                            <span
                                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M5 1 1 5l4 4" />
                                </svg>
                                <span class="sr-only">Anterior</span>
                            </span>
                        </button>
                        <button type="button"
                            class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            @click="nextSlide">
                            <span
                                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span class="sr-only">Próximo</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>

        </section>


        <!-- FAQ's -->

        <section id="faq" class=" scroll-mt-20">
            <div class="bg-[#224335] md:py-12 py-16 px-6 md:px-16 text-[#F2F2F2]">
                <h2 class="font-bold text-center leading-snug text-4xl md:text-5xl pb-12 md:pt-14 pt-6">
                    FAQ's (Perguntas Frequentes)
                </h2>

                <!-- Accordion -->
                <div id="accordion-color" class="w-full max-w-3xl mx-auto">
                    <div v-for="(item, i) in faq" :key="i"
                        class="border border-gray-200 overflow-hidden rounded-xl mb-3">
                        <!-- Pergunta -->
                        <button type="button"
                            class="flex items-center justify-between w-full p-5 font-medium text-[#262626] border-b border-gray-200 transition-colors duration-300"
                            :class="activeIndex === i ? 'bg-[#669b73] text-[#F2F2F2] fill-[#F2F2F2]' : 'bg-[#e1fae8] hover:bg-[#d8f5e0]'"
                            @click="toggleAccordion(i)">
                            <span class=" font-semibold text-start">{{ item.question }}</span>
                            <svg class="w-3 h-3 transition-transform duration-300"
                                :class="{ 'rotate-90': activeIndex === i }" viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z">
                                </path>
                            </svg>
                        </button>

                        <!-- Resposta -->
                        <transition name="fade">
                            <div v-if="activeIndex === i" class="p-5 bg-[#F2F2F2] text-[#262626]">
                                <p>{{ item.answer }}</p>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </section>


        <!-- Nossos Clientes -->

        <section id="clientes" class=" scroll-mt-16">
            <div class=" px-10 md:py-16 py-10">
                <h2 class="md:text-5xl text-4xl font-bold text-[#224335] text-center md:pb-20 pb-12 md:pt-8 pt-10">
                    Quem utiliza os nossos módulos
                </h2>

                <div
                    class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 md:gap-12 justify-items-center md:px-20 ">

                    <div class="flex flex-col items-center text-center text-[#262626] hover:scale-105 transition-transform duration-300 "
                        v-for="(cliente, i) in clientes" :key="i">
                        <img class=" pb-7 pt-7 h-32 w-auto object-contain" :src="cliente.logo" alt="Logotipo">
                        <h3 class=" pb-2 font-bold text-xl">{{ cliente.name }}</h3>
                        <p class=" leading-tight"> <strong> Aquisição:</strong> {{ cliente.modulos }}</p>
                    </div>
                </div>
            </div>

        </section>

        <!-- Questionário -->

        <section id="questionario" class=" scroll-mt-20 ">

            <div class="bg-[#F2F2F2] px-8 py-10 md:px-32">
                <h2 class=" font-bold text-center text-5xl text-[#224335] pt-10 pb-6">Questionário</h2>
                <p class="text-xl text-[#224335] text-center pb-12 max-w-2xl mx-auto">A sua empresa está a aproveitar
                    todo o potencial da
                    Indústria 4.0? Avalie o desempenho do seu negócio com este pequeno questionário e descubra novas
                    oportunidades!</p>

                <!-- Botão das categorias -->
                <div class="flex flex-wrap justify-center gap-4">

                    <button v-if="!botaoClicado" @click="abrirQuestionario(categoria)"
                        class="px-6 py-3 bg-[#224335] text-white rounded-lg hover:bg-[#32634f] hover:scale-105 transition-transform duration-300 opacity duration-500', botaoClicado ? 'opacity-0 pointer-events-none' : 'opacity-100'">
                        Abrir Questionário
                    </button>
                </div>

                <!-- Questionário -->
                <div v-if="mostrarQuestionario" id="questionario">
                    <Questionario :categoria="categoriaSelecionada" />
                </div>
            </div>
        </section>


        <!-- Era digital -->

        <!-- Transição arredondada -->
        <div class="relative w-full overflow-hidden leading-none bg-[#F2F2F2]">
            <svg class="w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
                preserveAspectRatio="none">
                <path fill="#224335" d="M0,224 Q720,0 1440,224V320H0Z"></path>
            </svg>
        </div>


        <div class="bg-[#224335] md:px-7 md:py-20 py-18 px-8">
            <div class=" md:px-30 text-[#F2F2F2] ">
                <h2 class=" md:text-5xl text-4xl font-bold md:leading-relaxed leading-tight text-center pb-4">
                    Entre na era digital com o ioIndustry!
                </h2>
                <br>
                <div class="text-center max-w-3xl mx-auto leading-relaxed">
                    <p class="text-lg md:text-xl md:pb-1 pb-2">Com o ioIndustry, terá <strong>controlo total sobre os
                            recursos e
                            a gestão
                            energética da sua indústria.</strong>
                    </p>
                    <p class="text-lg md:text-xl">Transforme a sua fábrica e prepare-se para a nova revolução
                        industrial.</p>
                </div>
            </div>
        </div>

        <!-- Contacto -->

        <section id="contacto">

            <div class="bg-[#262626] text-[#F2F2F2] md:px-20 md:py-16 px-12 py-16">

                <div class="grid grid-cols-1 gap-6
              md:grid-cols-2 md:grid-rows-[auto_auto] md:items-start md:gap-6">

                    <!-- Seção superior: Logotipo e redes sociais -->

                    <!-- Logotipo -->
                    <div class="order-1 md:col-start-1 md:row-start-1 md:col-span-1 flex flex-col gap-6 pb-6">
                        <a href="https://iotech.pt/" target="_blank" class="w-32">
                            <img :src="logoioTech" alt="Logo ioTech">
                        </a>
                    </div>

                    <!-- Redes sociais -->
                    <div class="order-3 md:order-2 md:col-start-2 md:row-start-1 md:col-span-1 flex flex-col  ">

                        <!-- <h2 class="text-lg font-extralight pb-4 ">Siga-nos:</h2> -->

                        <div
                            class="flex gap-3 whitespace-nowrap overflow-x-auto md:overflow-visible md:whitespace-normal justify-center ">
                            <a v-for="(media, i) in socialMedia" :key="i" :href="media.link" target="_blank"
                                class="flex items-center gap-2 hover:underline bg-[#323232] rounded-3xl py-3 px-3">
                                <!-- Ícone condicional -->
                                <svg v-if="media.name === 'Instagram'" class="w-6 h-6 fill-[#f2f2f2] "
                                    viewBox="0 0 448 512">
                                    <path
                                        d="M224,202.66A53.34,53.34,0,1,0,277.34,256,53.38,53.38,0,0,0,224,202.66ZM398.8,80A48,48,0,0,0,368,49.2C347.1,32.5,316.9,32,224,32S100.9,32.5,80,49.2A48,48,0,0,0,49.2,80C32.5,100.9,32,131.1,32,224s.5,123.1,17.2,144A48,48,0,0,0,80,398.8C100.9,415.5,131.1,416,224,416s123.1-.5,144-17.2a48,48,0,0,0,30.8-30.8C415.5,347.1,416,316.9,416,224S415.5,100.9,398.8,80ZM224,338a82,82,0,1,1,82-82A82.09,82.09,0,0,1,224,338Zm85.3-148.7a19.2,19.2,0,1,1,19.2-19.2A19.18,19.18,0,0,1,309.3,189.3Z" />
                                </svg>

                                <svg v-if="media.name === 'Facebook'" class="w-6 h-6 fill-[#f2f2f2]"
                                    viewBox="0 0 320 512">
                                    <path
                                        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06H293V6.26S259.91 0 225.36 0c-73.22 0-121.16 44.38-121.16 124.72v70.62H22.89V288h81.31v224h100.2V288z" />
                                </svg>

                                <svg v-if="media.name === 'Linkedin'" class="w-6 h-6 fill-[#f2f2f2]"
                                    viewBox="0 0 448 512">
                                    <path
                                        d="M100.28 448H7.4V148.9h92.88zm-46.44-340C24.06 108 0 83.94 0 54S24.06 0 53.84 0s53.84 24.06 53.84 54-24.06 54-53.84 54zM447.9 448h-92.7V302.4c0-34.7-.7-79.3-48.4-79.3-48.4 0-55.8 37.8-55.8 76.8V448h-92.6V148.9h88.9v40.8h1.3c12.4-23.4 42.7-48.4 87.9-48.4 94 0 111.3 61.9 111.3 142.3V448z" />
                                </svg>

                                <span class=" hidden md:block md:text-sm text-xs">{{ media.name }}</span>
                            </a>
                        </div>
                    </div>

                    <!-- Parte inferior: Morada, Telefone e Email -->
                    <div
                        class="order-2 md:order-3 md:col-start-1 md:row-start-2 md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-center items-start gap-2 md:gap-10 md:pt-3 pb-3">

                        <!-- Morada -->
                        <div class="flex items-center gap-3 bg-[#323232] rounded-3xl p-4">
                            <svg class="w-6 h-6 fill-[#F2F2F2]" viewBox="0 0 384 512">
                                <path
                                    d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                            </svg>
                            <p class="text-sm md:text-base">Avenida Dom Afonso Henriques 4694, Vila Nova de Famalicão
                            </p>
                        </div>

                        <!-- Telefone -->
                        <div class="flex items-center gap-3 bg-[#323232] rounded-3xl p-4">
                            <svg class="w-5 h-5 fill-[#F2F2F2]" viewBox="0 0 512 512">
                                <path
                                    d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                            </svg>
                            <p class="text-sm md:text-base">+351 252 116 943 </p>
                        </div>

                        <!-- Email -->
                        <div class="flex items-center gap-3 bg-[#323232] rounded-3xl p-4">
                            <svg class="w-5 h-5 fill-[#F2F2F2]" viewBox="0 0 512 512">
                                <path
                                    d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                            </svg>
                            <a href="mailto:ioIndustry@iotech.pt"
                                class="hover:underline text-sm md:text-base">ioIndustry@iotech.pt</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<style scoped>

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

#default-carousel .carousel-inner {
    position: relative;
    width: 100%;
    height: 18rem;
}

@media (min-width: 768px) {
    #default-carousel .carousel-inner {
        height: 24rem;
    }
}

/* Navbar */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-7px);
}

/* Carrossel */
#default-carousel .carousel-slide {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    z-index: 0;
    transition: opacity 0.7s ease-in-out;
}

#default-carousel .carousel-img {
    position: relative;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    user-select: none;
    -webkit-user-drag: none;
}

/* Indicadores do Carrossel */
#default-carousel .carousel-indicators .indicator {
    background-color: rgba(102, 155, 115, 0.6);
    transition: background-color .2s ease, transform .15s ease, opacity .2s ease;
    opacity: 0.85;
}

/* Indicador ativo */
#default-carousel .carousel-indicators .indicator[aria-current="true"] {
    background-color: #163925;
    transform: scale(1.2);
    opacity: 1;
}

/* Posição indicador */
#default-carousel .carousel-indicators {
    bottom: 1rem;
    left: 59%;
    transform: translateX(-50%);
    pointer-events: auto;
}

#default-carousel img {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
}
</style>