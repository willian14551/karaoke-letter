function telaRanking() {
  textAlign(CENTER, CENTER);
  desenharBackgroundAnimado();
  desenharMoldura();

  fill(255);
  noStroke();
  textSize(36);
  text("HALL DA FAMA", width / 2, 150);

  let musicas = dadosMusicas.musicas;
  let musicaAba = musicas[abaRankingSelecionada];
  let dif = musicaAba.nivel || "?";

  textSize(16);
  fill(150);
  text("<", width / 2 - 320, 250);
  text(">", width / 2 + 320, 250);

  // Cor pelo nível da música da aba
  if (dif === "FACIL") fill(0, 200, 0);
  else if (dif === "MEDIO") fill(200, 150, 0);
  else if (dif === "DIFICIL") fill(200, 0, 0);
  else fill(0, 200, 255);
  textSize(18);
  text(musicaAba.titulo + "  [" + dif + "]", width / 2, 250);

  fill(120);
  textSize(10);
  text(musicaAba.artista, width / 2, 280);

  let lista = rankings[musicaAba.titulo] || [];

  if (lista.length === 0) {
    fill(150);
    textSize(14);
    text("AINDA NÃO HÁ RECORDES NESTA MÚSICA.", width / 2, height / 2);
  } else {
    textSize(18);
    for (let i = 0; i < lista.length; i++) {
      let y = 360 + i * 40;

      if (i === 0) fill(255, 215, 0);
      else if (i === 1) fill(192, 192, 192);
      else if (i === 2) fill(205, 127, 50);
      else fill(200);

      let textoLinha =
        i + 1 + "º " + lista[i].nome + " - " + lista[i].pontos + " PTS";
      text(textoLinha, width / 2, y);
    }
  }

  textSize(12);
  fill(200);
  text("PRESSIONE ESC PARA VOLTAR", width / 2, height - 60);
}

function rankingKeyPressed() {
  let total = dadosMusicas.musicas.length;
  if (key == "q" || key == "Q") {
    tocarSomUI();
    mudarEstado("INICIO");
  } else if (keyCode === LEFT_ARROW) {
    abaRankingSelecionada = (abaRankingSelecionada - 1 + total) % total;
    tocarSomUI();
  } else if (keyCode === RIGHT_ARROW) {
    abaRankingSelecionada = (abaRankingSelecionada + 1) % total;
    tocarSomUI();
  }
}

function telaInserirNome() {
  desenharBackgroundAnimado();
  desenharMoldura();

  fill(255, 215, 0);
  noStroke();
  textSize(28);
  text("NOVO RECORDE!", width / 2, 120);

  fill(255);
  textSize(16);
  text("Sua pontuação: " + pontuacao, width / 2, 180);
  text("Digite suas iniciais (Max 5 letras):", width / 2, 250);

  stroke(255);
  strokeWeight(2);
  noFill();
  rect(width / 2, 320, 200, 60);

  noStroke();
  fill(0, 255, 255);
  textSize(28);
  text(nomeJogadorInput + (frameCount % 60 < 30 ? "_" : ""), width / 2, 320);

  fill(150);
  textSize(12);
  text("Pressione ENTER para salvar", width / 2, 400);
}

function inserirNomeKeyPressed() {
  if (keyCode === BACKSPACE) {
    if (nomeJogadorInput.length > 0) {
      nomeJogadorInput = nomeJogadorInput.substring(
        0,
        nomeJogadorInput.length - 1,
      );
      tocarSomUI();
    }
  } else if (keyCode === ENTER) {
    if (nomeJogadorInput.length > 0) {
      let tituloMusica = dadosMusicas.musicas[musicaSelecionada].titulo;
      salvarNovoRecorde(nomeJogadorInput, pontuacao, tituloMusica);
      tocarSomUI();
      mudarEstado("RANKING");
    }
  } else if (keyCode >= 65 && keyCode <= 90) {
    if (nomeJogadorInput.length < 5) {
      nomeJogadorInput += key.toUpperCase();
      tocarSomUI();
    }
  }
}

function salvarNovoRecorde(nome, pontos, tituloMusica) {
  if (!rankings[tituloMusica]) rankings[tituloMusica] = [];
  let lista = rankings[tituloMusica];

  lista.push({ nome: nome, pontos: pontos });
  lista.sort((a, b) => b.pontos - a.pontos);
  if (lista.length > 5) lista.pop();

  salvarRankings();

  // Abre a aba do ranking na música recém-terminada
  abaRankingSelecionada = dadosMusicas.musicas.findIndex(
    (m) => m.titulo === tituloMusica,
  );
}
