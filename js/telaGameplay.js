let indiceProximaFrase = 0;
let fraseAtiva = null;
let particulas = [];
let pontuacao = 0;
let cronogramaLetras = [];
let ondasDeSom = [];
let comboAtual = 0;
let multiplicador = 1;

function iniciarGameplay() {
  particulas = [];
  ondasDeSom = [];
  fraseAtiva = null;
  pontuacao = 0;
  indiceProximaFrase = 0;
  comboAtual = 0;
  multiplicador = 1;

  cronogramaLetras = dadosMusicas.musicas[musicaSelecionada].cronogramaLetra;
}

function telaGameplay() {
  let musicaAtual = dadosMusicas.musicas[musicaSelecionada];
  let capaAtual = imagensCapas[musicaSelecionada];
  let musicaObj = musicas[musicaSelecionada];

  let grave = 0;
  if (musicaObj.isPlaying()) {
    fft.analyze();
    grave = fft.getEnergy("bass");
  }

  desenharMolduraGameplay();

  if (musicaObj.isPlaying()) {
    desenharVisualizador();
  }

  if (capaAtual) {
    let tamanhoCapa = 160;
    if (musicaObj.isPlaying()) {
      tamanhoCapa = map(grave, 0, 255, 160, 200);
    }
    imageMode(CENTER);
    image(capaAtual, width / 2, height / 2 - 160, tamanhoCapa, tamanhoCapa);
    filter(POSTERIZE, 4);
  }

  let corHUD;
  let brilhoHUD = 0;
  if (comboAtual >= 150) {
    colorMode(HSB);
    corHUD = color((frameCount * 4) % 360, 255, 255);
    colorMode(RGB);
    brilhoHUD = 15;
  } else if (comboAtual >= 80) {
    corHUD = color(255, 200, 0);
    brilhoHUD = 10;
  } else if (comboAtual >= 30) {
    corHUD = color(0, 255, 255);
    brilhoHUD = 5;
  } else {
    corHUD = color(255);
    brilhoHUD = 0;
  }

  let escalaHUD = 1;
  if (comboAtual > 0 && musicaObj.isPlaying()) {
    escalaHUD = map(grave, 0, 255, 1, 1.15);
  }

  push();
  translate(70, 70);
  scale(escalaHUD);
  textAlign(LEFT, TOP);
  fill(corHUD);
  noStroke();
  if (brilhoHUD > 0) {
    drawingContext.shadowBlur = brilhoHUD;
    drawingContext.shadowColor = corHUD;
  }
  textSize(14);
  text("PONTUACAO: " + pontuacao, 0, 0);
  pop();

  push();
  translate(width - 70, 70);
  scale(escalaHUD);
  textAlign(RIGHT, TOP);
  fill(corHUD);
  noStroke();
  if (brilhoHUD > 0) {
    drawingContext.shadowBlur = brilhoHUD;
    drawingContext.shadowColor = corHUD;
  }
  textSize(14);
  let dif = musicaAtual.dificuldade || "";
  text(musicaAtual.titulo.toUpperCase() + (dif ? "  [" + dif + "]" : ""), 0, 0);
  pop();

  if (comboAtual > 1) {
    push();
    translate(width / 2, height / 2 - 280);
    scale(escalaHUD);
    
    textAlign(CENTER, CENTER);
    fill(corHUD);
    noStroke();
    if (brilhoHUD > 0) {
      drawingContext.shadowBlur = brilhoHUD + 5;
      drawingContext.shadowColor = corHUD;
    }
    
    textSize(14);
    text("COMBO: " + comboAtual + "x", 0, 400);
    
    drawingContext.shadowBlur = 0;
    fill(100, 255, 100);
    text("MULT: " + multiplicador.toFixed(1) + "x", 0, 430);
    pop(); 
  }

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
      let letrasNaoDigitadas = fraseAtiva.texto.length - fraseAtiva.digitado.length;
      pontuacao -= (letrasNaoDigitadas * 10);

      comboAtual = 0;
      multiplicador = 1;
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

    if (ignorarEspaco) {
      while (fraseAtiva.texto.charAt(fraseAtiva.digitado.length) === " ") {
        fraseAtiva.digitado += " ";
      }
    }

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
    let textoRestante = fraseAtiva.texto.substring(fraseAtiva.digitado.length);
    let letrasNaoDigitadas = textoRestante.replace(/ /g, "").length;
    pontuacao -= (letrasNaoDigitadas * 10); 

    comboAtual = 0;
    multiplicador = 1;
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

    let tamanhoBase = 12;
    textSize(tamanhoBase);

    if (textWidth(fraseAtiva.texto) > width - 120) {
      tamanhoBase = 8;
    }

    textSize(tamanhoBase + pulso);

    let larguraTotal = textWidth(fraseAtiva.texto);
    let inicioX = width / 2 - larguraTotal / 2;

    textAlign(LEFT, CENTER);
    
    let textoJaDigitado = fraseAtiva.digitado;
    let caractereAtual = fraseAtiva.texto.charAt(textoJaDigitado.length);
    let textoFaltante = fraseAtiva.texto.substring(textoJaDigitado.length + 1);

    fill(255, 200, 0);
    text(textoJaDigitado, inicioX, posicaoY);
    let larguraDigitada = textWidth(textoJaDigitado);

    let posXAtual = inicioX + larguraDigitada;
    fill(255, 60, 60); 
    text(caractereAtual, posXAtual, posicaoY);
    let larguraAtual = textWidth(caractereAtual);

    fill(255, 255, 255, 150);
    text(textoFaltante, posXAtual + larguraAtual, posicaoY);

    let centroCaractereX = posXAtual + larguraAtual / 2;
    let yBolinha = posicaoY + (tamanhoBase + pulso) / 2 + 12;
    
    let alphaBolinha = map(sin(frameCount * 0.25), -1, 1, 100, 255);
    fill(255, 60, 60, alphaBolinha);
    circle(centroCaractereX, yBolinha, 6);

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
    musicas[musicaSelecionada].stop();
    mudarEstado("INICIO");
    return;
  }

  if ((keyCode >= 65 && keyCode <= 90) || keyCode === 32) {
    if (ignorarEspaco && keyCode === 32) return;

    let caractere = keyCode === 32 ? " " : key.toUpperCase();

    if (fraseAtiva !== null && fraseAtiva.digitado !== fraseAtiva.texto) {
      let proximoCaractere = fraseAtiva.texto.charAt(fraseAtiva.digitado.length);

      if (caractere === proximoCaractere) {
        fraseAtiva.digitado += caractere;

        if (ignorarEspaco) {
          while (fraseAtiva.texto.charAt(fraseAtiva.digitado.length) === " ") {
            fraseAtiva.digitado += " ";
          }
        }

        if (caractere !== " ") {
          comboAtual++;
          multiplicador = 1 + Math.floor(comboAtual / 10) * 0.5;
          pontuacao += Math.floor(10 * multiplicador);

          let corFaisca = [255, 255, 255];
          if (comboAtual >= 150) corFaisca = [random(255), random(255), random(255)];
          else if (comboAtual >= 80) corFaisca = [255, 200, 0];
          else if (comboAtual >= 30) corFaisca = [0, 255, 255];

          criarExplosaoPequena(
            random(width / 2 - 100, width / 2 + 100),
            height / 2 + random(-20, 20),
            corFaisca
          );
        }

        if (fraseAtiva.digitado === fraseAtiva.texto) {
          criarExplosao(width / 2, height / 2, [50, 255, 50]);
        }
      } else {
        comboAtual = 0;
        multiplicador = 1;
      }
    }
  }
}

function verificarFimDeJogo(musicaObj) {
  if (indiceProximaFrase >= cronogramaLetras.length && !musicaObj.isPlaying()) {
    let tituloMusica = dadosMusicas.musicas[musicaSelecionada].titulo;

    if (verificaSeEhRecorde(pontuacao, tituloMusica)) {
      nomeJogadorInput = "";
      mudarEstado("NOME_RANKING");
    } else {
      mudarEstado("SUCESSO");
    }
  }

  if (pontuacao < -500) {
    musicaObj.stop();
    mudarEstado("GAME_OVER");
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

function criarExplosaoPequena(ex, ey, cor = [255, 200, 0]) {
  for (let i = 0; i < 5; i++) {
    particulas.push({
      x: ex,
      y: ey,
      vx: random(-2, 2),
      vy: random(-2, 2),
      vida: 255,
      cor: cor,
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
    let areaFade = 800;

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

function desenharMolduraGameplay() {
  let corBorda;
  let espessura = 6;
  let brilho = 0;
  let velocidadeTraco = 0;

  if (comboAtual < 30) {
    corBorda = color(200);
  } else if (comboAtual < 80) {
    corBorda = color(0, 255, 255);
    brilho = 15;
    velocidadeTraco = 1;
  } else if (comboAtual < 150) {
    corBorda = color(255, 200, 0);  
    brilho = 25;
    velocidadeTraco = 2;
  } else {
    colorMode(HSB);
    corBorda = color((frameCount * 4) % 360, 255, 255);
    colorMode(RGB);
    brilho = 40;
    velocidadeTraco = 4;
  }

  push();
  stroke(corBorda);
  strokeWeight(espessura);
  noFill();
  
  if (brilho > 0) {
    drawingContext.shadowBlur = brilho;
    drawingContext.shadowColor = corBorda;
  }
  
  drawingContext.setLineDash([15, 15]);
  
  if (velocidadeTraco > 0) {
     drawingContext.lineDashOffset = -frameCount * velocidadeTraco;
  }

  rect(width / 2, height / 2, width - 80, height - 80);
  
  drawingContext.setLineDash([]);
  drawingContext.shadowBlur = 0;
  pop();
}