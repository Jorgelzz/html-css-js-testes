

// função para criar as colunas
function createColumns(totalColumns) {
    const container = document.getElementById("squares");

    for (let i = 0; i < totalColumns; i++) {
        const column = document.createElement("div");
        column.classList.add("column");

        const topHalf = document.createElement("div");
        topHalf.classList.add("half-top");

        const bottomHalf = document.createElement("div");
        bottomHalf.classList.add("half-bottom");

        column.appendChild(topHalf);
        column.appendChild(bottomHalf);
        container.appendChild(column);
    }
}

createColumns(15);

const topHalf = document.querySelector(".half-top");
const bottomHalf = document.querySelector(".half-bottom");

const topHalves = document.querySelectorAll(".half-top");
const bottomHalves = document.querySelectorAll(".half-bottom");

// Para cada metade de cima (índice 0, 1, 2, 3)
topHalves.forEach((half, index) => {
    half.animate([
        { transform: "translateY(0)" },
        { transform: "translateY(-100%)" }
    ], {
        duration: 800,
        delay: index * 150,     // <-- 0ms, 150ms, 300ms, 450ms (efeito cascata!)
        fill: "forwards",
        easing: "cubic-bezier(0.77, 0, 0.175, 1)" // Deixa a saída super suave
    });
});

// Para cada metade de baixo
bottomHalves.forEach((half, index) => {
    half.animate([
        { transform: "translateY(0)" },
        { transform: "translateY(100%)" }
    ], {
        duration: 800,
        delay: index * 150,     // <-- mesmo delay para sincronizar com a coluna
        fill: "forwards",
        easing: "cubic-bezier(0.77, 0, 0.175, 1)"
    });
});
