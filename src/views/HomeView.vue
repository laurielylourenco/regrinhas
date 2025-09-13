<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center p-4">
    <header>
      <h1 class="text-5xl md:text-6xl font-bold text-cyan-600 dark:text-cyan-400">Regrinhas 📐</h1>
      <p class="mt-4 text-xl text-slate-600 dark:text-slate-400">Seu quiz de matemática personalizado.</p>
    </header>
    <div class="mt-12 flex flex-col sm:flex-row gap-4">
      <RouterLink
        to="/quiz"
        class="bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-700 transition-colors shadow-lg text-lg w-64"
      >
        Começar o Jogo
      </RouterLink>
      <RouterLink
        to="/create"
        class="bg-slate-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-800 transition-colors shadow-lg text-lg w-64"
      >
        Criar Perguntas
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos para esta página, se necessário */
</style>
