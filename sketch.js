let botoes = [];
let selecionado = 0;
let estado = "LOADING";
let fontePixel;
let dadosMusicas;
let palavrasBackground = [];
let textosBg = ["HTML5", "CSS", "JAVASCRIPT", "ARRAY", "CLASS", "WEB", "GAMES"];
let imagensCapas = [];

let musicas = [];
let somUI;
let fft;

let carregando = true;
let progressoCarregamento = 0;
let totalAssets = 0;
let assetsCarregados = 0;

let rankings = { FACIL: [], MEDIO: [], DIFICIL: [] };
let nomeJogadorInput = "";
let abaRankingSelecionada = 0;

async function preload() {
  fontePixel = await loadFont("assets/fonts/PressStart2P-Regular.ttf");
  somUI = loadSound("assets/audio/ui/ui-button.wav");

  dadosMusicas = await loadJSON("data/musicas.json", async (dados) => {
    totalAssets = dados.musicas.length * 2;

    for (let i = 0; i < dados.musicas.length; i++) {
      imagensCapas[i] = await loadImage(
        `assets/img/albuns/${dados.musicas[i].capa}`,
        () => {
          assetsCarregados++;
          progressoCarregamento = assetsCarregados / totalAssets;
        },
      );
      musicas[i] = loadSound(
        `assets/audio/bgm/${dados.musicas[i].musica}`,
        () => {
          assetsCarregados++;
          progressoCarregamento = assetsCarregados / totalAssets;
        },
      );
    }

    await new Promise((r) => setTimeout(r, 600));
    carregando = false;
    estado = "INICIO";
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  textFont(fontePixel);
  criarMenu();
  criarBackground();
  carregarRankings();
  fft = new p5.FFT(0.8);
}

function draw() {
  background(0);

  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  imageMode(CENTER);

  if (carregando) {
    desenharTelaLoading();
    return;
  }

  switch (estado) {
    case "INICIO":
      telaInicial();
      break;
    case "JOGAR":
      telaJogar();
      break;
    case "GAMEPLAY":
      telaGameplay();
      break;
    case "SOBRE":
      telaSobre();
      break;
    case "CRÉDITOS":
      telaCreditos();
      break;
    case "TRANSICAO":
      desenharTelaTransicao();
      break;
    case "RANKING":
      telaRanking();
      break;
    case "NOME_RANKING":
      telaInserirNome();
      break;
    case "GAME_OVER":
      telaGameOver();
      break;
    case "SUCESSO":
      telaSucesso();
      break;
  }
}
function desenharTelaLoading() {
  noStroke();
  fill(255);
  textFont("monospace");
  textSize(22);
  textAlign(CENTER, CENTER);
  text("KARAOKE LETTER", width / 2, height / 2 - 80);

  textSize(11);
  fill(150);
  text("CARREGANDO...", width / 2, height / 2 - 30);

  let larguraBarra = 300;
  let barraX = width / 2 - larguraBarra / 2;
  let barraY = height / 2 + 10;

  stroke(60);
  strokeWeight(1);
  noFill();
  rectMode(CORNER);
  rect(barraX, barraY, larguraBarra, 14, 4);

  noStroke();
  fill(0, 200, 255);
  let progresso =
    totalAssets > 0
      ? progressoCarregamento
      : sin(frameCount * 0.04) * 0.5 + 0.5;
  rect(barraX, barraY, larguraBarra * constrain(progresso, 0, 1), 14, 4);

  fill(100);
  textSize(10);
  let pontos = ".".repeat(floor(frameCount / 15) % 4);
  text(pontos, width / 2, height / 2 + 45);

  rectMode(CENTER);
  textFont(fontePixel);
}

function tocarSomUI() {
  if (somUI && somUI.isLoaded()) {
    somUI.stop();
    somUI.play();
  }
}

function mudarEstado(novoEstado) {
  if (estado === "GAMEPLAY" && novoEstado === "INICIO") {
    musicas.forEach((m) => {
      if (m && m.isPlaying()) m.stop();
    });
  }

  if (
    novoEstado === "GAMEPLAY" ||
    (estado === "GAMEPLAY" && novoEstado === "INICIO")
  ) {
    estado = "TRANSICAO";
    selecionado = 0;

    setTimeout(() => {
      efetivarMudanca(novoEstado);
    }, 3000);

    return;
  }

  efetivarMudanca(novoEstado);
}

function efetivarMudanca(novoEstado) {
  estado = novoEstado;
  selecionado = 0;

  if (novoEstado === "GAMEPLAY") {
    iniciarGameplay();
    musicas[dificuldadeSelecionada].play();
  }

  if (novoEstado === "INICIO") {
    musicas.forEach((m) => {
      if (m && m.isPlaying()) m.stop();
    });
  }
}

function criarMenu() {
  botoes = [];

  botoes.push(
    new Botao(
      width / 2,
      300,
      200,
      50,
      "JOGAR",
      color(0, 150, 255),
      color(0, 255, 255),
    ),
  ); // Subiu de 390 para 300
  botoes.push(
    new Botao(
      width / 2,
      370,
      200,
      50,
      "RANKING",
      color(200, 150, 0),
      color(255, 200, 0),
    ),
  ); // Subiu de 460 para 370
  botoes.push(
    new Botao(width / 2, 440, 200, 50, "SOBRE", color(180), color(255)),
  ); // Subiu de 530 para 440
  botoes.push(
    new Botao(
      width / 2,
      510,
      200,
      50,
      "CRÉDITOS",
      color(180, 0, 0),
      color(255, 0, 0),
    ),
  ); // Subiu de 600 para 510
}

function desenharMoldura() {
  stroke(200);
  strokeWeight(6);
  noFill();
  drawingContext.setLineDash([15, 15]);
  rect(width / 2, height / 2, width - 80, height - 80);
  drawingContext.setLineDash([]);
}

function criarBackground() {
  for (let i = 0; i < 20; i++) {
    palavrasBackground.push(new Palavra(random(textosBg)));
  }
}

function desenharBackgroundAnimado() {
  for (let p of palavrasBackground) {
    p.atualizar();
    p.mostrar();
  }
}

function keyPressed() {
  if (carregando) return;

  if (estado === "INICIO") {
    if (keyCode === DOWN_ARROW) {
      selecionado = (selecionado + 1) % botoes.length;
      tocarSomUI();
    } else if (keyCode === UP_ARROW) {
      selecionado = (selecionado - 1 + botoes.length) % botoes.length;
      tocarSomUI();
    } else if (keyCode === ENTER) {
      tocarSomUI();
      mudarEstado(botoes[selecionado].texto);
    }
  } else if (estado === "JOGAR") {
    if (keyCode === UP_ARROW) {
      dificuldadeSelecionada = (dificuldadeSelecionada - 1 + 3) % 3;
      tocarSomUI();
    } else if (keyCode === DOWN_ARROW) {
      dificuldadeSelecionada = (dificuldadeSelecionada + 1) % 3;
      tocarSomUI();
    } else if (keyCode === ENTER) {
      tocarSomUI();
      mudarEstado("GAMEPLAY");
    } else if (keyCode === ESCAPE) {
      tocarSomUI();
      mudarEstado("INICIO");
    }
  } else if (estado === "GAMEPLAY") {
    gameplayKeyPressed();
    return false;
  } else if (estado === "RANKING") {
    rankingKeyPressed();
    return false;
  } else if (estado === "NOME_RANKING") {
    inserirNomeKeyPressed();
    return false;
  } else if (estado === "GAME_OVER" || estado === "SUCESSO") {
    fimDeJogoKeyPressed();
    return false;
  } else {
    if (keyCode === ESCAPE) {
      tocarSomUI();
      mudarEstado("INICIO");
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function desenharTelaTransicao() {
  desenharBackgroundAnimado();
  desenharMoldura();

  fill(255);
  noStroke();
  textSize(24);

  let quantidadePontos = floor(frameCount / 30) % 4;
  let pontos = ".".repeat(quantidadePontos);

  text("CARREGANDO" + pontos, width / 2, height / 2);
}

class Botao {
  constructor(x, y, w, h, texto, corNormal, corHover) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.texto = texto;
    this.corNormal = corNormal;
    this.corHover = corHover;
    this.escala = 1;
  }

  desenhar(ativo) {
    let alvo = ativo ? 1.15 : 1;
    this.escala = lerp(this.escala, alvo, 0.1);

    let larguraAtual = this.w * this.escala;
    let alturaAtual = this.h * this.escala;

    strokeWeight(4);
    noFill();

    if (ativo) {
      stroke(this.corHover);
      drawingContext.setLineDash([10, 10]);
    } else {
      stroke(this.corNormal);
      drawingContext.setLineDash([8, 8]);
    }

    rect(this.x, this.y, larguraAtual, alturaAtual);
    drawingContext.setLineDash([]);

    noStroke();
    fill(ativo ? this.corHover : this.corNormal);
    textSize(14 * this.escala);
    text(this.texto, this.x, this.y);
  }
}

class Palavra {
  constructor(texto) {
    this.texto = texto;
    this.x = random(width);
    this.y = random(height);
    this.velocidade = random(0.3, 1);
    this.tamanho = random(10, 18);
    this.alpha = random(40, 80);
  }

  atualizar() {
    this.y -= this.velocidade;
    if (this.y < -20) {
      this.y = height + 20;
      this.x = random(width);
    }
  }

  mostrar() {
    noStroke();
    fill(255, this.alpha);
    textSize(this.tamanho);
    text(this.texto, this.x, this.y);
  }
}

function carregarRankings() {
  let salvos = localStorage.getItem("karaokeRankings");
  if (salvos) {
    rankings = JSON.parse(salvos);
  }
}

function salvarRankings() {
  localStorage.setItem("karaokeRankings", JSON.stringify(rankings));
}

function verificaSeEhRecorde(pontos, nivelStr) {
  if (pontos <= 0) return false;
  let r = rankings[nivelStr];
  if (r.length < 5) return true;
  return pontos > r[r.length - 1].pontos;
}
