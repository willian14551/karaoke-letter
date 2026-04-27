function telaCreditos() {
  desenharMoldura();

  fill(255);
  noStroke();
  textSize(36);
  text("CREDITOS", width / 2, 150);

  textSize(12);
  text("github.com/willian14551/karaoke-letter", width / 2, 200);

  textSize(18);
  text("@PKamilly", width / 2, 350);
  text("@sergiocalazans", width / 2, 400);
  text("@willian14551", width / 2, 450);

  textSize(12);
  text("PRESSIONE ESC PARA VOLTAR", width / 2, height - 60);
}
