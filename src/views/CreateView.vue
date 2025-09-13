

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { RouterLink } from 'vue-router'

// --- Perguntas Predefinidas (JSON) ---
const predefinedQuestions = [
    {
        text: 'Qual é o valor da soma $$ \\frac{1}{2} + \\frac{1}{4} $$?',
        category: 'Frações',
        options: [
            { text: '$$ \\frac{1}{6} $$', correct: false },
            { text: '$$ \\frac{2}{6} $$', correct: false },
            { text: '$$ \\frac{3}{4} $$', correct: true },
            { text: '$$ \\frac{2}{4} $$', correct: false }
        ],
        correctAnswerIndex: 2
    },
    {
        text: 'Se um triângulo retângulo tem catetos medindo 3cm e 4cm, qual é o comprimento da hipotenusa?',
        category: 'Geometria',
        options: [
            { text: '5 cm', correct: true },
            { text: '6 cm', correct: false },
            { text: '7 cm', correct: false }
        ],
        correctAnswerIndex: 0
    },
    {
        text: 'Qual é o valor de $$ \\sin(90^{\\circ}) $$?',
        category: 'Trigonometria',
        options: [
            { text: '0', correct: false },
            { text: '1', correct: true },
            { text: '-1', correct: false },
            { text: '$$ \\frac{\\sqrt{2}}{2} $$', correct: false }
        ],
        correctAnswerIndex: 1
    },
    {
        text: 'Resolva a equação de primeiro grau: $$ 2x - 8 = 4 $$',
        category: 'Ágebra',
        options: [
           { text: 'x = 4', correct: false },
           { text: 'x = 6', correct: true },
           { text: 'x = -2', correct: false },
        ],
        correctAnswerIndex: 1
    }
];

// --- Estado da Aplicação ---
const questions = ref([]);
const categories = ref(['Álgebra', 'Trigonometria', 'Geometria', 'Cálculo', 'Frações', 'Logaritmos']);
const newQuestion = ref({
  text: '', category: '',
  options: [{ text: '', correct: false }, { text: '', correct: false }],
  correctAnswerIndex: null
});

// --- Funções do Formulário ---
const addOption = () => { if (newQuestion.value.options.length < 5) newQuestion.value.options.push({ text: '', correct: false }); };
const removeOption = (index) => { newQuestion.value.options.splice(index, 1); };

const setCorrectAnswer = (index) => {
  newQuestion.value.options.forEach((option, i) => option.correct = i === index);
  newQuestion.value.correctAnswerIndex = index;
};

const isQuestionValid = computed(() => newQuestion.value.text.trim() !== '' && newQuestion.value.category !== '' && newQuestion.value.options.every(opt => opt.text.trim() !== '') && newQuestion.value.correctAnswerIndex !== null);

const saveQuestion = () => {
  if (!isQuestionValid.value) return;
  questions.value.push(JSON.parse(JSON.stringify(newQuestion.value)));
  resetForm();
};

const resetForm = () => {
  newQuestion.value = { text: '', category: '', options: [{ text: '', correct: false }, { text: '', correct: false }], correctAnswerIndex: null };
};


// --- Funções Auxiliares ---
const renderKatex = (text) => {
  if (!text || typeof window.katex === 'undefined') return text;
  try {

    console.log('Rendering KaTeX for text:', text);
    const withDisplay = text.replace(/\$\$(.*?)\$\$/g, (match, expression) => katex.renderToString(expression, { displayMode: true, throwOnError: false }));
    return withDisplay.replace(/\$(.*?)\$/g, (match, expression) => katex.renderToString(expression, { displayMode: false, throwOnError: false }));
  } catch (e) {
    console.error(e);
    return text;
  }
};

const forceKatexRender = () => {
    if (window.renderMathInElement) {
        nextTick(() => {
            window.renderMathInElement(document.body, {
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "$", right: "$", display: false},
                ]
            });
        });
    }
}

// --- Ciclo de Vida e Persistência ---
onMounted(() => {
  const savedQuestions = localStorage.getItem('regrinhas-questions');
  if (savedQuestions && JSON.parse(savedQuestions).length > 0) {
    questions.value = JSON.parse(savedQuestions);
  } else {
    questions.value = predefinedQuestions;
  }
});

watch(questions, () => {
  localStorage.setItem('regrinhas-questions', JSON.stringify(questions.value));
  forceKatexRender();
}, { deep: true });

// Carrega o script de auto-renderização do KaTeX
const katexScript = document.createElement('script');
katexScript.src = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js";
katexScript.defer = true;
katexScript.onload = () => {
    // Força a renderização inicial assim que o script carregar
    forceKatexRender();
};
document.head.appendChild(katexScript);

</script>

<template>
  <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-200">
    <RouterLink
        to="/"
        class="mb-6 flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:underline"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Voltar
    </RouterLink>
    <header class="text-center mb-8">
        <h1 class="text-4xl font-bold text-cyan-600 dark:text-cyan-400">Editor de Perguntas</h1>
        <p class="mt-2 text-lg text-slate-600 dark:text-slate-400">Crie e gerencie suas perguntas de matemática.</p>
    </header>

    <main class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Seção de Criação de Perguntas -->
      <section class="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <h2 class="text-2xl font-semibold mb-4 border-b pb-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">Nova Pergunta
        </h2>

        <div class="space-y-4">
          <!-- Campo da Pergunta -->
          <div>
            <label for="question"
              class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Enunciado da
              Pergunta</label>
            <textarea id="question" v-model="newQuestion.text"
              placeholder="Ex: Qual o valor de $$x$$ na equação $$x^2 + 5 = 14$$ ?"
              class="w-full p-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              rows="3"></textarea>
            <p class="text-xs text-slate-500 mt-1">Use `$$...$$` para fórmulas em bloco e `$...$` para fórmulas na
              linha.</p>
          </div>

          <!-- Campo da Categoria -->
          <div>
            <label for="category"
              class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Categoria</label>
            <select id="category" v-model="newQuestion.category"
              class="w-full p-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none">
              <option disabled value="">Selecione uma categoria</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>

          <!-- Pré-visualização da Pergunta -->
          <div v-if="newQuestion.text" class="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
            <h4 class="text-sm font-semibold mb-2 text-slate-900 dark:text-slate-100">Pré-visualização:</h4>
            <div class="prose dark:prose-invert max-w-none" v-html="renderKatex(newQuestion.text)"></div>
          </div>

          <!-- Opções de Resposta -->
          <div>
            <h3 class="text-lg font-medium mb-2 text-slate-900 dark:text-slate-100">Opções de Resposta</h3>
            <div v-for="(option, index) in newQuestion.options" :key="index" class="flex items-center gap-2 mb-2">
              <input type="radio" :name="'correct-option'" :value="index" :checked="newQuestion.correctAnswerIndex === index" @change="setCorrectAnswer(index)"
                class="form-radio h-4 w-4 text-cyan-600 focus:ring-cyan-500">
              <input type="text" v-model="option.text" placeholder="Digite a opção"
                class="flex-grow p-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md outline-none">
              <button @click="removeOption(index)" class="text-red-500 hover:text-red-700 p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
            <button @click="addOption" class="mt-2 text-sm text-cyan-600 dark:text-cyan-400 hover:underline">+
              Adicionar opção</button>
          </div>
        </div>

        <!-- Botão de Salvar -->
        <div class="mt-6 text-right">
          <button @click="saveQuestion"
            class="bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-700 transition-colors shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed"
            :disabled="!isQuestionValid">
            Salvar Pergunta
          </button>
        </div>
      </section>

      <!-- Seção de Listagem de Perguntas -->
      <section class="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <h2 class="text-2xl font-semibold mb-4 border-b pb-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">Perguntas Criadas</h2>
        <div v-if="questions.length === 0" class="text-center text-slate-500 py-8">
          <p>Nenhuma pergunta criada ainda.</p>
        </div>
        <ul v-else class="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <li v-for="(q, index) in questions" :key="index"
            class="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
            <div class="flex justify-between items-start mb-2">
              <div class="font-semibold flex-grow pr-2" v-html="renderKatex(q.text)"></div>
              <span
                class="flex-shrink-0 bg-cyan-100 text-cyan-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded-full dark:bg-cyan-900 dark:text-cyan-300">{{
                  q.category }}</span>
            </div>
            <ul class="list-disc list-inside space-y-1 pl-2">
              <li v-for="(opt, optIndex) in q.options" :key="optIndex"
                :class="{ 'text-green-500 font-bold': opt.correct, 'text-slate-600 dark:text-slate-400': !opt.correct }">
                <span v-html="renderKatex(opt.text)"></span>
                <span v-if="opt.correct" class="text-xs ml-1">(Correta)</span>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </main>

  </div>
</template>

<style scoped>
/* Estilos para a barra de rolagem na lista de perguntas */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #94a3b8;
  border-radius: 20px;
  border: 3px solid transparent;
  background-clip: content-box;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: #475569;
}

:deep(.katex) {
    color: inherit !important;
}
</style>

