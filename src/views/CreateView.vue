<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useQuestionsStore } from '@/stores/questions'
import { storeToRefs } from 'pinia'
import QuestionListItem from '@/components/QuestionListItem.vue'

// --- Refs e Store ---
const questionsStore = useQuestionsStore()
const { questions } = storeToRefs(questionsStore)

// Carrega as perguntas quando o componente é montado
onMounted(() => {
  questionsStore.loadQuestions()
})

// --- Estado do Componente ---
const categories = ref(['Ágebra', 'Trigonometria', 'Geometria', 'Cálculo', 'Frações', 'Logaritmos']);
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
  questionsStore.addQuestion(JSON.parse(JSON.stringify(newQuestion.value)));
  resetForm();
};

const resetForm = () => {
  newQuestion.value = { text: '', category: '', options: [{ text: '', correct: false }, { text: '', correct: false }], correctAnswerIndex: null };
};

// --- Função de Pré-visualização do KaTeX ---
const renderKatexPreview = (text) => {
  if (!text || typeof window.katex === 'undefined') return text;
  try {
    const withDisplay = text.replace(/\$\$(.*?)\$\$/g, (match, expression) => katex.renderToString(expression, { displayMode: true, throwOnError: false }));
    return withDisplay.replace(/\$(.*?)\$/g, (match, expression) => katex.renderToString(expression, { displayMode: false, throwOnError: false }));
  } catch (e) {
    console.error(e);
    return text;
  }
};
</script>

<template>
  <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 text-slate-800 dark:text-slate-200">
    <RouterLink to="/" class="mb-6 flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:underline">
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
      <section class="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <h2
          class="text-2xl font-semibold mb-4 border-b pb-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">
          Nova Pergunta
        </h2>
        <div class="space-y-4">
          <div>
            <label for="question" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Enunciado da Pergunta</label>
            <textarea id="question" v-model="newQuestion.text"
              placeholder="Ex: Qual o valor de $$x$$ na equação $$x^2 + 5 = 14$$ ?"
              class="w-full p-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
              rows="3"></textarea>
            <p class="text-xs text-slate-500 mt-1">Use `$$...$$` para fórmulas em bloco e `$...$` para fórmulas na linha.</p>
          </div>
          <div>
            <label for="category" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Categoria</label>
            <select id="category" v-model="newQuestion.category"
              class="w-full p-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none">
              <option disabled value="">Selecione uma categoria</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <div v-if="newQuestion.text" class="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
            <h4 class="text-sm font-semibold mb-2 text-slate-900 dark:text-slate-100">Pré-visualização:</h4>
            <div class="prose dark:prose-invert max-w-none" v-html="renderKatexPreview(newQuestion.text)"></div>
          </div>
          <div>
            <h3 class="text-lg font-medium mb-2 text-slate-900 dark:text-slate-100">Opções de Resposta</h3>
            <div v-for="(option, index) in newQuestion.options" :key="index" class="flex items-center gap-2 mb-2">
              <input type="radio" :name="'correct-option'" :value="index"
                :checked="newQuestion.correctAnswerIndex === index" @change="setCorrectAnswer(index)"
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
            <button @click="addOption" class="mt-2 text-sm text-cyan-600 dark:text-cyan-400 hover:underline">+ Adicionar opção</button>
          </div>
        </div>
        <div class="mt-6 text-right">
          <button @click="saveQuestion"
            class="bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-700 transition-colors shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed"
            :disabled="!isQuestionValid">
            Salvar Pergunta
          </button>
        </div>
      </section>

      <section class="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <h2 class="text-2xl font-semibold mb-4 border-b pb-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">
          Perguntas Criadas
        </h2>
        <div v-if="!questions || questions.length === 0" class="text-center text-slate-500 py-8">
          <p>Nenhuma pergunta criada ainda.</p>
        </div>
        <ul v-else class="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <QuestionListItem
            v-for="(q, index) in questions"
            :key="q.text + index"
            :question="q"
          />
        </ul>
      </section>
    </main>
  </div>
</template>

<style scoped>
.overflow-y-auto::-webkit-scrollbar { width: 8px; }
.overflow-y-auto::-webkit-scrollbar-track { background: transparent; }
.overflow-y-auto::-webkit-scrollbar-thumb { background-color: #94a3b8; border-radius: 20px; border: 3px solid transparent; background-clip: content-box; }
.overflow-y-auto::-webkit-scrollbar-thumb:hover { background-color: #475569; }
:deep(.katex) { color: inherit !important; }
</style>
