console.log('[jogo] Flappy Bird');

let frames = 0;
const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

// [plano de fundo]
const planodefundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect (0,0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planodefundo.spriteX, planodefundo.spriteY,
            planodefundo.largura, planodefundo.altura,
            planodefundo.x, planodefundo.y,
            planodefundo.largura, planodefundo.altura,
        );

        contexto.drawImage(
            sprites,
            planodefundo.spriteX, planodefundo.spriteY,
            planodefundo.largura, planodefundo.altura,
            (planodefundo.x + planodefundo.largura), planodefundo.y,
            planodefundo.largura, planodefundo.altura,
        );
    },
};

// [chão]
function criarChao() {
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
        const movimentodochao = 1;
        const repeteEm = chao.largura / 2;
        const movimentacao = chao.x - movimentodochao;

        // console.log('[chao.x]', chao.x);
        // console.log('[repeteEm]', repeteEm);
        // console.log('[movimentacao]', movimentacao % repeteEm);

        chao.x = movimentacao % repeteEm;
    },
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura,
        );
    },
};
    return chao;
}

function fazColisao(flappyBird, chao) {
    const flappyBird = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBird >= chaoY){
        return true;
    }

    return false;
}
function criaFlappyBird() {
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
        console.log('devo pular');
        console.log('[ante]', flappyBird.velocidade);
        flappyBird.velocidade = - flappyBird.pulo;
        console.log('[depois]'), flappyBird.velocidade
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
        if(fazColisao(flappyBird, globais.chao)) {
            console.log('fez colisao');
            som_HIT.play();

            mudaparatela(relas.GAMEOVER);
            return;
        }

        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    movimentos: [
        { spriteX: 0, spriteY: 0,}, //asa pra cima
        { spriteX: 0, spriteY: 26,}, //asa no meio
        { spriteX: 0, spriteY: 52,}, // asa pra baixo
        { spriteX: 0, spriteY: 26,}, // asa no meio
    ],
    frameAtual: 0,
    atualizaframeAtual() {
        const intervalodeframes = 10;
        const passouointervalo = frames % intervalodeframes === 0;


        if (passouointervalo) {
            const basedoincremento = 1;
            const incremento = basedoincremento + flappyBird;this.frameAtual;
            const baseRepeticao = flappyBird.movimentos.length;
            flappyBird.frameAtual = incremento % baseRepeticao;
        }
    },
    desenha() {
        flappyBird.atualizaframeAtual();
        const {spriteX, spriteY} = flappyBird.movimentos[flappyBird.frameAtual];

        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
            
        );
    }
}
return flappyBird;
}
/// [mensagemGetReady]
const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY,
            mensagemGetReady.w, mensagemGetReady.h,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h,
            
        );
    }
}



// [mensagemGameOver]
const mensagemGameOver = {
    sX: 134,
    sY: 153,
    w: 226,
    h: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenha() {
      contexto.drawImage(
        sprites,
        mensagemGameOver.sX, mensagemGameOver.sY,
        mensagemGameOver.w, mensagemGameOver.h,
        mensagemGameOver.x, mensagemGameOver.y,
        mensagemGameOver.w, mensagemGameOver.h
      );
    }
  }

  //canos

  function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
            
        },
    espaco: 80,
    desenha() {
        canos.pares.forEach(function(par) {
            const yRadom = par.y;
            const espacamentoEntreCanos = 90;

            const canoCeuX = par.x;
            const canoCeuY = yRadom;
        
            // [Cano do Céu]
            contexto.drawImage(
                sprites,
                canos.ceu.spriteX, canos.ceu.spriteY,
                canos.largura, canos.altura,
                canoCeuX, canoCeuY,
                canos.largura, canos.altura,
            )

            //[cano do cão]
            const canoChaoX = par.x;
            const canoChaoY = canos.altura + espacamentoEntreCanos + yRadom;
            contexto.drawImage(
                sprites,
                canos.chao.spriteX, canos.chao.spriteY,
                canos.largura, canos.altura,
                canoChaoX, canoChaoY,
                canos.largura, canos.altura,
            )

            par.canoCeu = {
                x: canoCeuX,
                y: canos.altura + canoCeuY
            }
            par.canoChao = {
                x: canoChaoX,
                y: canoCeuY
            }
        })
    },
temcolisaocomoflappybird(par) {
    const cabecadoflappy = globais.flappyBird.y;
    const pedoflappy = globais.flappyBird.y + globais.flappyBird.altura;

    if((globais.flappyBird.x + globais.flappyBird.largura) >= par.x){
        if(cabecadoflappy <= par.canoCeu.y) {
            return true;
        }

        if(pedoflappy >= par.canoChao.y) {
            return true;
        }
    }
    return false;
},
pares: [],
atualiza() {
    const passou100frames = frames % 100 === 0;
    if(passou100frames) {
        console.log('Passou 100 frames');
        canos.pares.push({
            x: canvas.width,
            y: -150* (Math.random() + 1),
        });
}


canos.pares.forEach(function(par) {
    par.x = par.x - 2;

    if(canos.temcolisaocomoflappybird(par)){
        console.log('Voce perdeu!')
        som_HIT.play();
        mudaparatela(Telas.GAMEOVER);
    }

    if(par.X + canos.largura <= 0) {
        canos.pares.shift();
    }
   });

  }
}

    return canos;
  }

function criarplacar(){
    const placar = {
        pontuacao: 0,
        desenha() {
          contexto.font = '35px "VT323"';
          contexto.textAlign = 'right';
          contexto.fillStyle = 'white';
          contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35);      
        },
        atualiza() {
          const intervalodeframes = 20;
          const passouointervalo = frames % intervalodeframes === 0;
    
          if(passouointervalo) {
            placar.pontuacao = placar.pontuacao + 1;
          }
        }
    }
    return placar;
}


//[telas]

const globais = {};
let telaativa = {};
function mudaparatela(novatela) {
    telaativa = novatela;

    if(telaativa.inicializa) {
        telaativa.inicializa();
    }
}

const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criarChao();
            globais.canos = criaCanos();
        },
        desenha() {
            planodefundo.desenha();
            globais.flappyBird.desenha();


            globais.chao.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaparatela(Telas.JOGO);
        },
        atualiza() {
            globais.chao.atualiza();
        }

    }
};

Telas.JOGO = {
    inicializa() {
        globais.placar = criarplacar();
    },
    desenha(){
        planodefundo.desenha();
        globais.canos.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
        globais.placar.desenha;
    },
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        globaiscanos.atualiza();
        globais.chao.atualiza();
        globais.flappyBird.atualiza();
        globais.placar.atualiza();
    }
};

Telas.GAME_OVER = {
    desenha() {
        mensagemGameOver.desenha();
    },
    atualiza() {

    },
    click() {
        mudaparatela(Telas.INICIO);
    }
}

function loop(){
    
    telaativa.desenha();
    telaativa.atualiza();

    frames = frames + 1;
    requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
    if(telaativa.click) {
        telaativa.click();
    }
});


mudaparatela(Telas.INICIO);
loop();