# 🎤 Karaoke Letter

**Karaoke Letter** é um jogo rítmico de digitação desenvolvido com **p5.js** e **p5.sound**. O jogador acompanha a música, digita as frases exibidas no tempo certo e tenta alcançar a maior pontuação possível.

## 📽️ Vídeo do projeto

[Link do vídeo](https://youtu.be/838RIkkjLVk)

## 🎮 Como jogar

1. No menu principal, use as setas **cima/baixo** para navegar e **Enter** para selecionar.
2. Em **Jogar**, escolha uma música da lista.
3. Use **F** para alternar o filtro de dificuldade entre **Todas**, **Fácil**, **Médio** e **Difícil**.
4. Durante a música, digite a frase exibida antes que o tempo acabe.
5. Acertos aumentam a pontuação, mantêm o combo ativo e elevam o multiplicador.
6. Erros, atrasos ou letras não digitadas reduzem a pontuação e quebram o combo.
7. Ao final, se a pontuação estiver entre as melhores, o jogador pode registrar o nome no ranking local.

## 🕹️ Controles

| Tela | Ação | Tecla |
| --- | --- | --- |
| Menu principal | Navegar | Setas cima/baixo |
| Menu principal | Selecionar opção | Enter |
| Seleção de música | Navegar pelas músicas | Setas cima/baixo |
| Seleção de música | Alterar filtro de dificuldade | F |
| Seleção de música | Iniciar música | Enter |
| Seleção de música | Voltar ao menu | Q |
| Gameplay | Digitar letra atual | Teclado |
| Gameplay | Pausar música | Enter |
| Gameplay | Sair para o menu | Q |
| Pause | Navegar | Setas cima/baixo |
| Pause | Confirmar opção | Enter |
| Opções | Navegar | Setas cima/baixo |
| Opções | Ajustar volume | Setas esquerda/direita |
| Opções | Confirmar ou alternar opção | Enter |
| Opções | Voltar | Q |

## ✨ Funcionalidades

- Seleção de músicas com capa do álbum.
- Filtro por dificuldade.
- Rolagem automática da lista quando há mais de três músicas visíveis.
- Gameplay sincronizada com cronograma de letras em JSON.
- Visualizador de áudio com FFT.
- Sistema de pontuação, combo e multiplicador.
- Moldura e HUD interativos durante a gameplay.
- Tela de pause com opções para retomar, configurar ou desistir.
- Tela de opções com volume da música, volume dos efeitos, tela cheia e opção para desabilitar espaço.
- Ranking local salvo no navegador com `localStorage`.
- Telas de sucesso, game over, sobre e créditos.

## 🚀 Como executar

Por usar carregamento de arquivos JSON, áudio e imagens, o ideal é executar o projeto em um servidor local.

Uma opção simples é usar a extensão **Live Server** no VS Code. Outra opção, se houver Python instalado, é executar na pasta do projeto:

```bash
python -m http.server 8000
```

Depois, acesse:

```text
http://localhost:8000
```

## 📁 Estrutura do projeto

```text
karaoke-letter/
├── assets/
│   ├── audio/
│   ├── fonts/
│   └── img/
├── css/
│   └── style.css
├── data/
│   └── musicas.json
├── js/
│   ├── telaCreditos.js
│   ├── telaFimdeJogo.js
│   ├── telaGameplay.js
│   ├── telaInicio.js
│   ├── telaJogar.js
│   ├── telaOpcoes.js
│   ├── telaPause.js
│   ├── telaRanking.js
│   └── telaSobre.js
├── src/
│   ├── p5.js
│   └── p5.sound.min.js
├── index.html
├── README.md
└── sketch.js
```

## 🧩 Principais arquivos

- `index.html`: carrega as bibliotecas e telas do jogo.
- `sketch.js`: controla o estado global, carregamento de assets, menus, transições e loop principal.
- `data/musicas.json`: armazena músicas, artistas, capas, arquivos de áudio, dificuldades e cronogramas das letras.
- `js/telaJogar.js`: gerencia seleção de músicas, filtros, capas e rolagem.
- `js/telaGameplay.js`: concentra mecânica de digitação, pontuação, combo, partículas, visualizador e fim de partida.
- `js/telaOpcoes.js`: controla volumes, tela cheia e configuração para ignorar espaços.
- `js/telaPause.js`: gerencia o menu de pausa.
- `js/telaRanking.js`: salva e exibe recordes por música.

## 🛠️ Tecnologias utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **p5.js**
- **p5.sound**
- **LocalStorage**
- **JSON**

## 🎵 Músicas cadastradas

- **What A Wonderful World** - Louis Armstrong
- **Até que Durou** - Péricles
- **Comfortably Numb** - Pink Floyd
- **Notion** - The Rare Occasions

## 🎓 Desenvolvimento

Projeto desenvolvido como trabalho acadêmico da disciplina **Web Development: HTML5 Canvas & Games**, do curso de Bacharelado em Sistemas de Informação da **Pontifícia Universidade Católica do Paraná (PUCPR)**.

## 👥 Integrantes

- [Kamilly](https://github.com/PKamilly)
- [Sérgio](https://github.com/sergiocalazans)
- [Willian](https://github.com/willian14551)
