let indiceMusicaSelecionada = 0;
let listaMusicas = ["What A Wonderful World", "Comfortably Numb", "Notion"];

function telaJogar() {
  desenharBackgroundAnimado();
  desenharMoldura();

  fill(255);
  noStroke();
  textSize(36);
  text("JOGAR", width / 2, 150);

  let musicaAtual = dadosMusicas.musicas[indiceMusicaSelecionada];

  stroke(255);
  strokeWeight(5);
  noFill();
  fill(0);
  textSize(22);
  text(musicaAtual.titulo, width / 2, 250);
  textSize(14);
  text(musicaAtual.artista, width / 2, 280);

  for (let i = 0; i < dadosMusicas.musicas.length; i++) {
    let y = 380 + i * 50;
    if (i === indiceMusicaSelecionada) {
      if (listaMusicas[i] === "What A Wonderful World") fill(0, 200, 0);
      else if (listaMusicas[i] === "Comfortably Numb") fill(200, 150, 0);
      else fill(200, 0, 0);
      textSize(24);
      text("> " + dadosMusicas.musicas[i].titulo + " <", width / 2, y);
    } else {
      fill(150);
      textSize(18);
      text(listaMusicas[i], width / 2, y);
    }
  }
}
