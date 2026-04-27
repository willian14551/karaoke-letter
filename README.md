---

# 🎸 Karaoke Letter

**Karaoke Letter** é um jogo rítmico e educativo desenvolvido com a biblioteca **p5.js**. O objetivo do jogo é desafiar a velocidade de digitação e a coordenação do jogador enquanto ele acompanha a letra de suas músicas favoritas.

## 🎮 Como Jogar

1.  **Menu Principal**: Utilize as setas **CIMA/BAIXO** para navegar e **ENTER** para selecionar as opções JOGAR, RANKING, SOBRE ou CRÉDITOS.
2.  **Seleção de Nível**: Escolha entre as dificuldades **FACIL**, **MEDIO** ou **DIFICIL**.
3.  **Gameplay**: Digite a frase exibida na tela antes que o tempo acabe. Acertos aumentam sua pontuação, enquanto erros ou atrasos a diminuem.
4.  **Sistema de Recordes**: Se atingir uma pontuação alta, você poderá salvar suas iniciais no **Hall da Fama** local.
5.  **Navegação**: A qualquer momento, pressione **ESC** para voltar ao menu principal.

## 📂 Estrutura do Projeto

O projeto é modular para facilitar a manutenção:

* `sketch.js`: Gerencia o estado global (Início, Gameplay, Ranking, Game Over, etc.), carregamento de assets e o loop principal.
* `data/musicas.json`: Base de dados com os níveis, artistas e cronograma das letras (timestamps).
* **`js/`**: Interface e lógica:
    * `telaInicio.js`: Menu principal interativo.
    * `telaJogar.js`: Seleção de música e dificuldade.
    * `telaGameplay.js`: Mecânica rítmica, visualizador de áudio (FFT) e sistema de partículas.
    * `telaRanking.js`: Visualização do Hall da Fama e inserção de novos recordes.
    * `telaFimDeJogo.js`: Telas de **Sucesso** (vitória) e **Game Over** com opção de "Tentar Novamente".
    * `telaSobre.js` e `telaCreditos.js`: Informações e autoria.

## 🛠️ Tecnologias Utilizadas

* [p5.js](https://p5js.org/): Gráficos e interatividade.
* **p5.sound**: Processamento de áudio e análise de frequências (FFT) para efeitos visuais.
* **LocalStorage**: Para persistência dos recordes do Ranking no navegador.
* **JSON**: Gerenciamento dinâmico da playlist e sincronização das letras.

## 🎓 Desenvolvimento

Este projeto foi desenvolvido como **Trabalho de Graduação** da disciplina *'Web Development: HTML5 Canvas & Games'* do 3° Período do curso de Bacharelado em Sistemas da Informação da **Pontifícia Universidade Católica do Paraná (PUCPR)**.

## 👥 Integrantes

* [Kamilly](https://github.com/PKamilly)
* [Sérgio](https://github.com/sergiocalazans)
* [Willian](https://github.com/willian14551)
