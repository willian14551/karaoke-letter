function telaOpcoes() {
  desenharBackgroundAnimado();
  desenharMoldura();

  fill(255);
  noStroke();
  textSize(36);
  text("OPÇÕES", width / 2, 150);

  let y = height / 2;

  if (opcaoSelecionada === 0) {
    fill(0, 200, 255);
    textSize(20);
    text("> DESABILITAR ESPAÇO: " + (ignorarEspaco ? "SIM" : "NÃO") + " <", width / 2, y);
  }

  fill(200);
  textSize(12);
  text("↑↓ SELECIONAR   ENTER ALTERAR   ESC VOLTAR", width / 2, height - 60);
}

function opcoesKeyPressed() {
  if (keyCode === ESCAPE) {
    tocarSomUI();
    mudarEstado("INICIO");
  } else if (keyCode === ENTER) {
    tocarSomUI();
    if (opcaoSelecionada === 0) {
      ignorarEspaco = !ignorarEspaco;
    }
  }
}