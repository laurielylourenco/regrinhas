<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useQuestionsStore } from '@/stores/questions'
import { storeToRefs } from 'pinia'

// --- Store e Estado do Jogo ---
const questionsStore = useQuestionsStore()
const { questions } = storeToRefs(questionsStore)
const shuffledQuestions = ref([])
const currentQuestionIndex = ref(0)
const selectedAnswerIndex = ref(null)
const answerSubmitted = ref(false)
const score = ref(0)
const quizFinished = ref(false)

// --- LÓGICA DE PRÉ-RENDERIZAÇÃO DE FÓRMULAS ---

// Função que pega um texto com $$...$$ e converte para HTML
const renderTextToHtml = (text) => {
  if (!text || typeof katex === 'undefined') {
    return text;
  }
  // Primeiro, lida com as fórmulas em bloco ($$)
  let renderedText = text.replace(/\$\$(.*?)\$\$/g, (match, expression) => {
    try {
      return katex.renderToString(expression, { displayMode: true, throwOnError: false });
    } catch (e) {
      return match; // Em caso de erro, retorna o texto original
    }
  });
  // Depois, lida com as fórmulas em linha ($) - se você as usar
  renderedText = renderedText.replace(/\$(.*?)\$/g, (match, expression) => {
     try {
      return katex.renderToString(expression, { displayMode: false, throwOnError: false });
    } catch (e) {
      return match;
    }
  });
  return renderedText;
}

// A pergunta atual, sem processamento
const currentQuestion = computed(() => {
  return shuffledQuestions.value[currentQuestionIndex.value]
})

// UMA NOVA PROPRIEDADE COMPUTADA: A PERGUNTA COM AS FÓRMULAS JÁ RENDERIZADAS
const processedQuestion = computed(() => {
  const question = currentQuestion.value;
  if (!question) return null;

  // Cria um novo objeto para não modificar o original
  return {
    ...question,
    // Processa o texto do enunciado
    text: renderTextToHtml(question.text),
    // Processa o texto de cada opção
    options: question.options.map(option => ({
      ...option,
      text: renderTextToHtml(option.text)
    }))
  };
})


// --- Lógica Principal do Jogo ---

watch(questions, (newQuestions) => {
  if (newQuestions && newQuestions.length > 0) {
    shuffledQuestions.value = [...newQuestions].sort(() => Math.random() - 0.5)
  }
})

const selectAnswer = (index) => {
  if (answerSubmitted.value) return
  selectedAnswerIndex.value = index
}

const submitAnswer = () => {
  if (selectedAnswerIndex.value === null) return
  answerSubmitted.value = true
  if (selectedAnswerIndex.value === currentQuestion.value.correctAnswerIndex) {
    score.value++
  }
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < shuffledQuestions.value.length - 1) {
    currentQuestionIndex.value++
    selectedAnswerIndex.value = null
    answerSubmitted.value = false
  } else {
    quizFinished.value = true
  }
}

const restartQuiz = () => {
  quizFinished.value = false
  currentQuestionIndex.value = 0
  selectedAnswerIndex.value = null
  answerSubmitted.value = false
  score.value = 0
  shuffledQuestions.value.sort(() => Math.random() - 0.5)
}

onMounted(() => {
  questionsStore.loadQuestions()
})

const getOptionClass = (index) => {
  if (!answerSubmitted.value) {
    return 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700'
  }
  const isCorrect = index === currentQuestion.value.correctAnswerIndex
  const isSelected = index === selectedAnswerIndex.value
  if (isCorrect) return 'bg-green-100 dark:bg-green-900/50 border-green-500'
  if (isSelected && !isCorrect) return 'bg-red-100 dark:bg-red-900/50 border-red-500'
  return 'border-slate-300 dark:border-slate-600'
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4 text-slate-800 dark:text-slate-200">

    <div v-if="quizFinished" class="text-center bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg animate-fade-in">
      <h2 class="text-3xl font-bold text-cyan-600 dark:text-cyan-400">Quiz Finalizado!</h2>
      <p class="mt-4 text-2xl">
        Sua pontuação: <span class="font-bold text-cyan-500">{{ score }}</span> de <span class="font-bold">{{ shuffledQuestions.length }}</span>
      </p>
      <div class="mt-8 flex flex-col sm:flex-row gap-4">
        <button @click="restartQuiz" class="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-700 transition-colors shadow-lg text-lg">
          Jogar Novamente
        </button>
        <RouterLink to="/" class="bg-slate-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-800 transition-colors shadow-lg text-lg flex items-center justify-center">
          Voltar ao Início
        </RouterLink>
      </div>
    </div>

    <div v-else-if="processedQuestion" class="w-full max-w-3xl bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg animate-fade-in">
      <div>
        <div class="flex justify-between items-center mb-6 text-lg">
          <span class="text-slate-600 dark:text-slate-400">Pergunta {{ currentQuestionIndex + 1 }} de {{ shuffledQuestions.length }}</span>
          <span class="font-bold text-cyan-500">Pontos: {{ score }}</span>
        </div>

        <div class="mb-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
           <div class="flex justify-between items-center mb-2">
             <span class="font-semibold text-xl" v-html="processedQuestion.text"></span>
             <span class="flex-shrink-0 bg-cyan-100 text-cyan-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded-full dark:bg-cyan-900 dark:text-cyan-300">
               {{ processedQuestion.category }}
             </span>
           </div>
        </div>

        <div class="space-y-3">
          <div v-for="(option, index) in processedQuestion.options" :key="index" @click="selectAnswer(index)" :class="[getOptionClass(index), 'p-4 border rounded-lg transition-colors flex items-center']">
            <input type="radio" :name="'quiz-option'" :value="index" v-model="selectedAnswerIndex" class="form-radio h-5 w-5 mr-4 text-cyan-600 focus:ring-cyan-500 shrink-0" :disabled="answerSubmitted">
            <span class="text-lg" v-html="option.text"></span>
          </div>
        </div>

        <div class="mt-6 text-right">
           <button v-if="!answerSubmitted" @click="submitAnswer" :disabled="selectedAnswerIndex === null" class="bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-700 shadow-md disabled:bg-slate-400 disabled:cursor-not-allowed">
            Responder
          </button>
          <button v-else @click="nextQuestion" class="bg-slate-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-800 shadow-md">
            Próxima
          </button>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Carregando perguntas...</p>
    </div>
  </div>
</template>

<style scoped>
/* Adicione isso para que as fórmulas renderizadas herdem a cor do texto */
:deep(.katex) {
  color: inherit !important;
}

.animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
