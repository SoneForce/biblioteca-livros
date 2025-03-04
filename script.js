// js/script.js
let livros = [];

// Carregar dados do arquivo JSON
async function carregarDados() {
    try {
        const resposta = await fetch('data/livros.json');
        livros = await resposta.json();
    } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
    }
}

// Função de busca de livros
function buscarLivros() {
    const termoBusca = document.getElementById('searchInput').value.toLowerCase();
    const corpoTabela = document.getElementById('corpoTabela');
    corpoTabela.innerHTML = '';

    const resultados = livros.filter(livro => 
        livro.titulo.toLowerCase().includes(termoBusca)
    );

    resultados.forEach(livro => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>${livro.quantidade}</td>
        `;
        corpoTabela.appendChild(linha);
    });
}

// Carregar dados quando a página carregar
carregarDados();