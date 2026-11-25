// Script usado em todas as páginas do portfólio

// Abre e fecha o menu no celular
function alternarMenu() {
    const lista = document.getElementById("menu-lista");
    const botao = document.getElementById("botao-menu");

    const aberto = lista.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", aberto);
    botao.textContent = aberto ? "✖" : "☰";
}

// Troca entre o tema claro e o tema escuro
function alternarTema() {
    const escuro = document.body.classList.toggle("tema-escuro");
    document.getElementById("botao-tema").textContent = escuro ? "☀️" : "🌙";

    try {
        localStorage.setItem("tema", escuro ? "escuro" : "claro");
    } catch (erro) {
        // se o navegador não deixar salvar, o tema só vale nesta página
    }
}

// Aplica o tema que a pessoa escolheu da última vez
function carregarTema() {
    try {
        if (localStorage.getItem("tema") === "escuro") {
            document.body.classList.add("tema-escuro");
            document.getElementById("botao-tema").textContent = "☀️";
        }
    } catch (erro) {
        // sem tema salvo, fica o tema claro
    }
}

// Escreve a saudação de acordo com a hora (só existe na página inicial)
function mostrarSaudacao() {
    const saudacao = document.getElementById("saudacao");
    if (!saudacao) {
        return;
    }

    const hora = new Date().getHours();
    let texto;

    if (hora < 12) {
        texto = "Bom dia! ☀️";
    } else if (hora < 18) {
        texto = "Boa tarde! 🌤️";
    } else {
        texto = "Boa noite! 🌙";
    }

    saudacao.textContent = texto + " Meu nome é";
}

// Mostra quantos caracteres já foram escritos na mensagem
function atualizarContador() {
    const mensagem = document.getElementById("mensagem");
    const contador = document.getElementById("contador");

    contador.textContent = mensagem.value.length + "/300";
}

// Escreve a resposta do formulário (tipo: "erro" ou "sucesso")
function mostrarResposta(texto, tipo) {
    const resposta = document.getElementById("resposta");

    resposta.textContent = texto;
    resposta.className = tipo;
}

// Valida o formulário de contato
function enviarFormulario(evento) {
    evento.preventDefault();

    const formulario = document.getElementById("formulario-contato");
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (nome.length < 3) {
        mostrarResposta("Digite um nome com pelo menos 3 letras.", "erro");
        return;
    }

    // Formato esperado: texto@texto.texto (sem espaços)
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(email)) {
        mostrarResposta("Digite um e-mail válido.", "erro");
        return;
    }

    if (mensagem.length < 10) {
        mostrarResposta("A mensagem precisa ter pelo menos 10 caracteres.", "erro");
        return;
    }

    mostrarResposta("Obrigado, " + nome + "! Sua mensagem foi enviada (simulação).", "sucesso");
    formulario.reset();
    atualizarContador();
}

// ===== Ligando as funções aos elementos da página =====
carregarTema();
mostrarSaudacao();

document.getElementById("botao-tema").addEventListener("click", alternarTema);
document.getElementById("botao-menu").addEventListener("click", alternarMenu);

// O formulário só existe na página de contato
const formularioContato = document.getElementById("formulario-contato");

if (formularioContato) {
    formularioContato.addEventListener("submit", enviarFormulario);
    document.getElementById("mensagem").addEventListener("input", atualizarContador);
}