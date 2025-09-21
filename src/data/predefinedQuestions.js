// Extraímos as perguntas para um arquivo separado para manter a organização
export default [
  {
    text: 'Qual é o valor da soma $$ \\frac{1}{2} + \\frac{1}{4} $$?',
    category: 'Frações',
    options: [
      { text: '$$ \\frac{1}{6} $$', correct: false },
      { text: '$$ \\frac{2}{6} $$', correct: false },
      { text: '$$ \\frac{3}{4} $$', correct: true },
      { text: '$$ \\frac{2}{4} $$', correct: false },
    ],
    correctAnswerIndex: 2,
  },
  {
    text: 'Se um triângulo retângulo tem catetos medindo 3cm e 4cm, qual é o comprimento da hipotenusa?',
    category: 'Geometria',
    options: [
      { text: '5 cm', correct: true },
      { text: '6 cm', correct: false },
      { text: '7 cm', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  {
    text: 'Qual é o valor de $$ \\sin(90^{\\circ}) $$?',
    category: 'Trigonometria',
    options: [
      { text: '0', correct: false },
      { text: '1', correct: true },
      { text: '-1', correct: false },
      { text: '$$ \\frac{\\sqrt{2}}{2} $$', correct: false },
    ],
    correctAnswerIndex: 1,
  },
  {
    text: 'Resolva a equação de primeiro grau: $$2x - 8 = 4$$',
    category: 'Álgebra',
    options: [
      { text: 'x = 4', correct: false },
      { text: 'x = 6', correct: true },
      { text: 'x = -2', correct: false },
    ],
    correctAnswerIndex: 1,
  },
  // FATORAÇÃO
  {
    text: 'Qual é a forma fatorada de $$x^2 - 9$$?',
    category: 'Fatoração',
    options: [
      { text: '$$(x - 3)(x + 3)$$', correct: true },
      { text: '$$(x - 3)^2$$', correct: false },
      { text: '$$(x + 3)^2$$', correct: false },
      { text: '$$(x - 9)(x + 1)$$', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  {
    text: 'Fatore completamente: $$2x^2 + 8x + 6$$',
    category: 'Fatoração',
    options: [
      { text: '$$2(x + 1)(x + 3)$$', correct: true },
      { text: '$$(2x + 2)(x + 3)$$', correct: false },
      { text: '$$2(x^2 + 4x + 3)$$', correct: false },
      { text: '$$(x + 1)(2x + 6)$$', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  {
    text: 'Qual é a fatoração de $$a^3 - b^3$$?',
    category: 'Fatoração',
    options: [
      { text: '$$(a - b)(a^2 + ab + b^2)$$', correct: true },
      { text: '$$(a - b)(a^2 - ab + b^2)$$', correct: false },
      { text: '$$(a + b)(a^2 - ab + b^2)$$', correct: false },
      { text: '$$(a - b)^3$$', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  // RADICIAÇÃO
  {
    text: 'Simplifique: $$\\sqrt{48}$$',
    category: 'Radiciação',
    options: [
      { text: '$$4\\sqrt{3}$$', correct: true },
      { text: '$$2\\sqrt{12}$$', correct: false },
      { text: '$$6\\sqrt{2}$$', correct: false },
      { text: '$$8\\sqrt{3}$$', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  {
    text: 'Qual é o valor de $$\\sqrt[3]{8} + \\sqrt[4]{16}$$?',
    category: 'Radiciação',
    options: [
      { text: '4', correct: true },
      { text: '6', correct: false },
      { text: '2', correct: false },
      { text: '8', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  {
    text: 'Racionalize: $$\\frac{1}{\\sqrt{2}}$$',
    category: 'Radiciação',
    options: [
      { text: '$$\\frac{\\sqrt{2}}{2}$$', correct: true },
      { text: '$$\\frac{2}{\\sqrt{2}}$$', correct: false },
      { text: '$$\\sqrt{2}$$', correct: false },
      { text: '$$\\frac{1}{2}$$', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  // LOGARITMOS
  {
    text: 'Qual é o valor de $$\\log_2 8$$?',
    category: 'Logaritmos',
    options: [
      { text: '3', correct: true },
      { text: '2', correct: false },
      { text: '4', correct: false },
      { text: '1', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  {
    text: 'Resolva: $$\\log_x 16 = 2$$',
    category: 'Logaritmos',
    options: [
      { text: 'x = 4', correct: true },
      { text: 'x = 2', correct: false },
      { text: 'x = 8', correct: false },
      { text: 'x = 16', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  {
    text: 'Qual é a propriedade: $$\\log(ab) = ?$$',
    category: 'Logaritmos',
    options: [
      { text: '$$\\log a + \\log b$$', correct: true },
      { text: '$$\\log a \\cdot \\log b$$', correct: false },
      { text: '$$\\log a - \\log b$$', correct: false },
      { text: '$$\\frac{\\log a}{\\log b}$$', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  // TRIGONOMETRIA - FÓRMULAS
  {
    text: 'Qual é a identidade fundamental da trigonometria?',
    category: 'Trigonometria',
    options: [
      { text: '$$\\sin^2 x + \\cos^2 x = 1$$', correct: true },
      { text: '$$\\sin x + \\cos x = 1$$', correct: false },
      { text: '$$\\sin^2 x - \\cos^2 x = 1$$', correct: false },
      { text: '$$\\sin x \\cdot \\cos x = 1$$', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  {
    text: 'Qual é o valor de $$\\cos(60^{\\circ})$$?',
    category: 'Trigonometria',
    options: [
      { text: '$$\\frac{1}{2}$$', correct: true },
      { text: '$$\\frac{\\sqrt{3}}{2}$$', correct: false },
      { text: '$$\\frac{\\sqrt{2}}{2}$$', correct: false },
      { text: '1', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  {
    text: 'Qual é a fórmula do seno da soma: $$\\sin(a + b) = ?$$',
    category: 'Trigonometria',
    options: [
      { text: '$$\\sin a \\cos b + \\cos a \\sin b$$', correct: true },
      { text: '$$\\sin a \\cos b - \\cos a \\sin b$$', correct: false },
      { text: '$$\\sin a + \\sin b$$', correct: false },
      { text: '$$\\cos a \\cos b + \\sin a \\sin b$$', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  {
    text: 'Qual é o período da função $$\\sin(2x)$$?',
    category: 'Trigonometria',
    options: [
      { text: '$$\\pi$$', correct: true },
      { text: '$$2\\pi$$', correct: false },
      { text: '$$4\\pi$$', correct: false },
      { text: '$$\\frac{\\pi}{2}$$', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  {
    text: 'Qual é a fórmula da lei dos cossenos?',
    category: 'Trigonometria',
    options: [
      { text: '$$a^2 = b^2 + c^2 - 2bc\\cos A$$', correct: true },
      { text: '$$a^2 = b^2 + c^2 + 2bc\\cos A$$', correct: false },
      { text: '$$a = b\\cos C + c\\cos B$$', correct: false },
      { text: '$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B}$$', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  // PRÉ-CÁLCULO - CONCEITOS TEÓRICOS
  {
    text: 'Qual é o domínio da função $$f(x) = \\sqrt{x - 2}$$?',
    category: 'Pré-Cálculo',
    options: [
      { text: '$$[2, +\\infty)$$', correct: true },
      { text: '$$(-\\infty, 2]$$', correct: false },
      { text: '$$(-\\infty, +\\infty)$$', correct: false },
      { text: '$$(2, +\\infty)$$', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  {
    text: 'Qual é a definição de função par?',
    category: 'Pré-Cálculo',
    options: [
      { text: '$$f(-x) = f(x)$$', correct: true },
      { text: '$$f(-x) = -f(x)$$', correct: false },
      { text: '$$f(x) = f(x + 1)$$', correct: false },
      { text: '$$f(x) = f(x^2)$$', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  {
    text: 'Qual é o limite fundamental: $$\\lim_{x \\to 0} \\frac{\\sin x}{x} = ?$$',
    category: 'Pré-Cálculo',
    options: [
      { text: '1', correct: true },
      { text: '0', correct: false },
      { text: '$$\\infty$$', correct: false },
      { text: '$$-1$$', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  {
    text: 'Qual é a definição de continuidade de uma função em um ponto?',
    category: 'Pré-Cálculo',
    options: [
      { text: '$$\\lim_{x \\to a} f(x) = f(a)$$', correct: true },
      { text: '$$f(a)$$ existe', correct: false },
      { text: '$$\\lim_{x \\to a} f(x)$$ existe', correct: false },
      { text: '$$f(x)$$ é derivável em $$a$$', correct: false },
    ],
    correctAnswerIndex: 0,
  },
  {
    text: 'Qual é a regra da cadeia para derivadas?',
    category: 'Pré-Cálculo',
    options: [
      { text: "$$\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$$", correct: true },
      { text: "$$\\frac{d}{dx}[f(g(x))] = f'(x) \\cdot g'(x)$$", correct: false },
      { text: "$$\\frac{d}{dx}[f(g(x))] = f(g'(x))$$", correct: false },
      { text: "$$\\frac{d}{dx}[f(g(x))] = f'(x) + g'(x)$$", correct: false },
    ],
    correctAnswerIndex: 0,
  },
]
