let botaoRetry;

function telaGameOver() {
  desenharBackgroundAnimado();
  desenharMoldura();

  if (!botaoRetry) {
    botaoRetry = new Botao(
      width / 2,
      height / 2 + 70,
      250,
      50,
      "TENTAR NOVAMENTE",
      color(0, 150, 255),
      color(0, 255, 255),
    );
  }

  fill(255, 50, 50);
  noStroke();
  textSize(42);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, 150);

  fill(255);
  textSize(20);
  text("Sua pontuação foi muito baixa...", width / 2, 250);

  textSize(28);
  fill(255, 100, 100);
  text("SCORE: " + pontuacao, width / 2, 320);

  botaoRetry.desenhar(true);

  textSize(12);
  fill(200);
  text(
    "PRESSIONE ENTER PARA REINICIAR OU PRESSIONE Q PARA VOLTAR AO MENU",
    width / 2,
    height - 60,
  );
}

function telaSucesso() {
  desenharBackgroundAnimado();
  desenharMoldura();

  let pulso = sin(frameCount * 0.1) * 5;

  fill(50, 255, 50);
  noStroke();
  textSize(42 + pulso);
  textAlign(CENTER, CENTER);
  text("PARABÉNS!", width / 2, 150);

  fill(255);
  textSize(20);
  text("Música concluída com sucesso!", width / 2, 250);

  textSize(32);
  fill(0, 255, 255);
  text("PONTUAÇÃO TOTAL: " + pontuacao, width / 2, 320);

  textSize(16);
  fill(200);
  if (pontuacao > 2000) text("VOCÊ É UM MESTRE DA DIGITAÇÃO!", width / 2, 400);
  else text("BOM TRABALHO!", width / 2, 400);

  textSize(12);
  fill(255);
  text(
    "PRESSIONE ESC PARA SAIR OU ENTER PARA O RANKING",
    width / 2,
    height - 60,
  );
}

function fimDeJogoKeyPressed() {
  if (key == "q" || key == "Q") {
    tocarSomUI();
    mudarEstado("INICIO");
  }

  if (keyCode === ENTER) {
    tocarSomUI();
    if (estado === "SUCESSO") {
      mudarEstado("RANKING");
    } else {
      mudarEstado("GAMEPLAY");
    }
  }
}
