let indiceProximaFrase = 0;
let fraseAtiva = null;
let particulas = [];
let pontuacao = 0;
let cronogramaLetras = [];
let ondasDeSom = [];

function iniciarGameplay() {
  particulas = [];
  ondasDeSom = [];
  fraseAtiva = null;
  pontuacao = 0;
  indiceProximaFrase = 0;

  cronogramaLetras =
    dadosMusicas.musicas[indiceMusicaSelecionada].cronogramaLetra;
}

function telaGameplay() {
  desenharMoldura();

  let musicaAtual = dadosMusicas.musicas[indiceMusicaSelecionada];
  let capaAtual = imagensCapas[indiceMusicaSelecionada];
  let musicaObj = musicas[indiceMusicaSelecionada];

  if (musicaObj.isPlaying()) {
    desenharVisualizador();
  }

  if (capaAtual) {
    let tamanhoCapa = 160;

    if (musicaObj.isPlaying()) {
      fft.analyze();
      let grave = fft.getEnergy("bass");

      tamanhoCapa = map(grave, 0, 255, 160, 200);
    }

    imageMode(CENTER);
    image(capaAtual, width / 2, height / 2 - 160, tamanhoCapa, tamanhoCapa);
    filter(POSTERIZE, 4);
  }

  noStroke();
  textAlign(LEFT, TOP);
  fill(255);
  textSize(15);
  text("PONTUACAO: " + pontuacao, 60, 55);

  textAlign(RIGHT, TOP);
  text(musicaAtual.titulo.toUpperCase(), width - 60, 55);

  gerenciarKaraoke(musicaObj);
  desenharFraseKaraoke(musicaObj);
  atualizarEDesenharParticulas();
  verificarFimDeJogo(musicaObj);
}

function gerenciarKaraoke(musicaObj) {
  if (!musicaObj.isPlaying()) return;
  if (indiceProximaFrase >= cronogramaLetras.length) return;

  let proxima = cronogramaLetras[indiceProximaFrase];
  let tempoAtual = musicaObj.currentTime();

  if (tempoAtual >= proxima.tempo && tempoAtual < proxima.tempo + 1.5) {
    if (fraseAtiva !== null && fraseAtiva.digitado !== fraseAtiva.texto) {
      pontuacao -= 50;
      criarExplosao(width / 2, height / 2, [255, 50, 50]);
    }

    let tempoLimite = proxima.tempo + 3.0;
    if (indiceProximaFrase + 1 < cronogramaLetras.length) {
      tempoLimite = cronogramaLetras[indiceProximaFrase + 1].tempo;
    }

    fraseAtiva = {
      texto: proxima.texto,
      digitado: "",
      tempoInicio: proxima.tempo,
      tempoFim: tempoLimite,
    };

    indiceProximaFrase++;
  }
}

function desenharFraseKaraoke(musicaObj) {
  if (fraseAtiva === null) return;

  let tempoAtual = musicaObj.currentTime();
  let posicaoY = height / 2 + 20;

  let pulso = 0;
  if (musicaObj.isPlaying()) {
    let grave = fft.getEnergy("bass");

    pulso = map(grave, 0, 255, 0, 8);
  }

  if (
    tempoAtual > fraseAtiva.tempoFim &&
    fraseAtiva.digitado !== fraseAtiva.texto
  ) {
    pontuacao -= 50;
    criarExplosao(width / 2, height / 2, [255, 50, 50]);
    fraseAtiva = null;
    return;
  }

  if (fraseAtiva.digitado === fraseAtiva.texto) {
    textAlign(CENTER, CENTER);
    noStroke();
    textSize(14 + pulso);
    fill(100, 255, 100);
    text("CONTINUE ASSIM!", width / 2, posicaoY);
  } else {
    textAlign(CENTER, CENTER);
    noStroke();

    let tamanhoBase = 18;
    textSize(tamanhoBase);

    if (textWidth(fraseAtiva.texto) > width - 120) {
      tamanhoBase = 12;
    }

    textSize(tamanhoBase + pulso);

    let larguraTotal = textWidth(fraseAtiva.texto);
    let inicioX = width / 2 - larguraTotal / 2;

    textAlign(LEFT, CENTER);
    fill(255, 200, 0);
    text(fraseAtiva.digitado, inicioX, posicaoY);

    let larguraDigitada = textWidth(fraseAtiva.digitado);
    fill(255, 255, 255, 150);
    text(
      fraseAtiva.texto.substring(fraseAtiva.digitado.length),
      inicioX + larguraDigitada,
      posicaoY,
    );

    let duracaoTotal = fraseAtiva.tempoFim - fraseAtiva.tempoInicio;
    let tempoPassado = tempoAtual - fraseAtiva.tempoInicio;
    let porcentagemRestante = constrain(1 - tempoPassado / duracaoTotal, 0, 1);

    let larguraBarra = min(400, width - 120);
    let barraX = width / 2 - larguraBarra / 2;
    let barraY = posicaoY + 50;

    noStroke();
    fill(50);
    rectMode(CORNER);
    rect(barraX, barraY, larguraBarra, 8, 4);

    if (porcentagemRestante > 0.5) fill(0, 255, 0);
    else if (porcentagemRestante > 0.25) fill(255, 200, 0);
    else fill(255, 50, 50);

    rect(barraX, barraY, larguraBarra * porcentagemRestante, 8, 4);
    rectMode(CENTER);
  }

  if (indiceProximaFrase < cronogramaLetras.length) {
    textAlign(CENTER, CENTER);
    noStroke();
    textSize(8);
    fill(255, 255, 255, 80);
    text(
      "PROXIMA: " + cronogramaLetras[indiceProximaFrase].texto,
      width / 2,
      height / 2 + 100,
    );
  }
}

function gameplayKeyPressed() {
  if (keyCode === ESCAPE) {
    musicas[indiceMusicaSelecionada].stop();
    mudarEstado("INICIO");
    return;
  }

  if ((keyCode >= 65 && keyCode <= 90) || keyCode === 32) {
    let caractere = keyCode === 32 ? " " : key.toUpperCase();

    if (fraseAtiva !== null && fraseAtiva.digitado !== fraseAtiva.texto) {
      let proximoCaractere = fraseAtiva.texto.charAt(
        fraseAtiva.digitado.length,
      );

      if (caractere === proximoCaractere) {
        fraseAtiva.digitado += caractere;
        criarExplosaoPequena(
          random(width / 2 - 100, width / 2 + 100),
          height / 2 + random(-20, 20),
        );

        if (fraseAtiva.digitado === fraseAtiva.texto) {
          pontuacao += fraseAtiva.texto.length * 10;
          criarExplosao(width / 2, height / 2, [50, 255, 50]);
        }
      }
    }
  }
}

function verificarFimDeJogo(musicaObj) {
  // 1. Condição de Vitória: Música acabou e pontuação está acima do limite
  if (indiceProximaFrase >= cronogramaLetras.length && !musicaObj.isPlaying()) {
    let nivelStr = dadosMusicas.musicas[indiceMusicaSelecionada].titulo;

    if (verificaSeEhRecorde(pontuacao, nivelStr)) {
      nomeJogadorInput = "";
      mudarEstado("NOME_RANKING");
    } else {
      mudarEstado("SUCESSO"); // <-- Nova tela de sucesso
    }
  }

  // 2. Condição de Derrota: Pontuação caiu muito
  if (pontuacao < -500) {
    musicaObj.stop();
    mudarEstado("GAME_OVER"); // <-- Nova tela de Game Over
  }
}

function criarExplosao(ex, ey, cor) {
  for (let i = 0; i < 30; i++) {
    particulas.push({
      x: ex,
      y: ey,
      vx: random(-5, 5),
      vy: random(-5, 5),
      vida: 255,
      cor: cor,
    });
  }
}

function criarExplosaoPequena(ex, ey) {
  for (let i = 0; i < 5; i++) {
    particulas.push({
      x: ex,
      y: ey,
      vx: random(-2, 2),
      vy: random(-2, 2),
      vida: 255,
      cor: [255, 200, 0],
    });
  }
}

function atualizarEDesenharParticulas() {
  noStroke();
  for (let i = particulas.length - 1; i >= 0; i--) {
    let p = particulas[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vida -= 10;
    fill(p.cor[0], p.cor[1], p.cor[2], p.vida);
    circle(p.x, p.y, 6);
    if (p.vida <= 0) particulas.splice(i, 1);
  }
}

function desenharVisualizador() {
  let wave = fft.waveform();

  push();

  translate(0, height / 2 - 160);

  noFill();
  stroke(0, 255, 255, 180);
  strokeWeight(4);

  let margem = 50;

  beginShape();
  for (let i = 0; i < wave.length; i += 4) {
    let x = map(i, 0, wave.length, margem, width - margem);

    let y = map(wave[i], -1, 1, -40, 40);

    let distEsq = x - margem;
    let distDir = width - margem - x;
    let areaFade = 1000;

    if (distEsq < areaFade) {
      y *= map(distEsq, 0, areaFade, 0, 1);
    } else if (distDir < areaFade) {
      y *= map(distDir, 0, areaFade, 0, 1);
    }

    vertex(x, y);
  }
  endShape();
  pop();
}
