// =====================================================
// LABORATÓRIO VIRTUAL - CAMPO ELÉTRICO
// =====================================================


// =====================================================
// ELEMENTOS DA PÁGINA
// =====================================================

const area =
    document.querySelector(".simulacao");

const canvas =
    document.getElementById("campoCanvas");

const ctx =
    canvas.getContext("2d");

const cargaGeradora =
    document.getElementById("cargaGeradora");

const cargaTeste =
    document.getElementById("cargaTeste");

const vetorE =
    document.getElementById("vetorE");

const infoTeste =
    document.getElementById("infoTeste");

const distanciaTexto =
    document.getElementById("distancia");

const campoTexto =
    document.getElementById("campo");

const direcaoTexto =
    document.getElementById("direcao");

const valorCarga =
    document.getElementById("valorCarga");

const btnPositiva =
    document.getElementById("btnPositiva");

const btnNegativa =
    document.getElementById("btnNegativa");

const btnLinhas =
    document.getElementById("btnLinhas");


// =====================================================
// CONSTANTES
// =====================================================

const k = 8.99e9;


// =====================================================
// VARIÁVEIS
// =====================================================

let cargaPositiva = true;

let arrastando = false;

let linhasVisiveis = true;


// =====================================================
// AJUSTAR CANVAS
// =====================================================

function ajustarCanvas() {

    const rect =
        area.getBoundingClientRect();

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        rect.width * dpr;

    canvas.height =
        rect.height * dpr;

    canvas.style.width =
        rect.width + "px";

    canvas.style.height =
        rect.height + "px";

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    desenharLinhasCampo();

}


// =====================================================
// POSIÇÃO DA CARGA GERADORA
// =====================================================

function obterCargaGeradora() {

    const rect =
        area.getBoundingClientRect();

    return {

        x: rect.width / 2,

        y: rect.height / 2

    };

}


// =====================================================
// DESENHAR LINHAS DE CAMPO
// =====================================================

function desenharLinhasCampo() {

    const rect =
        area.getBoundingClientRect();

    const largura =
        rect.width;

    const altura =
        rect.height;

    ctx.clearRect(
        0,
        0,
        largura,
        altura
    );


    if (!linhasVisiveis) {

        return;

    }


    const carga =
        obterCargaGeradora();


    const numeroLinhas =
        20;


    // =============================================
    // DESENHO DAS LINHAS RADIAIS
    // =============================================

    for (
        let i = 0;
        i < numeroLinhas;
        i++
    ) {

        const angulo =
            (Math.PI * 2 / numeroLinhas) * i;


        desenharLinhaCampo(
            carga.x,
            carga.y,
            angulo,
            largura,
            altura
        );

    }

}


// =====================================================
// DESENHAR UMA LINHA DE CAMPO
// =====================================================

function desenharLinhaCampo(
    centroX,
    centroY,
    angulo,
    largura,
    altura
) {

    const raioInicial = 45;

    const raioFinal =
        Math.sqrt(
            largura * largura +
            altura * altura
        );


    const pontos = [];


    // =============================================
    // CRIA OS PONTOS DA LINHA
    // =============================================

    for (
        let raio = raioInicial;
        raio < raioFinal;
        raio += 8
    ) {

        let x =
            centroX +
            Math.cos(angulo) *
            raio;

        let y =
            centroY +
            Math.sin(angulo) *
            raio;


        // =========================================
        // SE A CARGA FOR NEGATIVA,
        // A LINHA É PERCORRIDA NO SENTIDO INVERSO
        // =========================================

        if (!cargaPositiva) {

            x =
                centroX +
                Math.cos(angulo) *
                raio;

            y =
                centroY +
                Math.sin(angulo) *
                raio;

        }


        pontos.push({
            x: x,
            y: y
        });


        // Para quando sair da área

        if (
            x < -20 ||
            x > largura + 20 ||
            y < -20 ||
            y > altura + 20
        ) {

            break;

        }

    }


    if (pontos.length < 2) {

        return;

    }


    // =============================================
    // DESENHA A LINHA
    // =============================================

    ctx.beginPath();

    ctx.moveTo(
        pontos[0].x,
        pontos[0].y
    );


    for (
        let i = 1;
        i < pontos.length;
        i++
    ) {

        ctx.lineTo(
            pontos[i].x,
            pontos[i].y
        );

    }


    ctx.strokeStyle =
        cargaPositiva
            ? "rgba(229, 57, 53, 0.28)"
            : "rgba(40, 120, 215, 0.28)";


    ctx.lineWidth = 1.4;

    ctx.stroke();


    // =============================================
    // SETAS NAS LINHAS
    // =============================================

    desenharSetasNaLinha(
        pontos
    );

}


// =====================================================
// SETAS NAS LINHAS DE CAMPO
// =====================================================

function desenharSetasNaLinha(
    pontos
) {

    if (pontos.length < 8) {

        return;

    }


    const quantidadeSetas = 2;


    for (
        let s = 0;
        s < quantidadeSetas;
        s++
    ) {

        const indice =
            Math.floor(
                pontos.length *
                (0.35 + s * 0.25)
            );


        if (
            indice <= 0 ||
            indice >= pontos.length
        ) {

            continue;

        }


        let p1;
        let p2;


        // Para carga positiva,
        // seta aponta para fora.

        if (cargaPositiva) {

            p1 =
                pontos[indice - 1];

            p2 =
                pontos[indice];

        }

        // Para carga negativa,
        // seta aponta para dentro.

        else {

            p1 =
                pontos[indice];

            p2 =
                pontos[indice - 1];

        }


        desenharSeta(
            p1.x,
            p1.y,
            p2.x,
            p2.y
        );

    }

}


// =====================================================
// DESENHAR SETA
// =====================================================

function desenharSeta(
    x1,
    y1,
    x2,
    y2
) {

    const angulo =
        Math.atan2(
            y2 - y1,
            x2 - x1
        );


    const tamanho = 7;


    ctx.beginPath();

    ctx.moveTo(
        x2,
        y2
    );


    ctx.lineTo(
        x2 -
        tamanho *
        Math.cos(
            angulo - Math.PI / 6
        ),

        y2 -
        tamanho *
        Math.sin(
            angulo - Math.PI / 6
        )
    );


    ctx.lineTo(
        x2 -
        tamanho *
        Math.cos(
            angulo + Math.PI / 6
        ),

        y2 -
        tamanho *
        Math.sin(
            angulo + Math.PI / 6
        )
    );


    ctx.closePath();


    ctx.fillStyle =
        cargaPositiva
            ? "rgba(229, 57, 53, 0.55)"
            : "rgba(40, 120, 215, 0.55)";


    ctx.fill();

}


// =====================================================
// ARRASTAR CARGA DE TESTE
// =====================================================

cargaTeste.addEventListener(
    "mousedown",
    function () {

        arrastando = true;

    }
);


document.addEventListener(
    "mouseup",
    function () {

        arrastando = false;

    }
);


area.addEventListener(
    "mousemove",
    function (event) {

        if (!arrastando) {

            return;

        }


        const rect =
            area.getBoundingClientRect();


        let x =
            event.clientX -
            rect.left;


        let y =
            event.clientY -
            rect.top;


        // Impede sair da área

        x = Math.max(
            25,
            Math.min(
                x,
                rect.width - 25
            )
        );


        y = Math.max(
            25,
            Math.min(
                y,
                rect.height - 25
            )
        );


        cargaTeste.style.left =
            x + "px";


        cargaTeste.style.top =
            y + "px";


        atualizarSimulacao();

    }
);


// =====================================================
// ATUALIZAR SIMULAÇÃO
// =====================================================

function atualizarSimulacao() {

    const carga =
        obterCargaGeradora();


    const testeX =
        parseFloat(
            cargaTeste.style.left
        );


    const testeY =
        parseFloat(
            cargaTeste.style.top
        );


    // =============================================
    // DISTÂNCIA
    // =============================================

    const dx =
        testeX - carga.x;

    const dy =
        testeY - carga.y;


    const distanciaPixels =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    // 100 pixels = 1 metro

    const r =
        distanciaPixels / 100;


    if (r < 0.01) {

        return;

    }


    // =============================================
    // CARGA
    // =============================================

    const Q =
        parseFloat(
            valorCarga.value
        ) * 1e-6;


    // =============================================
    // CAMPO ELÉTRICO
    // =============================================

    const E =
        k *
        Math.abs(Q) /
        (r * r);


    // =============================================
    // DIREÇÃO
    // =============================================

    let angulo =
        Math.atan2(
            dy,
            dx
        ) *
        180 /
        Math.PI;


    if (!cargaPositiva) {

        angulo += 180;

    }


    // =============================================
    // MOSTRAR INFORMAÇÕES
    // =============================================

    distanciaTexto.textContent =
        r.toFixed(2) + " m";


    campoTexto.textContent =
        E.toExponential(2) + " N/C";


    if (cargaPositiva) {

        direcaoTexto.textContent =
            "Para fora";

    }

    else {

        direcaoTexto.textContent =
            "Para a carga";

    }


    // =============================================
    // POSICIONAR VETOR E
    // =============================================

    vetorE.style.left =
        testeX + "px";


    vetorE.style.top =
        testeY + "px";


    vetorE.style.transform =
        `rotate(${angulo}deg)`;


    // =============================================
    // POSICIONAR INFORMAÇÕES
    // =============================================

    posicionarInformacoes(
        testeX,
        testeY
    );

}


// =====================================================
// POSICIONAR CAIXA DE INFORMAÇÕES
// =====================================================

function posicionarInformacoes(
    x,
    y
) {

    const largura =
        area.clientWidth;


    const altura =
        area.clientHeight;


    let infoX =
        x + 48;


    let infoY =
        y - 70;


    // Se estiver perto da direita

    if (
        infoX + 200 >
        largura
    ) {

        infoX =
            x - 210;

    }


    // Se estiver perto do topo

    if (infoY < 15) {

        infoY = 15;

    }


    // Se estiver perto da parte inferior

    if (
        infoY + 130 >
        altura
    ) {

        infoY =
            altura - 145;

    }


    infoTeste.style.left =
        infoX + "px";


    infoTeste.style.top =
        infoY + "px";

}


// =====================================================
// BOTÃO CARGA POSITIVA
// =====================================================

btnPositiva.addEventListener(
    "click",
    function () {

        cargaPositiva = true;


        cargaGeradora.textContent =
            "+";


        cargaGeradora.classList.remove(
            "negativa"
        );


        cargaGeradora.classList.add(
            "positiva"
        );


        btnPositiva.classList.add(
            "ativo"
        );


        btnNegativa.classList.remove(
            "ativo"
        );


        desenharLinhasCampo();

        atualizarSimulacao();

    }
);


// =====================================================
// BOTÃO CARGA NEGATIVA
// =====================================================

btnNegativa.addEventListener(
    "click",
    function () {

        cargaPositiva = false;


        cargaGeradora.textContent =
            "−";


        cargaGeradora.classList.remove(
            "positiva"
        );


        cargaGeradora.classList.add(
            "negativa"
        );


        btnNegativa.classList.add(
            "ativo"
        );


        btnPositiva.classList.remove(
            "ativo"
        );


        desenharLinhasCampo();

        atualizarSimulacao();

    }
);


// =====================================================
// BOTÃO MOSTRAR/OCULTAR LINHAS
// =====================================================

btnLinhas.addEventListener(
    "click",
    function () {

        linhasVisiveis =
            !linhasVisiveis;


        if (linhasVisiveis) {

            btnLinhas.classList.add(
                "ativo"
            );

        }

        else {

            btnLinhas.classList.remove(
                "ativo"
            );

        }


        desenharLinhasCampo();

    }
);


// =====================================================
// ALTERAÇÃO DO VALOR DA CARGA
// =====================================================

valorCarga.addEventListener(
    "input",
    function () {

        atualizarSimulacao();

    }
);


// =====================================================
// INICIALIZAÇÃO
// =====================================================

function iniciar() {

    const rect =
        area.getBoundingClientRect();


    cargaTeste.style.left =
        rect.width * 0.72 + "px";


    cargaTeste.style.top =
        rect.height / 2 + "px";


    ajustarCanvas();

    atualizarSimulacao();

}


// =====================================================
// REDIMENSIONAMENTO DA JANELA
// =====================================================

window.addEventListener(
    "resize",
    function () {

        ajustarCanvas();

        atualizarSimulacao();

    }
);


// =====================================================
// INICIAR
// =====================================================

iniciar();
