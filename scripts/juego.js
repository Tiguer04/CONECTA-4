"use strict";
const turno = localStorage.getItem('turno');
let rojosJuegan = turno ? JSON.parse(turno) : true;
let hayGanador = false;
let detener = false;
let encontrado1 = false;
const recienCargado = localStorage.getItem('recienCargado');
let inicioRenderizado = recienCargado !== null ? JSON.parse(recienCargado) : true;
const clickeadoBotonRobot = localStorage.getItem('robot');
let robotFueClickeado = clickeadoBotonRobot ? JSON.parse(clickeadoBotonRobot) : false;
const bodyAlmacenado = localStorage.getItem('body');
let bodyStyles = bodyAlmacenado ? JSON.parse(bodyAlmacenado) : 'linear-gradient(to right, #ff0000, #f6ff00)';
const amarilloAlmacenado = localStorage.getItem('amarilloStyles');
let amarilloStyles = amarilloAlmacenado ? JSON.parse(amarilloAlmacenado) : '1';
const robotAlmacenado = localStorage.getItem('robotStyles');
let robotStyles = robotAlmacenado ? JSON.parse(robotAlmacenado) : '0';
const todosLosBotones = document.querySelectorAll('.b');
const almacenado = localStorage.getItem('botones');
const arrayBotones = Array.from(todosLosBotones);
let botonesPintados = almacenado ? JSON.parse(almacenado) : null;
const botonesColoreados = botonesPintados || [];
const lienzo = document.querySelector('.lienzo');
const logo = document.querySelector('.conecta-logo');
const amarillo = document.querySelector('.amarillo-pelea-fondo');
const robot = document.querySelector('.robot-pelea-fondo');
const botonRobot = document.querySelector('.robot-img');
const botonRobotClickeado = localStorage.getItem('robotClickeado');
let clickedClase = botonRobotClickeado ? JSON.parse(botonRobotClickeado) : null;
const clickSound = new Audio('./sounds/click-sound.wav');
const botonesFila = Array.from(document.querySelectorAll('.f1'));
const botonesFila2 = Array.from(document.querySelectorAll('.f2'));
const botonesFila3 = Array.from(document.querySelectorAll('.f3'));
const botonesFila4 = Array.from(document.querySelectorAll('.f4'));
const botonesFila5 = Array.from(document.querySelectorAll('.f5'));
const botonesFila6 = Array.from(document.querySelectorAll('.f6'));
const imagenAlterna = localStorage.getItem('imagenYellowRobot');
let imagenActual = imagenAlterna ? JSON.parse(imagenAlterna) : 2;
const handleClick1 = () => {
    if (botonesColoreados.length !== 0) {
        return;
    }
    arrayBotones.forEach(boton => boton.classList.add('no-pointer'));
    botonRobot.src = "./images/boton-robot.png";
    botonRobot.className = "robot-img";
    clickedClase = 'boton-robot-clicked';
    botonRobot.classList.add(clickedClase);
    bodyStyles = 'linear-gradient(to right, #ff0000, #f6ff00)';
    amarilloStyles = '1';
    amarillo.style.opacity = '1';
    robotStyles = '0';
    robot.style.opacity = '0';
    robotFueClickeado = false;
    imagenActual = 2;
    document.body.style.backgroundImage = bodyStyles;
    saveToLocalStorage();
    location.reload();
};
const handleClick2 = () => {
    if (botonesColoreados.length !== 0) {
        return;
    }
    arrayBotones.forEach(boton => boton.classList.add('no-pointer'));
    botonRobot.src = "./images/boton-amarillo.jpg";
    botonRobot.className = "yellow-img";
    clickedClase = 'boton-yellow-clicked';
    botonRobot.classList.add(clickedClase);
    bodyStyles = 'linear-gradient(to right, #ff0000,rgb(195, 0, 255))';
    amarilloStyles = '0';
    amarillo.style.opacity = '0';
    robotStyles = '1';
    robot.style.opacity = '1';
    robotFueClickeado = true;
    imagenActual = 1;
    document.body.style.backgroundImage = bodyStyles;
    saveToLocalStorage();
    location.reload();
};
renderPage();
function renderPage() {
    arrayBotones.forEach(boton => {
        boton.addEventListener('click', () => {
            inicioRenderizado = false;
        });
    });
    if (botonesColoreados.length > 0) {
        botonRobot.classList.add('no-pointer');
    }
    arrayBotones.forEach(boton => boton.classList.add('no-pointer'));
    setTimeout(() => {
        arrayBotones.forEach(boton => boton.classList.remove('no-pointer'));
    }, 500);
    arrayBotones.find(boton => {
        if (boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow') || boton.classList.contains('button-clicked-pink')) {
            encontrado1 = true;
        }
    });
    if (imagenActual === 1) {
        botonRobot.src = "./images/boton-amarillo.jpg";
        botonRobot.className = "yellow-img";
        clickedClase = 'boton-yellow-clicked';
        botonRobot.classList.add(clickedClase);
    }
    else if (imagenActual === 2) {
        botonRobot.src = "./images/boton-robot.png";
        botonRobot.className = "robot-img";
        clickedClase = 'boton-robot-clicked';
        botonRobot.classList.add(clickedClase);
    }
    amarillo.style.opacity = amarilloStyles;
    robot.style.opacity = robotStyles;
    document.body.style.backgroundImage = bodyStyles;
    todosLosBotones.forEach(botonInicial => {
        const botonGlobal = botonInicial.classList[1];
        botonesPintados === null || botonesPintados === void 0 ? void 0 : botonesPintados.forEach(boton => {
            var _a;
            let botonPintado = boton.split(' ').slice(1, 2).toString();
            let colorBoton = boton.split(' ').slice(-1).toString();
            if (botonPintado === botonGlobal) {
                (_a = document.querySelector(`.${botonPintado}`)) === null || _a === void 0 ? void 0 : _a.classList.add(colorBoton);
            }
        });
    });
    cuatroEnLinea();
    filtrajePorFila(botonesFila);
    filtrajePorFila(botonesFila2);
    filtrajePorFila(botonesFila3);
    filtrajePorFila(botonesFila4);
    filtrajePorFila(botonesFila5);
    filtrajePorFila(botonesFila6);
    const botonReiniciar = document.querySelector('.reset-img');
    botonReiniciar === null || botonReiniciar === void 0 ? void 0 : botonReiniciar.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });
    if (encontrado1 === false) {
        robotPlay();
    }
}
function filaUno(boton) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88;
    todosLosBotones.forEach((boton) => {
        if (boton.classList.contains('cuatro-en-linea')) {
            detener = true;
            return;
        }
    });
    if (detener == true) {
        return;
    }
    if (boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow') || boton.classList.contains('button-clicked-pink')) {
        return;
    }
    if (robotFueClickeado) {
        if (rojosJuegan) {
            if (boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow') || boton.classList.contains('button-clicked-pink')) {
                return;
            }
            boton.classList.add('button-clicked-red');
            const botonClases = Array.from(boton.classList).join(' ');
            botonesColoreados.push(botonClases);
            clickSound.currentTime = 0;
            clickSound.play();
            for (let i = 0; i < 42; i++) {
                const numeroAleatorio = Math.floor(Math.random() * 42) + 1;
                let botonDinamico = document.querySelector(`.b${numeroAleatorio}`);
                if (((_a = document.querySelector(`.b${numeroAleatorio}`)) === null || _a === void 0 ? void 0 : _a.classList.contains('button-clicked-red')) || ((_b = document.querySelector(`.b${numeroAleatorio}`)) === null || _b === void 0 ? void 0 : _b.classList.contains('button-clicked-pink'))) {
                    continue;
                }
                let encontrado = false;
                for (let j = 1; j < arrayBotones.length; j++) {
                    const SnumeroAleatorio = Math.floor(Math.random() * 42) + 1;
                    let primerFiltro = true;
                    const contra4 = document.querySelector(`.b${SnumeroAleatorio}`);
                    if (contra4.classList.contains('button-clicked-red') || contra4.classList.contains('button-clicked-pink')) {
                        continue;
                    }
                    for (let k = 1; k < arrayBotones.length; k++) {
                        if (((_c = document.querySelector(`.b${k}`)) === null || _c === void 0 ? void 0 : _c.classList.contains('button-clicked-red')) ||
                            ((_d = document.querySelector(`.b${k}`)) === null || _d === void 0 ? void 0 : _d.classList.contains('button-clicked-pink'))) {
                            continue;
                        }
                        if ((((_e = document.querySelector(`.b${k}`)) === null || _e === void 0 ? void 0 : _e.classList.contains('f1')) &&
                            (((((_f = document.querySelector(`.b${k + 8}`)) === null || _f === void 0 ? void 0 : _f.classList.contains('button-clicked-pink')) &&
                                ((_g = document.querySelector(`.b${k + 16}`)) === null || _g === void 0 ? void 0 : _g.classList.contains('button-clicked-pink')) &&
                                ((_h = document.querySelector(`.b${k + 24}`)) === null || _h === void 0 ? void 0 : _h.classList.contains('button-clicked-pink'))))
                                ||
                                    ((((_j = document.querySelector(`.b${k + 6}`)) === null || _j === void 0 ? void 0 : _j.classList.contains('button-clicked-pink')) &&
                                        ((_k = document.querySelector(`.b${k + 12}`)) === null || _k === void 0 ? void 0 : _k.classList.contains('button-clicked-pink')) &&
                                        ((_l = document.querySelector(`.b${k + 18}`)) === null || _l === void 0 ? void 0 : _l.classList.contains('button-clicked-pink'))))
                                ||
                                    ((((_m = document.querySelector(`.b${k + 1}`)) === null || _m === void 0 ? void 0 : _m.classList.contains('button-clicked-pink')) &&
                                        ((_o = document.querySelector(`.b${k + 2}`)) === null || _o === void 0 ? void 0 : _o.classList.contains('button-clicked-pink'))) &&
                                        (((_p = document.querySelector(`.b${k}`)) === null || _p === void 0 ? void 0 : _p.classList[0]) === ((_q = document.querySelector(`.b${k + 1}`)) === null || _q === void 0 ? void 0 : _q.classList[0])) &&
                                        (((_r = document.querySelector(`.b${k}`)) === null || _r === void 0 ? void 0 : _r.classList[0]) === ((_s = document.querySelector(`.b${k + 2}`)) === null || _s === void 0 ? void 0 : _s.classList[0])))
                                ||
                                    (((((_t = document.querySelector(`.b${k - 1}`)) === null || _t === void 0 ? void 0 : _t.classList.contains('button-clicked-pink')) &&
                                        ((_u = document.querySelector(`.b${k - 2}`)) === null || _u === void 0 ? void 0 : _u.classList.contains('button-clicked-pink'))) &&
                                        (((_v = document.querySelector(`.b${k}`)) === null || _v === void 0 ? void 0 : _v.classList[0]) === ((_w = document.querySelector(`.b${k - 1}`)) === null || _w === void 0 ? void 0 : _w.classList[0])) &&
                                        (((_x = document.querySelector(`.b${k}`)) === null || _x === void 0 ? void 0 : _x.classList[0]) === ((_y = document.querySelector(`.b${k - 2}`)) === null || _y === void 0 ? void 0 : _y.classList[0]))))
                                ||
                                    ((((_z = document.querySelector(`.b${k + 7}`)) === null || _z === void 0 ? void 0 : _z.classList.contains('button-clicked-pink')) &&
                                        ((_0 = document.querySelector(`.b${k + 14}`)) === null || _0 === void 0 ? void 0 : _0.classList.contains('button-clicked-pink')) &&
                                        ((_1 = document.querySelector(`.b${k + 21}`)) === null || _1 === void 0 ? void 0 : _1.classList.contains('button-clicked-pink'))))
                                ||
                                    ((((_2 = document.querySelector(`.b${k + 8}`)) === null || _2 === void 0 ? void 0 : _2.classList.contains('button-clicked-red')) &&
                                        ((_3 = document.querySelector(`.b${k + 16}`)) === null || _3 === void 0 ? void 0 : _3.classList.contains('button-clicked-red')) &&
                                        ((_4 = document.querySelector(`.b${k + 24}`)) === null || _4 === void 0 ? void 0 : _4.classList.contains('button-clicked-red'))))
                                ||
                                    ((((_5 = document.querySelector(`.b${k + 6}`)) === null || _5 === void 0 ? void 0 : _5.classList.contains('button-clicked-red')) &&
                                        ((_6 = document.querySelector(`.b${k + 12}`)) === null || _6 === void 0 ? void 0 : _6.classList.contains('button-clicked-red')) &&
                                        ((_7 = document.querySelector(`.b${k + 18}`)) === null || _7 === void 0 ? void 0 : _7.classList.contains('button-clicked-red'))))
                                ||
                                    (((_8 = document.querySelector(`.b${k + 1}`)) === null || _8 === void 0 ? void 0 : _8.classList.contains('button-clicked-red')) &&
                                        ((_9 = document.querySelector(`.b${k + 2}`)) === null || _9 === void 0 ? void 0 : _9.classList.contains('button-clicked-red')) &&
                                        (((_10 = document.querySelector(`.b${k}`)) === null || _10 === void 0 ? void 0 : _10.classList[0]) === ((_11 = document.querySelector(`.b${k + 1}`)) === null || _11 === void 0 ? void 0 : _11.classList[0])) &&
                                        (((_12 = document.querySelector(`.b${k}`)) === null || _12 === void 0 ? void 0 : _12.classList[0]) === ((_13 = document.querySelector(`.b${k + 2}`)) === null || _13 === void 0 ? void 0 : _13.classList[0])))
                                ||
                                    (((((_14 = document.querySelector(`.b${k - 1}`)) === null || _14 === void 0 ? void 0 : _14.classList.contains('button-clicked-red')) &&
                                        ((_15 = document.querySelector(`.b${k - 2}`)) === null || _15 === void 0 ? void 0 : _15.classList.contains('button-clicked-red')) &&
                                        (((_16 = document.querySelector(`.b${k}`)) === null || _16 === void 0 ? void 0 : _16.classList[0]) === ((_17 = document.querySelector(`.b${k - 1}`)) === null || _17 === void 0 ? void 0 : _17.classList[0])) &&
                                        (((_18 = document.querySelector(`.b${k}`)) === null || _18 === void 0 ? void 0 : _18.classList[0]) === ((_19 = document.querySelector(`.b${k - 2}`)) === null || _19 === void 0 ? void 0 : _19.classList[0])))))))
                            ||
                                (!((_20 = document.querySelector(`.b${k}`)) === null || _20 === void 0 ? void 0 : _20.classList.contains('f1')) &&
                                    ((((((_21 = document.querySelector(`.b${k + 8}`)) === null || _21 === void 0 ? void 0 : _21.classList.contains('button-clicked-pink')) &&
                                        ((_22 = document.querySelector(`.b${k + 16}`)) === null || _22 === void 0 ? void 0 : _22.classList.contains('button-clicked-pink')) &&
                                        ((_23 = document.querySelector(`.b${k + 24}`)) === null || _23 === void 0 ? void 0 : _23.classList.contains('button-clicked-pink')))) &&
                                        (((_24 = document.querySelector(`.b${k - 7}`)) === null || _24 === void 0 ? void 0 : _24.classList.contains('button-clicked-pink')) ||
                                            ((_25 = document.querySelector(`.b${k - 7}`)) === null || _25 === void 0 ? void 0 : _25.classList.contains('button-clicked-red'))))
                                        ||
                                            (((((_26 = document.querySelector(`.b${k + 6}`)) === null || _26 === void 0 ? void 0 : _26.classList.contains('button-clicked-pink')) &&
                                                ((_27 = document.querySelector(`.b${k + 12}`)) === null || _27 === void 0 ? void 0 : _27.classList.contains('button-clicked-pink')) &&
                                                ((_28 = document.querySelector(`.b${k + 18}`)) === null || _28 === void 0 ? void 0 : _28.classList.contains('button-clicked-pink')))) &&
                                                (((_29 = document.querySelector(`.b${k - 7}`)) === null || _29 === void 0 ? void 0 : _29.classList.contains('button-clicked-pink')) ||
                                                    ((_30 = document.querySelector(`.b${k - 7}`)) === null || _30 === void 0 ? void 0 : _30.classList.contains('button-clicked-red'))))
                                        ||
                                            (((((_31 = document.querySelector(`.b${k + 1}`)) === null || _31 === void 0 ? void 0 : _31.classList.contains('button-clicked-pink')) &&
                                                ((_32 = document.querySelector(`.b${k + 2}`)) === null || _32 === void 0 ? void 0 : _32.classList.contains('button-clicked-pink'))) &&
                                                (((_33 = document.querySelector(`.b${k}`)) === null || _33 === void 0 ? void 0 : _33.classList[0]) === ((_34 = document.querySelector(`.b${k + 1}`)) === null || _34 === void 0 ? void 0 : _34.classList[0])) &&
                                                (((_35 = document.querySelector(`.b${k}`)) === null || _35 === void 0 ? void 0 : _35.classList[0]) === ((_36 = document.querySelector(`.b${k + 2}`)) === null || _36 === void 0 ? void 0 : _36.classList[0]))) &&
                                                (((_37 = document.querySelector(`.b${k - 7}`)) === null || _37 === void 0 ? void 0 : _37.classList.contains('button-clicked-pink')) ||
                                                    ((_38 = document.querySelector(`.b${k - 7}`)) === null || _38 === void 0 ? void 0 : _38.classList.contains('button-clicked-red'))))
                                        ||
                                            (((((_39 = document.querySelector(`.b${k - 1}`)) === null || _39 === void 0 ? void 0 : _39.classList.contains('button-clicked-pink')) &&
                                                ((_40 = document.querySelector(`.b${k - 2}`)) === null || _40 === void 0 ? void 0 : _40.classList.contains('button-clicked-pink'))) &&
                                                (((_41 = document.querySelector(`.b${k}`)) === null || _41 === void 0 ? void 0 : _41.classList[0]) === ((_42 = document.querySelector(`.b${k - 1}`)) === null || _42 === void 0 ? void 0 : _42.classList[0])) &&
                                                (((_43 = document.querySelector(`.b${k}`)) === null || _43 === void 0 ? void 0 : _43.classList[0]) === ((_44 = document.querySelector(`.b${k - 2}`)) === null || _44 === void 0 ? void 0 : _44.classList[0]))) &&
                                                (((_45 = document.querySelector(`.b${k - 7}`)) === null || _45 === void 0 ? void 0 : _45.classList.contains('button-clicked-pink')) ||
                                                    ((_46 = document.querySelector(`.b${k - 7}`)) === null || _46 === void 0 ? void 0 : _46.classList.contains('button-clicked-red'))))
                                        ||
                                            ((((_47 = document.querySelector(`.b${k + 7}`)) === null || _47 === void 0 ? void 0 : _47.classList.contains('button-clicked-pink')) &&
                                                ((_48 = document.querySelector(`.b${k + 14}`)) === null || _48 === void 0 ? void 0 : _48.classList.contains('button-clicked-pink')) &&
                                                ((_49 = document.querySelector(`.b${k + 21}`)) === null || _49 === void 0 ? void 0 : _49.classList.contains('button-clicked-pink'))))
                                        ||
                                            ((((_50 = document.querySelector(`.b${k + 8}`)) === null || _50 === void 0 ? void 0 : _50.classList.contains('button-clicked-red')) &&
                                                ((_51 = document.querySelector(`.b${k + 16}`)) === null || _51 === void 0 ? void 0 : _51.classList.contains('button-clicked-red')) &&
                                                ((_52 = document.querySelector(`.b${k + 24}`)) === null || _52 === void 0 ? void 0 : _52.classList.contains('button-clicked-red'))) &&
                                                (((_53 = document.querySelector(`.b${k - 7}`)) === null || _53 === void 0 ? void 0 : _53.classList.contains('button-clicked-pink')) ||
                                                    ((_54 = document.querySelector(`.b${k - 7}`)) === null || _54 === void 0 ? void 0 : _54.classList.contains('button-clicked-red'))))
                                        ||
                                            ((((_55 = document.querySelector(`.b${k + 6}`)) === null || _55 === void 0 ? void 0 : _55.classList.contains('button-clicked-red')) &&
                                                ((_56 = document.querySelector(`.b${k + 12}`)) === null || _56 === void 0 ? void 0 : _56.classList.contains('button-clicked-red')) &&
                                                ((_57 = document.querySelector(`.b${k + 18}`)) === null || _57 === void 0 ? void 0 : _57.classList.contains('button-clicked-red'))) &&
                                                (((_58 = document.querySelector(`.b${k - 7}`)) === null || _58 === void 0 ? void 0 : _58.classList.contains('button-clicked-pink')) ||
                                                    ((_59 = document.querySelector(`.b${k - 7}`)) === null || _59 === void 0 ? void 0 : _59.classList.contains('button-clicked-red'))))
                                        ||
                                            (((_60 = document.querySelector(`.b${k + 1}`)) === null || _60 === void 0 ? void 0 : _60.classList.contains('button-clicked-red')) &&
                                                ((_61 = document.querySelector(`.b${k + 2}`)) === null || _61 === void 0 ? void 0 : _61.classList.contains('button-clicked-red')) &&
                                                (((_62 = document.querySelector(`.b${k}`)) === null || _62 === void 0 ? void 0 : _62.classList[0]) === ((_63 = document.querySelector(`.b${k + 1}`)) === null || _63 === void 0 ? void 0 : _63.classList[0])) &&
                                                (((_64 = document.querySelector(`.b${k}`)) === null || _64 === void 0 ? void 0 : _64.classList[0]) === ((_65 = document.querySelector(`.b${k + 2}`)) === null || _65 === void 0 ? void 0 : _65.classList[0])) &&
                                                (((_66 = document.querySelector(`.b${k - 7}`)) === null || _66 === void 0 ? void 0 : _66.classList.contains('button-clicked-pink')) ||
                                                    ((_67 = document.querySelector(`.b${k - 7}`)) === null || _67 === void 0 ? void 0 : _67.classList.contains('button-clicked-red'))))
                                        ||
                                            (((_68 = document.querySelector(`.b${k - 1}`)) === null || _68 === void 0 ? void 0 : _68.classList.contains('button-clicked-red')) &&
                                                ((_69 = document.querySelector(`.b${k - 2}`)) === null || _69 === void 0 ? void 0 : _69.classList.contains('button-clicked-red')) &&
                                                (((_70 = document.querySelector(`.b${k}`)) === null || _70 === void 0 ? void 0 : _70.classList[0]) === ((_71 = document.querySelector(`.b${k - 1}`)) === null || _71 === void 0 ? void 0 : _71.classList[0])) &&
                                                (((_72 = document.querySelector(`.b${k}`)) === null || _72 === void 0 ? void 0 : _72.classList[0]) === ((_73 = document.querySelector(`.b${k - 2}`)) === null || _73 === void 0 ? void 0 : _73.classList[0])) &&
                                                (((_74 = document.querySelector(`.b${k - 7}`)) === null || _74 === void 0 ? void 0 : _74.classList.contains('button-clicked-pink')) ||
                                                    ((_75 = document.querySelector(`.b${k - 7}`)) === null || _75 === void 0 ? void 0 : _75.classList.contains('button-clicked-red'))))))) {
                            arrayBotones.forEach(boton => boton.classList.add('no-pointer'));
                            botonDinamico = document.querySelector(`.b${k}`);
                            botonDinamico === null || botonDinamico === void 0 ? void 0 : botonDinamico.classList.add('button-clicked-pink');
                            const claseBotonDinamico = Array.from(botonDinamico === null || botonDinamico === void 0 ? void 0 : botonDinamico.classList).join(' ');
                            botonesColoreados.push(claseBotonDinamico);
                            clickSound.currentTime = 0;
                            clickSound.play();
                            cuatroEnLinea();
                            saveToLocalStorage();
                            setTimeout(() => {
                                arrayBotones.forEach(boton => boton.classList.remove('no-pointer'));
                            }, 100);
                            primerFiltro = false;
                            encontrado = true;
                            break;
                        }
                        else {
                            continue;
                        }
                    }
                    if (encontrado === true) {
                        return;
                    }
                    if (primerFiltro) {
                        if (((_76 = document.querySelector(`.b${SnumeroAleatorio}`)) === null || _76 === void 0 ? void 0 : _76.classList.contains('f1')) ||
                            (!((_77 = document.querySelector(`.b${SnumeroAleatorio}`)) === null || _77 === void 0 ? void 0 : _77.classList.contains('f1')) &&
                                (((_78 = document.querySelector(`.b${SnumeroAleatorio - 7}`)) === null || _78 === void 0 ? void 0 : _78.classList.contains('button-clicked-red')) ||
                                    ((_79 = document.querySelector(`.b${SnumeroAleatorio - 7}`)) === null || _79 === void 0 ? void 0 : _79.classList.contains('button-clicked-pink')))) ||
                            (((_80 = document.querySelector(`.b${SnumeroAleatorio - 8}`)) === null || _80 === void 0 ? void 0 : _80.classList.contains('button-clicked-red')) &&
                                (((_81 = document.querySelector(`.b${SnumeroAleatorio - 7}`)) === null || _81 === void 0 ? void 0 : _81.classList.contains('button-clicked-red')) ||
                                    ((_82 = document.querySelector(`.b${SnumeroAleatorio - 7}`)) === null || _82 === void 0 ? void 0 : _82.classList.contains('button-clicked-pink')))) ||
                            (((_83 = document.querySelector(`.b${SnumeroAleatorio - 6}`)) === null || _83 === void 0 ? void 0 : _83.classList.contains('button-clicked-red')) &&
                                (((_84 = document.querySelector(`.b${SnumeroAleatorio - 7}`)) === null || _84 === void 0 ? void 0 : _84.classList.contains('button-clicked-red')) ||
                                    ((_85 = document.querySelector(`.b${SnumeroAleatorio - 7}`)) === null || _85 === void 0 ? void 0 : _85.classList.contains('button-clicked-pink'))))) {
                            arrayBotones.forEach(boton => boton.classList.add('no-pointer'));
                            botonDinamico = contra4;
                            setTimeout(() => {
                                botonDinamico === null || botonDinamico === void 0 ? void 0 : botonDinamico.classList.add('button-clicked-pink');
                                const claseBotonDinamico = Array.from(botonDinamico === null || botonDinamico === void 0 ? void 0 : botonDinamico.classList).join(' ');
                                botonesColoreados.push(claseBotonDinamico);
                                clickSound.currentTime = 0;
                                clickSound.play();
                                cuatroEnLinea();
                                saveToLocalStorage();
                                setTimeout(() => {
                                    arrayBotones.forEach(boton => boton.classList.remove('no-pointer'));
                                }, 100);
                            }, 0);
                            cuatroEnLinea();
                            saveToLocalStorage();
                            encontrado = true;
                            break;
                        }
                        else {
                            continue;
                        }
                    }
                }
                if (encontrado === true) {
                    return;
                }
                if (hayGanador) {
                    return;
                }
                if (encontrado === false) {
                    botonDinamico = document.querySelector(`.b${numeroAleatorio}`);
                    if (botonDinamico === null || botonDinamico === void 0 ? void 0 : botonDinamico.classList.contains('f1')) {
                        arrayBotones.forEach(boton => boton.classList.add('no-pointer'));
                        botonDinamico === null || botonDinamico === void 0 ? void 0 : botonDinamico.classList.add('button-clicked-pink');
                        const claseBotonDinamico = Array.from(botonDinamico === null || botonDinamico === void 0 ? void 0 : botonDinamico.classList).join(' ');
                        botonesColoreados.push(claseBotonDinamico);
                        clickSound.currentTime = 0;
                        clickSound.play();
                        cuatroEnLinea();
                        saveToLocalStorage();
                        setTimeout(() => {
                            arrayBotones.forEach(boton => boton.classList.remove('no-pointer'));
                        }, 100);
                        break;
                    }
                    if (!((_86 = document.querySelector(`.b${numeroAleatorio}`)) === null || _86 === void 0 ? void 0 : _86.classList.contains('f1')) &&
                        (((_87 = document.querySelector(`.b${numeroAleatorio - 7}`)) === null || _87 === void 0 ? void 0 : _87.classList.contains('button-clicked-red'))
                            || ((_88 = document.querySelector(`.b${numeroAleatorio - 7}`)) === null || _88 === void 0 ? void 0 : _88.classList.contains('button-clicked-pink')))) {
                        arrayBotones.forEach(boton => boton.classList.add('no-pointer'));
                        botonDinamico === null || botonDinamico === void 0 ? void 0 : botonDinamico.classList.add('button-clicked-pink');
                        const claseBotonDinamico = Array.from(botonDinamico === null || botonDinamico === void 0 ? void 0 : botonDinamico.classList).join(' ');
                        botonesColoreados.push(claseBotonDinamico);
                        clickSound.currentTime = 0;
                        clickSound.play();
                        cuatroEnLinea();
                        saveToLocalStorage();
                        setTimeout(() => {
                            arrayBotones.forEach(boton => boton.classList.remove('no-pointer'));
                        }, 100);
                        break;
                    }
                }
                if (hayGanador) {
                    return;
                }
            }
        }
    }
    else {
        if (rojosJuegan) {
            boton.classList.add('button-clicked-red');
            const botonClases = Array.from(boton.classList).join(' ');
            botonesColoreados.push(botonClases);
            clickSound.currentTime = 0;
            clickSound.play();
            encontrado1 = true;
            robotStop();
        }
        else {
            boton.classList.add('button-clicked-yellow');
            const botonClases = Array.from(boton.classList).join(' ');
            botonesColoreados.push(botonClases);
            clickSound.currentTime = 0;
            clickSound.play();
            encontrado1 = true;
            robotStop();
        }
        rojosJuegan = !rojosJuegan;
    }
    cuatroEnLinea();
    saveToLocalStorage();
}
function filasDosSeis(fila) {
    const botonesFila2 = document.querySelectorAll(`.f${fila}`);
    botonesFila2.forEach((boton) => {
        const anterior = boton.className.split(' ');
        const numeroAnterior = Number(anterior[1].split('').slice(1).join(''));
        boton.addEventListener('click', () => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126, _127, _128, _129, _130, _131, _132, _133, _134, _135, _136, _137, _138, _139, _140, _141, _142, _143, _144, _145, _146, _147, _148, _149, _150, _151, _152, _153, _154, _155, _156, _157, _158, _159, _160, _161, _162, _163, _164, _165, _166, _167, _168, _169, _170, _171, _172, _173, _174, _175, _176, _177, _178, _179, _180, _181, _182, _183, _184, _185, _186, _187, _188, _189, _190, _191, _192, _193, _194, _195, _196, _197, _198, _199, _200, _201, _202, _203, _204;
            todosLosBotones.forEach((boton) => {
                if (boton.classList.contains('cuatro-en-linea')) {
                    detener = true;
                    return;
                }
            });
            if (detener == true) {
                return;
            }
            if (boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow') || boton.classList.contains('button-clicked-pink')) {
                return;
            }
            if (robotFueClickeado) {
                if (rojosJuegan) {
                    if (!((_a = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _a === void 0 ? void 0 : _a.classList.contains('button-clicked-red')) &&
                        !((_b = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _b === void 0 ? void 0 : _b.classList.contains('button-clicked-pink'))) {
                        return;
                    }
                    if (((_c = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _c === void 0 ? void 0 : _c.classList.contains('button-clicked-red')) ||
                        ((_d = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _d === void 0 ? void 0 : _d.classList.contains('button-clicked-pink'))) {
                        boton.classList.add('button-clicked-red');
                        const botonClases = Array.from(boton.classList).join(' ');
                        botonesColoreados.push(botonClases);
                        clickSound.currentTime = 0;
                        clickSound.play();
                        cuatroEnLinea();
                        saveToLocalStorage();
                        if (hayGanador) {
                            return;
                        }
                        for (let i = 42; i > 0; i--) {
                            const numeroAleatorio = Math.floor(Math.random() * 42) + 1;
                            let botonDinamico = document.querySelector(`.b${numeroAleatorio}`);
                            let encontrado = false;
                            if (((_e = document.querySelector(`.b${numeroAleatorio}`)) === null || _e === void 0 ? void 0 : _e.classList.contains('button-clicked-red')) || ((_f = document.querySelector(`.b${numeroAleatorio}`)) === null || _f === void 0 ? void 0 : _f.classList.contains('button-clicked-pink'))) {
                                continue;
                            }
                            for (let j = 42; j > 0; j--) {
                                const contra4 = document.querySelector(`.b${j}`);
                                if (contra4.classList.contains('button-clicked-red') || contra4.classList.contains('button-clicked-pink')) {
                                    continue;
                                }
                                if (((((_g = document.querySelector(`.b${j + 8}`)) === null || _g === void 0 ? void 0 : _g.classList.contains('button-clicked-pink')) &&
                                    ((_h = document.querySelector(`.b${j + 16}`)) === null || _h === void 0 ? void 0 : _h.classList.contains('button-clicked-pink')) &&
                                    ((_j = document.querySelector(`.b${j + 24}`)) === null || _j === void 0 ? void 0 : _j.classList.contains('button-clicked-pink'))) &&
                                    (((_k = document.querySelector(`.b${j - 7}`)) === null || _k === void 0 ? void 0 : _k.classList.contains('button-clicked-red')) ||
                                        ((_l = document.querySelector(`.b${j - 7}`)) === null || _l === void 0 ? void 0 : _l.classList.contains('button-clicked-pink'))))
                                    ||
                                        ((((_m = document.querySelector(`.b${j - 8}`)) === null || _m === void 0 ? void 0 : _m.classList.contains('button-clicked-pink')) &&
                                            ((_o = document.querySelector(`.b${j - 16}`)) === null || _o === void 0 ? void 0 : _o.classList.contains('button-clicked-pink')) &&
                                            ((_p = document.querySelector(`.b${j - 24}`)) === null || _p === void 0 ? void 0 : _p.classList.contains('button-clicked-pink'))) &&
                                            ((((_q = document.querySelector(`.b${j - 7}`)) === null || _q === void 0 ? void 0 : _q.classList.contains('button-clicked-red')) ||
                                                ((_r = document.querySelector(`.b${j - 7}`)) === null || _r === void 0 ? void 0 : _r.classList.contains('button-clicked-pink')))))
                                    ||
                                        ((((_s = document.querySelector(`.b${j + 6}`)) === null || _s === void 0 ? void 0 : _s.classList.contains('button-clicked-pink')) &&
                                            ((_t = document.querySelector(`.b${j + 12}`)) === null || _t === void 0 ? void 0 : _t.classList.contains('button-clicked-pink')) &&
                                            ((_u = document.querySelector(`.b${j + 18}`)) === null || _u === void 0 ? void 0 : _u.classList.contains('button-clicked-pink'))) &&
                                            ((((_v = document.querySelector(`.b${j - 7}`)) === null || _v === void 0 ? void 0 : _v.classList.contains('button-clicked-red')) ||
                                                ((_w = document.querySelector(`.b${j - 7}`)) === null || _w === void 0 ? void 0 : _w.classList.contains('button-clicked-pink')))))
                                    ||
                                        ((((_x = document.querySelector(`.b${j - 6}`)) === null || _x === void 0 ? void 0 : _x.classList.contains('button-clicked-pink')) &&
                                            ((_y = document.querySelector(`.b${j - 12}`)) === null || _y === void 0 ? void 0 : _y.classList.contains('button-clicked-pink')) &&
                                            ((_z = document.querySelector(`.b${j - 18}`)) === null || _z === void 0 ? void 0 : _z.classList.contains('button-clicked-pink'))) &&
                                            ((((_0 = document.querySelector(`.b${j - 7}`)) === null || _0 === void 0 ? void 0 : _0.classList.contains('button-clicked-red')) ||
                                                ((_1 = document.querySelector(`.b${j - 7}`)) === null || _1 === void 0 ? void 0 : _1.classList.contains('button-clicked-pink')))))
                                    ||
                                        ((((_2 = document.querySelector(`.b${j - 7}`)) === null || _2 === void 0 ? void 0 : _2.classList.contains('button-clicked-pink')) &&
                                            ((_3 = document.querySelector(`.b${j - 14}`)) === null || _3 === void 0 ? void 0 : _3.classList.contains('button-clicked-pink')) &&
                                            ((_4 = document.querySelector(`.b${j - 21}`)) === null || _4 === void 0 ? void 0 : _4.classList.contains('button-clicked-pink'))))
                                    ||
                                        ((((_5 = document.querySelector(`.b${j + 1}`)) === null || _5 === void 0 ? void 0 : _5.classList.contains('button-clicked-pink')) &&
                                            ((_6 = document.querySelector(`.b${j + 2}`)) === null || _6 === void 0 ? void 0 : _6.classList.contains('button-clicked-pink')) &&
                                            ((_7 = document.querySelector(`.b${j + 3}`)) === null || _7 === void 0 ? void 0 : _7.classList.contains('button-clicked-pink'))) &&
                                            (contra4.classList[0] === ((_8 = document.querySelector(`.b${j + 1}`)) === null || _8 === void 0 ? void 0 : _8.classList[0])) &&
                                            (contra4.classList[0] === ((_9 = document.querySelector(`.b${j + 2}`)) === null || _9 === void 0 ? void 0 : _9.classList[0])) &&
                                            (contra4.classList[0] === ((_10 = document.querySelector(`.b${j + 3}`)) === null || _10 === void 0 ? void 0 : _10.classList[0])) &&
                                            (((_11 = document.querySelector(`.b${j - 7}`)) === null || _11 === void 0 ? void 0 : _11.classList.contains('button-clicked-red')) ||
                                                ((_12 = document.querySelector(`.b${j - 7}`)) === null || _12 === void 0 ? void 0 : _12.classList.contains('button-clicked-pink'))))
                                    ||
                                        ((((_13 = document.querySelector(`.b${j - 1}`)) === null || _13 === void 0 ? void 0 : _13.classList.contains('button-clicked-pink')) &&
                                            ((_14 = document.querySelector(`.b${j - 2}`)) === null || _14 === void 0 ? void 0 : _14.classList.contains('button-clicked-pink')) &&
                                            ((_15 = document.querySelector(`.b${j - 3}`)) === null || _15 === void 0 ? void 0 : _15.classList.contains('button-clicked-pink'))) &&
                                            (contra4.classList[0] === ((_16 = document.querySelector(`.b${j - 1}`)) === null || _16 === void 0 ? void 0 : _16.classList[0])) &&
                                            (contra4.classList[0] === ((_17 = document.querySelector(`.b${j - 2}`)) === null || _17 === void 0 ? void 0 : _17.classList[0])) &&
                                            (contra4.classList[0] === ((_18 = document.querySelector(`.b${j - 3}`)) === null || _18 === void 0 ? void 0 : _18.classList[0])) &&
                                            (((_19 = document.querySelector(`.b${j - 7}`)) === null || _19 === void 0 ? void 0 : _19.classList.contains('button-clicked-red')) ||
                                                ((_20 = document.querySelector(`.b${j - 7}`)) === null || _20 === void 0 ? void 0 : _20.classList.contains('button-clicked-pink'))))
                                    ||
                                        ((((_21 = document.querySelector(`.b${j - 1}`)) === null || _21 === void 0 ? void 0 : _21.classList.contains('button-clicked-pink')) &&
                                            ((_22 = document.querySelector(`.b${j - 2}`)) === null || _22 === void 0 ? void 0 : _22.classList.contains('button-clicked-pink')) &&
                                            ((_23 = document.querySelector(`.b${j - 3}`)) === null || _23 === void 0 ? void 0 : _23.classList.contains('button-clicked-pink'))) &&
                                            (contra4.classList[0] === ((_24 = document.querySelector(`.b${j - 1}`)) === null || _24 === void 0 ? void 0 : _24.classList[0])) &&
                                            (contra4.classList[0] === ((_25 = document.querySelector(`.b${j - 2}`)) === null || _25 === void 0 ? void 0 : _25.classList[0])) &&
                                            (contra4.classList[0] === ((_26 = document.querySelector(`.b${j - 3}`)) === null || _26 === void 0 ? void 0 : _26.classList[0])) &&
                                            ((_27 = document.querySelector(`.b${j}`)) === null || _27 === void 0 ? void 0 : _27.classList.contains('f1')))
                                    ||
                                        ((((_28 = document.querySelector(`.b${j + 1}`)) === null || _28 === void 0 ? void 0 : _28.classList.contains('button-clicked-pink')) &&
                                            ((_29 = document.querySelector(`.b${j + 2}`)) === null || _29 === void 0 ? void 0 : _29.classList.contains('button-clicked-pink')) &&
                                            ((_30 = document.querySelector(`.b${j + 3}`)) === null || _30 === void 0 ? void 0 : _30.classList.contains('button-clicked-pink'))) &&
                                            (contra4.classList[0] === ((_31 = document.querySelector(`.b${j + 1}`)) === null || _31 === void 0 ? void 0 : _31.classList[0])) &&
                                            (contra4.classList[0] === ((_32 = document.querySelector(`.b${j + 2}`)) === null || _32 === void 0 ? void 0 : _32.classList[0])) &&
                                            (contra4.classList[0] === ((_33 = document.querySelector(`.b${j + 3}`)) === null || _33 === void 0 ? void 0 : _33.classList[0])) &&
                                            ((_34 = document.querySelector(`.b${j}`)) === null || _34 === void 0 ? void 0 : _34.classList.contains('f1')))
                                    ||
                                        ((((_35 = document.querySelector(`.b${j + 6}`)) === null || _35 === void 0 ? void 0 : _35.classList.contains('button-clicked-pink')) &&
                                            ((_36 = document.querySelector(`.b${j + 12}`)) === null || _36 === void 0 ? void 0 : _36.classList.contains('button-clicked-pink')) &&
                                            ((_37 = document.querySelector(`.b${j + 18}`)) === null || _37 === void 0 ? void 0 : _37.classList.contains('button-clicked-pink'))) &&
                                            ((_38 = document.querySelector(`.b${j}`)) === null || _38 === void 0 ? void 0 : _38.classList.contains('f1')))
                                    ||
                                        ((((_39 = document.querySelector(`.b${j + 8}`)) === null || _39 === void 0 ? void 0 : _39.classList.contains('button-clicked-red')) &&
                                            ((_40 = document.querySelector(`.b${j + 16}`)) === null || _40 === void 0 ? void 0 : _40.classList.contains('button-clicked-red')) &&
                                            ((_41 = document.querySelector(`.b${j + 24}`)) === null || _41 === void 0 ? void 0 : _41.classList.contains('button-clicked-red'))) &&
                                            ((((_42 = document.querySelector(`.b${j - 7}`)) === null || _42 === void 0 ? void 0 : _42.classList.contains('button-clicked-red')) ||
                                                ((_43 = document.querySelector(`.b${j - 7}`)) === null || _43 === void 0 ? void 0 : _43.classList.contains('button-clicked-pink')))))
                                    ||
                                        ((((_44 = document.querySelector(`.b${j + 8}`)) === null || _44 === void 0 ? void 0 : _44.classList.contains('button-clicked-red')) &&
                                            ((_45 = document.querySelector(`.b${j + 16}`)) === null || _45 === void 0 ? void 0 : _45.classList.contains('button-clicked-red')) &&
                                            ((_46 = document.querySelector(`.b${j + 24}`)) === null || _46 === void 0 ? void 0 : _46.classList.contains('button-clicked-red'))) &&
                                            ((_47 = document.querySelector(`.b${j}`)) === null || _47 === void 0 ? void 0 : _47.classList.contains('f1')))
                                    ||
                                        ((((_48 = document.querySelector(`.b${j - 8}`)) === null || _48 === void 0 ? void 0 : _48.classList.contains('button-clicked-red')) &&
                                            ((_49 = document.querySelector(`.b${j - 16}`)) === null || _49 === void 0 ? void 0 : _49.classList.contains('button-clicked-red')) &&
                                            ((_50 = document.querySelector(`.b${j - 24}`)) === null || _50 === void 0 ? void 0 : _50.classList.contains('button-clicked-red'))) &&
                                            ((((_51 = document.querySelector(`.b${j - 7}`)) === null || _51 === void 0 ? void 0 : _51.classList.contains('button-clicked-red')) ||
                                                ((_52 = document.querySelector(`.b${j - 7}`)) === null || _52 === void 0 ? void 0 : _52.classList.contains('button-clicked-pink')))))
                                    ||
                                        ((((_53 = document.querySelector(`.b${j + 6}`)) === null || _53 === void 0 ? void 0 : _53.classList.contains('button-clicked-red')) &&
                                            ((_54 = document.querySelector(`.b${j + 12}`)) === null || _54 === void 0 ? void 0 : _54.classList.contains('button-clicked-red')) &&
                                            ((_55 = document.querySelector(`.b${j + 18}`)) === null || _55 === void 0 ? void 0 : _55.classList.contains('button-clicked-red'))) &&
                                            ((((_56 = document.querySelector(`.b${j - 7}`)) === null || _56 === void 0 ? void 0 : _56.classList.contains('button-clicked-red')) ||
                                                ((_57 = document.querySelector(`.b${j - 7}`)) === null || _57 === void 0 ? void 0 : _57.classList.contains('button-clicked-pink')))))
                                    ||
                                        ((((_58 = document.querySelector(`.b${j - 6}`)) === null || _58 === void 0 ? void 0 : _58.classList.contains('button-clicked-red')) &&
                                            ((_59 = document.querySelector(`.b${j - 12}`)) === null || _59 === void 0 ? void 0 : _59.classList.contains('button-clicked-red')) &&
                                            ((_60 = document.querySelector(`.b${j - 18}`)) === null || _60 === void 0 ? void 0 : _60.classList.contains('button-clicked-red'))) &&
                                            ((((_61 = document.querySelector(`.b${j - 7}`)) === null || _61 === void 0 ? void 0 : _61.classList.contains('button-clicked-red')) ||
                                                ((_62 = document.querySelector(`.b${j - 7}`)) === null || _62 === void 0 ? void 0 : _62.classList.contains('button-clicked-pink')))))
                                    ||
                                        ((((_63 = document.querySelector(`.b${j + 6}`)) === null || _63 === void 0 ? void 0 : _63.classList.contains('button-clicked-red')) &&
                                            ((_64 = document.querySelector(`.b${j + 12}`)) === null || _64 === void 0 ? void 0 : _64.classList.contains('button-clicked-red')) &&
                                            ((_65 = document.querySelector(`.b${j + 18}`)) === null || _65 === void 0 ? void 0 : _65.classList.contains('button-clicked-red'))) &&
                                            ((_66 = document.querySelector(`.b${j}`)) === null || _66 === void 0 ? void 0 : _66.classList.contains('f1')))
                                    ||
                                        ((((_67 = document.querySelector(`.b${j - 7}`)) === null || _67 === void 0 ? void 0 : _67.classList.contains('button-clicked-red')) &&
                                            ((_68 = document.querySelector(`.b${j - 14}`)) === null || _68 === void 0 ? void 0 : _68.classList.contains('button-clicked-red')) &&
                                            ((_69 = document.querySelector(`.b${j - 21}`)) === null || _69 === void 0 ? void 0 : _69.classList.contains('button-clicked-red'))) &&
                                            (((_70 = document.querySelector(`.b${j - 7}`)) === null || _70 === void 0 ? void 0 : _70.classList.contains('button-clicked-red')) ||
                                                ((_71 = document.querySelector(`.b${j - 7}`)) === null || _71 === void 0 ? void 0 : _71.classList.contains('button-clicked-pink'))))
                                    ||
                                        ((((_72 = document.querySelector(`.b${j + 1}`)) === null || _72 === void 0 ? void 0 : _72.classList.contains('button-clicked-red')) &&
                                            ((_73 = document.querySelector(`.b${j + 2}`)) === null || _73 === void 0 ? void 0 : _73.classList.contains('button-clicked-red')) &&
                                            ((_74 = document.querySelector(`.b${j + 3}`)) === null || _74 === void 0 ? void 0 : _74.classList.contains('button-clicked-red'))) &&
                                            (contra4.classList[0] === ((_75 = document.querySelector(`.b${j + 1}`)) === null || _75 === void 0 ? void 0 : _75.classList[0])) &&
                                            (contra4.classList[0] === ((_76 = document.querySelector(`.b${j + 2}`)) === null || _76 === void 0 ? void 0 : _76.classList[0])) &&
                                            (contra4.classList[0] === ((_77 = document.querySelector(`.b${j + 3}`)) === null || _77 === void 0 ? void 0 : _77.classList[0])) &&
                                            (((_78 = document.querySelector(`.b${j - 7}`)) === null || _78 === void 0 ? void 0 : _78.classList.contains('button-clicked-red')) ||
                                                ((_79 = document.querySelector(`.b${j - 7}`)) === null || _79 === void 0 ? void 0 : _79.classList.contains('button-clicked-pink'))))
                                    ||
                                        ((((_80 = document.querySelector(`.b${j - 1}`)) === null || _80 === void 0 ? void 0 : _80.classList.contains('button-clicked-red')) &&
                                            ((_81 = document.querySelector(`.b${j - 2}`)) === null || _81 === void 0 ? void 0 : _81.classList.contains('button-clicked-red')) &&
                                            ((_82 = document.querySelector(`.b${j - 3}`)) === null || _82 === void 0 ? void 0 : _82.classList.contains('button-clicked-red'))) &&
                                            (contra4.classList[0] === ((_83 = document.querySelector(`.b${j - 1}`)) === null || _83 === void 0 ? void 0 : _83.classList[0])) &&
                                            (contra4.classList[0] === ((_84 = document.querySelector(`.b${j - 2}`)) === null || _84 === void 0 ? void 0 : _84.classList[0])) &&
                                            (contra4.classList[0] === ((_85 = document.querySelector(`.b${j - 3}`)) === null || _85 === void 0 ? void 0 : _85.classList[0])) &&
                                            (((_86 = document.querySelector(`.b${j - 7}`)) === null || _86 === void 0 ? void 0 : _86.classList.contains('button-clicked-red')) ||
                                                ((_87 = document.querySelector(`.b${j - 7}`)) === null || _87 === void 0 ? void 0 : _87.classList.contains('button-clicked-pink'))))
                                    ||
                                        ((((_88 = document.querySelector(`.b${j - 1}`)) === null || _88 === void 0 ? void 0 : _88.classList.contains('button-clicked-red')) &&
                                            ((_89 = document.querySelector(`.b${j - 2}`)) === null || _89 === void 0 ? void 0 : _89.classList.contains('button-clicked-red')) &&
                                            ((_90 = document.querySelector(`.b${j - 3}`)) === null || _90 === void 0 ? void 0 : _90.classList.contains('button-clicked-red'))) &&
                                            (contra4.classList[0] === ((_91 = document.querySelector(`.b${j - 1}`)) === null || _91 === void 0 ? void 0 : _91.classList[0])) &&
                                            (contra4.classList[0] === ((_92 = document.querySelector(`.b${j - 2}`)) === null || _92 === void 0 ? void 0 : _92.classList[0])) &&
                                            (contra4.classList[0] === ((_93 = document.querySelector(`.b${j - 3}`)) === null || _93 === void 0 ? void 0 : _93.classList[0])) &&
                                            ((_94 = document.querySelector(`.b${j}`)) === null || _94 === void 0 ? void 0 : _94.classList.contains('f1')))
                                    ||
                                        ((((_95 = document.querySelector(`.b${j + 1}`)) === null || _95 === void 0 ? void 0 : _95.classList.contains('button-clicked-red')) &&
                                            ((_96 = document.querySelector(`.b${j + 2}`)) === null || _96 === void 0 ? void 0 : _96.classList.contains('button-clicked-red')) &&
                                            ((_97 = document.querySelector(`.b${j + 3}`)) === null || _97 === void 0 ? void 0 : _97.classList.contains('button-clicked-red'))) &&
                                            (contra4.classList[0] === ((_98 = document.querySelector(`.b${j + 1}`)) === null || _98 === void 0 ? void 0 : _98.classList[0])) &&
                                            (contra4.classList[0] === ((_99 = document.querySelector(`.b${j + 2}`)) === null || _99 === void 0 ? void 0 : _99.classList[0])) &&
                                            (contra4.classList[0] === ((_100 = document.querySelector(`.b${j + 3}`)) === null || _100 === void 0 ? void 0 : _100.classList[0])) &&
                                            ((_101 = document.querySelector(`.b${j}`)) === null || _101 === void 0 ? void 0 : _101.classList.contains('f1')))) {
                                    arrayBotones.forEach(boton => boton.classList.add('no-pointer'));
                                    botonDinamico = contra4;
                                    botonDinamico === null || botonDinamico === void 0 ? void 0 : botonDinamico.classList.add('button-clicked-pink');
                                    const claseBotonDinamico = Array.from(botonDinamico === null || botonDinamico === void 0 ? void 0 : botonDinamico.classList).join(' ');
                                    botonesColoreados.push(claseBotonDinamico);
                                    clickSound.currentTime = 0;
                                    clickSound.play();
                                    cuatroEnLinea();
                                    saveToLocalStorage();
                                    setTimeout(() => {
                                        arrayBotones.forEach(boton => boton.classList.remove('no-pointer'));
                                    }, 100);
                                    encontrado = true;
                                    break;
                                }
                                else {
                                    continue;
                                }
                            }
                            if (encontrado === true) {
                                break;
                            }
                            if (hayGanador) {
                                return;
                            }
                            if (encontrado === false) {
                                let tercerFiltro = true;
                                for (let k = 1; k < 43; k++) {
                                    const Scontra4 = document.querySelector(`.b${k}`);
                                    if (Scontra4.classList.contains('button-clicked-red') || Scontra4.classList.contains('button-clicked-pink')) {
                                        continue;
                                    }
                                    if (((((_102 = document.querySelector(`.b${k + 8}`)) === null || _102 === void 0 ? void 0 : _102.classList.contains('button-clicked-red')) &&
                                        ((_103 = document.querySelector(`.b${k + 16}`)) === null || _103 === void 0 ? void 0 : _103.classList.contains('button-clicked-red'))) &&
                                        (((_104 = document.querySelector(`.b${k - 7}`)) === null || _104 === void 0 ? void 0 : _104.classList.contains('button-clicked-red')) ||
                                            ((_105 = document.querySelector(`.b${k - 7}`)) === null || _105 === void 0 ? void 0 : _105.classList.contains('button-clicked-pink'))))
                                        ||
                                            ((((_106 = document.querySelector(`.b${k - 8}`)) === null || _106 === void 0 ? void 0 : _106.classList.contains('button-clicked-red')) &&
                                                ((_107 = document.querySelector(`.b${k - 16}`)) === null || _107 === void 0 ? void 0 : _107.classList.contains('button-clicked-red'))) &&
                                                (((_108 = document.querySelector(`.b${k - 7}`)) === null || _108 === void 0 ? void 0 : _108.classList.contains('button-clicked-red')) ||
                                                    ((_109 = document.querySelector(`.b${k - 7}`)) === null || _109 === void 0 ? void 0 : _109.classList.contains('button-clicked-pink'))))
                                        ||
                                            ((((_110 = document.querySelector(`.b${k + 6}`)) === null || _110 === void 0 ? void 0 : _110.classList.contains('button-clicked-red')) &&
                                                ((_111 = document.querySelector(`.b${k + 12}`)) === null || _111 === void 0 ? void 0 : _111.classList.contains('button-clicked-red'))) &&
                                                (((_112 = document.querySelector(`.b${k - 7}`)) === null || _112 === void 0 ? void 0 : _112.classList.contains('button-clicked-red')) ||
                                                    ((_113 = document.querySelector(`.b${k - 7}`)) === null || _113 === void 0 ? void 0 : _113.classList.contains('button-clicked-pink'))))
                                        ||
                                            ((((_114 = document.querySelector(`.b${k - 6}`)) === null || _114 === void 0 ? void 0 : _114.classList.contains('button-clicked-red')) &&
                                                ((_115 = document.querySelector(`.b${k - 12}`)) === null || _115 === void 0 ? void 0 : _115.classList.contains('button-clicked-red'))) &&
                                                (((_116 = document.querySelector(`.b${k - 7}`)) === null || _116 === void 0 ? void 0 : _116.classList.contains('button-clicked-red')) ||
                                                    ((_117 = document.querySelector(`.b${k - 7}`)) === null || _117 === void 0 ? void 0 : _117.classList.contains('button-clicked-pink'))))
                                        ||
                                            ((((_118 = document.querySelector(`.b${k - 7}`)) === null || _118 === void 0 ? void 0 : _118.classList.contains('button-clicked-red')) &&
                                                ((_119 = document.querySelector(`.b${k - 14}`)) === null || _119 === void 0 ? void 0 : _119.classList.contains('button-clicked-red'))) &&
                                                (((_120 = document.querySelector(`.b${k - 7}`)) === null || _120 === void 0 ? void 0 : _120.classList.contains('button-clicked-red')) ||
                                                    ((_121 = document.querySelector(`.b${k - 7}`)) === null || _121 === void 0 ? void 0 : _121.classList.contains('button-clicked-pink'))))
                                        ||
                                            ((((_122 = document.querySelector(`.b${k + 1}`)) === null || _122 === void 0 ? void 0 : _122.classList.contains('button-clicked-red')) &&
                                                ((_123 = document.querySelector(`.b${k + 2}`)) === null || _123 === void 0 ? void 0 : _123.classList.contains('button-clicked-red'))) &&
                                                (Scontra4.classList[0] === ((_124 = document.querySelector(`.b${k + 1}`)) === null || _124 === void 0 ? void 0 : _124.classList[0])) &&
                                                (Scontra4.classList[0] === ((_125 = document.querySelector(`.b${k + 2}`)) === null || _125 === void 0 ? void 0 : _125.classList[0])) &&
                                                (((_126 = document.querySelector(`.b${k - 7}`)) === null || _126 === void 0 ? void 0 : _126.classList.contains('button-clicked-red')) ||
                                                    ((_127 = document.querySelector(`.b${k - 7}`)) === null || _127 === void 0 ? void 0 : _127.classList.contains('button-clicked-pink'))))
                                        ||
                                            ((((_128 = document.querySelector(`.b${k - 1}`)) === null || _128 === void 0 ? void 0 : _128.classList.contains('button-clicked-red')) &&
                                                ((_129 = document.querySelector(`.b${k - 2}`)) === null || _129 === void 0 ? void 0 : _129.classList.contains('button-clicked-red'))) &&
                                                (Scontra4.classList[0] === ((_130 = document.querySelector(`.b${k - 1}`)) === null || _130 === void 0 ? void 0 : _130.classList[0])) &&
                                                (Scontra4.classList[0] === ((_131 = document.querySelector(`.b${k - 2}`)) === null || _131 === void 0 ? void 0 : _131.classList[0])) &&
                                                (((_132 = document.querySelector(`.b${k - 7}`)) === null || _132 === void 0 ? void 0 : _132.classList.contains('button-clicked-red')) ||
                                                    ((_133 = document.querySelector(`.b${k - 7}`)) === null || _133 === void 0 ? void 0 : _133.classList.contains('button-clicked-pink'))))
                                        ||
                                            ((((_134 = document.querySelector(`.b${k + 1}`)) === null || _134 === void 0 ? void 0 : _134.classList.contains('button-clicked-red')) &&
                                                ((_135 = document.querySelector(`.b${k + 2}`)) === null || _135 === void 0 ? void 0 : _135.classList.contains('button-clicked-red'))) &&
                                                (Scontra4.classList[0] === ((_136 = document.querySelector(`.b${k + 1}`)) === null || _136 === void 0 ? void 0 : _136.classList[0])) &&
                                                (Scontra4.classList[0] === ((_137 = document.querySelector(`.b${k + 2}`)) === null || _137 === void 0 ? void 0 : _137.classList[0])) &&
                                                ((_138 = document.querySelector(`.b${k}`)) === null || _138 === void 0 ? void 0 : _138.classList.contains('f1')))
                                        ||
                                            ((((_139 = document.querySelector(`.b${k - 1}`)) === null || _139 === void 0 ? void 0 : _139.classList.contains('button-clicked-red')) &&
                                                ((_140 = document.querySelector(`.b${k - 2}`)) === null || _140 === void 0 ? void 0 : _140.classList.contains('button-clicked-red'))) &&
                                                (Scontra4.classList[0] === ((_141 = document.querySelector(`.b${k - 1}`)) === null || _141 === void 0 ? void 0 : _141.classList[0])) &&
                                                (Scontra4.classList[0] === ((_142 = document.querySelector(`.b${k - 2}`)) === null || _142 === void 0 ? void 0 : _142.classList[0])) &&
                                                ((_143 = document.querySelector(`.b${k}`)) === null || _143 === void 0 ? void 0 : _143.classList.contains('f1')))
                                        ||
                                            ((((_144 = document.querySelector(`.b${k + 8}`)) === null || _144 === void 0 ? void 0 : _144.classList.contains('button-clicked-pink')) &&
                                                ((_145 = document.querySelector(`.b${k + 16}`)) === null || _145 === void 0 ? void 0 : _145.classList.contains('button-clicked-pink'))) &&
                                                (((_146 = document.querySelector(`.b${k - 7}`)) === null || _146 === void 0 ? void 0 : _146.classList.contains('button-clicked-red')) ||
                                                    ((_147 = document.querySelector(`.b${k - 7}`)) === null || _147 === void 0 ? void 0 : _147.classList.contains('button-clicked-pink'))))
                                        ||
                                            ((((_148 = document.querySelector(`.b${k - 8}`)) === null || _148 === void 0 ? void 0 : _148.classList.contains('button-clicked-pink')) &&
                                                ((_149 = document.querySelector(`.b${k - 16}`)) === null || _149 === void 0 ? void 0 : _149.classList.contains('button-clicked-pink'))) &&
                                                (((_150 = document.querySelector(`.b${k - 7}`)) === null || _150 === void 0 ? void 0 : _150.classList.contains('button-clicked-red')) ||
                                                    ((_151 = document.querySelector(`.b${k - 7}`)) === null || _151 === void 0 ? void 0 : _151.classList.contains('button-clicked-pink'))))
                                        ||
                                            ((((_152 = document.querySelector(`.b${k + 6}`)) === null || _152 === void 0 ? void 0 : _152.classList.contains('button-clicked-pink')) &&
                                                ((_153 = document.querySelector(`.b${k + 12}`)) === null || _153 === void 0 ? void 0 : _153.classList.contains('button-clicked-pink'))) &&
                                                (((_154 = document.querySelector(`.b${k - 7}`)) === null || _154 === void 0 ? void 0 : _154.classList.contains('button-clicked-red')) ||
                                                    ((_155 = document.querySelector(`.b${k - 7}`)) === null || _155 === void 0 ? void 0 : _155.classList.contains('button-clicked-pink'))))
                                        ||
                                            ((((_156 = document.querySelector(`.b${k - 6}`)) === null || _156 === void 0 ? void 0 : _156.classList.contains('button-clicked-pink')) &&
                                                ((_157 = document.querySelector(`.b${k - 12}`)) === null || _157 === void 0 ? void 0 : _157.classList.contains('button-clicked-pink'))) &&
                                                (((_158 = document.querySelector(`.b${k - 7}`)) === null || _158 === void 0 ? void 0 : _158.classList.contains('button-clicked-red')) ||
                                                    ((_159 = document.querySelector(`.b${k - 7}`)) === null || _159 === void 0 ? void 0 : _159.classList.contains('button-clicked-pink'))))
                                        ||
                                            ((((_160 = document.querySelector(`.b${k - 7}`)) === null || _160 === void 0 ? void 0 : _160.classList.contains('button-clicked-pink')) &&
                                                ((_161 = document.querySelector(`.b${k - 14}`)) === null || _161 === void 0 ? void 0 : _161.classList.contains('button-clicked-pink'))) &&
                                                (((_162 = document.querySelector(`.b${k - 7}`)) === null || _162 === void 0 ? void 0 : _162.classList.contains('button-clicked-red')) ||
                                                    ((_163 = document.querySelector(`.b${k - 7}`)) === null || _163 === void 0 ? void 0 : _163.classList.contains('button-clicked-pink'))))
                                        ||
                                            ((((_164 = document.querySelector(`.b${k + 1}`)) === null || _164 === void 0 ? void 0 : _164.classList.contains('button-clicked-pink')) &&
                                                ((_165 = document.querySelector(`.b${k + 2}`)) === null || _165 === void 0 ? void 0 : _165.classList.contains('button-clicked-pink'))) &&
                                                (Scontra4.classList[0] === ((_166 = document.querySelector(`.b${k + 1}`)) === null || _166 === void 0 ? void 0 : _166.classList[0])) &&
                                                (Scontra4.classList[0] === ((_167 = document.querySelector(`.b${k + 2}`)) === null || _167 === void 0 ? void 0 : _167.classList[0])) &&
                                                (((_168 = document.querySelector(`.b${k - 7}`)) === null || _168 === void 0 ? void 0 : _168.classList.contains('button-clicked-red')) ||
                                                    ((_169 = document.querySelector(`.b${k - 7}`)) === null || _169 === void 0 ? void 0 : _169.classList.contains('button-clicked-pink'))))
                                        ||
                                            ((((_170 = document.querySelector(`.b${k - 1}`)) === null || _170 === void 0 ? void 0 : _170.classList.contains('button-clicked-pink')) &&
                                                ((_171 = document.querySelector(`.b${k - 2}`)) === null || _171 === void 0 ? void 0 : _171.classList.contains('button-clicked-pink'))) &&
                                                (Scontra4.classList[0] === ((_172 = document.querySelector(`.b${k - 1}`)) === null || _172 === void 0 ? void 0 : _172.classList[0])) &&
                                                (Scontra4.classList[0] === ((_173 = document.querySelector(`.b${k - 2}`)) === null || _173 === void 0 ? void 0 : _173.classList[0])) &&
                                                (((_174 = document.querySelector(`.b${k - 7}`)) === null || _174 === void 0 ? void 0 : _174.classList.contains('button-clicked-red')) ||
                                                    ((_175 = document.querySelector(`.b${k - 7}`)) === null || _175 === void 0 ? void 0 : _175.classList.contains('button-clicked-pink'))))
                                        ||
                                            ((((_176 = document.querySelector(`.b${k + 1}`)) === null || _176 === void 0 ? void 0 : _176.classList.contains('button-clicked-pink')) &&
                                                ((_177 = document.querySelector(`.b${k + 2}`)) === null || _177 === void 0 ? void 0 : _177.classList.contains('button-clicked-pink'))) &&
                                                (Scontra4.classList[0] === ((_178 = document.querySelector(`.b${k + 1}`)) === null || _178 === void 0 ? void 0 : _178.classList[0])) &&
                                                (Scontra4.classList[0] === ((_179 = document.querySelector(`.b${k + 2}`)) === null || _179 === void 0 ? void 0 : _179.classList[0])) &&
                                                ((_180 = document.querySelector(`.b${k}`)) === null || _180 === void 0 ? void 0 : _180.classList.contains('f1')))
                                        ||
                                            ((((_181 = document.querySelector(`.b${k - 1}`)) === null || _181 === void 0 ? void 0 : _181.classList.contains('button-clicked-pink')) &&
                                                ((_182 = document.querySelector(`.b${k - 2}`)) === null || _182 === void 0 ? void 0 : _182.classList.contains('button-clicked-pink'))) &&
                                                (Scontra4.classList[0] === ((_183 = document.querySelector(`.b${k - 1}`)) === null || _183 === void 0 ? void 0 : _183.classList[0])) &&
                                                (Scontra4.classList[0] === ((_184 = document.querySelector(`.b${k - 2}`)) === null || _184 === void 0 ? void 0 : _184.classList[0])) &&
                                                ((_185 = document.querySelector(`.b${k}`)) === null || _185 === void 0 ? void 0 : _185.classList.contains('f1')))) {
                                        arrayBotones.forEach(boton => boton.classList.add('no-pointer'));
                                        botonDinamico = Scontra4;
                                        botonDinamico === null || botonDinamico === void 0 ? void 0 : botonDinamico.classList.add('button-clicked-pink');
                                        const claseBotonDinamico = Array.from(botonDinamico === null || botonDinamico === void 0 ? void 0 : botonDinamico.classList).join(' ');
                                        botonesColoreados.push(claseBotonDinamico);
                                        clickSound.currentTime = 0;
                                        clickSound.play();
                                        cuatroEnLinea();
                                        saveToLocalStorage();
                                        setTimeout(() => {
                                            arrayBotones.forEach(boton => boton.classList.remove('no-pointer'));
                                        }, 100);
                                        tercerFiltro = false;
                                        encontrado = true;
                                        break;
                                    }
                                    else {
                                        continue;
                                    }
                                }
                                if (encontrado === true) {
                                    return;
                                }
                                if (hayGanador) {
                                    break;
                                }
                                if (tercerFiltro) {
                                    if (((_186 = document.querySelector(`.b${numeroAleatorio}`)) === null || _186 === void 0 ? void 0 : _186.classList.contains('button-clicked-red')) ||
                                        ((_187 = document.querySelector(`.b${numeroAleatorio}`)) === null || _187 === void 0 ? void 0 : _187.classList.contains('button-clicked-pink'))) {
                                        continue;
                                    }
                                    if (((_188 = document.querySelector(`.b${numeroAleatorio - 7}`)) === null || _188 === void 0 ? void 0 : _188.classList.contains('button-clicked-red')) ||
                                        ((_189 = document.querySelector(`.b${numeroAleatorio - 7}`)) === null || _189 === void 0 ? void 0 : _189.classList.contains('button-clicked-pink')) ||
                                        ((_190 = document.querySelector(`.b${numeroAleatorio}`)) === null || _190 === void 0 ? void 0 : _190.classList.contains('f1')) ||
                                        (((_191 = document.querySelector(`.b${numeroAleatorio - 8}`)) === null || _191 === void 0 ? void 0 : _191.classList.contains('button-clicked-red')) &&
                                            (((_192 = document.querySelector(`.b${numeroAleatorio - 7}`)) === null || _192 === void 0 ? void 0 : _192.classList.contains('button-clicked-red')) ||
                                                ((_193 = document.querySelector(`.b${numeroAleatorio - 7}`)) === null || _193 === void 0 ? void 0 : _193.classList.contains('button-clicked-pink')))) ||
                                        (((_194 = document.querySelector(`.b${numeroAleatorio - 6}`)) === null || _194 === void 0 ? void 0 : _194.classList.contains('button-clicked-red')) &&
                                            (((_195 = document.querySelector(`.b${numeroAleatorio - 7}`)) === null || _195 === void 0 ? void 0 : _195.classList.contains('button-clicked-red')) ||
                                                ((_196 = document.querySelector(`.b${numeroAleatorio - 7}`)) === null || _196 === void 0 ? void 0 : _196.classList.contains('button-clicked-pink'))))) {
                                        botonDinamico === null || botonDinamico === void 0 ? void 0 : botonDinamico.classList.add('button-clicked-pink');
                                        const claseBotonDinamico = Array.from(botonDinamico === null || botonDinamico === void 0 ? void 0 : botonDinamico.classList).join(' ');
                                        botonesColoreados.push(claseBotonDinamico);
                                        clickSound.currentTime = 0;
                                        clickSound.play();
                                        cuatroEnLinea();
                                        saveToLocalStorage();
                                        setTimeout(() => {
                                            arrayBotones.forEach(boton => boton.classList.remove('no-pointer'));
                                        }, 100);
                                        break;
                                    }
                                    else {
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                    cuatroEnLinea();
                    saveToLocalStorage();
                }
            }
            else {
                if (rojosJuegan) {
                    if (((_197 = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _197 === void 0 ? void 0 : _197.classList.contains('button-clicked-red')) ||
                        ((_198 = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _198 === void 0 ? void 0 : _198.classList.contains('button-clicked-yellow'))) {
                        boton.classList.add('button-clicked-red');
                        const botonClases = Array.from(boton.classList).join(' ');
                        botonesColoreados.push(botonClases);
                        clickSound.currentTime = 0;
                        clickSound.play();
                        encontrado1 = true;
                        robotStop();
                    }
                    else if (!((_199 = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _199 === void 0 ? void 0 : _199.classList.contains('button-clicked-red')) ||
                        !((_200 = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _200 === void 0 ? void 0 : _200.classList.contains('button-clicked-yellow'))) {
                        return;
                    }
                    cuatroEnLinea();
                }
                else {
                    if (((_201 = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _201 === void 0 ? void 0 : _201.classList.contains('button-clicked-red')) ||
                        ((_202 = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _202 === void 0 ? void 0 : _202.classList.contains('button-clicked-yellow'))) {
                        boton.classList.add('button-clicked-yellow');
                        const botonClases = Array.from(boton.classList).join(' ');
                        botonesColoreados.push(botonClases);
                        clickSound.currentTime = 0;
                        clickSound.play();
                        encontrado1 = true;
                        robotStop();
                    }
                    else if (!((_203 = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _203 === void 0 ? void 0 : _203.classList.contains('button-clicked-red')) ||
                        !((_204 = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _204 === void 0 ? void 0 : _204.classList.contains('button-clicked-yellow'))) {
                        return;
                    }
                    cuatroEnLinea();
                }
                rojosJuegan = !rojosJuegan;
            }
            saveToLocalStorage();
        });
        cuatroEnLinea();
    });
}
function cuatroEnLinea() {
    const victoriaRoja = document.querySelector('.victoria-roja');
    const victoriaAmarilla = document.querySelector('.victoria-amarilla');
    const victoriaRobot = document.querySelector('.victoria-robot');
    if (!hayGanador) {
        arrayBotones.find((boton) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75;
            const botonActual = boton.className.split(' ');
            const numeroActual = Number(botonActual[1].split('').slice(1).join(''));
            const fila = boton.className.split(' ');
            const filaActual = Number(fila[0].split('').slice(1).join());
            if (((_a = document.querySelector(`.b${numeroActual}`)) === null || _a === void 0 ? void 0 : _a.classList.contains('button-clicked-red')) &&
                ((_b = document.querySelector(`.b${numeroActual - 7}`)) === null || _b === void 0 ? void 0 : _b.classList.contains('button-clicked-red')) &&
                ((_c = document.querySelector(`.b${numeroActual - 14}`)) === null || _c === void 0 ? void 0 : _c.classList.contains('button-clicked-red')) &&
                ((_d = document.querySelector(`.b${numeroActual - 21}`)) === null || _d === void 0 ? void 0 : _d.classList.contains('button-clicked-red'))
                ||
                    (((_e = document.querySelector(`.b${numeroActual}`)) === null || _e === void 0 ? void 0 : _e.classList.contains('button-clicked-yellow')) &&
                        ((_f = document.querySelector(`.b${numeroActual - 7}`)) === null || _f === void 0 ? void 0 : _f.classList.contains('button-clicked-yellow')) &&
                        ((_g = document.querySelector(`.b${numeroActual - 14}`)) === null || _g === void 0 ? void 0 : _g.classList.contains('button-clicked-yellow')) &&
                        ((_h = document.querySelector(`.b${numeroActual - 21}`)) === null || _h === void 0 ? void 0 : _h.classList.contains('button-clicked-yellow')))
                ||
                    (((_j = document.querySelector(`.b${numeroActual}`)) === null || _j === void 0 ? void 0 : _j.classList.contains('button-clicked-pink')) &&
                        ((_k = document.querySelector(`.b${numeroActual - 7}`)) === null || _k === void 0 ? void 0 : _k.classList.contains('button-clicked-pink')) &&
                        ((_l = document.querySelector(`.b${numeroActual - 14}`)) === null || _l === void 0 ? void 0 : _l.classList.contains('button-clicked-pink')) &&
                        ((_m = document.querySelector(`.b${numeroActual - 21}`)) === null || _m === void 0 ? void 0 : _m.classList.contains('button-clicked-pink')))) {
                hayGanador = !hayGanador;
                (_o = document.querySelector(`.b${numeroActual}`)) === null || _o === void 0 ? void 0 : _o.classList.add('cuatro-en-linea');
                (_p = document.querySelector(`.b${numeroActual - 7}`)) === null || _p === void 0 ? void 0 : _p.classList.add('cuatro-en-linea');
                (_q = document.querySelector(`.b${numeroActual - 14}`)) === null || _q === void 0 ? void 0 : _q.classList.add('cuatro-en-linea');
                (_r = document.querySelector(`.b${numeroActual - 21}`)) === null || _r === void 0 ? void 0 : _r.classList.add('cuatro-en-linea');
                if ((_s = document.querySelector(`.b${numeroActual}`)) === null || _s === void 0 ? void 0 : _s.classList.contains('button-clicked-red')) {
                    if (victoriaRoja) {
                        victoriaRoja.style.opacity = '1';
                        victoriaRoja.style.zIndex = '2';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(255, 0, 0, 0.8))';
                        }
                    }
                }
                else if ((_t = document.querySelector(`.b${numeroActual}`)) === null || _t === void 0 ? void 0 : _t.classList.contains('button-clicked-pink')) {
                    if (victoriaRobot) {
                        victoriaRobot.style.opacity = '1';
                        victoriaRobot.style.zIndex = '2';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(191, 0, 255, 0.92))';
                        }
                    }
                }
                else if ((_u = document.querySelector(`.b${numeroActual}`)) === null || _u === void 0 ? void 0 : _u.classList.contains('button-clicked-yellow')) {
                    if (victoriaAmarilla) {
                        victoriaAmarilla.style.opacity = '1';
                        victoriaAmarilla.style.zIndex = '2';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(229, 255, 0, 0.92))';
                        }
                    }
                }
            }
            if (((((_v = document.querySelector(`.b${numeroActual}`)) === null || _v === void 0 ? void 0 : _v.classList.contains('button-clicked-red')) &&
                ((_w = document.querySelector(`.b${numeroActual - 1}`)) === null || _w === void 0 ? void 0 : _w.classList.contains('button-clicked-red')) &&
                ((_x = document.querySelector(`.b${numeroActual - 2}`)) === null || _x === void 0 ? void 0 : _x.classList.contains('button-clicked-red')) &&
                ((_y = document.querySelector(`.b${numeroActual - 3}`)) === null || _y === void 0 ? void 0 : _y.classList.contains('button-clicked-red')))
                ||
                    (((_z = document.querySelector(`.b${numeroActual}`)) === null || _z === void 0 ? void 0 : _z.classList.contains('button-clicked-yellow')) &&
                        ((_0 = document.querySelector(`.b${numeroActual - 1}`)) === null || _0 === void 0 ? void 0 : _0.classList.contains('button-clicked-yellow')) &&
                        ((_1 = document.querySelector(`.b${numeroActual - 2}`)) === null || _1 === void 0 ? void 0 : _1.classList.contains('button-clicked-yellow')) &&
                        ((_2 = document.querySelector(`.b${numeroActual - 3}`)) === null || _2 === void 0 ? void 0 : _2.classList.contains('button-clicked-yellow')))
                ||
                    (((_3 = document.querySelector(`.b${numeroActual}`)) === null || _3 === void 0 ? void 0 : _3.classList.contains('button-clicked-pink')) &&
                        ((_4 = document.querySelector(`.b${numeroActual - 1}`)) === null || _4 === void 0 ? void 0 : _4.classList.contains('button-clicked-pink')) &&
                        ((_5 = document.querySelector(`.b${numeroActual - 2}`)) === null || _5 === void 0 ? void 0 : _5.classList.contains('button-clicked-pink')) &&
                        ((_6 = document.querySelector(`.b${numeroActual - 3}`)) === null || _6 === void 0 ? void 0 : _6.classList.contains('button-clicked-pink'))))
                &&
                    (((_7 = document.querySelector(`.b${numeroActual}`)) === null || _7 === void 0 ? void 0 : _7.classList[0]) === ((_8 = document.querySelector(`.b${numeroActual - 1}`)) === null || _8 === void 0 ? void 0 : _8.classList[0])) &&
                (((_9 = document.querySelector(`.b${numeroActual}`)) === null || _9 === void 0 ? void 0 : _9.classList[0]) === ((_10 = document.querySelector(`.b${numeroActual - 2}`)) === null || _10 === void 0 ? void 0 : _10.classList[0])) &&
                (((_11 = document.querySelector(`.b${numeroActual}`)) === null || _11 === void 0 ? void 0 : _11.classList[0]) === ((_12 = document.querySelector(`.b${numeroActual - 3}`)) === null || _12 === void 0 ? void 0 : _12.classList[0]))) {
                hayGanador = !hayGanador;
                (_13 = document.querySelector(`.b${numeroActual}`)) === null || _13 === void 0 ? void 0 : _13.classList.add('cuatro-en-linea');
                (_14 = document.querySelector(`.b${numeroActual - 1}`)) === null || _14 === void 0 ? void 0 : _14.classList.add('cuatro-en-linea');
                (_15 = document.querySelector(`.b${numeroActual - 2}`)) === null || _15 === void 0 ? void 0 : _15.classList.add('cuatro-en-linea');
                (_16 = document.querySelector(`.b${numeroActual - 3}`)) === null || _16 === void 0 ? void 0 : _16.classList.add('cuatro-en-linea');
                if ((_17 = document.querySelector(`.b${numeroActual}`)) === null || _17 === void 0 ? void 0 : _17.classList.contains('button-clicked-red')) {
                    if (victoriaRoja) {
                        victoriaRoja.style.opacity = '1';
                        victoriaRoja.style.zIndex = '2';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(255, 0, 0, 0.8))';
                        }
                    }
                }
                else if ((_18 = document.querySelector(`.b${numeroActual}`)) === null || _18 === void 0 ? void 0 : _18.classList.contains('button-clicked-yellow')) {
                    if (victoriaAmarilla) {
                        victoriaAmarilla.style.opacity = '1';
                        victoriaAmarilla.style.zIndex = '2';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(229, 255, 0, 0.92))';
                        }
                    }
                }
                else if ((_19 = document.querySelector(`.b${numeroActual}`)) === null || _19 === void 0 ? void 0 : _19.classList.contains('button-clicked-pink')) {
                    if (victoriaRobot) {
                        victoriaRobot.style.opacity = '1';
                        victoriaRobot.style.zIndex = '2';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(191, 0, 255, 0.92))';
                        }
                    }
                }
            }
            if ((((_20 = document.querySelector(`.b${numeroActual}`)) === null || _20 === void 0 ? void 0 : _20.classList.contains('button-clicked-red')) &&
                ((_21 = document.querySelector(`.b${numeroActual + 8}`)) === null || _21 === void 0 ? void 0 : _21.classList.contains('button-clicked-red')) && ((_22 = document.querySelector(`.b${numeroActual + 8}`)) === null || _22 === void 0 ? void 0 : _22.classList.contains(`f${filaActual + 1}`)) &&
                ((_23 = document.querySelector(`.b${numeroActual + 16}`)) === null || _23 === void 0 ? void 0 : _23.classList.contains('button-clicked-red')) && ((_24 = document.querySelector(`.b${numeroActual + 16}`)) === null || _24 === void 0 ? void 0 : _24.classList.contains(`f${filaActual + 2}`)) &&
                ((_25 = document.querySelector(`.b${numeroActual + 24}`)) === null || _25 === void 0 ? void 0 : _25.classList.contains('button-clicked-red'))) && ((_26 = document.querySelector(`.b${numeroActual + 24}`)) === null || _26 === void 0 ? void 0 : _26.classList.contains(`f${filaActual + 3}`))
                ||
                    (((_27 = document.querySelector(`.b${numeroActual}`)) === null || _27 === void 0 ? void 0 : _27.classList.contains('button-clicked-yellow')) &&
                        ((_28 = document.querySelector(`.b${numeroActual + 8}`)) === null || _28 === void 0 ? void 0 : _28.classList.contains('button-clicked-yellow')) && ((_29 = document.querySelector(`.b${numeroActual + 8}`)) === null || _29 === void 0 ? void 0 : _29.classList.contains(`f${filaActual + 1}`)) &&
                        ((_30 = document.querySelector(`.b${numeroActual + 16}`)) === null || _30 === void 0 ? void 0 : _30.classList.contains('button-clicked-yellow')) && ((_31 = document.querySelector(`.b${numeroActual + 16}`)) === null || _31 === void 0 ? void 0 : _31.classList.contains(`f${filaActual + 2}`)) &&
                        ((_32 = document.querySelector(`.b${numeroActual + 24}`)) === null || _32 === void 0 ? void 0 : _32.classList.contains('button-clicked-yellow'))) && ((_33 = document.querySelector(`.b${numeroActual + 24}`)) === null || _33 === void 0 ? void 0 : _33.classList.contains(`f${filaActual + 3}`))
                ||
                    (((_34 = document.querySelector(`.b${numeroActual}`)) === null || _34 === void 0 ? void 0 : _34.classList.contains('button-clicked-pink')) &&
                        ((_35 = document.querySelector(`.b${numeroActual + 8}`)) === null || _35 === void 0 ? void 0 : _35.classList.contains('button-clicked-pink')) && ((_36 = document.querySelector(`.b${numeroActual + 8}`)) === null || _36 === void 0 ? void 0 : _36.classList.contains(`f${filaActual + 1}`)) &&
                        ((_37 = document.querySelector(`.b${numeroActual + 16}`)) === null || _37 === void 0 ? void 0 : _37.classList.contains('button-clicked-pink')) && ((_38 = document.querySelector(`.b${numeroActual + 16}`)) === null || _38 === void 0 ? void 0 : _38.classList.contains(`f${filaActual + 2}`)) &&
                        ((_39 = document.querySelector(`.b${numeroActual + 24}`)) === null || _39 === void 0 ? void 0 : _39.classList.contains('button-clicked-pink'))) && ((_40 = document.querySelector(`.b${numeroActual + 24}`)) === null || _40 === void 0 ? void 0 : _40.classList.contains(`f${filaActual + 3}`))) {
                hayGanador = !hayGanador;
                (_41 = document.querySelector(`.b${numeroActual}`)) === null || _41 === void 0 ? void 0 : _41.classList.add('cuatro-en-linea');
                (_42 = document.querySelector(`.b${numeroActual + 8}`)) === null || _42 === void 0 ? void 0 : _42.classList.add('cuatro-en-linea');
                (_43 = document.querySelector(`.b${numeroActual + 16}`)) === null || _43 === void 0 ? void 0 : _43.classList.add('cuatro-en-linea');
                (_44 = document.querySelector(`.b${numeroActual + 24}`)) === null || _44 === void 0 ? void 0 : _44.classList.add('cuatro-en-linea');
                if ((_45 = document.querySelector(`.b${numeroActual}`)) === null || _45 === void 0 ? void 0 : _45.classList.contains('button-clicked-red')) {
                    if (victoriaRoja) {
                        victoriaRoja.style.opacity = '1';
                        victoriaRoja.style.zIndex = '2';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(255, 0, 0, 0.8))';
                        }
                    }
                }
                else if ((_46 = document.querySelector(`.b${numeroActual}`)) === null || _46 === void 0 ? void 0 : _46.classList.contains('button-clicked-yellow')) {
                    if (victoriaAmarilla) {
                        victoriaAmarilla.style.opacity = '1';
                        victoriaAmarilla.style.zIndex = '2';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(229, 255, 0, 0.92))';
                        }
                    }
                }
                else if ((_47 = document.querySelector(`.b${numeroActual}`)) === null || _47 === void 0 ? void 0 : _47.classList.contains('button-clicked-pink')) {
                    if (victoriaRobot) {
                        victoriaRobot.style.opacity = '1';
                        victoriaRobot.style.zIndex = '2';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(191, 0, 255, 0.92))';
                        }
                    }
                }
            }
            if ((((_48 = document.querySelector(`.b${numeroActual}`)) === null || _48 === void 0 ? void 0 : _48.classList.contains('button-clicked-red')) &&
                ((_49 = document.querySelector(`.b${numeroActual + 6}`)) === null || _49 === void 0 ? void 0 : _49.classList.contains('button-clicked-red')) && ((_50 = document.querySelector(`.b${numeroActual + 6}`)) === null || _50 === void 0 ? void 0 : _50.classList.contains(`f${filaActual + 1}`)) &&
                ((_51 = document.querySelector(`.b${numeroActual + 12}`)) === null || _51 === void 0 ? void 0 : _51.classList.contains('button-clicked-red')) && ((_52 = document.querySelector(`.b${numeroActual + 12}`)) === null || _52 === void 0 ? void 0 : _52.classList.contains(`f${filaActual + 2}`)) &&
                ((_53 = document.querySelector(`.b${numeroActual + 18}`)) === null || _53 === void 0 ? void 0 : _53.classList.contains('button-clicked-red'))) && ((_54 = document.querySelector(`.b${numeroActual + 18}`)) === null || _54 === void 0 ? void 0 : _54.classList.contains(`f${filaActual + 3}`))
                ||
                    (((_55 = document.querySelector(`.b${numeroActual}`)) === null || _55 === void 0 ? void 0 : _55.classList.contains('button-clicked-yellow')) &&
                        ((_56 = document.querySelector(`.b${numeroActual + 6}`)) === null || _56 === void 0 ? void 0 : _56.classList.contains('button-clicked-yellow')) && ((_57 = document.querySelector(`.b${numeroActual + 6}`)) === null || _57 === void 0 ? void 0 : _57.classList.contains(`f${filaActual + 1}`)) &&
                        ((_58 = document.querySelector(`.b${numeroActual + 12}`)) === null || _58 === void 0 ? void 0 : _58.classList.contains('button-clicked-yellow')) && ((_59 = document.querySelector(`.b${numeroActual + 12}`)) === null || _59 === void 0 ? void 0 : _59.classList.contains(`f${filaActual + 2}`)) &&
                        ((_60 = document.querySelector(`.b${numeroActual + 18}`)) === null || _60 === void 0 ? void 0 : _60.classList.contains('button-clicked-yellow'))) && ((_61 = document.querySelector(`.b${numeroActual + 18}`)) === null || _61 === void 0 ? void 0 : _61.classList.contains(`f${filaActual + 3}`))
                ||
                    (((_62 = document.querySelector(`.b${numeroActual}`)) === null || _62 === void 0 ? void 0 : _62.classList.contains('button-clicked-pink')) &&
                        ((_63 = document.querySelector(`.b${numeroActual + 6}`)) === null || _63 === void 0 ? void 0 : _63.classList.contains('button-clicked-pink')) && ((_64 = document.querySelector(`.b${numeroActual + 6}`)) === null || _64 === void 0 ? void 0 : _64.classList.contains(`f${filaActual + 1}`)) &&
                        ((_65 = document.querySelector(`.b${numeroActual + 12}`)) === null || _65 === void 0 ? void 0 : _65.classList.contains('button-clicked-pink')) && ((_66 = document.querySelector(`.b${numeroActual + 12}`)) === null || _66 === void 0 ? void 0 : _66.classList.contains(`f${filaActual + 2}`)) &&
                        ((_67 = document.querySelector(`.b${numeroActual + 18}`)) === null || _67 === void 0 ? void 0 : _67.classList.contains('button-clicked-pink'))) && ((_68 = document.querySelector(`.b${numeroActual + 18}`)) === null || _68 === void 0 ? void 0 : _68.classList.contains(`f${filaActual + 3}`))) {
                hayGanador = !hayGanador;
                (_69 = document.querySelector(`.b${numeroActual}`)) === null || _69 === void 0 ? void 0 : _69.classList.add('cuatro-en-linea');
                (_70 = document.querySelector(`.b${numeroActual + 6}`)) === null || _70 === void 0 ? void 0 : _70.classList.add('cuatro-en-linea');
                (_71 = document.querySelector(`.b${numeroActual + 12}`)) === null || _71 === void 0 ? void 0 : _71.classList.add('cuatro-en-linea');
                (_72 = document.querySelector(`.b${numeroActual + 18}`)) === null || _72 === void 0 ? void 0 : _72.classList.add('cuatro-en-linea');
                if ((_73 = document.querySelector(`.b${numeroActual}`)) === null || _73 === void 0 ? void 0 : _73.classList.contains('button-clicked-red')) {
                    if (victoriaRoja) {
                        victoriaRoja.style.opacity = '1';
                        victoriaRoja.style.zIndex = '2';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(255, 0, 0, 0.8))';
                        }
                    }
                }
                else if ((_74 = document.querySelector(`.b${numeroActual}`)) === null || _74 === void 0 ? void 0 : _74.classList.contains('button-clicked-yellow')) {
                    if (victoriaAmarilla) {
                        victoriaAmarilla.style.opacity = '1';
                        victoriaAmarilla.style.zIndex = '2';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(229, 255, 0, 0.92))';
                        }
                    }
                }
                else if ((_75 = document.querySelector(`.b${numeroActual}`)) === null || _75 === void 0 ? void 0 : _75.classList.contains('button-clicked-pink')) {
                    if (victoriaRobot) {
                        victoriaRobot.style.opacity = '1';
                        victoriaRobot.style.zIndex = '2';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(191, 0, 255, 0.92))';
                        }
                    }
                }
            }
        });
    }
    hayEmpate();
}
function hayEmpate() {
    let acumuladorBotonesUsadosRA = 0;
    let acumuladorBotonesUsadosRR = 0;
    todosLosBotones.forEach((boton) => {
        if (boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow')) {
            acumuladorBotonesUsadosRA += 1;
        }
        else {
            acumuladorBotonesUsadosRA = acumuladorBotonesUsadosRA;
        }
    });
    if (acumuladorBotonesUsadosRA === 42) {
        const imagenEmpateRojo = document.querySelector('.empate-rojo');
        const imagenEmpateAmarillo = document.querySelector('.empate-amarillo');
        imagenEmpateRojo.style.zIndex = '2';
        imagenEmpateRojo.style.opacity = '1';
        imagenEmpateAmarillo.style.zIndex = '2';
        imagenEmpateAmarillo.style.opacity = '1';
        if (lienzo) {
            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
        }
        if (logo) {
            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(255, 255, 255, 0.8))';
        }
    }
    todosLosBotones.forEach((boton) => {
        if (boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-pink')) {
            acumuladorBotonesUsadosRR += 1;
        }
        else {
            acumuladorBotonesUsadosRR = acumuladorBotonesUsadosRR;
        }
    });
    if (acumuladorBotonesUsadosRR === 42) {
        const imagenEmpateRojo = document.querySelector('.empate-rojo');
        const imagenEmpateRobot = document.querySelector('.empate-robot');
        imagenEmpateRojo.style.zIndex = '2';
        imagenEmpateRojo.style.opacity = '1';
        imagenEmpateRobot.style.zIndex = '2';
        imagenEmpateRobot.style.opacity = '1';
        if (lienzo) {
            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
        }
        if (logo) {
            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(255, 255, 255, 0.8))';
        }
    }
}
function saveToLocalStorage() {
    localStorage.setItem('botones', JSON.stringify(botonesColoreados));
    localStorage.setItem('turno', JSON.stringify(rojosJuegan));
    localStorage.setItem('robot', JSON.stringify(robotFueClickeado));
    localStorage.setItem('fondoImagenRobot', JSON.stringify(handleClick1));
    localStorage.setItem('body', JSON.stringify(bodyStyles));
    localStorage.setItem('amarilloStyles', JSON.stringify(amarilloStyles));
    localStorage.setItem('robotStyles', JSON.stringify(robotStyles));
    localStorage.setItem('robotClickeado', JSON.stringify(clickedClase));
    localStorage.setItem('imagenYellowRobot', JSON.stringify(imagenActual));
    localStorage.setItem('recienCargado', JSON.stringify(inicioRenderizado));
}
function robotPlay() {
    if (botonesColoreados.length > 0) {
        botonRobot.classList.add('no-pointer');
        return;
    }
    if (!encontrado1) {
        if (inicioRenderizado === true) {
            if (imagenActual === 2) {
                botonRobot.addEventListener('click', handleClick2);
                saveToLocalStorage();
            }
            else if (imagenActual === 1) {
                botonRobot.addEventListener('click', handleClick1);
                saveToLocalStorage();
            }
        }
    }
}
function robotStop() {
    botonRobot.removeEventListener('click', handleClick1);
    botonRobot.removeEventListener('click', handleClick2);
}
function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function filtrajePorFila(array) {
    array.forEach((boton) => {
        boton.addEventListener('click', () => {
            if (boton.classList.contains('button-clicked-red')) {
                encontrado1 = true;
            }
            if (array === botonesFila) {
                filaUno(boton);
            }
            else if (array === botonesFila2) {
                filasDosSeis('2');
            }
            else if (array === botonesFila3) {
                filasDosSeis('3');
            }
            else if (array === botonesFila4) {
                filasDosSeis('4');
            }
            else if (array === botonesFila5) {
                filasDosSeis('5');
            }
            else if (array === botonesFila6) {
                filasDosSeis('6');
            }
            botonRobot.classList.add('no-pointer');
        });
    });
    saveToLocalStorage();
}
