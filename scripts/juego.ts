


const turno:string|null = localStorage.getItem('turno')
let rojosJuegan:boolean =  turno ? JSON.parse(turno) : true;
let hayGanador:boolean = false;
const todosLosBotones = document.querySelectorAll('.b')
const almacenado:string|null= localStorage.getItem('botones');
const arrayBotones:Element[] = Array.from(todosLosBotones)
let detener = false;
let botonesPintados: string[]|null = almacenado? JSON.parse(almacenado) : null;
const botonesColoreados:string[] = botonesPintados || [] 

renderPage()

function renderPage(){
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
    filaUno()
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

  }

function filaUno(){


const botonesFila = document.querySelectorAll('.f1');

  botonesFila.forEach((boton) => {

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

      if (boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow')) {   
        return;
      }

      if (rojosJuegan) {
        boton.classList.add('button-clicked-red');
          const botonClases = Array.from(boton.classList).join(' ');
          botonesColoreados.push(botonClases)
      } else {
        boton.classList.add('button-clicked-yellow');
          const botonClases = Array.from(boton.classList).join(' ');
          botonesColoreados.push(botonClases)
      }

      cuatroEnLinea()
      // Cambiar turno
      rojosJuegan = !rojosJuegan;


      saveToLocalStorage();

    });
  });

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
    
    if (boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow')) {
      
      return;
    }


    if (rojosJuegan) {
  
      if(document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-red') ||
        document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-yellow')
      ){
          boton.classList.add('button-clicked-red');
          
          const botonClases = Array.from(boton.classList).join(' ');

          botonesColoreados.push(botonClases)
          
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

      } else if (!document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-red') ||
        !document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-yellow')
      ){
          return;
      }
          cuatroEnLinea()
    }
    rojosJuegan = !rojosJuegan;
    
    saveToLocalStorage();

  });

});

}



function cuatroEnLinea(){
const victoriaRoja = document.querySelector('.victoria-roja') as HTMLElement;
const victoriaAmarilla = document.querySelector('.victoria-amarilla') as HTMLElement;
const lienzo = document.querySelector('.lienzo') as HTMLElement
const logo = document.querySelector('.conecta-logo') as HTMLElement

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
  ){

    hayGanador = !hayGanador;

    document.querySelector(`.b${numeroActual}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual - 7}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual - 14}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual - 21}`)?.classList.add('cuatro-en-linea')

    if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-red')){
      
      if(victoriaRoja){
        victoriaRoja.style.opacity = '1';
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
    document.querySelector(`.b${numeroActual - 3}`)?.classList.contains('button-clicked-red')) || 
    (document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-yellow') &&
    document.querySelector(`.b${numeroActual - 1}`)?.classList.contains('button-clicked-yellow') &&
    document.querySelector(`.b${numeroActual - 2}`)?.classList.contains('button-clicked-yellow') &&
    document.querySelector(`.b${numeroActual - 3}`)?.classList.contains('button-clicked-yellow'))
  ){
    
    hayGanador = !hayGanador;
    document.querySelector(`.b${numeroActual}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual - 1}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual - 2}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual - 3}`)?.classList.add('cuatro-en-linea')

    if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-red')){
      
      if(victoriaRoja){
        victoriaRoja.style.opacity = '1'
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
    document.querySelector(`.b${numeroActual + 24}`)?.classList.contains('button-clicked-red')) && document.querySelector(`.b${numeroActual + 24}`)?.classList.contains(`f${filaActual + 3}`)  || 

    (document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-yellow') &&
    document.querySelector(`.b${numeroActual + 8}`)?.classList.contains('button-clicked-yellow') && document.querySelector(`.b${numeroActual + 8}`)?.classList.contains(`f${filaActual + 1}`) &&
    document.querySelector(`.b${numeroActual + 16}`)?.classList.contains('button-clicked-yellow') && document.querySelector(`.b${numeroActual + 16}`)?.classList.contains(`f${filaActual + 2}`) &&
    document.querySelector(`.b${numeroActual + 24}`)?.classList.contains('button-clicked-yellow')) && document.querySelector(`.b${numeroActual + 24}`)?.classList.contains(`f${filaActual + 3}`)
  ){

    hayGanador = !hayGanador;

    document.querySelector(`.b${numeroActual}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual + 8}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual + 16}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual + 24}`)?.classList.add('cuatro-en-linea')

      if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-red')){
      
      if(victoriaRoja){
        victoriaRoja.style.opacity = '1'
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
    document.querySelector(`.b${numeroActual + 18}`)?.classList.contains('button-clicked-red')) && document.querySelector(`.b${numeroActual + 18}`)?.classList.contains(`f${filaActual + 3}`)  || 

    (document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-yellow') &&
    document.querySelector(`.b${numeroActual + 6}`)?.classList.contains('button-clicked-yellow') && document.querySelector(`.b${numeroActual + 6}`)?.classList.contains(`f${filaActual + 1}`) &&
    document.querySelector(`.b${numeroActual + 12}`)?.classList.contains('button-clicked-yellow') && document.querySelector(`.b${numeroActual + 12}`)?.classList.contains(`f${filaActual + 2}`) &&
    document.querySelector(`.b${numeroActual + 18}`)?.classList.contains('button-clicked-yellow')) && document.querySelector(`.b${numeroActual + 18}`)?.classList.contains(`f${filaActual + 3}`)
  ){

    hayGanador = !hayGanador;

    document.querySelector(`.b${numeroActual}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual + 6}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual + 12}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual + 18}`)?.classList.add('cuatro-en-linea')

     if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-red')){
      
      if(victoriaRoja){
        victoriaRoja.style.opacity = '1'
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

    const imagenEmpate = document.querySelector('.empate') as HTMLElement
    
    imagenEmpate.style.zIndex = '1'
    imagenEmpate.style.opacity = '0.3'

  }
}

function saveToLocalStorage(){

  localStorage.setItem('botones', JSON.stringify(botonesColoreados))
  localStorage.setItem('turno', JSON.stringify(rojosJuegan))
}