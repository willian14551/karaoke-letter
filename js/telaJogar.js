let scrollOffset = 0;
let categoriaAtual = "TODAS";
let categorias = ["TODAS", "FACIL", "MEDIO", "DIFICIL"];
let indiceCategoria = 0;

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

  let todasMusicas = dadosMusicas.musicas;
  let musicasFiltradas = todasMusicas.filter(m => {
    if (categoriaAtual === "TODAS") return true;
    return m.nivel === categoriaAtual;
  });

  fill(255, 204, 0);
  textSize(16);
  text("FILTRO: " + categoriaAtual + " (Pressione 'F' para mudar)", width / 2, 200);

  let musicas = musicasFiltradas;
  let maxMusicasVisiveis = 3;
  let espacamento = 75;

  if (musicaSelecionada < scrollOffset) {
    scrollOffset = musicaSelecionada;
  } else if (musicaSelecionada >= scrollOffset + maxMusicasVisiveis) {
    scrollOffset = musicaSelecionada - maxMusicasVisiveis + 1;
  }

  if (musicas.length > 0) {
    let musicaObjeto = musicas[musicaSelecionada];
    let indexOriginal = todasMusicas.indexOf(musicaObjeto); 
    let capaAtual = imagensCapas[indexOriginal];

    if (capaAtual) {
      let tamanhoCapa = 160;
      let xPos = width / 2;
      let yPos = 318;

      stroke(255);
      strokeWeight(5);
      noFill();
      rectMode(CENTER);
      rect(xPos, yPos, tamanhoCapa, tamanhoCapa);
      
      noStroke();
      imageMode(CENTER);
      image(capaAtual, xPos, yPos, tamanhoCapa, tamanhoCapa);
      filter(POSTERIZE, 4);
    }
  }

  for (let i = scrollOffset; i < Math.min(musicas.length, scrollOffset + maxMusicasVisiveis); i++) {
    let m = musicas[i];
    let dif = m.nivel || "?";
    let y = 440 + (i - scrollOffset) * espacamento;

    if (i === musicaSelecionada) {
      fill(corDificuldade(dif));
      textSize(25);
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

  fill(255, 100);
  if (scrollOffset > 0) text("↑", width / 2, 230);
  if (scrollOffset + maxMusicasVisiveis < musicas.length) text("↓", width / 2, height - 100);

  fill(200);
  textSize(12);
  text(
    "↑↓ SELECIONAR   ENTER JOGAR   PRESSIONE Q PARA VOLTAR",
    width / 2,
    height - 60,
  );
}
function mudarCategoria() {
  indiceCategoria++;
  if (indiceCategoria >= categorias.length) {
    indiceCategoria = 0;
  }
  
  categoriaAtual = categorias[indiceCategoria];
  musicaSelecionada = 0;
  scrollOffset = 0;
}