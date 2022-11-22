//seleção de elementos e variáveis globais
const numeroDeTentativa = document.getElementById('numeroDeTentativa');
const mensagemResultado = document.getElementById('mensagem--resultado');
const mostrarDifi = document.querySelector('.dificuldade');
const mostrarNiveis = document.querySelector('.niveis');
const celula = document.querySelector('.linha__celulas');
let estadoJogo = false;
let tentativa;
let bloquearNivel = false;
let tesouro = Math.ceil(Math.random() * 30);


// inicia o jogo
function iniciarJogo() {
  mostrarDifi.style.display = "block";
  mostrarNiveis.style.display = "block";
  celula.innerHTML = "";
  for (i = 1; i <= 30; i++) {
    celula.innerHTML += `<span id="${i}" class="celula" onclick="jogar(event, ${i})"></span>`
  }
}


// niveis de jogo
function selectLevel(level) {
  if (bloquearNivel) {
    return;
  }
  bloquearNivel = true;
  nivelEscolhido = level;

  if (nivelEscolhido === "Fácil") {
    tentativa = 12;
    estadoJogo = true;
    numeroDeTentativa.innerText = tentativa;
  } else if (nivelEscolhido === "Médio") {
    tentativa = 8;
    estadoJogo = true;
    numeroDeTentativa.innerText = tentativa;
  } else if (nivelEscolhido === "Difícil") {
    tentativa = 5;
    estadoJogo = true;
    numeroDeTentativa.innerText = tentativa;
  }
}


// função principal
function jogar(event, numCelula) {
  //  compara as tentativas e diminui por clique
  if (estadoJogo && tentativa > 0) {
    const elemento = event.target;
    tentativa--;
    numeroDeTentativa.innerText = tentativa;
    // determina se ganhou ou perdeu
    if (numCelula === tesouro) {
      elemento.style.background = "darkgreen";
      elemento.innerHTML = '<img src="imagens/tesouro.webp">';
      mensagemResultado.innerText = "Parabéns você achou o Tesouro";
      mensagemResultado.style.color = "#058310";
      estadoJogo = false;
    } else if (tentativa === 0) {
      elemento.innerHTML = '<img src="imagens/buraco.jpg">';
      mensagemResultado.innerText = "Você perdeu !! Tente novamente."
      mensagemResultado.style.color = "rgb(224, 4, 4)";
      document.getElementById(`${tesouro}`).innerHTML = '<img style="background-color: red" src="imagens/tesouro.webp">';
    }
    else {
      elemento.innerHTML = '<img src="imagens/buraco.jpg">';
    }
  }
}

// recomeça o jogo
function recomecar() {
  iniciarJogo();
  selectLevel();
  bloquearNivel = false;
  numeroDeTentativa.innerText = "?";
  mensagemResultado.innerText = "";
  tesouro = Math.ceil(Math.random() * 30);
}