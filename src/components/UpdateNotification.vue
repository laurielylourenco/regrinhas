<template>
  <div
    v-if="showUpdateNotification"
    class="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm z-50"
  >
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="flex-1">
        <h3 class="text-sm font-medium">Nova versão disponível!</h3>
        <p class="text-xs mt-1">
          Novas perguntas foram adicionadas. Atualize para ver as mudanças.
        </p>
        <div class="mt-3 flex space-x-2">
          <button
            @click="updateApp"
            class="bg-white text-blue-600 px-3 py-1 rounded text-xs font-medium hover:bg-blue-50 transition-colors"
          >
            Atualizar
          </button>
          <button
            @click="dismissNotification"
            class="text-blue-200 hover:text-white text-xs transition-colors"
          >
            Depois
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showUpdateNotification = ref(false)

onMounted(() => {
  // Verificar se há atualizações disponíveis
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // Service worker foi atualizado, recarregar a página
      window.location.reload()
    })

    // Verificar se há uma atualização pendente
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration && registration.waiting) {
        showUpdateNotification.value = true
      }
    })
  }
})

const updateApp = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      }
    })
  }
}

const dismissNotification = () => {
  showUpdateNotification.value = false
}
</script>
