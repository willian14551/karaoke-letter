let selecionadoPause = 0;
let botoesPause = [];

function telaPause() {
  estadoAnterior = "PAUSE";
  desenharBackgroundAnimado();

  desenharMoldura();

  fill(255, 200, 0);
  noStroke();
  textSize(42);
  textAlign(CENTER, CENTER);
  text("PAUSE", width / 2, 150);

  if (botoesPause.length === 0) {
    criarBotoesPause();
  }

  for (let i = 0; i < botoesPause.length; i++) {
    botoesPause[i].desenhar(i === selecionadoPause);
  }

  fill(150);
  textSize(12);
  textAlign(CENTER, CENTER);
  text("↑↓ SELECIONAR   ENTER CONFIRMAR", width / 2, height - 60);
}

function criarBotoesPause() {
  botoesPause = [
    new Botao(
      width / 2,
      height / 2 - 30,
      250,
      50,
      "RETOMAR",
      color(0, 200, 0),
      color(100, 255, 100),
    ),
    new Botao(
      width / 2,
      height / 2 + 40,
      250,
      50,
      "OPÇÕES",
      color(0, 150, 255),
      color(0, 255, 255),
    ),
    new Botao(
      width / 2,
      height / 2 + 110,
      250,
      50,
      "DESISTIR",
      color(200, 0, 0),
      color(255, 50, 50),
    ),
  ];
}

function pauseKeyPressed() {
  if (keyCode === UP_ARROW) {
    selecionadoPause =
      (selecionadoPause - 1 + botoesPause.length) % botoesPause.length;
    tocarSomUI();
  } else if (keyCode === DOWN_ARROW) {
    selecionadoPause = (selecionadoPause + 1) % botoesPause.length;
    tocarSomUI();
  } else if (keyCode === ENTER) {
    tocarSomUI();
    executarAcaoPause();
  }
}

function executarAcaoPause() {
  let acao = botoesPause[selecionadoPause].texto;

  if (acao === "RETOMAR") {
    musicas[musicaSelecionada].play();
    estado = "GAMEPLAY";
  } else if (acao === "OPÇÕES") {
    estadoAnterior = "PAUSE";
    mudarEstado("OPÇÕES");
  } else if (acao === "DESISTIR") {
    musicas[musicaSelecionada].stop();
    mudarEstado("INICIO");
  }
}
