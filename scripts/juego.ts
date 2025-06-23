const turno:string|null = localStorage.getItem('turno')
let rojosJuegan:boolean =  turno ? JSON.parse(turno) : true;
let hayGanador = false;
let detener = false;
let encontrado1 = false;
const recienCargado:string|null = localStorage.getItem('recienCargado');
let inicioRenderizado:boolean = recienCargado !== null ? JSON.parse(recienCargado) : true;

const clickeadoBotonRobot:string|null = localStorage.getItem('robot')
let robotFueClickeado:string|boolean = clickeadoBotonRobot? JSON.parse(clickeadoBotonRobot) : false;
const bodyAlmacenado:string|null = localStorage.getItem('body');
let bodyStyles:string = bodyAlmacenado? JSON.parse(bodyAlmacenado) : 'linear-gradient(to right, #ff0000, #f6ff00)';

const amarilloAlmacenado:string|null = localStorage.getItem('amarilloStyles')
let amarilloStyles:string = amarilloAlmacenado? JSON.parse(amarilloAlmacenado) : '1'

const robotAlmacenado:string|null = localStorage.getItem('robotStyles');
let robotStyles:string = robotAlmacenado? JSON.parse(robotAlmacenado) : '0'


const todosLosBotones = document.querySelectorAll<HTMLButtonElement>('.b')
const almacenado:string|null= localStorage.getItem('botones');
const arrayBotones:Element[] = Array.from(todosLosBotones)
let botonesPintados: string[]|null = almacenado? JSON.parse(almacenado) : null;
const botonesColoreados:string[] = botonesPintados || [] 

const lienzo = document.querySelector('.lienzo') as HTMLElement
const logo = document.querySelector('.conecta-logo') as HTMLElement
const amarillo = document.querySelector('.amarillo-pelea-fondo') as HTMLElement
const robot = document.querySelector('.robot-pelea-fondo') as HTMLElement
const botonRobot = document.querySelector('.robot-img') as HTMLImageElement
const botonRobotClickeado = localStorage.getItem('robotClickeado');
let clickedClase:string|null = botonRobotClickeado? JSON.parse(botonRobotClickeado) : null;

const clickSound = new Audio('./sounds/click-sound.wav') as HTMLAudioElement


    const botonesFila = Array.from(document.querySelectorAll<HTMLButtonElement>('.f1'));
    const botonesFila2= Array.from(document.querySelectorAll<HTMLButtonElement>('.f2'));
    const botonesFila3 = Array.from(document.querySelectorAll<HTMLButtonElement>('.f3'));
    const botonesFila4 = Array.from(document.querySelectorAll<HTMLButtonElement>('.f4'));
    const botonesFila5 = Array.from(document.querySelectorAll<HTMLButtonElement>('.f5'));
    const botonesFila6 = Array.from(document.querySelectorAll<HTMLButtonElement>('.f6'));

const imagenAlterna:string|null = localStorage.getItem('imagenYellowRobot');
let imagenActual:number = imagenAlterna?JSON.parse(imagenAlterna) : 2; 


const handleClick1 = ():void => {

    if(botonesColoreados.length !== 0){
    return;
  }

 arrayBotones.forEach(boton => boton.classList.add('no-pointer'))

  botonRobot.src = "./images/boton-robot.png";
  botonRobot.className = "robot-img";

  clickedClase = 'boton-robot-clicked';
  botonRobot.classList.add(clickedClase);
  bodyStyles = 'linear-gradient(to right, #ff0000, #f6ff00)'

  amarilloStyles = '1';

  amarillo.style.opacity = '1';
  
  robotStyles = '0';

  robot.style.opacity = '0';

  robotFueClickeado = false;

  imagenActual = 2;

  document.body.style.backgroundImage = bodyStyles



  saveToLocalStorage()

    location.reload()

}

const handleClick2 = ():void =>{


  if(botonesColoreados.length !== 0){
    return;
  }

 arrayBotones.forEach(boton => boton.classList.add('no-pointer'))

  botonRobot.src = "./images/boton-amarillo.jpg";
  botonRobot.className = "yellow-img";

  clickedClase = 'boton-yellow-clicked';
  botonRobot.classList.add(clickedClase);

  bodyStyles = 'linear-gradient(to right, #ff0000,rgb(195, 0, 255))'

  amarilloStyles = '0';

  amarillo.style.opacity = '0';
  
  robotStyles = '1';

  robot.style.opacity = '1';

  robotFueClickeado = true;

  imagenActual = 1;


  document.body.style.backgroundImage = bodyStyles

  saveToLocalStorage()

    location.reload()

};


renderPage()

function renderPage(){

  arrayBotones.forEach(boton =>{
    boton.addEventListener('click', () =>{
      inicioRenderizado = false;
    })
  })

   if(botonesColoreados.length > 0){
      botonRobot.classList.add('no-pointer')   
    } 

 arrayBotones.forEach(boton => boton.classList.add('no-pointer'))
 
  setTimeout(() =>{
    arrayBotones.forEach(boton => boton.classList.remove('no-pointer'))
  }, 500)

  arrayBotones.find(boton =>{
    if(boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow') || boton.classList.contains('button-clicked-pink')){
      encontrado1 = true;
    }
  })


  if(imagenActual === 1){
  botonRobot.src = "./images/boton-amarillo.jpg";
  botonRobot.className = "yellow-img";
  clickedClase = 'boton-yellow-clicked'
  botonRobot.classList.add(clickedClase)
} else if(imagenActual === 2){
  botonRobot.src = "./images/boton-robot.png";
  botonRobot.className = "robot-img";   
  clickedClase = 'boton-robot-clicked'
  botonRobot.classList.add(clickedClase)
}


  amarillo.style.opacity = amarilloStyles;
  robot.style.opacity = robotStyles;

document.body.style.backgroundImage = bodyStyles

todosLosBotones.forEach(botonInicial =>{
  const botonGlobal:string = botonInicial.classList[1]

  botonesPintados?.forEach(boton =>{
  
    let botonPintado:string = boton.split(' ').slice(1, 2).toString()
    let colorBoton:string = boton.split(' ').slice(-1).toString();

    if(botonPintado === botonGlobal){
      document.querySelector(`.${botonPintado}`)?.classList.add(colorBoton);     
   }

  })

})
  
    cuatroEnLinea()

    filtrajePorFila(botonesFila)
    filtrajePorFila(botonesFila2)
    filtrajePorFila(botonesFila3)
    filtrajePorFila(botonesFila4)
    filtrajePorFila(botonesFila5)
    filtrajePorFila(botonesFila6)


    const botonReiniciar:HTMLImageElement|null = document.querySelector('.reset-img')
    botonReiniciar?.addEventListener('click', () =>{

      localStorage.clear();
      location.reload();

  })

    if(encontrado1 === false){
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
          const botonClases:string = Array.from(boton.classList).join(' ');
          botonesColoreados.push(botonClases)
          clickSound.currentTime = 0;
          clickSound.play();

          for(let i = 0; i < 42; i++){

            const numeroAleatorio:number = Math.floor(Math.random() * 42) + 1;

            let botonDinamico = document.querySelector(`.b${numeroAleatorio}`) as HTMLButtonElement

            if(document.querySelector(`.b${numeroAleatorio}`)?.classList.contains('button-clicked-red') || document.querySelector(`.b${numeroAleatorio}`)?.classList.contains('button-clicked-pink')){

              continue;

            } 
            
            let encontrado = false;

            for(let j = 1; j < arrayBotones.length; j++){

              const SnumeroAleatorio:number = Math.floor(Math.random() * 42) + 1;
              
              let primerFiltro = true;

              const contra4 = document.querySelector(`.b${SnumeroAleatorio}`) as HTMLButtonElement

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
              
              botonDinamico = document.querySelector(`.b${k}`) as HTMLButtonElement;

              setTimeout(() =>{
              
              botonDinamico?.classList.add('button-clicked-pink');
              const claseBotonDinamico:string = Array.from(botonDinamico?.classList).join(' ');
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

            botonDinamico = document.querySelector(`.b${numeroAleatorio}`) as HTMLButtonElement

            if(botonDinamico?.classList.contains('f1')){

             arrayBotones.forEach(boton => boton.classList.add('no-pointer'))

              setTimeout(() =>{
              
              botonDinamico?.classList.add('button-clicked-pink');
              const claseBotonDinamico:string = Array.from(botonDinamico?.classList).join(' ');
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
              const claseBotonDinamico:string = Array.from(botonDinamico?.classList).join(' ');
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
          const botonClases:string = Array.from(boton.classList).join(' ');
          botonesColoreados.push(botonClases)
          clickSound.currentTime = 0;
          clickSound.play();
          encontrado1 = true;
          robotStop()



        } else {
        boton.classList.add('button-clicked-yellow');
          const botonClases:string = Array.from(boton.classList).join(' ');
          botonesColoreados.push(botonClases)
          clickSound.currentTime = 0;
          clickSound.play();
          encontrado1 = true;
          robotStop()
        }

        rojosJuegan = !rojosJuegan;
      }

       
      cuatroEnLinea()
    

      saveToLocalStorage();
      
}


function filasDosSeis(fila:string){


const botonesFila2 = document.querySelectorAll<HTMLButtonElement>(`.f${fila}`);

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
          
          const botonClases:string = Array.from(boton.classList).join(' ');

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

            let encontrado = false;

              
            
            if(document.querySelector(`.b${numeroAleatorio}`)?.classList.contains('button-clicked-red') || document.querySelector(`.b${numeroAleatorio}`)?.classList.contains('button-clicked-pink')){

              continue;

            } 
            
            for(let j = 42; j > 0; j--){

              const contra4 = document.querySelector(`.b${j}`) as HTMLButtonElement

            
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

              ((document.querySelector(`.b${j + 6}`)?.classList.contains('button-clicked-pink') &&
              document.querySelector(`.b${j + 12}`)?.classList.contains('button-clicked-pink') &&
              document.querySelector(`.b${j + 18}`)?.classList.contains('button-clicked-pink')) &&
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
              const claseBotonDinamico:string = Array.from(botonDinamico?.classList).join(' ');
              botonesColoreados.push(claseBotonDinamico)
              clickSound.currentTime = 0;
              clickSound.play();
              cuatroEnLinea();
              saveToLocalStorage();
              setTimeout(() =>{
              arrayBotones.forEach(boton => boton.classList.remove('no-pointer'))  
              }, 100)

              }, 1000);

              encontrado = true;
                  
              break;
                
               } else{
                continue;
               }

            }

            if(encontrado === true){
              break;
            }

            if(hayGanador){
              return;
            }

            if(encontrado === false){

            let tercerFiltro = true;

            for(let k = 1; k < 43; k++){
              

              const Scontra4 = document.querySelector(`.b${k}`) as HTMLButtonElement

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
              const claseBotonDinamico:string = Array.from(botonDinamico?.classList).join(' ');
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
              encontrado = true;

              break;

              } else{
              
                continue;

              }

            } 

            if(encontrado === true){
              return;
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
              const claseBotonDinamico:string = Array.from(botonDinamico?.classList).join(' ');
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
          
          const botonClases:string = Array.from(boton.classList).join(' ');

          botonesColoreados.push(botonClases)

          clickSound.currentTime = 0;
          clickSound.play();  
          encontrado1 = true;
          robotStop()

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
            
          const botonClases:string = Array.from(boton.classList).join(' ');

          botonesColoreados.push(botonClases)

          clickSound.currentTime = 0;
          clickSound.play();   
          encontrado1 = true;
          robotStop()

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
const victoriaRoja = document.querySelector('.victoria-roja') as HTMLImageElement;
const victoriaAmarilla = document.querySelector('.victoria-amarilla') as HTMLImageElement;
const victoriaRobot = document.querySelector('.victoria-robot') as HTMLImageElement;

if(!hayGanador){

arrayBotones.find((boton) =>{

  const botonActual:string[] = boton.className.split(' ');
  const numeroActual:number = Number(botonActual[1].split('').slice(1).join(''))
 
  const fila:string[] =  boton.className.split(' ');
  const filaActual:number = Number(fila[0].split('').slice(1).join());

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

  let acumuladorBotonesUsadosRA = 0;
  let acumuladorBotonesUsadosRR = 0;

  todosLosBotones.forEach((boton) =>{

    if(boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow')){

      acumuladorBotonesUsadosRA += 1;

    } else{
      acumuladorBotonesUsadosRA = acumuladorBotonesUsadosRA;
    }

  })

  if(acumuladorBotonesUsadosRA === 42){

    const imagenEmpateRojo = document.querySelector('.empate-rojo') as HTMLImageElement
    const imagenEmpateAmarillo = document.querySelector('.empate-amarillo') as HTMLImageElement

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

    const imagenEmpateRojo = document.querySelector('.empate-rojo') as HTMLImageElement
    const imagenEmpateRobot = document.querySelector('.empate-robot') as HTMLImageElement

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
  localStorage.setItem('fondoImagenRobot', JSON.stringify(handleClick1))
  localStorage.setItem('body', JSON.stringify(bodyStyles))
  localStorage.setItem('amarilloStyles', JSON.stringify(amarilloStyles))
  localStorage.setItem('robotStyles', JSON.stringify(robotStyles))
  localStorage.setItem('robotClickeado', JSON.stringify(clickedClase))
  localStorage.setItem('imagenYellowRobot', JSON.stringify(imagenActual))
  localStorage.setItem('recienCargado', JSON.stringify(inicioRenderizado))
}

function robotPlay() {

if(botonesColoreados.length > 0){
  botonRobot.classList.add('no-pointer')

  return;
}

  if (!encontrado1) {

    if(inicioRenderizado === true){

    if(imagenActual === 2){

      botonRobot.addEventListener('click', handleClick2);

      saveToLocalStorage()
    
  } else if(imagenActual === 1){

      botonRobot.addEventListener('click', handleClick1);

      saveToLocalStorage()
   }
 }
} 

}

function robotStop() {

      botonRobot.removeEventListener('click', handleClick1);
      botonRobot.removeEventListener('click', handleClick2);

}

function numeroAleatorio (min:number, max:number){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function filtrajePorFila(array:Element[]){

      array.forEach((boton) =>{
      boton.addEventListener('click', () =>{
   
        if(boton.classList.contains('button-clicked-red')){

          encontrado1 = true;
        
        }

        if(array === botonesFila){
          filaUno(boton)
        } else if(array === botonesFila2){
          filasDosSeis('2')
        } else if(array === botonesFila3){
          filasDosSeis('3')
        } else if(array === botonesFila4){
          filasDosSeis('4')
        } else if(array === botonesFila5){
          filasDosSeis('5')
        } else if(array === botonesFila6){
          filasDosSeis('6')
        }

            botonRobot.classList.add('no-pointer');
      

      })
    })

    saveToLocalStorage()

}


