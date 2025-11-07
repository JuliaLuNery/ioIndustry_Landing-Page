<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const emit = defineEmits(['submitted'])

const route = useRoute()
const router = useRouter()

/* --- Estado --- */
const selectedCategoryId = ref(route.query.categoria || null)
const selectedCategoryIndex = ref(null)
const currentQuestionIndex = ref(0)
const answers = ref([])
const showResults = ref(false)
const resultIndex = ref(null) // 0=alto,1=medio,2=baixo
const contactEmail = ref('')

/* --- Perguntas --- */
const categories = [
    {
        id: 'eficienciaOperacional',
        name: 'Eficiência Operacional',
        description: '',
        questions: [
            {
                text: 'Tem identificado uma queda na produtividade operacional que afeta diretamente o desempenho da sua empresa?',
                options: [
                    'Sim. Em várias áreas da operação.',
                    'Sim. Mas apenas em algumas áreas específicas.',
                    'Não. Não tenho identificado esse problema.'
                ]
            },
            {
                text: 'Em que medida a automação está presente na sua empresa? Existe alguma área operacional que ainda dependa de processos manuais, com impacto na eficiência?',
                options: [
                    'Sim. Existem várias áreas manuais que impactam negativamente a eficiência.',
                    'Sim. Mas estamos a implementar soluções de automação em algumas áreas.',
                    'Não. Já temos automação em todos os processos relevantes.'
                ]
            },
            {
                text: 'Qual a frequência com que a sua operação enfrenta paragens não planeadas e qual é o impacto dessas paragens no seu ciclo de produção?',
                options: [
                    'Frequentes e com impacto significativo na produção e custos.',
                    'Ocasionalmente, mas o impacto é gerido eficazmente.',
                    'Raramente, quase nunca enfrentamos esse tipo de problema.'
                ]
            },
            {
                text: 'A sua estratégia de manutenção está a ser eficaz? Utiliza manutenção preditiva ou preventiva para evitar falhas imprevistas, ou a manutenção ainda é essencialmente reativa?',
                options: [
                    'A manutenção é essencialmente reativa, resultando em custos adicionais e tempo de inatividade.',
                    'Utilizamos manutenção preventiva, mas não preditiva.',
                    'A manutenção preditiva é implementada, com boa eficácia na redução de falhas.'
                ]
            },
            {
                text: 'Tem enfrentado variações significativas na qualidade do produto? Quais os principais desafios na garantia da consistência na qualidade?',
                options: [
                    'Sim. A qualidade tem variado e isso tem impactado a satisfação do cliente e os custos.',
                    'Ocasionalmente, mas conseguimos gerir essas variações com controles específicos.',
                    'Não. Conseguimos manter uma qualidade consistente graças a um sistema robusto de controlo de qualidade.'
                ]
            }
        ]
    },

    {
        id: 'gestao',
        name: 'Gestão Baseada em Dados',
        description: '',
        questions: [
            {
                text: 'Tem dificuldade em obter informações operacionais cruciais no momento certo? A falta de dados impacta a sua capacidade de tomar decisões eficazes?',
                options: [
                    'Sim. Frequentemente falta-me informação essencial para tomar decisões rápidas e informadas.',
                    'Às vezes, mas conseguimos mitigar com análises em tempo real.',
                    'Não. Temos acesso à todas as informações necessárias em tempo real.'
                ]
            },
            {
                text: 'Utiliza indicadores de performance (KPIs) claros e acessíveis para medir a eficiência e o desempenho da sua operação?',
                options: [
                    'Não. Temos dificuldades em definir e acessar indicadores chave de desempenho.',
                    'Sim. Mas alguns indicadores não refletem com precisão os nossos processos operacionais.',
                    'Sim. Temos KPIs bem definidos que monitorizam todos os processos essenciais.'
                ]
            },
            {
                text: 'Quão fácil é justificar as decisões operacionais com base em dados? As decisões são feitas com evidências claras ou baseiam-se mais em intuições?',
                options: [
                    'As decisões são frequentemente feitas sem dados claros para justificar as escolhas.',
                    'Algumas decisões são baseadas em dados, mas outras dependem de intuições.',
                    'Todas as nossas decisões são bem justificadas e baseadas em dados concretos e análises.'
                ]
            },
            {
                text: 'Os seus dados operacionais estão dispersos por diferentes sistemas ou plataformas, dificultando a análise integrada e a tomada de decisão eficiente?',
                options: [
                    'Sim. A dispersão de dados em diferentes plataformas dificulta a análise global.',
                    'Às vezes, mas tentamos integrar os dados manualmente.',
                    'Não. Temos todos os nossos dados integrados em uma plataforma centralizada.'
                ]
            },
            {
                text: 'A sua empresa consegue reagir rapidamente às mudanças de mercado e a eventos imprevistos? Existe alguma lacuna no processo de decisão que afete a sua agilidade?',
                options: [
                    'Não. As decisões demoram a ser tomadas devido à falta de dados em tempo real.',
                    'Sim. Mas poderia ser mais ágil com melhor integração de dados.',
                    'Sim. Somos muito rápidos na tomada de decisões graças ao acesso a dados em tempo real.'
                ]
            }
        ]
    },

    {
        id: 'integracaoDigital',
        name: 'Integração Digital',
        description: '',
        questions: [
            {
                text: 'Os sistemas da sua empresa estão integrados de forma eficiente ou ainda existem sistemas isolados que dificultam a troca de informações?',
                options: [
                    'Sim. Temos vários sistemas isolados que não comunicam entre si.',
                    'Alguns sistemas estão integrados, mas há desafios na interoperabilidade.',
                    'Não. Todos os nossos sistemas operam de forma integrada e eficaz.'
                ]
            },
            {
                text: 'Quais têm sido os maiores desafios tecnológicos na sua empresa? Há dificuldades na implementação de novas soluções tecnológicas?',
                options: [
                    'Sim. A implementação de novas tecnologias tem sido morosa e complexa.',
                    'Às vezes, mas conseguimos superar as dificuldades com processos bem definidos.',
                    'Não. A implementação tecnológica tem sido eficaz e sem grandes desafios.'
                ]
            },
            {
                text: 'A sua empresa tem acesso a dados em tempo real que permitem tomar decisões rápidas e fundamentadas?',
                options: [
                    'Não. Os dados não estão disponíveis em tempo real, o que prejudica a agilidade.',
                    'Sim. Mas apenas em alguns processos-chave.',
                    'Sim. Temos acesso imediato a todos os dados relevantes para a tomada de decisão.'
                ]
            },
            {
                text: 'A integração de sistemas tem sido dificultada pelo custo, complexidade ou resistência à mudança dentro da sua organização?',
                options: [
                    'Sim. A resistência à mudança e o custo elevado dificultam a integração.',
                    'Às vezes. Mas estamos a superar esses obstáculos com soluções incrementais.',
                    'Não. A integração foi feita de forma tranquila e sem grandes custos adicionais.'
                ]
            },
            {
                text: 'A sua empresa tem uma estratégia robusta de segurança de dados que assegura a proteção de informações sensíveis e cumprimento de normas de privacidade?',
                options: [
                    'Não. A segurança de dados é uma preocupação, mas ainda não temos uma estratégia clara.',
                    'Sim. Mas sempre com desafios em manter a conformidade total.',
                    'Sim. Temos uma estratégia avançada e implementada para proteger todos os dados.'
                ]
            }
        ]
    },

    {
        id: 'sustentabilidade',
        name: 'Sustentabilidade',
        description: '',
        questions: [
            {
                text: 'A sua empresa está a gerir os recursos essenciais de forma eficiente (como energia, água e matérias-primas)?',
                options: [
                    'Não. Existem desperdícios consideráveis que aumentam os custos operacionais.',
                    'Sim. Mas existem oportunidades de otimização que não estamos a explorar completamente.',
                    'Sim. A nossa gestão de recursos é eficiente e sustentável.'
                ]
            },
            {
                text: 'Tem a capacidade de monitorizar em tempo real os consumos de recursos e outros parâmetros chave de sustentabilidade?',
                options: [
                    'Não. A falta de monitorização dificulta a análise precisa do uso de recursos.',
                    'Às vezes. Mas não temos um sistema completo e automatizado de monitorização.',
                    'Sim. Temos sistemas avançados para monitorizar e controlar o uso de recursos em tempo real.'
                ]
            },
            {
                text: 'Está a par de todos os regulamentos industriais e ambientais que a sua empresa precisa de cumprir?',
                options: [
                    'Não. Há sempre incertezas sobre as obrigações legais e ambientais que devemos seguir.',
                    'Sim. Mas o processo de monitorização e adaptação é moroso.',
                    'Sim. Temos total conformidade com todos os regulamentos e controlamos ativamente as mudanças.'
                ]
            },
            {
                text: 'A sua empresa corre o risco de não cumprir com algumas normativas e incorrer em multas ou penalizações?',
                options: [
                    'Sim. Estamos expostos a riscos devido à falta de controlo adequado.',
                    'Sim. Mas estamos a tomar medidas para mitigar esses riscos.',
                    'Não. Temos um sistema robusto para garantir a conformidade contínua.'
                ]
            },
            {
                text: 'Está a sentir uma pressão crescente dos seus clientes para adotar práticas mais sustentáveis e melhorar a transparência ambiental?',
                options: [
                    'Sim. Os nossos clientes exigem mais transparência e práticas ambientais responsáveis.',
                    'Às vezes. Mas ainda não é uma prioridade em todos os segmentos.',
                    'Não. A sustentabilidade não tem sido um fator relevante nas relações com os nossos clientes.'
                ]
            }
        ]
    }
]

watch(
    () => route.query.categoria,
    (newCat) => {
        selectedCategoryId.value = newCat || null
        initForCategory()
    },
    { immediate: true }
)

function initForCategory() {
    showResults.value = false
    resultIndex.value = null
    contactEmail.value = ''
    currentQuestionIndex.value = 0

    if (!selectedCategoryId.value) {
        selectedCategoryIndex.value = null
        answers.value = []
        return
    }

    const idx = categories.findIndex((c) => c.id === selectedCategoryId.value)
    if (idx === -1) {
        // categoria inválida -> reset
        selectedCategoryIndex.value = null
        answers.value = []
        selectedCategoryId.value = null
        return
    }

    selectedCategoryIndex.value = idx
    const len = categories[idx].questions.length
    answers.value = Array(len).fill(null)
}

/* --- Computeds uteis --- */
const currentCategory = computed(() =>
    selectedCategoryIndex.value === null ? null : categories[selectedCategoryIndex.value]
)

const currentQuestion = computed(() => {
    if (!currentCategory.value) return null
    return currentCategory.value.questions[currentQuestionIndex.value]
})

const progress = computed(() => {
    if (!currentCategory.value) return 0
    const total = currentCategory.value.questions.length
    return ((currentQuestionIndex.value + 1) / total) * 100
})

const isLastQuestion = computed(() => {
    if (!currentCategory.value) return false
    return currentQuestionIndex.value === currentCategory.value.questions.length - 1
})

const allAnswered = computed(() => {
    if (!currentCategory.value) return false
    return answers.value.every((a) => a === 0 || a === 1 || a === 2)
})

/* --- Respostas personalizadas --- */
const resultHtml = computed(() => {
    if (resultIndex.value === null) return ''
    if (resultIndex.value === 0) {
        return `Identificámos várias oportunidades para modernizar o seu sistema de gestão. Com as soluções certas, é possível aumentar a sua produtividade e reduzir custos desnecessários rapidamente. Podemos ajudá-lo a dar os primeiros passos com segurança e eficácia. Envie-nos o seu e-mail para saber mais.`
    }
    if (resultIndex.value === 1) {
        return `A sua empresa já demonstra boas práticas de gestão, mas ainda há espaço para evoluir e aumentar a eficiência. Com algumas melhorias estratégicas, pode otimizar ainda mais os seus processos. Estamos aqui para ajudá-lo a identificar as melhores soluções para o seu negócio. Envie-nos o seu e-mail para saber mais.`
    }
    return `Parabéns! O seu negócio já utiliza práticas modernas de gestão. Continue a apostar na inovação para se manter à frente no setor. Podemos ajudá-lo a estar sempre atualizado sobre as últimas tendências do mercado. Envie-nos o seu e-mail para saber mais.`
})

/* --- Escolher categoria --- */
function chooseCategoryByIndex(i) {

    router.push({ name: 'Questionario', query: { categoria: categories[i].id } })
}

/* --- Navegação perguntas --- */
function nextQuestion() {
    // exige seleção na pergunta atual
    if (answers.value[currentQuestionIndex.value] === null || answers.value[currentQuestionIndex.value] === undefined) return
    if (currentQuestionIndex.value < currentCategory.value.questions.length - 1) {
        currentQuestionIndex.value++
    } else {
        // calcular resultado
        computeResult()
        showResults.value = true
    }
}

function previousQuestion() {
    if (currentQuestionIndex.value > 0) currentQuestionIndex.value--
}

/* --- Calcular resultado --- */
function computeResult() {
    const counts = [0, 0, 0]
    answers.value.forEach((a) => {
        if (a === 0 || a === 1 || a === 2) counts[a]++
    })
    const maxCount = Math.max(...counts)
    // encontrar vencedores
    const winners = counts.map((c, i) => (c === maxCount ? i : -1)).filter((v) => v !== -1)
    // prioridade 0 > 1 > 2
    const priority = [0, 1, 2]
    const winner = priority.find((p) => winners.includes(p))
    resultIndex.value = typeof winner === 'number' ? winner : winners[0] ?? 2
}

/* --- Validar email --- */
function isValidEmail(email) {
    if (!email) return false
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/* --- Submeter contacto --- */
function submitContact() {
    if (!isValidEmail(contactEmail.value)) return

    const payload = {
        categoryId: currentCategory.value.id,
        categoryName: currentCategory.value.name,
        answersIndices: answers.value.slice(),
        answersText: answers.value.map((chosenIdx, i) => currentCategory.value.questions[i].options[chosenIdx]),
        resultIndex: resultIndex.value, // 0/1/2
        resultLabel: resultIndex.value === 0 ? 'Alto Risco' : resultIndex.value === 1 ? 'Risco Moderado' : 'Baixo Risco',
        email: contactEmail.value
    }

    emit('submitted', payload)

    router.push({ name: 'LandingPage' }).catch(() => { })
}

/* --- Reiniciar para outra categoria --- */
function restart() {
    showResults.value = false
    resultIndex.value = null
    contactEmail.value = ''
    currentQuestionIndex.value = 0
    answers.value = currentCategory.value ? Array(currentCategory.value.questions.length).fill(null) : []
}

function cancel() {
    router.push({ name: 'LandingPage' }).catch(() => { })
}
</script>

<template>
    <section class="flex items-start justify-center ">
        <div class="w-full max-w-3xl">

            <!-- Categorias -->
            <div v-if="!currentCategory && !showResults" class="bg-white rounded-xl shadow p-6">
                <p class="mb-4 font-medium">Escolha a categoria que pretende avaliar:</p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button v-for="(cat, i) in categories" :key="cat.id" @click="chooseCategoryByIndex(i)"
                        class="w-full text-center p-4 rounded-xl bg-[#224335] text-white hover:bg-[#32634f] transition">
                        {{ cat.name }}
                    </button>
                </div>
            </div>

            <!-- Perguntas -->
            <div v-else-if="!showResults && currentCategory" class="bg-white rounded-xl shadow p-6">

                <!-- Header categoria + alterar -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div>
                        <h3 class="text-xl font-semibold text-[#224335]">{{ currentCategory.name }}</h3>
                    </div>
                    <div class="flex gap-2">
                        <button @click="restart"
                            class="px-3 py-2 rounded-lg bg-[#669b73] text-white hover:bg-[#6ba67a]">Reiniciar</button>
                        <button @click="cancel" class="px-3 py-2 rounded-lg border">Cancelar</button>
                    </div>
                </div>

                <!-- Progress bar -->
                <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-3">
                    <div class="h-2 bg-[#224335] transition-all" :style="{ width: progress + '%' }"></div>
                </div>
                <p class=" text-left text-sm text-[#224335] mb-4">Pergunta {{ currentQuestionIndex + 1 }} de {{
                    currentCategory.questions.length }}</p>

                <!-- Pergunta atual -->
                <div class="mb-6">
                    <!-- <p class="font-medium mb-3 text-md pb-1"><strong>Pergunta {{ currentQuestionIndex + 1 }}:</strong> {{
                        currentQuestion.text }}</p> -->

                    <p class="font-medium mb-3 text-md pb-1">
                        {{ currentQuestion.text }}</p>

                    <div class="flex flex-col gap-3">
                        <label v-for="(opt, optIdx) in currentQuestion.options" :key="optIdx"
                            class="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition"
                            :class="answers[currentQuestionIndex] === optIdx ? 'ring-2 ring-[#224335] bg-[#e9f6ee]' : 'bg-[#f1f7f3] hover:bg-[#e6f0ea]'">
                            <!-- radio oculto -->
                            <input type="radio" class="sr-only" :name="'q' + currentQuestionIndex" :value="optIdx"
                                v-model.number="answers[currentQuestionIndex]" />
                            <!-- dot indicator -->
                            <span class="w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center"
                                :class="answers[currentQuestionIndex] === optIdx ? 'bg-[#224335] border-[#224335]' : 'border-gray-300 bg-white'">
                                <span v-if="answers[currentQuestionIndex] === optIdx"
                                    class="block w-2 h-2 rounded-full bg-white"></span>
                            </span>

                            <!-- Opção -->
                            <div class="text-sm text-[#262626]">
                                {{ opt }}
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Botões navegação -->
                <div class="flex justify-between items-center">
                    <button @click="previousQuestion" :disabled="currentQuestionIndex === 0"
                        class="px-4 py-2 rounded-xl border disabled:opacity-50">Anterior</button>

                    <div class="flex gap-2">
                        <button @click="cancel" class="px-4 py-2 rounded-xl border">Cancelar</button>

                        <button v-if="!isLastQuestion" @click="nextQuestion"
                            :disabled="answers[currentQuestionIndex] === null || answers[currentQuestionIndex] === undefined"
                            class="px-4 py-2 rounded-xl bg-[#669b73] text-white disabled:opacity-60">
                            Próxima
                        </button>

                        <button v-else @click="nextQuestion" :disabled="!allAnswered"
                            class="px-4 py-2 rounded-xl bg-[#224335] text-white disabled:opacity-60">
                            Analisar respostas
                        </button>
                    </div>
                </div>
            </div>

            <!-- Resultado -->
            <div v-else-if="showResults" class="bg-white rounded-xl shadow p-6">
                <h3 class="text-2xl font-bold text-[#224335] mb-4">Resultado</h3>
                <p class="mb-4" v-html="resultHtml"></p>

                <div class="mb-4">
                    <label class="block text-sm mb-2">Deixe o seu e-mail para entrarmos em contacto:</label>
                    <input v-model="contactEmail" type="email" placeholder="seuemail@exemplo.com"
                        class="w-full p-2 border rounded" />
                    <p v-if="contactEmail && !isValidEmail(contactEmail)" class="text-red-500 text-sm mt-1">Email
                        inválido</p>
                </div>

                <div class="flex justify-between items-center gap-3">
                    <button @click="restart" class="px-4 py-2 rounded-lg border">Responder outra categoria</button>

                    <div class="flex gap-2">
                        <button @click="cancel" class="px-4 py-2 rounded-lg border">Fechar</button>
                        <button @click="submitContact" :disabled="!isValidEmail(contactEmail)"
                            class="px-4 py-2 rounded-lg bg-[#224335] text-white disabled:opacity-50">
                            Enviar e fechar
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </section>

</template>