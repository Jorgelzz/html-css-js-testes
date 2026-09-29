const app = document.getElementById("app");
const replayBtn = document.getElementById("replayBtn");
const portfolioBgContent = document.querySelector(".portfolio-bg .portfolio-content");

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURAÇÕES GERAIS
// ─────────────────────────────────────────────────────────────────────────────
const TOTAL_COLUMNS = 7; // Quantidade de colunas na tela

// Timings da animação (em ms)
const curtainStepDelay  = 110;  // atraso da cascata da cortina entre colunas
const curtainDuration   = 600;  // tempo de abertura (metade sobe / metade desce)
const pauseAfterCurtain = 200;  // pausa antes de iniciar o efeito persianas

// Efeito Persianas: rotação horizontal no eixo Y em cascata fluida
const flipDuration      = 800;  // tempo de giro de cada coluna
const flipStepDelay     = 120;  // intervalo entre o início de cada coluna (onda de persiana)

// HTML do conteúdo revelado em cada fatia
const portfolioContentHTML = `
  <div class="portfolio-content">
    <h1 class="portfolio-name">Jorge Luiz</h1>
    <div class="portfolio-role">
      <span>Software Engineer</span>
    </div>
  </div>
`;

let animationTimer = null;

// ─────────────────────────────────────────────────────────────────────────────
// MONTAGEM E EXECUÇÃO DA SEQUÊNCIA
// ─────────────────────────────────────────────────────────────────────────────
function runSequence() {
  if (animationTimer) clearTimeout(animationTimer);

  app.innerHTML = "";
  app.style.opacity = "1";
  
  // Oculta o texto no fundo real durante a animação para não haver texto duplicado
  if (portfolioBgContent) {
    portfolioBgContent.classList.remove("visible");
  }

  const lastCurtainEnds = ((TOTAL_COLUMNS - 1) * curtainStepDelay) + curtainDuration;
  const flipStart = lastCurtainEnds + pauseAfterCurtain;

  for (let i = 0; i < TOTAL_COLUMNS; i++) {
    // ── 1. Wrapper da coluna ──
    const wrapper = document.createElement("div");
    wrapper.classList.add("col-wrapper");

    // ── 2. Card 3D ──
    const card = document.createElement("div");
    card.classList.add("card");

    // FACE A: Cor creme escuro (visível inicialmente após a cortina abrir)
    const faceA = document.createElement("div");
    faceA.classList.add("card-face", "face-a");
    faceA.style.transform = "rotateY(0deg)";

    // FACE B: Contém a fatia horizontal precisa do portfólio no espaço 3D
    const faceB = document.createElement("div");
    faceB.classList.add("card-face", "face-b");
    faceB.style.transform = "rotateY(180deg)";

    const slice = document.createElement("div");
    slice.classList.add("portfolio-slice");
    // Deslocamento horizontal para alinhar com a viewport de 100vw
    slice.style.left = `calc(-1 * ${i} * (100vw / ${TOTAL_COLUMNS}))`;
    slice.innerHTML = portfolioContentHTML;

    faceB.appendChild(slice);
    card.appendChild(faceA);
    card.appendChild(faceB);

    // ── 3. Cortina Split (Superior sobe / Inferior desce) ──
    const curtain = document.createElement("div");
    curtain.classList.add("curtain");

    const curtainTop = document.createElement("div");
    curtainTop.classList.add("curtain-top");

    const curtainBottom = document.createElement("div");
    curtainBottom.classList.add("curtain-bottom");

    curtain.appendChild(curtainTop);
    curtain.appendChild(curtainBottom);

    wrapper.appendChild(card);
    wrapper.appendChild(curtain);
    app.appendChild(wrapper);

    // ── 4. Animação da Cortina (Split Vertical em Cascata) ──
    const curtainDelay = i * curtainStepDelay;

    curtainTop.animate(
      [
        { transform: "translateY(0%)" },
        { transform: "translateY(-100%)" }
      ],
      {
        duration: curtainDuration,
        delay: curtainDelay,
        fill: "forwards",
        easing: "cubic-bezier(0.77, 0, 0.175, 1)"
      }
    );

    curtainBottom.animate(
      [
        { transform: "translateY(0%)" },
        { transform: "translateY(100%)" }
      ],
      {
        duration: curtainDuration,
        delay: curtainDelay,
        fill: "forwards",
        easing: "cubic-bezier(0.77, 0, 0.175, 1)"
      }
    );

    // ── 5. Animação do Flip 3D Estilo Persianas (Giro no Eixo Y em Cascata) ──
    const flipDelay = flipStart + (i * flipStepDelay);

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

  // Ao finalizar o último flip, exibe o fundo principal de forma transparente e contínua
  const totalDuration = flipStart + ((TOTAL_COLUMNS - 1) * flipStepDelay) + flipDuration;
  animationTimer = setTimeout(() => {
    if (portfolioBgContent) {
      portfolioBgContent.classList.add("visible");
    }
  }, totalDuration);
}

document.addEventListener("DOMContentLoaded", runSequence);
replayBtn?.addEventListener("click", runSequence);
