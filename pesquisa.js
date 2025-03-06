async function buscarLivro() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let listaResultados = document.getElementById("resultadoPesquisa");
    listaResultados.innerHTML = "";
    
    try {
        let response = await fetch("livros.json");
        let livros = await response.json();

        let resultados = livros.filter(livro => 
            livro.titulo.toLowerCase().includes(input) || 
            livro.autor.toLowerCase().includes(input)
        );

        if (resultados.length === 0) {
            listaResultados.innerHTML = "<li>Nenhum livro encontrado</li>";
        } else {
            resultados.forEach(livro => {
                let item = document.createElement("li");
                
                let disponibilidade = "";
                if (livro.quantidade > 0) {
                    disponibilidade = `Disponível: ${livro.quantidade} exemplar(es)`;
                } else {
                    disponibilidade = "Indisponível";
                }
                
                item.textContent = `${livro.titulo} - ${livro.autor} | ${disponibilidade}`;
                
                if (livro.quantidade === 0) {
                    item.classList.add("indisponivel");
                } else {
                    item.classList.add("disponivel");
                }
                
                listaResultados.appendChild(item);
            });
        }
    } catch (error) {
        console.error("Erro ao buscar livros:", error);
        listaResultados.innerHTML = "<li>Erro ao carregar a lista de livros</li>";
    }
}