import { ref } from 'vue' // O 'watch' não é mais necessário aqui
import { defineStore } from 'pinia'
import predefinedQuestions from '@/data/predefinedQuestions.js'

// Define a "store" chamada 'questions'
export const useQuestionsStore = defineStore('questions', () => {
  // STATE: Onde os dados vivem
  const questions = ref([])

  // Função auxiliar para salvar explicitamente no localStorage
  function saveToLocalStorage() {
    localStorage.setItem('regrinhas-questions', JSON.stringify(questions.value))
  }

  // ACTION: Funções que modificam o estado
  function loadQuestions() {
    const savedQuestions = localStorage.getItem('regrinhas-questions')



    console.log('Carregando perguntas do localStorage:')
    if (savedQuestions) {
      try {
        const parsed = JSON.parse(savedQuestions)
        if (parsed && parsed.length > 0) {
          questions.value = parsed

           console.log('Para aqui se carregou com sucesso:', questions.value)
          return // Para aqui se carregou com sucesso
        }
      } catch (e) {
        console.error('Erro ao carregar perguntas do localStorage:', e)
      }
    }
    // Se não houver nada no localStorage, usa as predefinidas

    console.log('Se não houver nada no localStorage, usa as predefinidas:', savedQuestions)
    questions.value = predefinedQuestions
  }

  function addQuestion(newQuestion) {
    // 1. Adiciona a nova pergunta à lista na memória
    questions.value.push(newQuestion)
    // 2. Salva a lista atualizada diretamente no localStorage
    console.log('Adicionando nova pergunta e salvando no localStorage:', newQuestion)
    saveToLocalStorage()

    loadQuestions() // Recarrega para garantir que a UI está atualizada
  }

  // O watch foi REMOVIDO para evitar problemas de timing

  // O que a store expõe para os componentes
  return { questions, loadQuestions, addQuestion }
})
