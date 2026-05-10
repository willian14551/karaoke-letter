function telaSobre() {
  desenharMoldura();

  fill(255);
  noStroke();
  textSize(36);
  text("SOBRE", width / 2, 150);

  textSize(16);
  text(
    "KARAOKE LETTER é um jogo rítmico\n de músicas para praticar digitação.",
    width / 2,
    height / 2,
  );

  textSize(12);
  fill(200);
  text("PRESSIONE Q PARA VOLTAR", width / 2, height - 60);
}
