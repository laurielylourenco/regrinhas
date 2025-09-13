<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h1 class="text-4xl font-bold text-cyan-600 dark:text-cyan-400">Quiz</h1>
        <p class="mt-4 text-xl text-slate-600 dark:text-slate-400">Em construção...</p>

        <div class="mt-8">
            <RouterLink
                to="/"
                class="bg-slate-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-800 transition-colors shadow-lg text-lg"
            >
                Voltar ao Início
            </RouterLink>
        </div>
    </div>
</template>
