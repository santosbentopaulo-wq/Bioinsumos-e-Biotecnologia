// ===========================================
// DADOS DO QUIZ
// Cada pergunta tem: texto, lista de opções e o índice da resposta correta
// ===========================================
const perguntas = [
  {
    pergunta: "O que são bioinsumos?",
    opcoes: [
      "Produtos feitos a partir de seres vivos usados na agricultura",
      "Máquinas agrícolas modernas",
      "Produtos químicos sintéticos para pragas",
      "Tipos de adubo mineral importado"
    ],
    correta: 0
  },
  {
    pergunta: "Qual é uma vantagem do uso de bioinsumos na lavoura?",
    opcoes: [
      "Aumenta a poluição do solo",
      "Reduz o uso de produtos químicos sintéticos",
      "Deixa as plantas mais fracas",
      "Não tem nenhuma vantagem"
    ],
    correta: 1
  },
  {
    pergunta: "A biotecnologia agrícola pode ser usada para:",
    opcoes: [
      "Apenas pintar as folhas das plantas",
      "Criar sementes mais resistentes a pragas e doenças",
      "Substituir totalmente a água na irrigação",
      "Eliminar a necessidade de sol nas plantas"
    ],
    correta: 1
  },
  {
    pergunta: "Quais organismos podem ser usados na produção de bioinsumos?",
    opcoes: [
      "Apenas metais pesados",
      "Bactérias, fungos e outros microrganismos",
      "Somente plástico reciclado",
      "Apenas produtos derivados do petróleo"
    ],
    correta: 1
  },
  {
    pergunta: "Por que bioinsumos e biotecnologia são importantes para o futuro da agricultura?",
    opcoes: [
      "Porque aumentam a poluição ambiental",
      "Porque tornam a produção de alimentos menos sustentável",
      "Porque ajudam a produzir alimentos de forma mais sustentável e saudável",
      "Porque eliminam a necessidade de plantar"
    ],
    correta: 2
  }
];

// ===========================================
// VARIÁVEIS DE CONTROLE DO QUIZ
// ===========================================
let perguntaAtual = 0;   // índice da pergunta atual
let pontuacao = 0;       // pontuação do usuário
let respondeuAtual = false; // evita clicar em mais de uma opção por pergunta

// ===========================================
// REFERÊNCIAS AOS ELEMENTOS DO HTML
// ===========================================
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

// ===========================================
// FUNÇÃO: Carrega a pergunta atual na tela
// ===========================================
function carregarPergunta() {
  // Reseta estado
  respondeuAtual = false;
  feedback.textContent = "";
  feedback.className = "feedback";
  nextBtn.style.display = "none";
  optionsContainer.innerHTML = "";

  const dadosPergunta = perguntas[perguntaAtual];
  questionText.textContent = `${perguntaAtual + 1}. ${dadosPergunta.pergunta}`;

  // Cria um botão para cada opção de resposta
  dadosPergunta.opcoes.forEach((opcao, index) => {
    const botao = document.createElement("button");
    botao.textContent = opcao;
    botao.classList.add("option-btn");
    botao.addEventListener("click", () => verificarResposta(index, botao));
    optionsContainer.appendChild(botao);
  });
}

// ===========================================
// FUNÇÃO: Verifica se a resposta escolhida está correta
// ===========================================
function verificarResposta(indiceEscolhido, botaoClicado) {
  if (respondeuAtual) return; // impede múltiplas respostas
  respondeuAtual = true;

  const dadosPergunta = perguntas[perguntaAtual];
  const indiceCorreto = dadosPergunta.correta;
  const todosBotoes = optionsContainer.querySelectorAll(".option-btn");

  // Desabilita todos os botões após responder
  todosBotoes.forEach(btn => btn.disabled = true);

  if (indiceEscolhido === indiceCorreto) {
    // Resposta correta
    botaoClicado.classList.add("correct");
    feedback.textContent = "✅ Resposta correta!";
    feedback.classList.add("correct-text");
    pontuacao++;
  } else {
    // Resposta incorreta
    botaoClicado.classList.add("incorrect");
    feedback.textContent = "❌ Resposta incorreta!";
    feedback.classList.add("incorrect-text");

    // Destaca também a opção correta
    todosBotoes[indiceCorreto].classList.add("correct");
  }

  // Mostra botão para avançar
  nextBtn.style.display = "inline-block";
}

// ===========================================
// FUNÇÃO: Avança para a próxima pergunta ou mostra resultado
// ===========================================
function proximaPergunta() {
  perguntaAtual++;

  if (perguntaAtual < perguntas.length) {
    carregarPergunta();
  } else {
    mostrarResultado();
  }
}

// ===========================================
// FUNÇÃO: Mostra a pontuação final
// ===========================================
function mostrarResultado() {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";
  scoreText.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;
}

// ===========================================
// FUNÇÃO: Reinicia o quiz do zero
// ===========================================
function reiniciarQuiz() {
  perguntaAtual = 0;
  pontuacao = 0;
  resultContainer.style.display = "none";
  quizContainer.style.display = "block";
  carregarPergunta();
}

// ===========================================
// EVENTOS
// ===========================================
nextBtn.addEventListener("click", proximaPergunta);
restartBtn.addEventListener("click", reiniciarQuiz);

// ===========================================
// INICIA O QUIZ AO CARREGAR A PÁGINA
// ===========================================
carregarPergunta();
