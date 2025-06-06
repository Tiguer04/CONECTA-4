let rojosJuegan:boolean = true;
let hayGanador:boolean = false;


    filaUno()
    filasDosSeis('2')
    filasDosSeis('3')
    filasDosSeis('4')
    filasDosSeis('5')
    filasDosSeis('6')

const todosLosBotones = document.querySelectorAll('.b')

let detener = false;

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
      } else {
        boton.classList.add('button-clicked-yellow');
      }

      cuatroEnLinea()
      // Cambiar turno
      rojosJuegan = !rojosJuegan;
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
      } else if (!document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-red') ||
        !document.querySelector(`.b${numeroAnterior - 7}`)?.classList.contains('button-clicked-yellow')
      ){
          return;
      }
          cuatroEnLinea()
    }
    rojosJuegan = !rojosJuegan;
  });
});




}



function cuatroEnLinea(){
const victoriaRoja = document.querySelector('.victoria-roja') as HTMLElement;
const victoriaAmarilla = document.querySelector('.victoria-amarilla') as HTMLElement;
const lienzo = document.querySelector('.lienzo') as HTMLElement

if(!hayGanador){

todosLosBotones.forEach((boton) =>{

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
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';        }
      }
      
    } else if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-yellow')){

      if(victoriaAmarilla){
        victoriaAmarilla.style.opacity = '1'
        if(lienzo){
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';
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
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';        }
      }
      
    } else if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-yellow')){

      if(victoriaAmarilla){
        victoriaAmarilla.style.opacity = '1'
         if(lienzo){
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';        }
      }

    }
  } 

    if((document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-red') &&
    document.querySelector(`.b${numeroActual + 8}`)?.classList.contains('button-clicked-red') &&
    document.querySelector(`.b${numeroActual + 16}`)?.classList.contains('button-clicked-red') &&
    document.querySelector(`.b${numeroActual + 24}`)?.classList.contains('button-clicked-red')) || 
    (document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-yellow') &&
    document.querySelector(`.b${numeroActual +8}`)?.classList.contains('button-clicked-yellow') &&
    document.querySelector(`.b${numeroActual + 16}`)?.classList.contains('button-clicked-yellow') &&
    document.querySelector(`.b${numeroActual + 24}`)?.classList.contains('button-clicked-yellow'))
  ){

    hayGanador = !hayGanador;

    console.log(hayGanador)

    document.querySelector(`.b${numeroActual}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual + 8}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual + 16}`)?.classList.add('cuatro-en-linea') 
    document.querySelector(`.b${numeroActual + 24}`)?.classList.add('cuatro-en-linea')

      if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-red')){
      
      if(victoriaRoja){
        victoriaRoja.style.opacity = '1'
          if(lienzo){
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';        }
      }
      
    } else if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-yellow')){

      if(victoriaAmarilla){
        victoriaAmarilla.style.opacity = '1';
         if(lienzo){
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';        }
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
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';        }
      }
      
    } else if(document.querySelector(`.b${numeroActual}`)?.classList.contains('button-clicked-yellow')){

      if(victoriaAmarilla){
        victoriaAmarilla.style.opacity = '1'
         if(lienzo){
          lienzo.style.boxShadow = '0px 0px 30px rgba(255, 255, 255, 0.65)';        }
      }

    }
  } 
})
} 

let acumuladorBotonesUsados:number = 0;

todosLosBotones.forEach((boton) =>{

  if(boton.classList.contains('button-clicked-red') || boton.classList.contains('button-clicked-yellow')){

    acumuladorBotonesUsados += 1;

  } else{
    acumuladorBotonesUsados = acumuladorBotonesUsados;
  }

console.log(acumuladorBotonesUsados)

})


}