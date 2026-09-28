const container = document.querySelector('.container');
const totalColunas = 10; // Número de colunas que preencherão a tela

for (let i = 0; i < totalColunas; i++) {
    const coluna = document.createElement('div');
    coluna.classList.add('coluna');

    // Aumentado o delay entre cada coluna (de 0.12s para 0.25s) para um efeito cascata mais espaçado
    coluna.style.animationDelay = `${i * 0.25}s`;

    container.appendChild(coluna);
}
