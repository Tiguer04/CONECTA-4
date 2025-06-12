"use strict";
const turno = localStorage.getItem('turno');
let rojosJuegan = turno ? JSON.parse(turno) : true;
let hayGanador = false;
let detener = false;
let encontrado = false;
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
const hoverSound = new Audio('./sounds/hover-sound.ogg');
const clickRobotSound = new Audio('./sounds/click-robot.wav');
const handleMouseOver = () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
};
const handleClick = () => {
    clickRobotSound.currentTime = 0;
    clickRobotSound.play();
    clickedClase = 'boton-robot-clicked';
    botonRobot.classList.add(clickedClase);
    amarilloStyles = '0';
    amarillo.style.opacity = '0';
    robotStyles = '1';
    robot.style.opacity = '1';
};
renderPage();
function renderPage() {
    if (clickedClase) {
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
                console.log(colorBoton);
                console.log((_a = document.querySelector(`.${botonPintado}`)) === null || _a === void 0 ? void 0 : _a.classList.add(colorBoton));
            }
        });
    });
    cuatroEnLinea();
    const botonesFila = document.querySelectorAll('.f1');
    botonesFila.forEach((boton) => {
        boton.addEventListener('click', () => {
            if (boton.classList.contains('button-clicked-yellow')) {
                encontrado = true;
            }
            filaUno(boton);
        });
    });
    filasDosSeis('2');
    filasDosSeis('3');
    filasDosSeis('4');
    filasDosSeis('5');
    filasDosSeis('6');
    const botonReiniciar = document.querySelector('.reset-img');
    botonReiniciar === null || botonReiniciar === void 0 ? void 0 : botonReiniciar.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });
    if (botonesColoreados.length <= 1) {
        robotPlay();
    }
}
function filaUno(boton) {
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
            boton.classList.add('button-clicked-red');
            const botonClases = Array.from(boton.classList).join(' ');
            botonesColoreados.push(botonClases);
            clickSound.currentTime = 0;
            clickSound.play();
            console.log(encontrado);
        }
        else {
            boton.classList.add('button-clicked-pink');
            const botonClases = Array.from(boton.classList).join(' ');
            botonesColoreados.push(botonClases);
            clickSound.currentTime = 0;
            clickSound.play();
            encontrado = true;
        }
    }
    else {
        if (rojosJuegan) {
            boton.classList.add('button-clicked-red');
            const botonClases = Array.from(boton.classList).join(' ');
            botonesColoreados.push(botonClases);
            clickSound.currentTime = 0;
            clickSound.play();
            console.log(encontrado);
        }
        else {
            boton.classList.add('button-clicked-yellow');
            const botonClases = Array.from(boton.classList).join(' ');
            botonesColoreados.push(botonClases);
            clickSound.currentTime = 0;
            clickSound.play();
            encontrado = true;
            robotStop();
        }
    }
    cuatroEnLinea();
    // Cambiar turno
    rojosJuegan = !rojosJuegan;
    saveToLocalStorage();
}
function filasDosSeis(fila) {
    const botonesFila2 = document.querySelectorAll(`.f${fila}`);
    botonesFila2.forEach((boton) => {
        const anterior = boton.className.split(' ');
        const numeroAnterior = Number(anterior[1].split('').slice(1).join(''));
        boton.addEventListener('click', () => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
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
                    if (((_a = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _a === void 0 ? void 0 : _a.classList.contains('button-clicked-red')) ||
                        ((_b = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _b === void 0 ? void 0 : _b.classList.contains('button-clicked-pink'))) {
                        boton.classList.add('button-clicked-red');
                        const botonClases = Array.from(boton.classList).join(' ');
                        botonesColoreados.push(botonClases);
                        clickSound.currentTime = 0;
                        clickSound.play();
                    }
                    else if (!((_c = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _c === void 0 ? void 0 : _c.classList.contains('button-clicked-red')) ||
                        !((_d = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _d === void 0 ? void 0 : _d.classList.contains('button-clicked-pink'))) {
                        return;
                    }
                    cuatroEnLinea();
                }
                else {
                    if (((_e = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _e === void 0 ? void 0 : _e.classList.contains('button-clicked-red')) ||
                        ((_f = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _f === void 0 ? void 0 : _f.classList.contains('button-clicked-pink'))) {
                        boton.classList.add('button-clicked-pink');
                        const botonClases = Array.from(boton.classList).join(' ');
                        botonesColoreados.push(botonClases);
                        clickSound.currentTime = 0;
                        clickSound.play();
                    }
                    else if (!((_g = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _g === void 0 ? void 0 : _g.classList.contains('button-clicked-red')) ||
                        !((_h = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _h === void 0 ? void 0 : _h.classList.contains('button-clicked-pink'))) {
                        return;
                    }
                    cuatroEnLinea();
                }
            }
            else {
                if (rojosJuegan) {
                    if (((_j = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _j === void 0 ? void 0 : _j.classList.contains('button-clicked-red')) ||
                        ((_k = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _k === void 0 ? void 0 : _k.classList.contains('button-clicked-yellow'))) {
                        boton.classList.add('button-clicked-red');
                        const botonClases = Array.from(boton.classList).join(' ');
                        botonesColoreados.push(botonClases);
                        clickSound.currentTime = 0;
                        clickSound.play();
                    }
                    else if (!((_l = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _l === void 0 ? void 0 : _l.classList.contains('button-clicked-red')) ||
                        !((_m = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _m === void 0 ? void 0 : _m.classList.contains('button-clicked-yellow'))) {
                        return;
                    }
                    cuatroEnLinea();
                }
                else {
                    if (((_o = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _o === void 0 ? void 0 : _o.classList.contains('button-clicked-red')) ||
                        ((_p = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _p === void 0 ? void 0 : _p.classList.contains('button-clicked-yellow'))) {
                        boton.classList.add('button-clicked-yellow');
                        const botonClases = Array.from(boton.classList).join(' ');
                        botonesColoreados.push(botonClases);
                        clickSound.currentTime = 0;
                        clickSound.play();
                    }
                    else if (!((_q = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _q === void 0 ? void 0 : _q.classList.contains('button-clicked-red')) ||
                        !((_r = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _r === void 0 ? void 0 : _r.classList.contains('button-clicked-yellow'))) {
                        return;
                    }
                    cuatroEnLinea();
                }
            }
            rojosJuegan = !rojosJuegan;
            saveToLocalStorage();
        });
    });
}
function cuatroEnLinea() {
    const victoriaRoja = document.querySelector('.victoria-roja');
    const victoriaAmarilla = document.querySelector('.victoria-amarilla');
    if (!hayGanador) {
        arrayBotones.find((boton) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65;
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
                else if ((_t = document.querySelector(`.b${numeroActual}`)) === null || _t === void 0 ? void 0 : _t.classList.contains('button-clicked-yellow')) {
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
            if ((((_u = document.querySelector(`.b${numeroActual}`)) === null || _u === void 0 ? void 0 : _u.classList.contains('button-clicked-red')) &&
                ((_v = document.querySelector(`.b${numeroActual - 1}`)) === null || _v === void 0 ? void 0 : _v.classList.contains('button-clicked-red')) &&
                ((_w = document.querySelector(`.b${numeroActual - 2}`)) === null || _w === void 0 ? void 0 : _w.classList.contains('button-clicked-red')) &&
                ((_x = document.querySelector(`.b${numeroActual - 3}`)) === null || _x === void 0 ? void 0 : _x.classList.contains('button-clicked-red')))
                ||
                    (((_y = document.querySelector(`.b${numeroActual}`)) === null || _y === void 0 ? void 0 : _y.classList.contains('button-clicked-yellow')) &&
                        ((_z = document.querySelector(`.b${numeroActual - 1}`)) === null || _z === void 0 ? void 0 : _z.classList.contains('button-clicked-yellow')) &&
                        ((_0 = document.querySelector(`.b${numeroActual - 2}`)) === null || _0 === void 0 ? void 0 : _0.classList.contains('button-clicked-yellow')) &&
                        ((_1 = document.querySelector(`.b${numeroActual - 3}`)) === null || _1 === void 0 ? void 0 : _1.classList.contains('button-clicked-yellow')))
                ||
                    (((_2 = document.querySelector(`.b${numeroActual}`)) === null || _2 === void 0 ? void 0 : _2.classList.contains('button-clicked-pink')) &&
                        ((_3 = document.querySelector(`.b${numeroActual - 1}`)) === null || _3 === void 0 ? void 0 : _3.classList.contains('button-clicked-pink')) &&
                        ((_4 = document.querySelector(`.b${numeroActual - 2}`)) === null || _4 === void 0 ? void 0 : _4.classList.contains('button-clicked-pink')) &&
                        ((_5 = document.querySelector(`.b${numeroActual - 3}`)) === null || _5 === void 0 ? void 0 : _5.classList.contains('button-clicked-pink')))) {
                hayGanador = !hayGanador;
                (_6 = document.querySelector(`.b${numeroActual}`)) === null || _6 === void 0 ? void 0 : _6.classList.add('cuatro-en-linea');
                (_7 = document.querySelector(`.b${numeroActual - 1}`)) === null || _7 === void 0 ? void 0 : _7.classList.add('cuatro-en-linea');
                (_8 = document.querySelector(`.b${numeroActual - 2}`)) === null || _8 === void 0 ? void 0 : _8.classList.add('cuatro-en-linea');
                (_9 = document.querySelector(`.b${numeroActual - 3}`)) === null || _9 === void 0 ? void 0 : _9.classList.add('cuatro-en-linea');
                if ((_10 = document.querySelector(`.b${numeroActual}`)) === null || _10 === void 0 ? void 0 : _10.classList.contains('button-clicked-red')) {
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
                else if ((_11 = document.querySelector(`.b${numeroActual}`)) === null || _11 === void 0 ? void 0 : _11.classList.contains('button-clicked-yellow')) {
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
            if ((((_12 = document.querySelector(`.b${numeroActual}`)) === null || _12 === void 0 ? void 0 : _12.classList.contains('button-clicked-red')) &&
                ((_13 = document.querySelector(`.b${numeroActual + 8}`)) === null || _13 === void 0 ? void 0 : _13.classList.contains('button-clicked-red')) && ((_14 = document.querySelector(`.b${numeroActual + 8}`)) === null || _14 === void 0 ? void 0 : _14.classList.contains(`f${filaActual + 1}`)) &&
                ((_15 = document.querySelector(`.b${numeroActual + 16}`)) === null || _15 === void 0 ? void 0 : _15.classList.contains('button-clicked-red')) && ((_16 = document.querySelector(`.b${numeroActual + 16}`)) === null || _16 === void 0 ? void 0 : _16.classList.contains(`f${filaActual + 2}`)) &&
                ((_17 = document.querySelector(`.b${numeroActual + 24}`)) === null || _17 === void 0 ? void 0 : _17.classList.contains('button-clicked-red'))) && ((_18 = document.querySelector(`.b${numeroActual + 24}`)) === null || _18 === void 0 ? void 0 : _18.classList.contains(`f${filaActual + 3}`))
                ||
                    (((_19 = document.querySelector(`.b${numeroActual}`)) === null || _19 === void 0 ? void 0 : _19.classList.contains('button-clicked-yellow')) &&
                        ((_20 = document.querySelector(`.b${numeroActual + 8}`)) === null || _20 === void 0 ? void 0 : _20.classList.contains('button-clicked-yellow')) && ((_21 = document.querySelector(`.b${numeroActual + 8}`)) === null || _21 === void 0 ? void 0 : _21.classList.contains(`f${filaActual + 1}`)) &&
                        ((_22 = document.querySelector(`.b${numeroActual + 16}`)) === null || _22 === void 0 ? void 0 : _22.classList.contains('button-clicked-yellow')) && ((_23 = document.querySelector(`.b${numeroActual + 16}`)) === null || _23 === void 0 ? void 0 : _23.classList.contains(`f${filaActual + 2}`)) &&
                        ((_24 = document.querySelector(`.b${numeroActual + 24}`)) === null || _24 === void 0 ? void 0 : _24.classList.contains('button-clicked-yellow'))) && ((_25 = document.querySelector(`.b${numeroActual + 24}`)) === null || _25 === void 0 ? void 0 : _25.classList.contains(`f${filaActual + 3}`))
                ||
                    (((_26 = document.querySelector(`.b${numeroActual}`)) === null || _26 === void 0 ? void 0 : _26.classList.contains('button-clicked-pink')) &&
                        ((_27 = document.querySelector(`.b${numeroActual + 8}`)) === null || _27 === void 0 ? void 0 : _27.classList.contains('button-clicked-pink')) && ((_28 = document.querySelector(`.b${numeroActual + 8}`)) === null || _28 === void 0 ? void 0 : _28.classList.contains(`f${filaActual + 1}`)) &&
                        ((_29 = document.querySelector(`.b${numeroActual + 16}`)) === null || _29 === void 0 ? void 0 : _29.classList.contains('button-clicked-pink')) && ((_30 = document.querySelector(`.b${numeroActual + 16}`)) === null || _30 === void 0 ? void 0 : _30.classList.contains(`f${filaActual + 2}`)) &&
                        ((_31 = document.querySelector(`.b${numeroActual + 24}`)) === null || _31 === void 0 ? void 0 : _31.classList.contains('button-clicked-pink'))) && ((_32 = document.querySelector(`.b${numeroActual + 24}`)) === null || _32 === void 0 ? void 0 : _32.classList.contains(`f${filaActual + 3}`))) {
                hayGanador = !hayGanador;
                (_33 = document.querySelector(`.b${numeroActual}`)) === null || _33 === void 0 ? void 0 : _33.classList.add('cuatro-en-linea');
                (_34 = document.querySelector(`.b${numeroActual + 8}`)) === null || _34 === void 0 ? void 0 : _34.classList.add('cuatro-en-linea');
                (_35 = document.querySelector(`.b${numeroActual + 16}`)) === null || _35 === void 0 ? void 0 : _35.classList.add('cuatro-en-linea');
                (_36 = document.querySelector(`.b${numeroActual + 24}`)) === null || _36 === void 0 ? void 0 : _36.classList.add('cuatro-en-linea');
                if ((_37 = document.querySelector(`.b${numeroActual}`)) === null || _37 === void 0 ? void 0 : _37.classList.contains('button-clicked-red')) {
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
                else if ((_38 = document.querySelector(`.b${numeroActual}`)) === null || _38 === void 0 ? void 0 : _38.classList.contains('button-clicked-yellow')) {
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
            if ((((_39 = document.querySelector(`.b${numeroActual}`)) === null || _39 === void 0 ? void 0 : _39.classList.contains('button-clicked-red')) &&
                ((_40 = document.querySelector(`.b${numeroActual + 6}`)) === null || _40 === void 0 ? void 0 : _40.classList.contains('button-clicked-red')) && ((_41 = document.querySelector(`.b${numeroActual + 6}`)) === null || _41 === void 0 ? void 0 : _41.classList.contains(`f${filaActual + 1}`)) &&
                ((_42 = document.querySelector(`.b${numeroActual + 12}`)) === null || _42 === void 0 ? void 0 : _42.classList.contains('button-clicked-red')) && ((_43 = document.querySelector(`.b${numeroActual + 12}`)) === null || _43 === void 0 ? void 0 : _43.classList.contains(`f${filaActual + 2}`)) &&
                ((_44 = document.querySelector(`.b${numeroActual + 18}`)) === null || _44 === void 0 ? void 0 : _44.classList.contains('button-clicked-red'))) && ((_45 = document.querySelector(`.b${numeroActual + 18}`)) === null || _45 === void 0 ? void 0 : _45.classList.contains(`f${filaActual + 3}`))
                ||
                    (((_46 = document.querySelector(`.b${numeroActual}`)) === null || _46 === void 0 ? void 0 : _46.classList.contains('button-clicked-yellow')) &&
                        ((_47 = document.querySelector(`.b${numeroActual + 6}`)) === null || _47 === void 0 ? void 0 : _47.classList.contains('button-clicked-yellow')) && ((_48 = document.querySelector(`.b${numeroActual + 6}`)) === null || _48 === void 0 ? void 0 : _48.classList.contains(`f${filaActual + 1}`)) &&
                        ((_49 = document.querySelector(`.b${numeroActual + 12}`)) === null || _49 === void 0 ? void 0 : _49.classList.contains('button-clicked-yellow')) && ((_50 = document.querySelector(`.b${numeroActual + 12}`)) === null || _50 === void 0 ? void 0 : _50.classList.contains(`f${filaActual + 2}`)) &&
                        ((_51 = document.querySelector(`.b${numeroActual + 18}`)) === null || _51 === void 0 ? void 0 : _51.classList.contains('button-clicked-yellow'))) && ((_52 = document.querySelector(`.b${numeroActual + 18}`)) === null || _52 === void 0 ? void 0 : _52.classList.contains(`f${filaActual + 3}`))
                ||
                    (((_53 = document.querySelector(`.b${numeroActual}`)) === null || _53 === void 0 ? void 0 : _53.classList.contains('button-clicked-pink')) &&
                        ((_54 = document.querySelector(`.b${numeroActual + 6}`)) === null || _54 === void 0 ? void 0 : _54.classList.contains('button-clicked-pink')) && ((_55 = document.querySelector(`.b${numeroActual + 6}`)) === null || _55 === void 0 ? void 0 : _55.classList.contains(`f${filaActual + 1}`)) &&
                        ((_56 = document.querySelector(`.b${numeroActual + 12}`)) === null || _56 === void 0 ? void 0 : _56.classList.contains('button-clicked-pink')) && ((_57 = document.querySelector(`.b${numeroActual + 12}`)) === null || _57 === void 0 ? void 0 : _57.classList.contains(`f${filaActual + 2}`)) &&
                        ((_58 = document.querySelector(`.b${numeroActual + 18}`)) === null || _58 === void 0 ? void 0 : _58.classList.contains('button-clicked-pink'))) && ((_59 = document.querySelector(`.b${numeroActual + 18}`)) === null || _59 === void 0 ? void 0 : _59.classList.contains(`f${filaActual + 3}`))) {
                hayGanador = !hayGanador;
                (_60 = document.querySelector(`.b${numeroActual}`)) === null || _60 === void 0 ? void 0 : _60.classList.add('cuatro-en-linea');
                (_61 = document.querySelector(`.b${numeroActual + 6}`)) === null || _61 === void 0 ? void 0 : _61.classList.add('cuatro-en-linea');
                (_62 = document.querySelector(`.b${numeroActual + 12}`)) === null || _62 === void 0 ? void 0 : _62.classList.add('cuatro-en-linea');
                (_63 = document.querySelector(`.b${numeroActual + 18}`)) === null || _63 === void 0 ? void 0 : _63.classList.add('cuatro-en-linea');
                if ((_64 = document.querySelector(`.b${numeroActual}`)) === null || _64 === void 0 ? void 0 : _64.classList.contains('button-clicked-red')) {
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
                else if ((_65 = document.querySelector(`.b${numeroActual}`)) === null || _65 === void 0 ? void 0 : _65.classList.contains('button-clicked-yellow')) {
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
        });
    }
    hayEmpate();
}
function hayEmpate() {
    let acumuladorBotonesUsados = 0;
    todosLosBotones.forEach((boton) => {
        if (boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow')) {
            acumuladorBotonesUsados += 1;
        }
        else {
            acumuladorBotonesUsados = acumuladorBotonesUsados;
        }
    });
    if (acumuladorBotonesUsados === 42) {
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
}
function saveToLocalStorage() {
    localStorage.setItem('botones', JSON.stringify(botonesColoreados));
    localStorage.setItem('turno', JSON.stringify(rojosJuegan));
    localStorage.setItem('robot', JSON.stringify(robotFueClickeado));
    localStorage.setItem('fondoImagenRobot', JSON.stringify(handleClick));
    localStorage.setItem('body', JSON.stringify(bodyStyles));
    localStorage.setItem('amarilloStyles', JSON.stringify(amarilloStyles));
    localStorage.setItem('robotStyles', JSON.stringify(robotStyles));
    localStorage.setItem('robotClickeado', JSON.stringify(clickedClase));
}
function robotPlay() {
    if (!encontrado) {
        botonRobot.addEventListener('mouseover', handleMouseOver);
        botonRobot.addEventListener('click', handleClick);
        botonRobot.addEventListener('click', () => {
            robotFueClickeado = true;
            bodyStyles = 'linear-gradient(to right, #ff0000,rgb(195, 0, 255))';
            document.body.style.backgroundImage = bodyStyles;
        });
    }
}
function robotStop() {
    botonRobot.removeEventListener('mouseover', handleMouseOver);
    botonRobot.removeEventListener('click', handleClick);
}
