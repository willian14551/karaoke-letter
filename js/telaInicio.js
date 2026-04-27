function telaInicial() {  
  desenharBackgroundAnimado();
  desenharMoldura();

  fill(255);
  noStroke();
  textSize(36);
  text("KARAOKE LETTER", width / 2, 150);

  for (let i = 0; i < botoes.length; i++) {
    botoes[i].desenhar(i === selecionado);
  }
}
