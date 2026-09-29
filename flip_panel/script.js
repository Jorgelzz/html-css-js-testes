// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURAÇÕES GERAIS
// ─────────────────────────────────────────────────────────────────────────────
const TOTAL_COLUMNS = 7;     // Quantidade de lâminas / colunas na tela
const flipDuration  = 800;   // Duração de cada giro individual (em ms)
const flipStepDelay = 120;   // Intervalo (delay) entre o início de cada coluna (onda de persiana)

// HTML do conteúdo completo que será fatiado entre as colunas
const portfolioContentHTML = `
  <div class="portfolio-content">
    <h1 class="portfolio-name">Jorge Luiz</h1>
    <div class="portfolio-role">
      <span>Software Engineer</span>
    </div>
  </div>
`;

const container = document.getElementById("container");
const replayBtn = document.getElementById("replayBtn");
const portfolioBgContent = document.querySelector(".portfolio-bg .portfolio-content");

let animationTimer = null;

// ─────────────────────────────────────────────────────────────────────────────
// MONTAGEM DO COMPONENTE E DISPARO DA ANIMAÇÃO
// ─────────────────────────────────────────────────────────────────────────────
function runFlipAnimation() {
  if (animationTimer) clearTimeout(animationTimer);

  // Limpa o container e redefine visibilidade
  container.innerHTML = "";
  container.style.opacity = "1";

  // Oculta o fundo real durante a transição 3D para evitar texto duplicado
  if (portfolioBgContent) {
    portfolioBgContent.classList.remove("visible");
  }

  for (let i = 0; i < TOTAL_COLUMNS; i++) {
    // 1. Wrapper da Coluna (perspectiva isolada)
    const wrapper = document.createElement("div");
    wrapper.classList.add("col-wrapper");

    // 2. Card 3D (transform-style: preserve-3d)
    const card = document.createElement("div");
    card.classList.add("card");

    // 3. Face A (Frente inicial: 0deg, cor sólida creme escuro)
    const faceA = document.createElement("div");
    faceA.classList.add("card-face", "face-a");
    faceA.style.transform = "rotateY(0deg)";

    // 4. Face B (Verso: 180deg, contém a fatia horizontal do conteúdo)
    const faceB = document.createElement("div");
    faceB.classList.add("card-face", "face-b");
    faceB.style.transform = "rotateY(180deg)";

    // Fatia do conteúdo com offset horizontal proporcional à coluna
    const slice = document.createElement("div");
    slice.classList.add("portfolio-slice");
    slice.style.left = `calc(-1 * ${i} * (100vw / ${TOTAL_COLUMNS}))`;
    slice.innerHTML = portfolioContentHTML;

    faceB.appendChild(slice);
    card.appendChild(faceA);
    card.appendChild(faceB);
    wrapper.appendChild(card);
    container.appendChild(wrapper);

    // 5. Animação 3D de Rotação estilo Persianas no eixo Y
    const flipDelay = i * flipStepDelay;

    card.animate(
      [
        { transform: "rotateY(0deg)" },
        { transform: "rotateY(180deg)" }
      ],
      {
        duration: flipDuration,
        delay: flipDelay,
        fill: "forwards",
        easing: "cubic-bezier(0.25, 1, 0.5, 1)"
      }
    );
  }

  // 6. Ao terminar a última coluna, exibe o fundo real estático de forma contínua
  const totalDuration = ((TOTAL_COLUMNS - 1) * flipStepDelay) + flipDuration;
  animationTimer = setTimeout(() => {
    if (portfolioBgContent) {
      portfolioBgContent.classList.add("visible");
    }
  }, totalDuration);
}

// Inicialização automática e listener do botão Replay
document.addEventListener("DOMContentLoaded", runFlipAnimation);
replayBtn?.addEventListener("click", runFlipAnimation);
