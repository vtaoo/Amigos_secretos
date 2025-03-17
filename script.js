let nomes = [];

window.onload = function () {
    if (localStorage.getItem("nomes")) {
        nomes = JSON.parse(localStorage.getItem("nomes"));
        atualizarLista();
    }
};

// Adiciona um nome à lista
function adicionarNome() {
    let nome = document.getElementById("nome").value.trim();
    if (nome !== "" && !nomes.includes(nome)) {
        nomes.push(nome);
        atualizarLista();
        document.getElementById("nome").value = "";
        salvarNomes();
    } else {
        alert("Nome inválido ou já adicionado.");
    }
}

// Atualiza a lista de nomes na tela
function atualizarLista() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";
    nomes.forEach(nome => {
        let li = document.createElement("li");
        li.textContent = nome;
        lista.appendChild(li);
    });
}

// Limpa a lista de nomes
function limparLista() {
    nomes = [];
    atualizarLista();
    salvarNomes();
}

// Salva os nomes no localStorage
function salvarNomes() {
    localStorage.setItem("nomes", JSON.stringify(nomes));
}

// Realiza o sorteio
function sortear() {
    if (nomes.length < 2) {
        alert("Adicione pelo menos dois nomes para sortear.");
        return;
    }

    let sorteio = [...nomes];
    let resultado = {};

    // Embaralha os nomes
    sorteio.sort(() => Math.random() - 0.5);

    // Garante que ninguém tire a si mesmo
    for (let i = 0; i < sorteio.length; i++) {
        let amigoSecreto = sorteio[(i + 1) % sorteio.length]; // O último pega o primeiro
        resultado[sorteio[i]] = amigoSecreto;
    }

    // Esconde a lista de nomes
    document.getElementById("lista").innerHTML = "";
    
    exibirResultado(resultado);
}

// Exibe o resultado na tela
function exibirResultado(resultado) {
    let divResultado = document.getElementById("resultado");
    divResultado.innerHTML = "<h2>Resultado do Sorteio:</h2>";
    for (let chave in resultado) {
        divResultado.innerHTML += `<p>${chave} → ${resultado[chave]}</p>`;
    }
}

// Exporta o resultado como um arquivo de texto
function exportarResultado() {
    let resultado = document.getElementById("resultado").innerText;
    if (!resultado) {
        alert("Nenhum resultado para exportar.");
        return;
    }

    const blob = new Blob([resultado], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resultado_amigo_secreto.txt";
    link.click();
    URL.revokeObjectURL(url);
}