const turno:string|null = localStorage.getItem('turno')
let rojosJuegan:boolean =  turno ? JSON.parse(turno) : true;
let hayGanador:boolean = false;
let detener = false;
let encontrado = false;

const clickeadoBotonRobot:string|null = localStorage.getItem('robot')
let robotFueClickeado:string|boolean = clickeadoBotonRobot? JSON.parse(clickeadoBotonRobot) : false;
const bodyAlmacenado = localStorage.getItem('body');
let bodyStyles = bodyAlmacenado? JSON.parse(bodyAlmacenado) : 'linear-gradient(to right, #ff0000, #f6ff00)';

const amarilloAlmacenado = localStorage.getItem('amarilloStyles')
let amarilloStyles = amarilloAlmacenado? JSON.parse(amarilloAlmacenado) : '1'

const robotAlmacenado = localStorage.getItem('robotStyles');
let robotStyles = robotAlmacenado? JSON.parse(robotAlmacenado) : '0'




const todosLosBotones = document.querySelectorAll('.b')
const almacenado:string|null= localStorage.getItem('botones');
const arrayBotones:Element[] = Array.from(todosLosBotones)
let botonesPintados: string[]|null = almacenado? JSON.parse(almacenado) : null;
const botonesColoreados:string[] = botonesPintados || [] 

const lienzo = document.querySelector('.lienzo') as HTMLElement
const logo = document.querySelector('.conecta-logo') as HTMLElement
const amarillo = document.querySelector('.amarillo-pelea-fondo') as HTMLElement
const robot = document.querySelector('.robot-pelea-fondo') as HTMLElement
const botonRobot = document.querySelector('.robot-img') as HTMLElement
const botonRobotClickeado = localStorage.getItem('robotClickeado');
let clickedClase = botonRobotClickeado? JSON.parse(botonRobotClickeado) : null;

const clickSound = new Audio('./sounds/click-sound.wav')
const hoverSound = new Audio('./sounds/hover-sound.ogg')
const clickRobotSound = new Audio('./sounds/click-robot.wav')


const handleMouseOver = () => {
  hoverSound.currentTime = 0;
  hoverSound.play();
};

const handleClick = () => {
  clickRobotSound.currentTime = 0;
  clickRobotSound.play();

  clickedClase = 'boton-robot-clicked'

  botonRobot.classList.add(clickedClase)

  amarilloStyles = '0';

  amarillo.style.opacity = '0';
  
  robotStyles = '1';

  robot.style.opacity = '1';
};


renderPage()

function renderPage(){

  if(clickedClase){
    botonRobot.classList.add(clickedClase)
  }

  amarillo.style.opacity = amarilloStyles;
  robot.style.opacity = robotStyles;



document.body.style.backgroundImage = bodyStyles

todosLosBotones.forEach(botonInicial =>{
  const botonGlobal = botonInicial.classList[1]

  botonesPintados?.forEach(boton =>{
  
    let botonPintado = boton.split(' ').slice(1, 2).toString()
    let colorBoton = boton.split(' ').slice(-1).toString();

    if(botonPintado === botonGlobal){
      console.log(colorBoton)
      console.log(document.querySelector(`.${botonPintado}`)?.classList.add(colorBoton));     
   }

  })

})
  
    cuatroEnLinea()

    const botonesFila = document.querySelectorAll('.f1');

    botonesFila.forEach((boton) =>{
      boton.addEventListener('click', () =>{

        if(boton.classList.contains('button-clicked-yellow')){
          encontrado = true;
        }
        filaUno(boton)
      })
    })

    filasDosSeis('2')
    filasDosSeis('3')
    filasDosSeis('4')
    filasDosSeis('5')
    filasDosSeis('6')

    const botonReiniciar = document.querySelector('.reset-img')
    botonReiniciar?.addEventListener('click', () =>{

    localStorage.clear()
    location.reload()

  })

    if(botonesColoreados.length <= 1){
      robotPlay(); 
    }

  }

function filaUno(boton:Element){
        
      todosLosBotones.forEach((boton) =>{

        if(boton.classList.contains('cuatro-en-linea')){
         detener = true;
         return;
        }
        
      })

      if(detener == true){
        return;
      }

      if (boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow') || boton.classList.contains('button-clicked-pink')) {  
        return;
      }

      if(robotFueClickeado){
        if(rojosJuegan){
        boton.classList.add('button-clicked-red');
          const botonClases = Array.from(boton.classList).join(' ');
          botonesColoreados.push(botonClases)
          clickSound.currentTime = 0;
          clickSound.play();
          console.log(encontrado)
        } else {
          boton.classList.add('button-clicked-pink');
          const botonClases = Array.from(boton.classList).join(' ');
          botonesColoreados.push(botonClases)
          clickSound.currentTime = 0;
          clickSound.play();
          encontrado = true;
        }
      } else{
        if (rojosJuegan) {
        boton.classList.add('button-clicked-red');
          const botonClases = Array.from(boton.classList).join(' ');
          botonesColoreados.push(botonClases)
          clickSound.currentTime = 0;
          clickSound.play();
          console.log(encontrado)

        } else {
        boton.classList.add('button-clicked-yellow');
          const botonClases = Array.from(boton.classList).join(' ');
          botonesColoreados.push(botonClases)
          clickSound.currentTime = 0;
          clickSound.play();
          encontrado = true;
          robotStop()
        }
      }

        
       
      cuatroEnLinea()
    
      // Cambiar turno
      rojosJuegan = !rojosJuegan;

      saveToLocalStorage();
      

}


function filasDosSeis(fila:string){

const botonesFila2 = document.querySelectorAll(`.f${fila}`);

botonesFila2.forEach((boton) => {
   
const anterior:string[] = boton.className.split(' ');
    
const numeroAnterior:number = Number(anterior[1].split('').slice(1).join(''))

  boton.addEventListener('click', () => {
    
    todosLosBotones.forEach((boton) =>{   

        if(boton.classList.contains('cuatro-en-linea')){
         detener = true;
         return;
        }
        
      })

      if(detener == true){
        return;
      }
    
    if (boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow') || boton.classList.contains('button-clicked-pink') ) {
      
      return;
    }

    if(robotFueClickeado){
     if (rojosJuegan) {
      
      if(document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-red') ||
        document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-pink')
      ){
          boton.classList.add('button-clicked-red');
          
          const botonClases = Array.from(boton.classList).join(' ');

          botonesColoreados.push(botonClases)

          clickSound.currentTime = 0;
          clickSound.play();   

      } else if (!document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-red') ||
        !document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-pink')
      ){
          return;
      }

      cuatroEnLinea()
  
    } else{

      if(document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-red') ||
        document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-pink')
      ){
              boton.classList.add('button-clicked-pink');
            
          const botonClases = Array.from(boton.classList).join(' ');

          botonesColoreados.push(botonClases)

          clickSound.currentTime = 0;
          clickSound.play();   

      } else if (!document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-red') ||
        !document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-pink')
      ){
          return;
      }

          cuatroEnLinea()

    }
    } else{

    if (rojosJuegan) {
      
      if(document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-red') ||
        document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-yellow')
      ){
          boton.classList.add('button-clicked-red');
          
          const botonClases = Array.from(boton.classList).join(' ');

          botonesColoreados.push(botonClases)

          clickSound.currentTime = 0;
          clickSound.play();   

      } else if (!document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-red') ||
        !document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-yellow')
      ){
          return;
      }

      cuatroEnLinea()
  
    } else {
        if(document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-red') ||
        document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-yellow')
      ){
              boton.classList.add('button-clicked-yellow');
            
          const botonClases = Array.from(boton.classList).join(' ');

          botonesColoreados.push(botonClases)

          clickSound.currentTime = 0;
          clickSound.play();   

      } else if (!document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-red') ||
        !document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-yellow')
      ){
          return;
      }

          cuatroEnLinea()
     
    }
    }

    rojosJuegan = !rojosJuegan;
    
    saveToLocalStorage();

  });

});

}



function cuatroEnLinea(){
const victoriaRoja = document.querySelector('.victoria-roja') as HTMLElement;
const victoriaAmarilla = document.querySelector('.victoria-amarilla') as HTMLElement;

if(!hayGanador){

arrayBotones.find((boton) =>{

  const botonActual:string[] = boton.className.split(' ');
  const numeroActual:number = Number(botonActual[1].split('').slice(1).join(''))
 
  const fila:string[] =  boton.className.split(' ');
  const filaActual = Number(fila[0].split('').slice(1).join());

  if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-red') &&
    document.querySelector(`.b${numeroActual - 7}`)?.classList.contains('button-clicked-red') &&
    document.querySelector(`.b${numeroActual - 14}`)?.classList.contains('button-clicked-red') &&
    document.querySelector(`.b${numeroActual - 21}`)?.classList.contains('button-clicked-red') 
    || 
    (document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-yellow') &&
    document.querySelector(`.b${numeroActual - 7}`)?.classList.contains('button-clicked-yellow') &&
    document.querySelector(`.b${numeroActual - 14}`)?.classList.contains('button-clicked-yellow') &&
    document.querySelector(`.b${numeroActual - 21}`)?.classList.contains('button-clicked-yellow'))
    || 
    (document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-pink') &&
    document.querySelector(`.b${numeroActual - 7}`)?.classList.contains('button-clicked-pink') &&
    document.querySelector(`.b${numeroActual - 14}`)?.classList.contains('button-clicked-pink') &&
    document.querySelector(`.b${numeroActual - 21}`)?.classList.contains('button-clicked-pink'))
  ){

    hayGanador = !hayGanador;

    document.querySelector(`.b${numeroActual}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual - 7}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual - 14}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual - 21}`)?.classList.add('cuatro-en-linea')

    if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-red')){
      
      if(victoriaRoja){
        victoriaRoja.style.opacity = '1';
        victoriaRoja.style.zIndex = '2'
        if(lienzo){
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';                
        }
        if(logo){
          logo.style.filter = 'drop-shadow(4px 4px 8px rgba(255, 0, 0, 0.8))'
        }

      }
      
    } else if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-yellow')){

      if(victoriaAmarilla){
        victoriaAmarilla.style.opacity = '1'
        victoriaAmarilla.style.zIndex = '2'

        if(lienzo){
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
        }
          if(logo){
          logo.style.filter = 'drop-shadow(4px 4px 8px rgba(229, 255, 0, 0.92))'
        }     
      }

    }

  } 

   if((document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-red') &&
    document.querySelector(`.b${numeroActual - 1}`)?.classList.contains('button-clicked-red') &&
    document.querySelector(`.b${numeroActual - 2}`)?.classList.contains('button-clicked-red') &&
    document.querySelector(`.b${numeroActual - 3}`)?.classList.contains('button-clicked-red')) 
    || 
    (document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-yellow') &&
    document.querySelector(`.b${numeroActual - 1}`)?.classList.contains('button-clicked-yellow') &&
    document.querySelector(`.b${numeroActual - 2}`)?.classList.contains('button-clicked-yellow') &&
    document.querySelector(`.b${numeroActual - 3}`)?.classList.contains('button-clicked-yellow'))
    || 
    (document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-pink') &&
    document.querySelector(`.b${numeroActual - 1}`)?.classList.contains('button-clicked-pink') &&
    document.querySelector(`.b${numeroActual - 2}`)?.classList.contains('button-clicked-pink') &&
    document.querySelector(`.b${numeroActual - 3}`)?.classList.contains('button-clicked-pink'))
  ){
    
    hayGanador = !hayGanador;
    document.querySelector(`.b${numeroActual}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual - 1}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual - 2}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual - 3}`)?.classList.add('cuatro-en-linea')

    if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-red')){
      
      if(victoriaRoja){
        victoriaRoja.style.opacity = '1'
        victoriaRoja.style.zIndex = '2'
          if(lienzo){
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';        
        }
          if(logo){
          logo.style.filter = 'drop-shadow(4px 4px 8px rgba(255, 0, 0, 0.8))'
        }
      }
      
    } else if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-yellow')){

      if(victoriaAmarilla){
        victoriaAmarilla.style.opacity = '1'
        victoriaAmarilla.style.zIndex = '2'

         if(lienzo){
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
        }
          if(logo){
          logo.style.filter = 'drop-shadow(4px 4px 8px rgba(229, 255, 0, 0.92))'
        }     
      }

    }
  } 

    if((document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-red') &&
    document.querySelector(`.b${numeroActual + 8}`)?.classList.contains('button-clicked-red') && document.querySelector(`.b${numeroActual + 8}`)?.classList.contains(`f${filaActual + 1}`) &&
    document.querySelector(`.b${numeroActual + 16}`)?.classList.contains('button-clicked-red') && document.querySelector(`.b${numeroActual + 16}`)?.classList.contains(`f${filaActual + 2}`) &&
    document.querySelector(`.b${numeroActual + 24}`)?.classList.contains('button-clicked-red')) && document.querySelector(`.b${numeroActual + 24}`)?.classList.contains(`f${filaActual + 3}`)  
    || 
    (document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-yellow') &&
    document.querySelector(`.b${numeroActual + 8}`)?.classList.contains('button-clicked-yellow') && document.querySelector(`.b${numeroActual + 8}`)?.classList.contains(`f${filaActual + 1}`) &&
    document.querySelector(`.b${numeroActual + 16}`)?.classList.contains('button-clicked-yellow') && document.querySelector(`.b${numeroActual + 16}`)?.classList.contains(`f${filaActual + 2}`) &&
    document.querySelector(`.b${numeroActual + 24}`)?.classList.contains('button-clicked-yellow')) && document.querySelector(`.b${numeroActual + 24}`)?.classList.contains(`f${filaActual + 3}`)
    || 
    (document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-pink') &&
    document.querySelector(`.b${numeroActual + 8}`)?.classList.contains('button-clicked-pink') && document.querySelector(`.b${numeroActual + 8}`)?.classList.contains(`f${filaActual + 1}`) &&
    document.querySelector(`.b${numeroActual + 16}`)?.classList.contains('button-clicked-pink') && document.querySelector(`.b${numeroActual + 16}`)?.classList.contains(`f${filaActual + 2}`) &&
    document.querySelector(`.b${numeroActual + 24}`)?.classList.contains('button-clicked-pink')) && document.querySelector(`.b${numeroActual + 24}`)?.classList.contains(`f${filaActual + 3}`)
  ){

    hayGanador = !hayGanador;

    document.querySelector(`.b${numeroActual}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual + 8}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual + 16}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual + 24}`)?.classList.add('cuatro-en-linea')

      if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-red')){
      
      if(victoriaRoja){
        victoriaRoja.style.opacity = '1'
        victoriaRoja.style.zIndex = '2'
          if(lienzo){
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
           }
          if(logo){
          logo.style.filter = 'drop-shadow(4px 4px 8px rgba(255, 0, 0, 0.8))'
        }
      }
      
    } else if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-yellow')){

      if(victoriaAmarilla){
        victoriaAmarilla.style.opacity = '1';
        victoriaAmarilla.style.zIndex = '2'

         if(lienzo){
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';      
          }
          if(logo){
          logo.style.filter = 'drop-shadow(4px 4px 8px rgba(229, 255, 0, 0.92))'
        }     
      }

    }
  } 

    if((document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-red') &&
    document.querySelector(`.b${numeroActual + 6}`)?.classList.contains('button-clicked-red') && document.querySelector(`.b${numeroActual + 6}`)?.classList.contains(`f${filaActual + 1}`) &&
    document.querySelector(`.b${numeroActual + 12}`)?.classList.contains('button-clicked-red') && document.querySelector(`.b${numeroActual + 12}`)?.classList.contains(`f${filaActual + 2}`) &&
    document.querySelector(`.b${numeroActual + 18}`)?.classList.contains('button-clicked-red')) && document.querySelector(`.b${numeroActual + 18}`)?.classList.contains(`f${filaActual + 3}`)  
    || 
    (document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-yellow') &&
    document.querySelector(`.b${numeroActual + 6}`)?.classList.contains('button-clicked-yellow') && document.querySelector(`.b${numeroActual + 6}`)?.classList.contains(`f${filaActual + 1}`) &&
    document.querySelector(`.b${numeroActual + 12}`)?.classList.contains('button-clicked-yellow') && document.querySelector(`.b${numeroActual + 12}`)?.classList.contains(`f${filaActual + 2}`) &&
    document.querySelector(`.b${numeroActual + 18}`)?.classList.contains('button-clicked-yellow')) && document.querySelector(`.b${numeroActual + 18}`)?.classList.contains(`f${filaActual + 3}`)
    || 
    (document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-pink') &&
    document.querySelector(`.b${numeroActual + 6}`)?.classList.contains('button-clicked-pink') && document.querySelector(`.b${numeroActual + 6}`)?.classList.contains(`f${filaActual + 1}`) &&
    document.querySelector(`.b${numeroActual + 12}`)?.classList.contains('button-clicked-pink') && document.querySelector(`.b${numeroActual + 12}`)?.classList.contains(`f${filaActual + 2}`) &&
    document.querySelector(`.b${numeroActual + 18}`)?.classList.contains('button-clicked-pink')) && document.querySelector(`.b${numeroActual + 18}`)?.classList.contains(`f${filaActual + 3}`)
  ){

    hayGanador = !hayGanador;

    document.querySelector(`.b${numeroActual}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual + 6}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual + 12}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual + 18}`)?.classList.add('cuatro-en-linea')

     if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-red')){
      
      if(victoriaRoja){
        victoriaRoja.style.opacity = '1'
        victoriaRoja.style.zIndex = '2'
          if(lienzo){
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';       
         }
          if(logo){
          logo.style.filter = 'drop-shadow(4px 4px 8px rgba(255, 0, 0, 0.8))'
        }         
      }
      
    } else if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-yellow')){

      if(victoriaAmarilla){
        victoriaAmarilla.style.opacity = '1'
        victoriaAmarilla.style.zIndex = '2'
         if(lienzo){
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';     
          }
          if(logo){
          logo.style.filter = 'drop-shadow(4px 4px 8px rgba(229, 255, 0, 0.92))'
        }                   
      }

    }
  } 

})
}

hayEmpate()

}


function hayEmpate(){

  let acumuladorBotonesUsados:number = 0;

  todosLosBotones.forEach((boton) =>{

    if(boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow')){

      acumuladorBotonesUsados += 1;

    } else{
      acumuladorBotonesUsados = acumuladorBotonesUsados;
    }

  })

  if(acumuladorBotonesUsados === 42){

    const imagenEmpateRojo = document.querySelector('.empate-rojo') as HTMLElement
    const imagenEmpateAmarillo = document.querySelector('.empate-amarillo') as HTMLElement

    imagenEmpateRojo.style.zIndex = '2'
    imagenEmpateRojo.style.opacity = '1'

    imagenEmpateAmarillo.style.zIndex = '2'
    imagenEmpateAmarillo.style.opacity = '1'

    if(lienzo){
    lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
      }
    if(logo){
    logo.style.filter = 'drop-shadow(4px 4px 8px rgba(255, 255, 255, 0.8))'
  }

  }
}

function saveToLocalStorage(){

  localStorage.setItem('botones', JSON.stringify(botonesColoreados))
  localStorage.setItem('turno', JSON.stringify(rojosJuegan))
  localStorage.setItem('robot', JSON.stringify(robotFueClickeado))
  localStorage.setItem('fondoImagenRobot', JSON.stringify(handleClick))
  localStorage.setItem('body', JSON.stringify(bodyStyles))
  localStorage.setItem('amarilloStyles', JSON.stringify(amarilloStyles))
  localStorage.setItem('robotStyles', JSON.stringify(robotStyles))
  localStorage.setItem('robotClickeado', JSON.stringify(clickedClase))
}

function robotPlay() {
  if (!encontrado) {
    botonRobot.addEventListener('mouseover', handleMouseOver);
    botonRobot.addEventListener('click', handleClick);
    botonRobot.addEventListener('click', () =>{
    robotFueClickeado = true;
    bodyStyles = 'linear-gradient(to right, #ff0000,rgb(195, 0, 255))'
    document.body.style.backgroundImage = bodyStyles
    })

  }
}

function robotStop() {
  botonRobot.removeEventListener('mouseover', handleMouseOver);
  botonRobot.removeEventListener('click', handleClick);
}



