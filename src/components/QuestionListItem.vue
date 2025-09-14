<script setup>
import { onMounted, ref, watch, nextTick } from 'vue'


/* Problema em atualizar a lista  */
const props = defineProps({
  question: {
    type: Object,
    required: true
  }
})

const questionContainer = ref(null)

const renderMath = () => {
  nextTick(() => {
    if (questionContainer.value && window.renderMathInElement) {
      window.renderMathInElement(questionContainer.value, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ]
      });
    }
  });
}

onMounted(renderMath);
watch(() => props.question.text, renderMath);
watch(() => props.question.options, renderMath, { deep: true });
</script>

<template>
  <li ref="questionContainer" class="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
    <div class="flex justify-between items-start mb-2">
      <div class="font-semibold flex-grow pr-2">{{ question.text }}</div>
      <span
        class="flex-shrink-0 bg-cyan-100 text-cyan-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded-full dark:bg-cyan-900 dark:text-cyan-300">
        {{ question.category }}
      </span>
    </div>
    <ul class="list-disc list-inside space-y-1 pl-2">
      <li v-for="(opt, optIndex) in question.options" :key="optIndex"
        :class="{ 'text-green-500 font-bold': opt.correct, 'text-slate-600 dark:text-slate-400': !opt.correct }">
        <span>{{ opt.text }}</span>
        <span v-if="opt.correct" class="text-xs ml-1">(Correta)</span>
      </li>
    </ul>
  </li>
</template>
