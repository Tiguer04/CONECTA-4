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
      document.querySelector(`.${botonPintado}`)?.classList.add(colorBoton);     
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
        
        if (boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow') || boton.classList.contains('button-clicked-pink')) {  
        return;
        }    

        boton.classList.add('button-clicked-red');
          const botonClases = Array.from(boton.classList).join(' ');
          botonesColoreados.push(botonClases)
          clickSound.currentTime = 0;
          clickSound.play();

          for(let i = 0; i < 42; i++){

            const numeroAleatorio = Math.floor(Math.random() * 42) + 1;

            let botonDinamico = document.querySelector(`.b${numeroAleatorio}`) as HTMLElement

            if(document.querySelector(`.b${numeroAleatorio}`)?.classList.contains('button-clicked-red') || document.querySelector(`.b${numeroAleatorio}`)?.classList.contains('button-clicked-pink')){

              continue;

            } 
            
            let encontrado = false;

            for(let j = 1; j < arrayBotones.length; j++){

              const SnumeroAleatorio = Math.floor(Math.random() * 42) + 1;
              
              let primerFiltro = true;

              const contra4 = document.querySelector(`.b${SnumeroAleatorio}`) as HTMLElement

              if(contra4.classList.contains('button-clicked-red') || contra4.classList.contains('button-clicked-pink')){
                continue;
              }
              
              for(let k = 1; k < arrayBotones.length; k++){
  

              if(document.querySelector(`.b${k}`)?.classList.contains('button-clicked-red') || 
                  document.querySelector(`.b${k}`)?.classList.contains('button-clicked-pink')){
                    continue;
                  }
                  
                if(
                

                (
                document.querySelector(`.b${k}`)?.classList.contains('f1') &&

                (
                ((document.querySelector(`.b${k + 8}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 16}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 24}`)?.classList.contains('button-clicked-pink')))

                ||

              ((document.querySelector(`.b${k + 6}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 12}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 18}`)?.classList.contains('button-clicked-pink')))
             
              ||

                ((document.querySelector(`.b${k + 1}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 2}`)?.classList.contains('button-clicked-pink')) &&
                (document.querySelector(`.b${k}`)?.classList[0] === document.querySelector(`.b${k + 1}`)?.classList[0]) &&
                (document.querySelector(`.b${k}`)?.classList[0] === document.querySelector(`.b${k + 2}`)?.classList[0]))
                  
              ||

                (
                ((document.querySelector(`.b${k - 1}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k - 2}`)?.classList.contains('button-clicked-pink')) &&
                (document.querySelector(`.b${k}`)?.classList[0] === document.querySelector(`.b${k - 1}`)?.classList[0]) &&
                (document.querySelector(`.b${k}`)?.classList[0] === document.querySelector(`.b${k - 2}`)?.classList[0]))
                
                )
                
              ||

              ((document.querySelector(`.b${k + 7}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 14}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 21}`)?.classList.contains('button-clicked-pink')))  

              ||
              
              ((document.querySelector(`.b${k + 8}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k + 16}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k + 24}`)?.classList.contains('button-clicked-red')))

                ||

              ((document.querySelector(`.b${k + 6}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k + 12}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k + 18}`)?.classList.contains('button-clicked-red')))
             
              ||

                (document.querySelector(`.b${k + 1}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k + 2}`)?.classList.contains('button-clicked-red') &&
                (document.querySelector(`.b${k}`)?.classList[0] === document.querySelector(`.b${k + 1}`)?.classList[0]) &&
                (document.querySelector(`.b${k}`)?.classList[0] === document.querySelector(`.b${k + 2}`)?.classList[0]))
                  
              ||

                (
                ((document.querySelector(`.b${k - 1}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k - 2}`)?.classList.contains('button-clicked-red') &&
                (document.querySelector(`.b${k}`)?.classList[0] === document.querySelector(`.b${k - 1}`)?.classList[0]) &&
                (document.querySelector(`.b${k}`)?.classList[0] === document.querySelector(`.b${k - 2}`)?.classList[0])))
                
                )


               )
               )

                  ||

                  (
                !document.querySelector(`.b${k}`)?.classList.contains('f1') &&

                (
                (
                ((document.querySelector(`.b${k + 8}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 16}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 24}`)?.classList.contains('button-clicked-pink'))) && 
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red'))
                )

                ||
                
                (
               ((document.querySelector(`.b${k + 6}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 12}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 18}`)?.classList.contains('button-clicked-pink'))) && 
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red'))
                )
              ||

                (
                ((document.querySelector(`.b${k + 1}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 2}`)?.classList.contains('button-clicked-pink')) &&
                (document.querySelector(`.b${k}`)?.classList[0] === document.querySelector(`.b${k + 1}`)?.classList[0]) &&
                (document.querySelector(`.b${k}`)?.classList[0] === document.querySelector(`.b${k + 2}`)?.classList[0])) &&
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red'))
                )

                 ||

                (
                ((document.querySelector(`.b${k - 1}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k - 2}`)?.classList.contains('button-clicked-pink')) &&
                (document.querySelector(`.b${k}`)?.classList[0] === document.querySelector(`.b${k - 1}`)?.classList[0]) &&
                (document.querySelector(`.b${k}`)?.classList[0] === document.querySelector(`.b${k - 2}`)?.classList[0])) &&
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red'))
                
                )
                
              ||

              ((document.querySelector(`.b${k + 7}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 14}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 21}`)?.classList.contains('button-clicked-pink')))  

              ||
              
              ((document.querySelector(`.b${k + 8}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k + 16}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k + 24}`)?.classList.contains('button-clicked-red')) &&
               (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red')))

                ||

              ((document.querySelector(`.b${k + 6}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k + 12}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k + 18}`)?.classList.contains('button-clicked-red')) &&
               (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red')))
             
              ||

                (document.querySelector(`.b${k + 1}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k + 2}`)?.classList.contains('button-clicked-red') &&
                (document.querySelector(`.b${k}`)?.classList[0] === document.querySelector(`.b${k + 1}`)?.classList[0]) &&
                (document.querySelector(`.b${k}`)?.classList[0] === document.querySelector(`.b${k + 2}`)?.classList[0]) &&
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red')))
                  
              ||

                (document.querySelector(`.b${k - 1}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k - 2}`)?.classList.contains('button-clicked-red') &&
                (document.querySelector(`.b${k}`)?.classList[0] === document.querySelector(`.b${k - 1}`)?.classList[0]) &&
                (document.querySelector(`.b${k}`)?.classList[0] === document.querySelector(`.b${k - 2}`)?.classList[0]) &&
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red')))



                  ) )

              ){
          
                console.log('Buscando 4 en linea')

              arrayBotones.forEach(boton => boton.classList.add('no-pointer'))
              
              botonDinamico = document.querySelector(`.b${k}`) as HTMLElement;

              setTimeout(() =>{
              
              botonDinamico?.classList.add('button-clicked-pink');
              const claseBotonDinamico = Array.from(botonDinamico?.classList).join(' ');
              botonesColoreados.push(claseBotonDinamico)
              clickSound.currentTime = 0;
              clickSound.play();
              cuatroEnLinea();
              saveToLocalStorage()

              setTimeout(() =>{
              arrayBotones.forEach(boton => boton.classList.remove('no-pointer'))  
              }, 100)
              

              }, 1000)

            primerFiltro = false;
            encontrado = true;

              break;
               
            } else{
              continue;
            }
          }

          if(encontrado === true){
            return;
          }

          if(primerFiltro){

              if(document.querySelector(`.b${SnumeroAleatorio}`)?.classList.contains('f1') || 
              (!document.querySelector(`.b${SnumeroAleatorio}`)?.classList.contains('f1') && 
              (document.querySelector(`.b${SnumeroAleatorio-7}`)?.classList.contains('button-clicked-red') ||
               document.querySelector(`.b${SnumeroAleatorio-7}`)?.classList.contains('button-clicked-pink'))) || 
               (document.querySelector(`.b${SnumeroAleatorio-8}`)?.classList.contains('button-clicked-red') && 
                (document.querySelector(`.b${SnumeroAleatorio-7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${SnumeroAleatorio-7}`)?.classList.contains('button-clicked-pink'))) ||
               (document.querySelector(`.b${SnumeroAleatorio-6}`)?.classList.contains('button-clicked-red') && 
                (document.querySelector(`.b${SnumeroAleatorio-7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${SnumeroAleatorio-7}`)?.classList.contains('button-clicked-pink')))){              

                  

               arrayBotones.forEach(boton => boton.classList.add('no-pointer'))
              
              botonDinamico = contra4

              setTimeout(() =>{
              
              botonDinamico?.classList.add('button-clicked-pink');
              const claseBotonDinamico = Array.from(botonDinamico?.classList).join(' ');
              botonesColoreados.push(claseBotonDinamico)
              clickSound.currentTime = 0;
              clickSound.play();
              cuatroEnLinea();
              saveToLocalStorage()
              
              setTimeout(() =>{
              arrayBotones.forEach(boton => boton.classList.remove('no-pointer'))  
              }, 100)

              }, 1000);

               cuatroEnLinea();
               saveToLocalStorage()
              encontrado = true;
              break;
                
              } else{
                continue;
              }
              
            }
          }

          if(encontrado === true){
            return;
          }

          if(hayGanador){
            return;
          }

          if(encontrado === false){

            botonDinamico = document.querySelector(`.b${numeroAleatorio}`) as HTMLElement

            if(botonDinamico?.classList.contains('f1')){

             arrayBotones.forEach(boton => boton.classList.add('no-pointer'))

              setTimeout(() =>{
              
              botonDinamico?.classList.add('button-clicked-pink');
              const claseBotonDinamico = Array.from(botonDinamico?.classList).join(' ');
              botonesColoreados.push(claseBotonDinamico)
              clickSound.currentTime = 0;
              clickSound.play();
              cuatroEnLinea();
              saveToLocalStorage();

               setTimeout(() =>{
              arrayBotones.forEach(boton => boton.classList.remove('no-pointer'))  
              }, 100)
              
              }, 1000)
              break;
            }

              if(!document.querySelector(`.b${numeroAleatorio}`)?.classList.contains('f1') &&
              (document.querySelector(`.b${numeroAleatorio - 7}`)?.classList.contains('button-clicked-red') 
              || document.querySelector(`.b${numeroAleatorio - 7}`)?.classList.contains('button-clicked-pink'))){
                
              arrayBotones.forEach(boton => boton.classList.add('no-pointer'))
                
              setTimeout(() =>{
              botonDinamico?.classList.add('button-clicked-pink')
              const claseBotonDinamico = Array.from(botonDinamico?.classList).join(' ');
              botonesColoreados.push(claseBotonDinamico)
              clickSound.currentTime = 0;
              clickSound.play();
              cuatroEnLinea();
              saveToLocalStorage();
               setTimeout(() =>{
              arrayBotones.forEach(boton => boton.classList.remove('no-pointer'))  
              }, 100)
              
              }, 1000) 
              break;
              }
            
            }

             if(hayGanador){
            return;
          }
          }
        }

        } else{
        if (rojosJuegan) {
        boton.classList.add('button-clicked-red');
          const botonClases = Array.from(boton.classList).join(' ');
          botonesColoreados.push(botonClases)
          clickSound.currentTime = 0;
          clickSound.play();


        } else {
        boton.classList.add('button-clicked-yellow');
          const botonClases = Array.from(boton.classList).join(' ');
          botonesColoreados.push(botonClases)
          clickSound.currentTime = 0;
          clickSound.play();
          encontrado = true;
          robotStop()
        }

        rojosJuegan = !rojosJuegan;
      }

       
      cuatroEnLinea()
    

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

      if (!document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-red') &&
        !document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-pink')
      ){
          return;
      }
      
      if(document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-red') ||
        document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-pink')
      ){
          boton.classList.add('button-clicked-red');
          
          const botonClases = Array.from(boton.classList).join(' ');

          botonesColoreados.push(botonClases)

          clickSound.currentTime = 0;
          clickSound.play();   

            cuatroEnLinea()
            saveToLocalStorage()

            if(hayGanador){
              return;
            }

            for(let i = 42; i > 0; i--){

            const numeroAleatorio:number = Math.floor(Math.random() * 42 ) + 1;

            let botonDinamico = document.querySelector(`.b${numeroAleatorio}`) as HTMLElement

            let finded = false;

              
            
            if(document.querySelector(`.b${numeroAleatorio}`)?.classList.contains('button-clicked-red') || document.querySelector(`.b${numeroAleatorio}`)?.classList.contains('button-clicked-pink')){

              continue;

            } 
            
            for(let j = 42; j > 0; j--){

              const contra4 = document.querySelector(`.b${j}`) as HTMLElement

            
              if(contra4.classList.contains('button-clicked-red') || contra4.classList.contains('button-clicked-pink')){
                continue;
              }

              if(
                 ((document.querySelector(`.b${j + 8}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${j + 16}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${j + 24}`)?.classList.contains('button-clicked-pink')) &&
                (document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-pink')))
                ||

                ((document.querySelector(`.b${j - 8}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${j - 16}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${j - 24}`)?.classList.contains('button-clicked-pink')) &&
                ((document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-pink'))))
                ||

              ((document.querySelector(`.b${j + 6}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${j + 12}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${j + 18}`)?.classList.contains('button-clicked-pink')) &&

                ((document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-pink'))))
              ||

              ((document.querySelector(`.b${j - 6}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${j - 12}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${j - 18}`)?.classList.contains('button-clicked-pink')) &&

                ((document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-pink'))))
              ||

                ((document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${j - 14}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${j - 21}`)?.classList.contains('button-clicked-pink')) &&

                (document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-pink'))) 

              ||

                ((document.querySelector(`.b${j + 1}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${j + 2}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${j + 3}`)?.classList.contains('button-clicked-pink')) && 
                (contra4.classList[0] === document.querySelector(`.b${j + 1}`)?.classList[0]) &&
                (contra4.classList[0] === document.querySelector(`.b${j + 2}`)?.classList[0]) &&
                (contra4.classList[0] === document.querySelector(`.b${j + 3}`)?.classList[0]) &&
                (document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-pink')))

              ||

              ((document.querySelector(`.b${j - 1}`)?.classList.contains('button-clicked-pink') &&
              document.querySelector(`.b${j - 2}`)?.classList.contains('button-clicked-pink') &&
              document.querySelector(`.b${j - 3}`)?.classList.contains('button-clicked-pink')) && 
              (contra4.classList[0] === document.querySelector(`.b${j - 1}`)?.classList[0]) &&
              (contra4.classList[0] === document.querySelector(`.b${j - 2}`)?.classList[0]) &&
              (contra4.classList[0] === document.querySelector(`.b${j - 3}`)?.classList[0]) &&
              (document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-red') || 
              document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-pink')))

              ||

              ((document.querySelector(`.b${j - 1}`)?.classList.contains('button-clicked-pink') &&
              document.querySelector(`.b${j - 2}`)?.classList.contains('button-clicked-pink') &&
              document.querySelector(`.b${j - 3}`)?.classList.contains('button-clicked-pink')) && 
              (contra4.classList[0] === document.querySelector(`.b${j - 1}`)?.classList[0]) &&
              (contra4.classList[0] === document.querySelector(`.b${j - 2}`)?.classList[0]) &&
              (contra4.classList[0] === document.querySelector(`.b${j - 3}`)?.classList[0]) &&
              document.querySelector(`.b${j}`)?.classList.contains('f1'))
              
            ||

              ((document.querySelector(`.b${j + 1}`)?.classList.contains('button-clicked-pink') &&
              document.querySelector(`.b${j + 2}`)?.classList.contains('button-clicked-pink') &&
              document.querySelector(`.b${j + 3}`)?.classList.contains('button-clicked-pink')) && 
              (contra4.classList[0] === document.querySelector(`.b${j + 1}`)?.classList[0]) &&
              (contra4.classList[0] === document.querySelector(`.b${j + 2}`)?.classList[0]) &&
              (contra4.classList[0] === document.querySelector(`.b${j + 3}`)?.classList[0]) &&
              document.querySelector(`.b${j}`)?.classList.contains('f1'))

              ||
  
                ((document.querySelector(`.b${j + 8}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${j + 16}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${j + 24}`)?.classList.contains('button-clicked-red')) &&
                ((document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-pink'))))

                ||
  
                ((document.querySelector(`.b${j + 8}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${j + 16}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${j + 24}`)?.classList.contains('button-clicked-red')) &&
                document.querySelector(`.b${j}`)?.classList.contains('f1'))

                ||

                ((document.querySelector(`.b${j - 8}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${j - 16}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${j - 24}`)?.classList.contains('button-clicked-red')) &&
                ((document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-pink'))))
                ||

              ((document.querySelector(`.b${j + 6}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${j + 12}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${j + 18}`)?.classList.contains('button-clicked-red')) &&

                ((document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-pink'))))
              ||

              ((document.querySelector(`.b${j - 6}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${j - 12}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${j - 18}`)?.classList.contains('button-clicked-red')) &&

                ((document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-pink'))))

              ||
  
                ((document.querySelector(`.b${j + 6}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${j + 12}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${j + 18}`)?.classList.contains('button-clicked-red')) &&
                document.querySelector(`.b${j}`)?.classList.contains('f1'))

              ||

                ((document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${j - 14}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${j - 21}`)?.classList.contains('button-clicked-red')) && 
                (document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-pink'))) 

              ||

                ((document.querySelector(`.b${j + 1}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${j + 2}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${j + 3}`)?.classList.contains('button-clicked-red')) && 
                (contra4.classList[0] === document.querySelector(`.b${j + 1}`)?.classList[0]) &&
                (contra4.classList[0] === document.querySelector(`.b${j + 2}`)?.classList[0]) &&
                (contra4.classList[0] === document.querySelector(`.b${j + 3}`)?.classList[0]) &&
                (document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-pink')))

              ||

              ((document.querySelector(`.b${j - 1}`)?.classList.contains('button-clicked-red') &&
              document.querySelector(`.b${j - 2}`)?.classList.contains('button-clicked-red') &&
              document.querySelector(`.b${j - 3}`)?.classList.contains('button-clicked-red')) && 
              (contra4.classList[0] === document.querySelector(`.b${j - 1}`)?.classList[0]) &&
              (contra4.classList[0] === document.querySelector(`.b${j - 2}`)?.classList[0]) &&
              (contra4.classList[0] === document.querySelector(`.b${j - 3}`)?.classList[0]) &&
              (document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-red') || 
              document.querySelector(`.b${j - 7}`)?.classList.contains('button-clicked-pink')))

              ||

              ((document.querySelector(`.b${j - 1}`)?.classList.contains('button-clicked-red') &&
              document.querySelector(`.b${j - 2}`)?.classList.contains('button-clicked-red') &&
              document.querySelector(`.b${j - 3}`)?.classList.contains('button-clicked-red')) && 
              (contra4.classList[0] === document.querySelector(`.b${j - 1}`)?.classList[0]) &&
              (contra4.classList[0] === document.querySelector(`.b${j - 2}`)?.classList[0]) &&
              (contra4.classList[0] === document.querySelector(`.b${j - 3}`)?.classList[0]) &&
              document.querySelector(`.b${j}`)?.classList.contains('f1'))
              
            ||

              ((document.querySelector(`.b${j + 1}`)?.classList.contains('button-clicked-red') &&
              document.querySelector(`.b${j + 2}`)?.classList.contains('button-clicked-red') &&
              document.querySelector(`.b${j + 3}`)?.classList.contains('button-clicked-red')) && 
              (contra4.classList[0] === document.querySelector(`.b${j + 1}`)?.classList[0]) &&
              (contra4.classList[0] === document.querySelector(`.b${j + 2}`)?.classList[0]) &&
              (contra4.classList[0] === document.querySelector(`.b${j + 3}`)?.classList[0]) &&
              document.querySelector(`.b${j}`)?.classList.contains('f1'))
             

              ){  


              arrayBotones.forEach(boton => boton.classList.add('no-pointer'))
              
              botonDinamico = contra4

              setTimeout(() =>{


              botonDinamico?.classList.add('button-clicked-pink');
              const claseBotonDinamico = Array.from(botonDinamico?.classList).join(' ');
              botonesColoreados.push(claseBotonDinamico)
              clickSound.currentTime = 0;
              clickSound.play();
              cuatroEnLinea();
              saveToLocalStorage();
              setTimeout(() =>{
              arrayBotones.forEach(boton => boton.classList.remove('no-pointer'))  
              }, 100)

              }, 1000);
               console.log('se cumple segundo filtro')
              finded = true;
                  
              break;
                
               } else{
                continue;
               }

            }

            if(finded === true){
              break;
            }

            if(hayGanador){
              return;
            }

            if(finded === false){

            let tercerFiltro = true;

            for(let k = 1; k < 43; k++){
              

              const Scontra4 = document.querySelector(`.b${k}`) as HTMLElement

              if(Scontra4.classList.contains('button-clicked-red') || Scontra4.classList.contains('button-clicked-pink')){
                continue;
              }

              if(
                ((document.querySelector(`.b${k + 8}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k + 16}`)?.classList.contains('button-clicked-red')) && 
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink'))) 
                ||
                ((document.querySelector(`.b${k - 8}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k - 16}`)?.classList.contains('button-clicked-red')) && 
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink'))) 
                ||
                ((document.querySelector(`.b${k + 6}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k + 12}`)?.classList.contains('button-clicked-red')) && 
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink'))) 
                ||
                ((document.querySelector(`.b${k - 6}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k - 12}`)?.classList.contains('button-clicked-red')) && 
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink'))) 
                || 
                ((document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k - 14}`)?.classList.contains('button-clicked-red')) && 
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink'))) 
                ||
                ((document.querySelector(`.b${k + 1}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k + 2}`)?.classList.contains('button-clicked-red')) && 
                (Scontra4.classList[0] === document.querySelector(`.b${k + 1}`)?.classList[0]) &&
                (Scontra4.classList[0] === document.querySelector(`.b${k + 2}`)?.classList[0]) &&
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red') || 
                 document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink')))
                ||
                ((document.querySelector(`.b${k - 1}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k - 2}`)?.classList.contains('button-clicked-red')) && 
                (Scontra4.classList[0] === document.querySelector(`.b${k - 1}`)?.classList[0]) &&
               (Scontra4.classList[0] === document.querySelector(`.b${k - 2}`)?.classList[0]) &&
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink')))

                ||

                ((document.querySelector(`.b${k + 1}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k + 2}`)?.classList.contains('button-clicked-red')) && 
                (Scontra4.classList[0] === document.querySelector(`.b${k + 1}`)?.classList[0]) &&
                (Scontra4.classList[0] === document.querySelector(`.b${k + 2}`)?.classList[0]) &&
                document.querySelector(`.b${k}`)?.classList.contains('f1'))

                ||

                ((document.querySelector(`.b${k - 1}`)?.classList.contains('button-clicked-red') &&
                document.querySelector(`.b${k - 2}`)?.classList.contains('button-clicked-red')) && 
                (Scontra4.classList[0] === document.querySelector(`.b${k - 1}`)?.classList[0]) &&
                (Scontra4.classList[0] === document.querySelector(`.b${k - 2}`)?.classList[0]) &&
                document.querySelector(`.b${k}`)?.classList.contains('f1'))

                ||

                ((document.querySelector(`.b${k + 8}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 16}`)?.classList.contains('button-clicked-pink')) && 
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink'))) 

                ||

                ((document.querySelector(`.b${k - 8}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k - 16}`)?.classList.contains('button-clicked-pink')) && 
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink'))) 

                ||
                
                ((document.querySelector(`.b${k + 6}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 12}`)?.classList.contains('button-clicked-pink')) && 
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink'))) 
                
                ||
                
                ((document.querySelector(`.b${k - 6}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k - 12}`)?.classList.contains('button-clicked-pink')) && 
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink'))) 
                
                || 
                
                ((document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k - 14}`)?.classList.contains('button-clicked-pink')) && 
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink'))) 
                
                ||
                
                ((document.querySelector(`.b${k + 1}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 2}`)?.classList.contains('button-clicked-pink')) && 
                (Scontra4.classList[0] === document.querySelector(`.b${k + 1}`)?.classList[0]) &&
                (Scontra4.classList[0] === document.querySelector(`.b${k + 2}`)?.classList[0]) &&
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red') || 
                 document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink')))
                
                 ||
                
                 ((document.querySelector(`.b${k - 1}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k - 2}`)?.classList.contains('button-clicked-pink')) && 
                (Scontra4.classList[0] === document.querySelector(`.b${k - 1}`)?.classList[0]) &&
               (Scontra4.classList[0] === document.querySelector(`.b${k - 2}`)?.classList[0]) &&
                (document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${k - 7}`)?.classList.contains('button-clicked-pink')))
                
                ||

                ((document.querySelector(`.b${k + 1}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k + 2}`)?.classList.contains('button-clicked-pink')) && 
                (Scontra4.classList[0] === document.querySelector(`.b${k + 1}`)?.classList[0]) &&
                (Scontra4.classList[0] === document.querySelector(`.b${k + 2}`)?.classList[0]) &&
                document.querySelector(`.b${k}`)?.classList.contains('f1'))

                ||

                ((document.querySelector(`.b${k - 1}`)?.classList.contains('button-clicked-pink') &&
                document.querySelector(`.b${k - 2}`)?.classList.contains('button-clicked-pink')) && 
                (Scontra4.classList[0] === document.querySelector(`.b${k - 1}`)?.classList[0]) &&
                (Scontra4.classList[0] === document.querySelector(`.b${k - 2}`)?.classList[0]) &&
                document.querySelector(`.b${k}`)?.classList.contains('f1'))

                ){

         
               arrayBotones.forEach(boton => boton.classList.add('no-pointer'))
              
              botonDinamico = Scontra4

              setTimeout(() =>{

              botonDinamico?.classList.add('button-clicked-pink');
              const claseBotonDinamico = Array.from(botonDinamico?.classList).join(' ');
              botonesColoreados.push(claseBotonDinamico)
              clickSound.currentTime = 0;
              clickSound.play();
              cuatroEnLinea();
              saveToLocalStorage();
              setTimeout(() =>{
              arrayBotones.forEach(boton => boton.classList.remove('no-pointer'))  
              }, 100)
              
              }, 1000);

              tercerFiltro = false;
              console.log('tercerFiltro ', tercerFiltro)
              break;

              } else{
              
                continue;

              }

            } 

             if(hayGanador){
              break;
            }

            if(tercerFiltro){
              
            if(document.querySelector(`.b${numeroAleatorio}`)?.classList.contains('button-clicked-red') ||
                document.querySelector(`.b${numeroAleatorio}`)?.classList.contains('button-clicked-pink')){
                  continue;
                }

              if(                
                document.querySelector(`.b${numeroAleatorio - 7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${numeroAleatorio - 7}`)?.classList.contains('button-clicked-pink') ||
                document.querySelector(`.b${numeroAleatorio}`)?.classList.contains('f1') || 

                (document.querySelector(`.b${numeroAleatorio-8}`)?.classList.contains('button-clicked-red') && 
                (document.querySelector(`.b${numeroAleatorio-7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${numeroAleatorio-7}`)?.classList.contains('button-clicked-pink'))) ||
               (document.querySelector(`.b${numeroAleatorio-6}`)?.classList.contains('button-clicked-red') && 
                (document.querySelector(`.b${numeroAleatorio-7}`)?.classList.contains('button-clicked-red') || 
                document.querySelector(`.b${numeroAleatorio-7}`)?.classList.contains('button-clicked-pink')))){
               
             console.log('Este es el numero aleatorio ELEGIDO: ', numeroAleatorio)     
             console.log('Este es el boton que colorea: ', botonDinamico)
            //  botonDinamico = document.querySelector(`.b${numeroAleatorio}`) as HTMLElement 

              setTimeout(() =>{
              botonDinamico?.classList.add('button-clicked-pink')
              const claseBotonDinamico = Array.from(botonDinamico?.classList).join(' ');
              botonesColoreados.push(claseBotonDinamico)
              clickSound.currentTime = 0;
              clickSound.play();
              cuatroEnLinea();
              saveToLocalStorage();
              setTimeout(() =>{
              arrayBotones.forEach(boton => boton.classList.remove('no-pointer'))  
              }, 100)
              }, 1000) 
              break;
              } else{
                continue;
              }
             }
             }
            
            }

           
          }

      cuatroEnLinea()
      saveToLocalStorage()
  
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

       rojosJuegan = !rojosJuegan;
    }

    saveToLocalStorage();

  });



  cuatroEnLinea()

});


}



function cuatroEnLinea(){
const victoriaRoja = document.querySelector('.victoria-roja') as HTMLElement;
const victoriaAmarilla = document.querySelector('.victoria-amarilla') as HTMLElement;
const victoriaRobot = document.querySelector('.victoria-robot') as HTMLElement;

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
      
    } else if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-pink')){

      if(victoriaRobot){
        victoriaRobot.style.opacity = '1'
        victoriaRobot.style.zIndex = '2'

        if(lienzo){
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
        }
          if(logo){
          logo.style.filter = 'drop-shadow(4px 4px 8px rgba(191, 0, 255, 0.92))'
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

   if(((document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-red') &&
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
    document.querySelector(`.b${numeroActual - 3}`)?.classList.contains('button-clicked-pink'))) 
    && 
    (document.querySelector(`.b${numeroActual}`)?.classList[0] === document.querySelector(`.b${numeroActual - 1}`)?.classList[0]) &&
    (document.querySelector(`.b${numeroActual}`)?.classList[0] === document.querySelector(`.b${numeroActual - 2}`)?.classList[0]) &&
    (document.querySelector(`.b${numeroActual}`)?.classList[0] === document.querySelector(`.b${numeroActual - 3}`)?.classList[0]) 
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

    } else if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-pink')){

      if(victoriaRobot){
        victoriaRobot.style.opacity = '1'
        victoriaRobot.style.zIndex = '2'

        if(lienzo){
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
        }
          if(logo){
          logo.style.filter = 'drop-shadow(4px 4px 8px rgba(191, 0, 255, 0.92))'
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

    } else if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-pink')){

      if(victoriaRobot){
        victoriaRobot.style.opacity = '1'
        victoriaRobot.style.zIndex = '2'

        if(lienzo){
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
        }
          if(logo){
          logo.style.filter = 'drop-shadow(4px 4px 8px rgba(191, 0, 255, 0.92))'
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

    } else if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-pink')){

      if(victoriaRobot){
        victoriaRobot.style.opacity = '1'
        victoriaRobot.style.zIndex = '2'

        if(lienzo){
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
        }
          if(logo){
          logo.style.filter = 'drop-shadow(4px 4px 8px rgba(191, 0, 255, 0.92))'
        }     
      }

    }
  } 

})
}

hayEmpate()

}


function hayEmpate(){

  let acumuladorBotonesUsadosRA:number = 0;
  let acumuladorBotonesUsadosRR:number = 0;

  todosLosBotones.forEach((boton) =>{

    if(boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow')){

      acumuladorBotonesUsadosRA += 1;

    } else{
      acumuladorBotonesUsadosRA = acumuladorBotonesUsadosRA;
    }

  })

  if(acumuladorBotonesUsadosRA === 42){

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

    todosLosBotones.forEach((boton) =>{

    if(boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-pink')){

      acumuladorBotonesUsadosRR += 1;

    } else{
      acumuladorBotonesUsadosRR = acumuladorBotonesUsadosRR;
    }

  })

  if(acumuladorBotonesUsadosRR === 42){

    const imagenEmpateRojo = document.querySelector('.empate-rojo') as HTMLElement
    const imagenEmpateRobot = document.querySelector('.empate-robot') as HTMLElement

    imagenEmpateRojo.style.zIndex = '2'
    imagenEmpateRojo.style.opacity = '1'

    imagenEmpateRobot.style.zIndex = '2'
    imagenEmpateRobot.style.opacity = '1'

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

function numeroAleatorio (min:number, max:number){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


