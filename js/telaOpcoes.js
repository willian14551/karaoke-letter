let volumeMusica = 0.5;
let volumeSFX = 0.5;
let opcaoSelecionada = 0;

function telaOpcoes() {
  desenharBackgroundAnimado();
  desenharMoldura();

  fill(255);
  noStroke();
  textSize(36);
  textAlign(CENTER, CENTER);
  text("OPÇÕES", width / 2, 110);

  let opcoes = [
    { label: "VOLUME MÚSICA", valor: volumeMusica, tipo: "BARRA" },
    { label: "VOLUME EFEITOS", valor: volumeSFX, tipo: "BARRA" },
    {
      label: "TELA CHEIA",
      valor: fullscreen() ? "LIGADO" : "DESLIGADO",
      tipo: "TEXTO",
    },
    {
      label: "DESABILITAR ESPAÇO",
      valor: ignorarEspaco ? "SIM" : "NÃO",
      tipo: "TEXTO",
    },
  ];

  for (let i = 0; i < opcoes.length; i++) {
    let y = 245 + i * 75;
    let estaSelecionado = i === opcaoSelecionada;

    if (estaSelecionado) {
      fill(0, 255, 255);
      textSize(22);
      text("> " + opcoes[i].label + " <", width / 2, y);
    } else {
      fill(180);
      textSize(18);
      text(opcoes[i].label, width / 2, y);
    }

    if (opcoes[i].tipo === "BARRA") {
      desenharBarraVolume(width / 2, y + 32, opcoes[i].valor, estaSelecionado);
    } else {
      fill(estaSelecionado ? 255 : 150);
      textSize(16);
      text("[" + opcoes[i].valor + "]", width / 2, y + 32);
    }
  }

  fill(150);
  textSize(12);

  let destino = estadoAnterior === "PAUSE" ? "PAUSE" : "INÍCIO";
  text(
    "↑↓ SELECIONAR   ←→ AJUSTAR   ENTER CONFIRMAR   Q VOLTAR PARA " + destino,
    width / 2,
    height - 60,
  );
}

function opcoesKeyPressed() {
  if (key === "q" || key === "Q") {
    tocarSomUI();
    if (estadoAnterior === "PAUSE") {
      mudarEstado("PAUSE");
    } else {
      mudarEstado("INICIO");
    }
    return;
  }

  if (keyCode === UP_ARROW) {
    opcaoSelecionada = (opcaoSelecionada - 1 + 4) % 4;
    tocarSomUI();
  }
  if (keyCode === DOWN_ARROW) {
    opcaoSelecionada = (opcaoSelecionada + 1) % 4;
    tocarSomUI();
  }

  if (keyCode === LEFT_ARROW) {
    alterarVolume(-0.1);
  }
  if (keyCode === RIGHT_ARROW) {
    alterarVolume(0.1);
  }

  if (keyCode === ENTER) {
    if (opcaoSelecionada === 2) {
      fullscreen(!fullscreen());
      tocarSomUI();
    } else if (opcaoSelecionada === 3) {
      ignorarEspaco = !ignorarEspaco;
      tocarSomUI();
    }
  }
}

function desenharBarraVolume(x, y, porcentagem, ativo) {
  let larguraTotal = 240;
  let altura = 12;

  rectMode(CENTER);
  fill(50);
  noStroke();
  rect(x, y, larguraTotal, altura, 6);

  rectMode(CORNER);
  fill(ativo ? color(0, 255, 255) : color(0, 150, 150));
  rect(
    x - larguraTotal / 2,
    y - altura / 2,
    larguraTotal * porcentagem,
    altura,
    6,
  );

  rectMode(CENTER);
}

function alterarVolume(quantidade) {
  if (opcaoSelecionada === 0) {
    volumeMusica = constrain(volumeMusica + quantidade, 0, 1);
    musicas.forEach((m) => {
      if (m) m.setVolume(volumeMusica);
    });
  } else if (opcaoSelecionada === 1) {
    volumeSFX = constrain(volumeSFX + quantidade, 0, 1);
    if (somUI) somUI.setVolume(volumeSFX);
  }
  tocarSomUI();
}
