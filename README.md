# 🎸 Karaoke Letter

**Karaoke Letter** é um jogo rítmico e educativo desenvolvido com a biblioteca **p5.js**. O objetivo do jogo é desafiar a velocidade de digitação e a coordenação do jogador.

## 🎮 Como Jogar

1. **Menu Principal**: Utilize as setas **CIMA/BAIXO** para navegar e **ENTER** para selecionar as opções JOGAR, SOBRE ou CRÉDITOS.
2. **Seleção de Nível**: Escolha entre as dificuldades **FACIL**, **MEDIO** ou **DIFICIL**.
3. **Gameplay**: Digite a letra exibida na tela no tempo certo para ganhar pontos e aumentar seu combo.
4. **Navegação**: A qualquer momento (exceto no menu inicial), pressione **ESC** para voltar à tela anterior.

## 📂 Estrutura do Projeto

O projeto está organizado de forma modular para facilitar a manutenção:

* `index.html`: Arquivo principal que carrega a biblioteca p5.js e os scripts do jogo.
* `sketch.js`: O "núcleo" do jogo. Gerencia o estado global, carregamento de assets (JSON, fontes e imagens) e o loop principal (`setup` e `draw`).
* `data/musicas.json`: Base de dados contendo os níveis, títulos, artistas e caminhos das capas das músicas.
* **`js/`**: Pasta contendo os componentes de interface:
    * `telaInicio.js`: Layout do menu principal e título.
    * `telaJogar.js`: Interface de seleção de música e dificuldade.
    * `telaGameplay.js`: Mecânica principal, exibição de capas com filtro 8-bits e sistema de score/combo.
    * `telaSobre.js`: Informações sobre o propósito do jogo.
    * `telaCreditos.js`: Créditos aos desenvolvedores do projeto.
* **`assets/`**:
    * `fonts/`: Fonte retro `PressStart2P`.
    * `img/albuns/`: Imagens das capas dos álbuns.

## 🛠️ Tecnologias Utilizadas

* [p5.js](https://p5js.org/): Biblioteca JavaScript para criação de gráficos e experiências interativas.
* **JSON**: Para armazenamento e gerenciamento dinâmico da playlist e níveis.
* **Filtros de Imagem (Posterize)**: Utilizado para conferir um estilo visual 8-bits às capas das músicas em tempo real.

## Desenvolvimento

**Desenvolvido como Trabalho de Graduação da disciplina 'Web Development: HTML5 Canvas & Games' do 3° Período do curso de Bacharelado em Sistemas da Informação da Pontifícia Universidade Católica do Paraná (PUCPR).**

## Integrantes

- [Kamilly](https://github.com/PKamilly)
- [Sérgio](https://github.com/sergiocalazans)
- [Willian](https://github.com/willian14551)
