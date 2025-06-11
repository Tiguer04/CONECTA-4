"use strict";
const turno = localStorage.getItem('turno');
let rojosJuegan = turno ? JSON.parse(turno) : true;
let hayGanador = false;
const todosLosBotones = document.querySelectorAll('.b');
const almacenado = localStorage.getItem('botones');
const arrayBotones = Array.from(todosLosBotones);
let detener = false;
let botonesPintados = almacenado ? JSON.parse(almacenado) : null;
const botonesColoreados = botonesPintados || [];
renderPage();
function renderPage() {
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
    filaUno();
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
}
function filaUno() {
    const botonesFila = document.querySelectorAll('.f1');
    botonesFila.forEach((boton) => {
        boton.addEventListener('click', () => {
            todosLosBotones.forEach((boton) => {
                if (boton.classList.contains('cuatro-en-linea')) {
                    detener = true;
                    return;
                }
            });
            if (detener == true) {
                return;
            }
            if (boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow')) {
                return;
            }
            if (rojosJuegan) {
                boton.classList.add('button-clicked-red');
                const botonClases = Array.from(boton.classList).join(' ');
                botonesColoreados.push(botonClases);
            }
            else {
                boton.classList.add('button-clicked-yellow');
                const botonClases = Array.from(boton.classList).join(' ');
                botonesColoreados.push(botonClases);
            }
            cuatroEnLinea();
            // Cambiar turno
            rojosJuegan = !rojosJuegan;
            saveToLocalStorage();
        });
    });
}
function filasDosSeis(fila) {
    const botonesFila2 = document.querySelectorAll(`.f${fila}`);
    botonesFila2.forEach((boton) => {
        const anterior = boton.className.split(' ');
        const numeroAnterior = Number(anterior[1].split('').slice(1).join(''));
        boton.addEventListener('click', () => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            todosLosBotones.forEach((boton) => {
                if (boton.classList.contains('cuatro-en-linea')) {
                    detener = true;
                    return;
                }
            });
            if (detener == true) {
                return;
            }
            if (boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow')) {
                return;
            }
            if (rojosJuegan) {
                if (((_a = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _a === void 0 ? void 0 : _a.classList.contains('button-clicked-red')) ||
                    ((_b = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _b === void 0 ? void 0 : _b.classList.contains('button-clicked-yellow'))) {
                    boton.classList.add('button-clicked-red');
                    const botonClases = Array.from(boton.classList).join(' ');
                    botonesColoreados.push(botonClases);
                }
                else if (!((_c = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _c === void 0 ? void 0 : _c.classList.contains('button-clicked-red')) ||
                    !((_d = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _d === void 0 ? void 0 : _d.classList.contains('button-clicked-yellow'))) {
                    return;
                }
                cuatroEnLinea();
            }
            else {
                if (((_e = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _e === void 0 ? void 0 : _e.classList.contains('button-clicked-red')) ||
                    ((_f = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _f === void 0 ? void 0 : _f.classList.contains('button-clicked-yellow'))) {
                    boton.classList.add('button-clicked-yellow');
                    const botonClases = Array.from(boton.classList).join(' ');
                    botonesColoreados.push(botonClases);
                }
                else if (!((_g = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _g === void 0 ? void 0 : _g.classList.contains('button-clicked-red')) ||
                    !((_h = document.querySelector(`.b${numeroAnterior - 7}`)) === null || _h === void 0 ? void 0 : _h.classList.contains('button-clicked-yellow'))) {
                    return;
                }
                cuatroEnLinea();
            }
            rojosJuegan = !rojosJuegan;
            saveToLocalStorage();
        });
    });
}
function cuatroEnLinea() {
    const victoriaRoja = document.querySelector('.victoria-roja');
    const victoriaAmarilla = document.querySelector('.victoria-amarilla');
    const lienzo = document.querySelector('.lienzo');
    const logo = document.querySelector('.conecta-logo');
    if (!hayGanador) {
        arrayBotones.find((boton) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43;
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
                        ((_h = document.querySelector(`.b${numeroActual - 21}`)) === null || _h === void 0 ? void 0 : _h.classList.contains('button-clicked-yellow')))) {
                hayGanador = !hayGanador;
                (_j = document.querySelector(`.b${numeroActual}`)) === null || _j === void 0 ? void 0 : _j.classList.add('cuatro-en-linea');
                (_k = document.querySelector(`.b${numeroActual - 7}`)) === null || _k === void 0 ? void 0 : _k.classList.add('cuatro-en-linea');
                (_l = document.querySelector(`.b${numeroActual - 14}`)) === null || _l === void 0 ? void 0 : _l.classList.add('cuatro-en-linea');
                (_m = document.querySelector(`.b${numeroActual - 21}`)) === null || _m === void 0 ? void 0 : _m.classList.add('cuatro-en-linea');
                if ((_o = document.querySelector(`.b${numeroActual}`)) === null || _o === void 0 ? void 0 : _o.classList.contains('button-clicked-red')) {
                    if (victoriaRoja) {
                        victoriaRoja.style.opacity = '1';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(255, 0, 0, 0.8))';
                        }
                    }
                }
                else if ((_p = document.querySelector(`.b${numeroActual}`)) === null || _p === void 0 ? void 0 : _p.classList.contains('button-clicked-yellow')) {
                    if (victoriaAmarilla) {
                        victoriaAmarilla.style.opacity = '1';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(229, 255, 0, 0.92))';
                        }
                    }
                }
            }
            if ((((_q = document.querySelector(`.b${numeroActual}`)) === null || _q === void 0 ? void 0 : _q.classList.contains('button-clicked-red')) &&
                ((_r = document.querySelector(`.b${numeroActual - 1}`)) === null || _r === void 0 ? void 0 : _r.classList.contains('button-clicked-red')) &&
                ((_s = document.querySelector(`.b${numeroActual - 2}`)) === null || _s === void 0 ? void 0 : _s.classList.contains('button-clicked-red')) &&
                ((_t = document.querySelector(`.b${numeroActual - 3}`)) === null || _t === void 0 ? void 0 : _t.classList.contains('button-clicked-red'))) ||
                (((_u = document.querySelector(`.b${numeroActual}`)) === null || _u === void 0 ? void 0 : _u.classList.contains('button-clicked-yellow')) &&
                    ((_v = document.querySelector(`.b${numeroActual - 1}`)) === null || _v === void 0 ? void 0 : _v.classList.contains('button-clicked-yellow')) &&
                    ((_w = document.querySelector(`.b${numeroActual - 2}`)) === null || _w === void 0 ? void 0 : _w.classList.contains('button-clicked-yellow')) &&
                    ((_x = document.querySelector(`.b${numeroActual - 3}`)) === null || _x === void 0 ? void 0 : _x.classList.contains('button-clicked-yellow')))) {
                hayGanador = !hayGanador;
                (_y = document.querySelector(`.b${numeroActual}`)) === null || _y === void 0 ? void 0 : _y.classList.add('cuatro-en-linea');
                (_z = document.querySelector(`.b${numeroActual - 1}`)) === null || _z === void 0 ? void 0 : _z.classList.add('cuatro-en-linea');
                (_0 = document.querySelector(`.b${numeroActual - 2}`)) === null || _0 === void 0 ? void 0 : _0.classList.add('cuatro-en-linea');
                (_1 = document.querySelector(`.b${numeroActual - 3}`)) === null || _1 === void 0 ? void 0 : _1.classList.add('cuatro-en-linea');
                if ((_2 = document.querySelector(`.b${numeroActual}`)) === null || _2 === void 0 ? void 0 : _2.classList.contains('button-clicked-red')) {
                    if (victoriaRoja) {
                        victoriaRoja.style.opacity = '1';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(255, 0, 0, 0.8))';
                        }
                    }
                }
                else if ((_3 = document.querySelector(`.b${numeroActual}`)) === null || _3 === void 0 ? void 0 : _3.classList.contains('button-clicked-yellow')) {
                    if (victoriaAmarilla) {
                        victoriaAmarilla.style.opacity = '1';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(229, 255, 0, 0.92))';
                        }
                    }
                }
            }
            if ((((_4 = document.querySelector(`.b${numeroActual}`)) === null || _4 === void 0 ? void 0 : _4.classList.contains('button-clicked-red')) &&
                ((_5 = document.querySelector(`.b${numeroActual + 8}`)) === null || _5 === void 0 ? void 0 : _5.classList.contains('button-clicked-red')) && ((_6 = document.querySelector(`.b${numeroActual + 8}`)) === null || _6 === void 0 ? void 0 : _6.classList.contains(`f${filaActual + 1}`)) &&
                ((_7 = document.querySelector(`.b${numeroActual + 16}`)) === null || _7 === void 0 ? void 0 : _7.classList.contains('button-clicked-red')) && ((_8 = document.querySelector(`.b${numeroActual + 16}`)) === null || _8 === void 0 ? void 0 : _8.classList.contains(`f${filaActual + 2}`)) &&
                ((_9 = document.querySelector(`.b${numeroActual + 24}`)) === null || _9 === void 0 ? void 0 : _9.classList.contains('button-clicked-red'))) && ((_10 = document.querySelector(`.b${numeroActual + 24}`)) === null || _10 === void 0 ? void 0 : _10.classList.contains(`f${filaActual + 3}`)) ||
                (((_11 = document.querySelector(`.b${numeroActual}`)) === null || _11 === void 0 ? void 0 : _11.classList.contains('button-clicked-yellow')) &&
                    ((_12 = document.querySelector(`.b${numeroActual + 8}`)) === null || _12 === void 0 ? void 0 : _12.classList.contains('button-clicked-yellow')) && ((_13 = document.querySelector(`.b${numeroActual + 8}`)) === null || _13 === void 0 ? void 0 : _13.classList.contains(`f${filaActual + 1}`)) &&
                    ((_14 = document.querySelector(`.b${numeroActual + 16}`)) === null || _14 === void 0 ? void 0 : _14.classList.contains('button-clicked-yellow')) && ((_15 = document.querySelector(`.b${numeroActual + 16}`)) === null || _15 === void 0 ? void 0 : _15.classList.contains(`f${filaActual + 2}`)) &&
                    ((_16 = document.querySelector(`.b${numeroActual + 24}`)) === null || _16 === void 0 ? void 0 : _16.classList.contains('button-clicked-yellow'))) && ((_17 = document.querySelector(`.b${numeroActual + 24}`)) === null || _17 === void 0 ? void 0 : _17.classList.contains(`f${filaActual + 3}`))) {
                hayGanador = !hayGanador;
                (_18 = document.querySelector(`.b${numeroActual}`)) === null || _18 === void 0 ? void 0 : _18.classList.add('cuatro-en-linea');
                (_19 = document.querySelector(`.b${numeroActual + 8}`)) === null || _19 === void 0 ? void 0 : _19.classList.add('cuatro-en-linea');
                (_20 = document.querySelector(`.b${numeroActual + 16}`)) === null || _20 === void 0 ? void 0 : _20.classList.add('cuatro-en-linea');
                (_21 = document.querySelector(`.b${numeroActual + 24}`)) === null || _21 === void 0 ? void 0 : _21.classList.add('cuatro-en-linea');
                if ((_22 = document.querySelector(`.b${numeroActual}`)) === null || _22 === void 0 ? void 0 : _22.classList.contains('button-clicked-red')) {
                    if (victoriaRoja) {
                        victoriaRoja.style.opacity = '1';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(255, 0, 0, 0.8))';
                        }
                    }
                }
                else if ((_23 = document.querySelector(`.b${numeroActual}`)) === null || _23 === void 0 ? void 0 : _23.classList.contains('button-clicked-yellow')) {
                    if (victoriaAmarilla) {
                        victoriaAmarilla.style.opacity = '1';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(229, 255, 0, 0.92))';
                        }
                    }
                }
            }
            if ((((_24 = document.querySelector(`.b${numeroActual}`)) === null || _24 === void 0 ? void 0 : _24.classList.contains('button-clicked-red')) &&
                ((_25 = document.querySelector(`.b${numeroActual + 6}`)) === null || _25 === void 0 ? void 0 : _25.classList.contains('button-clicked-red')) && ((_26 = document.querySelector(`.b${numeroActual + 6}`)) === null || _26 === void 0 ? void 0 : _26.classList.contains(`f${filaActual + 1}`)) &&
                ((_27 = document.querySelector(`.b${numeroActual + 12}`)) === null || _27 === void 0 ? void 0 : _27.classList.contains('button-clicked-red')) && ((_28 = document.querySelector(`.b${numeroActual + 12}`)) === null || _28 === void 0 ? void 0 : _28.classList.contains(`f${filaActual + 2}`)) &&
                ((_29 = document.querySelector(`.b${numeroActual + 18}`)) === null || _29 === void 0 ? void 0 : _29.classList.contains('button-clicked-red'))) && ((_30 = document.querySelector(`.b${numeroActual + 18}`)) === null || _30 === void 0 ? void 0 : _30.classList.contains(`f${filaActual + 3}`)) ||
                (((_31 = document.querySelector(`.b${numeroActual}`)) === null || _31 === void 0 ? void 0 : _31.classList.contains('button-clicked-yellow')) &&
                    ((_32 = document.querySelector(`.b${numeroActual + 6}`)) === null || _32 === void 0 ? void 0 : _32.classList.contains('button-clicked-yellow')) && ((_33 = document.querySelector(`.b${numeroActual + 6}`)) === null || _33 === void 0 ? void 0 : _33.classList.contains(`f${filaActual + 1}`)) &&
                    ((_34 = document.querySelector(`.b${numeroActual + 12}`)) === null || _34 === void 0 ? void 0 : _34.classList.contains('button-clicked-yellow')) && ((_35 = document.querySelector(`.b${numeroActual + 12}`)) === null || _35 === void 0 ? void 0 : _35.classList.contains(`f${filaActual + 2}`)) &&
                    ((_36 = document.querySelector(`.b${numeroActual + 18}`)) === null || _36 === void 0 ? void 0 : _36.classList.contains('button-clicked-yellow'))) && ((_37 = document.querySelector(`.b${numeroActual + 18}`)) === null || _37 === void 0 ? void 0 : _37.classList.contains(`f${filaActual + 3}`))) {
                hayGanador = !hayGanador;
                (_38 = document.querySelector(`.b${numeroActual}`)) === null || _38 === void 0 ? void 0 : _38.classList.add('cuatro-en-linea');
                (_39 = document.querySelector(`.b${numeroActual + 6}`)) === null || _39 === void 0 ? void 0 : _39.classList.add('cuatro-en-linea');
                (_40 = document.querySelector(`.b${numeroActual + 12}`)) === null || _40 === void 0 ? void 0 : _40.classList.add('cuatro-en-linea');
                (_41 = document.querySelector(`.b${numeroActual + 18}`)) === null || _41 === void 0 ? void 0 : _41.classList.add('cuatro-en-linea');
                if ((_42 = document.querySelector(`.b${numeroActual}`)) === null || _42 === void 0 ? void 0 : _42.classList.contains('button-clicked-red')) {
                    if (victoriaRoja) {
                        victoriaRoja.style.opacity = '1';
                        if (lienzo) {
                            lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
                        }
                        if (logo) {
                            logo.style.filter = 'drop-shadow(4px 4px 8px rgba(255, 0, 0, 0.8))';
                        }
                    }
                }
                else if ((_43 = document.querySelector(`.b${numeroActual}`)) === null || _43 === void 0 ? void 0 : _43.classList.contains('button-clicked-yellow')) {
                    if (victoriaAmarilla) {
                        victoriaAmarilla.style.opacity = '1';
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
        const imagenEmpate = document.querySelector('.empate');
        imagenEmpate.style.zIndex = '1';
        imagenEmpate.style.opacity = '0.3';
    }
}
function saveToLocalStorage() {
    localStorage.setItem('botones', JSON.stringify(botonesColoreados));
    localStorage.setItem('turno', JSON.stringify(rojosJuegan));
}
