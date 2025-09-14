// Extraímos as perguntas para um arquivo separado para manter a organização
export default [
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
