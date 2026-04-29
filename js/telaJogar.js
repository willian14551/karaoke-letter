function corDificuldade(dif) {
  if (dif === "FACIL") return color(0, 200, 0);
  if (dif === "MEDIO") return color(200, 150, 0);
  if (dif === "DIFICIL") return color(200, 0, 0);
  return color(0, 200, 255);
}

function telaJogar() {
  desenharBackgroundAnimado();
  desenharMoldura();

  fill(255);
  noStroke();
  textSize(36);
  text("JOGAR", width / 2, 150);

  let musicas = dadosMusicas.musicas;

  for (let i = 0; i < musicas.length; i++) {
    let m = musicas[i];
    let dif = m.dificuldade || "?";
    let y = 270 + i * 75;

    if (i === musicaSelecionada) {
      fill(corDificuldade(dif));
      textSize(20);
      text("> " + m.titulo + "  [" + dif + "] <", width / 2, y);

      fill(180);
      noStroke();
      textSize(11);
      text(m.artista, width / 2, y + 26);
    } else {
      fill(120);
      noStroke();
      textSize(14);
      text(m.titulo + "  [" + dif + "]", width / 2, y);
    }
  }

  fill(200);
  textSize(12);
  text("↑↓ SELECIONAR   ENTER JOGAR   ESC VOLTAR", width / 2, height - 60);
}
