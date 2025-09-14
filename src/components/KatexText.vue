<script setup>
import { ref, watch } from 'vue';

// O componente continua recebendo o texto como propriedade
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
});

// A referência para o elemento no template
const katexContainer = ref(null);

// A função que chama a biblioteca KaTeX
const renderMath = () => {
    if (katexContainer.value && window.renderMathInElement) {
        window.renderMathInElement(katexContainer.value, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false },
            ]
        });
    }
}

// AQUI ESTÁ A CORREÇÃO PRINCIPAL:
// Usamos um único 'watch' para observar o texto.
// 'immediate: true' -> Executa a função assim que o componente é criado (para a 1ª renderização).
// 'flush: 'post'' -> GARANTE que a função só será executada DEPOIS que o Vue atualizar a tela.
watch(() => props.text, () => {
    renderMath();
}, {
    flush: 'post',
    immediate: true
});

</script>

<template>
  <span ref="katexContainer">{{ text }}</span>
</template>
