window.onscroll = () => {
    const header = document.querySelector('#header');
    const pesquisa = document.querySelector('.pesquisa');
    const banner = document.querySelector('.banner');
    
    header.classList.toggle('rolagem', window.scrollY > 200);
    banner.classList.toggle('desfoque', pesquisa.getBoundingClientRect().top < window.innerHeight && window.scrollY > 0);
};

async function buscarLivro() {
    const input = document.getElementById("searchInput").value.trim().toLowerCase();
    const listaResultados = document.getElementById("resultadoPesquisa");
    listaResultados.innerHTML = !input ? "<li>Digite um título ou autor</li>" : "";

    if (!input) return;

    try {
        const response = await fetch("livros.json");
        if (!response.ok) throw new Error("Erro ao carregar livros");
        const livros = await response.json();
        const resultados = livros.filter(l => 
            l.titulo.toLowerCase().includes(input) || l.autor.toLowerCase().includes(input)
        );

        listaResultados.innerHTML = resultados.length === 0 ? "<li>Nenhum livro encontrado</li>" : 
            resultados.map(livro => `
                <li class="${livro.quantidade > 0 ? 'disponivel' : 'indisponivel'}">
                    <div class="info-livro">${livro.titulo} - ${livro.autor} | ${livro.quantidade > 0 ? `Disponível: ${livro.quantidade}` : "Indisponível"}</div>
                    <button class="btn-detalhe" onclick="abrirCardDetalhe(${JSON.stringify(livro).replace(/"/g, '&quot;')})">Detalhes</button>
                </li>
            `).join("");
    } catch (error) {
        console.error("Erro:", error);
        listaResultados.innerHTML = "<li>Erro ao carregar livros</li>";
    }
}

function abrirCardDetalhe(livro) {
    document.querySelector(".overlay")?.remove();
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.innerHTML = `
        <div class="card-detalhe">
            <button class="btn-fechar">☓</button>
            <div class="card-detalhe-conteudo">
                ${livro.capa ? `<img src="${livro.capa}" alt="Capa de ${livro.titulo}" class="capa-livro">` : '<p class="sem-capa">Capa não disponível</p>'}
                <div class="detalhes-texto">
                    <h3>${livro.titulo}</h3>
                    <p><strong>Autor:</strong> ${livro.autor}</p>
                    <p><strong>Tema:</strong> ${livro.tema || "Não especificado"}</p>
                    <div class="sinopse"><h4>Sinopse:</h4><p>${livro.sinopse || "Não disponível"}</p></div>
                    <p class="disponibilidade ${livro.quantidade > 0 ? 'disponivel-texto' : 'indisponivel-texto'}">
                        ${livro.quantidade > 0 ? `Disponível: ${livro.quantidade}` : "Indisponível"}
                    </p>
                    ${livro.quantidade > 0 ? '<button class="btn-reservar">Reservar</button>' : ""}
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector(".btn-fechar").onclick = () => overlay.remove();
    if (livro.quantidade > 0) {
        overlay.querySelector(".btn-reservar").onclick = () => abrirCardReserva(livro, overlay);
    }
    overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };
}

function abrirCardReserva(livro, overlay) {
    overlay.innerHTML = `
        <div class="card-detalhe card-reserva">
            <h2>Reserva do Livro</h2>
            <p><strong>Título:</strong> ${livro.titulo}</p>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <div class="informacoes-biblioteca">
                <h4>Informações para Retirada:</h4>
                <p>Levar RG ou carteirinha estudantil</p>
                <p><strong>Horário:</strong> Seg-Sex, 8:00-12:00</p>
                <p><strong>Telefone:</strong> (11) 99999-9999</p>
            </div>
            <button class="btn-voltar">Voltar</button>
            <button class="btn-fechar-reserva">☓</button>
        </div>
    `;
    overlay.querySelector(".btn-voltar").onclick = () => abrirCardDetalhe(livro);
    overlay.querySelector(".btn-fechar-reserva").onclick = () => overlay.remove();
}

function abrirCardContato() {
    document.querySelector(".overlay")?.remove();
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.innerHTML = `
        <div class="card-detalhe">
            <h2>Contato da Biblioteca</h2>
            <div class="informacoes-biblioteca">
                <p><strong>Telefone:</strong> (11) 99999-9999</p>
                <p><strong>Horários:</strong> Segunda a Sexta, 8:00-17:00</p>
                <p><strong>Dias de Funcionamento:</strong> Segunda a Sexta</p>
                <p><strong>Endereço:</strong> R. Miguel Ferreira de Melo, 677 - Jardim Santo Andre, Santo André - SP</p>
            </div>
            <button class="btn-fechar">☓</button>
        </div>
    `;
    document.body.appendChild(overlay);
    
    overlay.querySelector(".btn-fechar").onclick = () => overlay.remove();
    overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };
}

async function carregarSugestoes() {
    try {
        const response = await fetch("livros.json");
        if (!response.ok) throw new Error("Erro ao carregar livros");
        const livros = await response.json();
        const livrosDisponiveis = livros.filter(l => l.quantidade > 0);
        const sugestoes = livrosDisponiveis.sort(() => 0.5 - Math.random()).slice(0, 3);

        const destaquesContainer = document.getElementById("destaquesLivros");
        destaquesContainer.innerHTML = sugestoes.map(livro => `
            <div class="destaque-card">
                ${livro.capa ? `<img src="${livro.capa}" alt="Capa de ${livro.titulo}" class="capa-destaque">` : '<p class="sem-capa">Capa não disponível</p>'}
                <h3>${livro.titulo}</h3>
                <p><strong>Autor:</strong> ${livro.autor}</p>
                <p><strong>Disponível:</strong> ${livro.quantidade}</p>
                <button class="btn-detalhe" onclick="abrirCardDetalhe(${JSON.stringify(livro).replace(/"/g, '&quot;')})">Detalhes</button>
            </div>
        `).join("");
    } catch (error) {
        console.error("Erro ao carregar sugestões:", error);
    }
}
function toggleAcessibilidadeMenu() {
    const menu = document.getElementById('acessibilidade-menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}
function aplicarModo(modo) {
    document.body.classList.remove('dark', 'protanopia', 'deuteranopia', 'tritanopia');
    if (modo !== 'light') {
        document.body.classList.add(modo);
    }
    localStorage.setItem('modoAcessibilidade', modo);
    toggleAcessibilidadeMenu();
}
document.addEventListener('DOMContentLoaded', () => {
    const modoSalvo = localStorage.getItem('modoAcessibilidade') || 'light';
    aplicarModo(modoSalvo);
});
document.addEventListener("DOMContentLoaded", carregarSugestoes);
