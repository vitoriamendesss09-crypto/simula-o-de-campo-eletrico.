/* =========================================================
   SIMULADOR DE CAMPO ELÉTRICO
   ========================================================= */


/* =========================================================
   CANVAS
========================================================= */

const canvas = document.getElementById("simulationCanvas");
const ctx = canvas.getContext("2d");


/* =========================================================
   ELEMENTOS DA INTERFACE
========================================================= */

const pauseButton = document.getElementById("pauseButton");
const pauseText = document.getElementById("pauseText");
const pauseIcon = document.getElementById("pauseIcon");

const resetButton = document.getElementById("resetButton");

const addPositiveButton =
    document.getElementById("addPositive");

const addNegativeButton =
    document.getElementById("addNegative");

const speedSlider =
    document.getElementById("speedSlider");

const speedValue =
    document.getElementById("speedValue");

const statusText =
    document.getElementById("statusText");

const fieldValue =
    document.getElementById("fieldValue");

const directionValue =
    document.getElementById("directionValue");

const distanceValue =
    document.getElementById("distanceValue");


/* =========================================================
   CONSTANTES FÍSICAS
========================================================= */

/*
    Constante de Coulomb.

    Para a visualização não precisamos utilizar
    a escala física real diretamente.

    Usamos uma constante visual ajustada para
    que os valores fiquem interessantes na tela.
*/

const K = 900;


/* =========================================================
   VARIÁVEIS
========================================================= */

let width = 0;
let height = 0;

let paused = false;

let speed = 1;

let mouseX = 0;
let mouseY = 0;

let draggingCharge = null;

let testCharge = {
    x: 0,
    y: 0,

    radius: 8,

    /*
        Pequena velocidade para que a carga
        de teste também se mova.
    */

    vx: 0,
    vy: 0
};


/* =========================================================
   CARGAS
========================================================= */

let charges = [

    {
        x: 0,
        y: 0,

        q: 1,

        radius: 17,

        vx: 0.35,
        vy: 0.18
    },

    {
        x: 0,
        y: 0,

        q: -1,

        radius: 17,

        vx: -0.28,
        vy: 0.25
    }

];


/* =========================================================
   PARTICULAS DO CAMPO
========================================================= */

let fieldParticles = [];


/* =========================================================
   LINHAS DE CAMPO
========================================================= */

let fieldLines = [];


/* =========================================================
   CONFIGURAÇÃO DO CANVAS
========================================================= */

function resizeCanvas() {

    const rect =
        canvas.getBoundingClientRect();

    const dpr =
        window.devicePixelRatio || 1;

    width = rect.width;
    height = rect.height;

    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    /*
        Se a posição inicial ainda não foi definida,
        colocamos as cargas na tela.
    */

    if (charges[0].x === 0) {

        initializePositions();

    }

    if (testCharge.x === 0) {

        testCharge.x = width / 2;
        testCharge.y = height * 0.72;

    }

}


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================================
   POSIÇÕES INICIAIS
========================================================= */

function initializePositions() {

    charges[0].x =
        width * 0.35;

    charges[0].y =
        height * 0.45;


    charges[1].x =
        width * 0.65;

    charges[1].y =
        height * 0.45;


    testCharge.x =
        width * 0.5;

    testCharge.y =
        height * 0.72;

}


/* =========================================================
   DISTÂNCIA
========================================================= */

function distance(x1, y1, x2, y2) {

    const dx = x2 - x1;
    const dy = y2 - y1;

    return Math.sqrt(
        dx * dx + dy * dy
    );

}


/* =========================================================
   CAMPO ELÉTRICO
========================================================= */

/*
    Calcula o campo elétrico resultante
    no ponto x,y.

    Para cada carga:

        E = k * q / r²

    Depois dividimos em componentes X/Y.
*/

function calculateElectricField(x, y) {

    let Ex = 0;
    let Ey = 0;

    for (const charge of charges) {

        const dx =
            x - charge.x;

        const dy =
            y - charge.y;

        let r2 =
            dx * dx +
            dy * dy;

        /*
            Evita divisão por zero.
        */

        if (r2 < 100) {

            r2 = 100;

        }

        const r =
            Math.sqrt(r2);

        const magnitude =
            K * charge.q / r2;

        Ex +=
            magnitude *
            dx / r;

        Ey +=
            magnitude *
            dy / r;

    }

    const magnitude =
        Math.sqrt(
            Ex * Ex +
            Ey * Ey
        );

    const angle =
        Math.atan2(Ey, Ex) *
        180 /
        Math.PI;

    return {
        x: Ex,
        y: Ey,
        magnitude,
        angle
    };

}


/* =========================================================
   ATUALIZAR CARGAS
========================================================= */

function updateCharges() {

    if (paused) {
        return;
    }

    for (const charge of charges) {

        /*
            Movimento automático.
        */

        charge.x +=
            charge.vx * speed;

        charge.y +=
            charge.vy * speed;


        /*
            Colisão com as paredes.
        */

        if (
            charge.x <
            charge.radius
        ) {

            charge.x =
                charge.radius;

            charge.vx *= -1;

        }


        if (
            charge.x >
            width - charge.radius
        ) {

            charge.x =
                width - charge.radius;

            charge.vx *= -1;

        }


        if (
            charge.y <
            charge.radius
        ) {

            charge.y =
                charge.radius;

            charge.vy *= -1;

        }


        if (
            charge.y >
            height - charge.radius
        ) {

            charge.y =
                height - charge.radius;

            charge.vy *= -1;

        }

    }

}


/* =========================================================
   ATUALIZAR CARGA DE TESTE
========================================================= */

function updateTestCharge() {

    if (paused) {
        return;
    }

    const field =
        calculateElectricField(
            testCharge.x,
            testCharge.y
        );


    /*
        A carga de teste se move de acordo
        com o campo.

        O fator é pequeno porque o objetivo
        é produzir um movimento visual suave.
    */

    const acceleration =
        0.0008;


    testCharge.vx +=
        field.x *
        acceleration *
        speed;


    testCharge.vy +=
        field.y *
        acceleration *
        speed;


    /*
        Limita a velocidade.
    */

    const maxVelocity = 2.5;

    const velocity =
        Math.sqrt(
            testCharge.vx ** 2 +
            testCharge.vy ** 2
        );


    if (velocity > maxVelocity) {

        testCharge.vx =
            testCharge.vx /
            velocity *
            maxVelocity;

        testCharge.vy =
            testCharge.vy /
            velocity *
            maxVelocity;

    }


    testCharge.x +=
        testCharge.vx *
        speed;

    testCharge.y +=
        testCharge.vy *
        speed;


    /*
        Mantém a carga dentro da tela.
    */

    if (
        testCharge.x < 10 ||
        testCharge.x > width - 10
    ) {

        testCharge.vx *= -1;

    }


    if (
        testCharge.y < 10 ||
        testCharge.y > height - 10
    ) {

        testCharge.vy *= -1;

    }

}


/* =========================================================
   CALCULAR LINHAS DE CAMPO
========================================================= */

function generateFieldLines() {

    fieldLines = [];

    /*
        Para cada carga positiva,
        criamos pontos iniciais ao redor dela.

        As linhas de campo saem da carga positiva.
    */

    for (const charge of charges) {

        if (charge.q <= 0) {
            continue;
        }

        const numberOfLines =
            18;


        for (
            let i = 0;
            i < numberOfLines;
            i++
        ) {

            const angle =
                (
                    i /
                    numberOfLines
                ) *
                Math.PI *
                2;


            let x =
                charge.x +
                Math.cos(angle) *
                (charge.radius + 4);

            let y =
                charge.y +
                Math.sin(angle) *
                (charge.radius + 4);


            const points = [];


            /*
                Segue o campo elétrico
                passo a passo.
            */

            for (
                let step = 0;
                step < 350;
                step++
            ) {

                points.push({
                    x,
                    y
                });


                const field =
                    calculateElectricField(
                        x,
                        y
                    );


                const magnitude =
                    Math.sqrt(
                        field.x ** 2 +
                        field.y ** 2
                    );


                if (
                    magnitude < 0.001
                ) {

                    break;

                }


                /*
                    Normaliza o vetor.
                */

                const dirX =
                    field.x /
                    magnitude;

                const dirY =
                    field.y /
                    magnitude;


                /*
                    Tamanho do passo.
                */

                const stepSize = 4;


                x +=
                    dirX *
                    stepSize;

                y +=
                    dirY *
                    stepSize;


                /*
                    Para quando sair da tela.
                */

                if (
                    x < 0 ||
                    x > width ||
                    y < 0 ||
                    y > height
                ) {

                    break;

                }


                /*
                    Verifica se chegou perto
                    de uma carga negativa.

                    Nesse caso a linha termina.
                */

                let reachedCharge = false;


                for (const target of charges) {

                    if (
                        target.q < 0 &&
                        distance(
                            x,
                            y,
                            target.x,
                            target.y
                        ) <
                        target.radius + 5
                    ) {

                        reachedCharge = true;

                        break;

                    }

                }


                if (reachedCharge) {

                    break;

                }

            }


            if (points.length > 5) {

                fieldLines.push(points);

            }

        }

    }

}


/* =========================================================
   DESENHAR FUNDO
========================================================= */

function drawBackground() {

    ctx.fillStyle =
        "#06101d";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    /*
        Grade suave.
    */

    ctx.strokeStyle =
        "rgba(255,255,255,0.025)";

    ctx.lineWidth = 1;


    const gridSize = 40;


    for (
        let x = 0;
        x < width;
        x += gridSize
    ) {

        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(
            x,
            height
        );

        ctx.stroke();

    }


    for (
        let y = 0;
        y < height;
        y += gridSize
    ) {

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(
            width,
            y
        );

        ctx.stroke();

    }

}


/* =========================================================
   DESENHAR LINHAS
========================================================= */

function drawFieldLines() {

    for (const line of fieldLines) {

        if (line.length < 2) {
            continue;
        }


        ctx.beginPath();

        ctx.moveTo(
            line[0].x,
            line[0].y
        );


        for (
            let i = 1;
            i < line.length;
            i++
        ) {

            ctx.lineTo(
                line[i].x,
                line[i].y
            );

        }


        ctx.strokeStyle =
            "rgba(106, 159, 255, 0.28)";

        ctx.lineWidth = 1.2;

        ctx.stroke();


        /*
            Setas no meio das linhas.
        */

        const middle =
            Math.floor(
                line.length * 0.55
            );


        if (
            middle > 2 &&
            middle < line.length - 2
        ) {

            const p1 =
                line[middle - 2];

            const p2 =
                line[middle + 2];


            drawArrow(
                p1,
                p2
            );

        }

    }

}


/* =========================================================
   SETA
========================================================= */

function drawArrow(p1, p2) {

    const angle =
        Math.atan2(
            p2.y - p1.y,
            p2.x - p1.x
        );


    const size = 5;


    ctx.save();

    ctx.translate(
        p2.x,
        p2.y
    );

    ctx.rotate(angle);


    ctx.beginPath();

    ctx.moveTo(0, 0);

    ctx.lineTo(
        -size,
        -size / 2
    );

    ctx.lineTo(
        -size,
        size / 2
    );

    ctx.closePath();


    ctx.fillStyle =
        "rgba(130, 175, 255, 0.7)";

    ctx.fill();


    ctx.restore();

}


/* =========================================================
   PARTICULAS
========================================================= */

function createParticles() {

    fieldParticles = [];


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        fieldParticles.push({

            lineIndex:
                Math.floor(
                    Math.random() *
                    Math.max(
                        fieldLines.length,
                        1
                    )
                ),

            progress:
                Math.random(),

            speed:
                0.0005 +
                Math.random() *
                0.001,

            size:
                1 +
                Math.random() * 1.8

        });

    }

}


/* =========================================================
   ATUALIZAR PARTICULAS
========================================================= */

function updateParticles() {

    if (paused) {
        return;
    }


    for (const particle of fieldParticles) {

        particle.progress +=
            particle.speed *
            speed;


        if (
            particle.progress >= 1
        ) {

            particle.progress = 0;

            particle.lineIndex =
                Math.floor(
                    Math.random() *
                    Math.max(
                        fieldLines.length,
                        1
                    )
                );

        }

    }

}


/* =========================================================
   DESENHAR PARTICULAS
========================================================= */

function drawParticles() {

    for (const particle of fieldParticles) {

        const line =
            fieldLines[
                particle.lineIndex
            ];


        if (
            !line ||
            line.length < 2
        ) {

            continue;

        }


        const index =
            Math.floor(
                particle.progress *
                (line.length - 1)
            );


        const point =
            line[index];


        if (!point) {
            continue;
        }


        ctx.beginPath();


        ctx.arc(
            point.x,
            point.y,
            particle.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            "rgba(150, 205, 255, 0.9)";

        ctx.shadowBlur = 10;

        ctx.shadowColor =
            "rgba(100, 170, 255, 0.8)";

        ctx.fill();


        ctx.shadowBlur = 0;

    }

}


/* =========================================================
   DESENHAR CARGAS
========================================================= */

function drawCharges() {

    for (const charge of charges) {

        const positive =
            charge.q > 0;


        const color =
            positive
                ? "#ff4d67"
                : "#3f9cff";


        /*
            Brilho
        */

        const gradient =
            ctx.createRadialGradient(
                charge.x,
                charge.y,
                2,
                charge.x,
                charge.y,
                charge.radius * 2.4
            );


        gradient.addColorStop(
            0,
            positive
                ? "rgba(255,77,103,0.35)"
                : "rgba(63,156,255,0.35)"
        );


        gradient.addColorStop(
            1,
            "rgba(0,0,0,0)"
        );


        ctx.beginPath();

        ctx.arc(
            charge.x,
            charge.y,
            charge.radius * 2.4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            gradient;

        ctx.fill();


        /*
            Corpo da carga.
        */

        ctx.beginPath();

        ctx.arc(
            charge.x,
            charge.y,
            charge.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            color;

        ctx.fill();


        /*
            Borda.
        */

        ctx.strokeStyle =
            "rgba(255,255,255,0.4)";

        ctx.lineWidth = 1;

        ctx.stroke();


        /*
            Símbolo.
        */

        ctx.fillStyle =
            "#ffffff";

        ctx.font =
            "bold 19px Arial";

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";


        ctx.fillText(
            positive
                ? "+"
                : "−",
            charge.x,
            charge.y + 1
        );

    }

}


/* =========================================================
   DESENHAR CARGA DE TESTE
========================================================= */

function drawTestCharge() {

    const x =
        testCharge.x;

    const y =
        testCharge.y;


    /*
        Brilho.
    */

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        20,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "rgba(255,213,74,0.08)";

    ctx.fill();


    /*
        Corpo.
    */

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        testCharge.radius,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "#ffd54a";

    ctx.fill();


    ctx.strokeStyle =
        "rgba(255,255,255,0.5)";

    ctx.stroke();


    /*
        Símbolo.
    */

    ctx.fillStyle =
        "#172033";

    ctx.font =
        "bold 13px Arial";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";


    ctx.fillText(
        "+",
        x,
        y
    );


    /*
        Pequeno texto.
    */

    ctx.fillStyle =
        "rgba(255,255,255,0.65)";

    ctx.font =
        "10px Arial";


    ctx.fillText(
        "carga de teste",
        x,
        y + 24
    );

}


/* =========================================================
   VETOR DO CAMPO
========================================================= */

function drawElectricFieldVector() {

    const field =
        calculateElectricField(
            testCharge.x,
            testCharge.y
        );


    const magnitude =
        field.magnitude;


    if (
        magnitude < 0.001
    ) {

        return;

    }


    /*
        Normaliza.
    */

    const dx =
        field.x /
        magnitude;

    const dy =
        field.y /
        magnitude;


    /*
        Tamanho visual.
    */

    const vectorLength =
        Math.min(
            80,
            25 +
            magnitude * 0.08
        );


    const x1 =
        testCharge.x;

    const y1 =
        testCharge.y;


    const x2 =
        x1 +
        dx *
        vectorLength;

    const y2 =
        y1 +
        dy *
        vectorLength;


    ctx.beginPath();

    ctx.moveTo(
        x1,
        y1
    );

    ctx.lineTo(
        x2,
        y2
    );


    ctx.strokeStyle =
        "rgba(255,213,74,0.85)";

    ctx.lineWidth = 2;

    ctx.stroke();


    /*
        Cabeça da seta.
    */

    drawArrow(
        {
            x: x1,
            y: y1
        },
        {
            x: x2,
            y: y2
        }
    );

}


/* =========================================================
   ATUALIZAR INFORMAÇÕES
========================================================= */

function updateInformation() {

    const field =
        calculateElectricField(
            testCharge.x,
            testCharge.y
        );


    /*
        Campo.
    */

    fieldValue.textContent =
        field.magnitude.toFixed(2)
        + " N/C";


    /*
        Direção.
    */

    let angle =
        field.angle;


    if (angle < 0) {
        angle += 360;
    }


    directionValue.textContent =
        angle.toFixed(1)
        + "°";


    /*
        Distância até a carga mais próxima.
    */

    let minimumDistance =
        Infinity;


    for (const charge of charges) {

        const d =
            distance(
                testCharge.x,
                testCharge.y,
                charge.x,
                charge.y
            );


        if (
            d < minimumDistance
        ) {

            minimumDistance = d;

        }

    }


    distanceValue.textContent =
        minimumDistance.toFixed(1)
        + " px";

}


/* =========================================================
   DESENHAR TUDO
========================================================= */

function draw() {

    drawBackground();

    drawFieldLines();

    drawParticles();

    drawElectricFieldVector();

    drawCharges();

    drawTestCharge();

}


/* =========================================================
   ATUALIZAÇÃO DA SIMULAÇÃO
========================================================= */

let frameCounter = 0;


function update() {

    updateCharges();

    updateTestCharge();

    updateParticles();


    /*
        Recalcula as linhas regularmente.

        Não precisamos recalcular em todos os frames,
        porque isso seria desnecessariamente pesado.
    */

    frameCounter++;


    if (
        frameCounter % 8 === 0
    ) {

        generateFieldLines();

    }


    updateInformation();

}


/* =========================================================
   LOOP PRINCIPAL
========================================================= */

function animationLoop() {

    update();

    draw();

    requestAnimationFrame(
        animationLoop
    );

}


/* =========================================================
   PAUSAR
========================================================= */

function togglePause() {

    paused =
        !paused;


    if (paused) {

        pauseText.textContent =
            "Continuar";

        pauseIcon.textContent =
            "▶";

        statusText.textContent =
            "Simulação pausada";

    } else {

        pauseText.textContent =
            "Pausar";

        pauseIcon.textContent =
            "Ⅱ";

        statusText.textContent =
            "Simulação ativa";

    }

}


pauseButton.addEventListener(
    "click",
    togglePause
);


/* =========================================================
   REINICIAR
========================================================= */

resetButton.addEventListener(
    "click",
    () => {

        charges = [

            {
                x: width * 0.35,
                y: height * 0.45,

                q: 1,

                radius: 17,

                vx: 0.35,
                vy: 0.18
            },

            {
                x: width * 0.65,
                y: height * 0.45,

                q: -1,

                radius: 17,

                vx: -0.28,
                vy: 0.25
            }

        ];


        testCharge.x =
            width * 0.5;

        testCharge.y =
            height * 0.72;


        testCharge.vx = 0;

        testCharge.vy = 0;


        paused = false;


        pauseText.textContent =
            "Pausar";

        pauseIcon.textContent =
            "Ⅱ";

        statusText.textContent =
            "Simulação ativa";


        generateFieldLines();

        createParticles();

    }
);


/* =========================================================
   ADICIONAR CARGA POSITIVA
========================================================= */

addPositiveButton.addEventListener(
    "click",
    () => {

        const charge = {

            x:
                width *
                (
                    0.2 +
                    Math.random() *
                    0.6
                ),

            y:
                height *
                (
                    0.2 +
                    Math.random() *
                    0.6
                ),

            q: 1,

            radius: 17,

            vx:
                (
                    Math.random() -
                    0.5
                ) * 0.7,

            vy:
                (
                    Math.random() -
                    0.5
                ) * 0.7

        };


        charges.push(
            charge
        );


        generateFieldLines();

        createParticles();

    }
);


/* =========================================================
   ADICIONAR CARGA NEGATIVA
========================================================= */

addNegativeButton.addEventListener(
    "click",
    () => {

        const charge = {

            x:
                width *
                (
                    0.2 +
                    Math.random() *
                    0.6
                ),

            y:
                height *
                (
                    0.2 +
                    Math.random() *
                    0.6
                ),

            q: -1,

            radius: 17,

            vx:
                (
                    Math.random() -
                    0.5
                ) * 0.7,

            vy:
                (
                    Math.random() -
                    0.5
                ) * 0.7

        };


        charges.push(
            charge
        );


        generateFieldLines();

        createParticles();

    }
);


/* =========================================================
   VELOCIDADE
========================================================= */

speedSlider.addEventListener(
    "input",
    () => {

        speed =
            parseFloat(
                speedSlider.value
            );


        speedValue.textContent =
            speed.toFixed(1)
            + "x";

    }
);


/* =========================================================
   MOUSE
========================================================= */

canvas.addEventListener(
    "mousemove",
    (event) => {

        const rect =
            canvas.getBoundingClientRect();


        mouseX =
            event.clientX -
            rect.left;

        mouseY =
            event.clientY -
            rect.top;


        /*
            Se estamos arrastando uma carga,
            ela acompanha o mouse.
        */

        if (draggingCharge) {

            draggingCharge.x =
                mouseX;

            draggingCharge.y =
                mouseY;

            /*
                Para a carga enquanto
                o usuário arrasta.
            */

            draggingCharge.vx = 0;

            draggingCharge.vy = 0;


            canvas.style.cursor =
                "grabbing";

        }

    }
);


/* =========================================================
   MOUSE DOWN
========================================================= */

canvas.addEventListener(
    "mousedown",
    (event) => {

        const rect =
            canvas.getBoundingClientRect();


        const x =
            event.clientX -
            rect.left;

        const y =
            event.clientY -
            rect.top;


        /*
            Verifica se clicou em uma carga.
        */

        for (
            let i = charges.length - 1;
            i >= 0;
            i--
        ) {

            const charge =
                charges[i];


            const d =
                distance(
                    x,
                    y,
                    charge.x,
                    charge.y
                );


            if (
                d <=
                charge.radius + 8
            ) {

                draggingCharge =
                    charge;

                canvas.style.cursor =
                    "grabbing";

                return;

            }

        }

    }
);


/* =========================================================
   MOUSE UP
========================================================= */

window.addEventListener(
    "mouseup",
    () => {

        if (draggingCharge) {

            /*
                Dá uma pequena velocidade
                depois que solta.
            */

            draggingCharge.vx =
                (
                    Math.random() -
                    0.5
                ) * 0.5;


            draggingCharge.vy =
                (
                    Math.random() -
                    0.5
                ) * 0.5;

        }


        draggingCharge =
            null;


        canvas.style.cursor =
            "default";

    }
);


/* =========================================================
   TOUCH
========================================================= */

canvas.addEventListener(
    "touchstart",
    (event) => {

        const touch =
            event.touches[0];


        const rect =
            canvas.getBoundingClientRect();


        const x =
            touch.clientX -
            rect.left;

        const y =
            touch.clientY -
            rect.top;


        for (
            let i = charges.length - 1;
            i >= 0;
            i--
        ) {

            const charge =
                charges[i];


            const d =
                distance(
                    x,
                    y,
                    charge.x,
                    charge.y
                );


            if (
                d <=
                charge.radius + 12
            ) {

                draggingCharge =
                    charge;

                event.preventDefault();

                return;

            }

        }

    },
    {
        passive: false
    }
);


canvas.addEventListener(
    "touchmove",
    (event) => {

        if (!draggingCharge) {
            return;
        }


        const touch =
            event.touches[0];


        const rect =
            canvas.getBoundingClientRect();


        draggingCharge.x =
            touch.clientX -
            rect.left;


        draggingCharge.y =
            touch.clientY -
            rect.top;


        event.preventDefault();

    },
    {
        passive: false
    }
);


canvas.addEventListener(
    "touchend",
    () => {

        draggingCharge =
            null;

    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

resizeCanvas();

generateFieldLines();

createParticles();

animationLoop();
