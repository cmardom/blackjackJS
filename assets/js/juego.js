// import _ from "./underscore-min";

document.addEventListener("DOMContentLoaded", function(){
    const jugadorCartas     = document.getElementById('jugador-cartas');
    const computadoraCartas = document.getElementById('computadora-cartas');
    const btnNuevo          = document.getElementById('btnNuevo');
    const btnPedir          = document.getElementById('btnPedir');
    const btnDetener        = document.getElementById('btnDetener');
    const estado            = document.getElementById('estado');
    let puntosJugador     = document.getElementById('puntosJugador');
    const puntosComputadora = document.getElementById('puntosComputadora');

    let barajaBarajada = generarBaraja();
    console.log(barajaBarajada);

    //you need to pass a function reference that will be called when the event occurs.
    btnPedir.addEventListener('click', function() {
        let puntosActualesJugador;
        do {
            let carta = repartirCarta(jugadorCartas, barajaBarajada);
            puntosActualesJugador = escribirPuntos(puntosJugador, calcularPuntosDeCarta(carta));
        } while (puntosActualesJugador <= 21);


    });


    btnDetener.addEventListener('click', function (){
        estado.innerText = "Turno de computadora";
        let puntosActualesComputadora;
        do{
            let carta = repartirCarta(computadoraCartas, barajaBarajada);
            puntosActualesComputadora = escribirPuntos(puntosComputadora, calcularPuntosDeCarta(carta));

        } while (puntosActualesComputadora <= 21);


    });


    btnNuevo.addEventListener('click', function(){
        puntosJugador.innerText = "0";
        while (jugadorCartas.firstChild){
            jugadorCartas.removeChild(jugadorCartas.firstChild);
        }

        puntosComputadora.innerText = "0";
        while (computadoraCartas.firstChild){
            computadoraCartas.removeChild(computadoraCartas.firstChild);
        }

        generarBaraja();
    });

});



function generarBaraja(){
    const palos = "CDHS".split('');
    const figuras = "JQK".split('');
    const ace = "A";
    const cartaMin = 2;
    const cartaMax = 10;

    let baraja = [];

    for (const palo of palos){
        for (let carta = cartaMin; carta <= cartaMax ; carta++) {
            baraja.push(carta+palo);
        }

        for (const figura of figuras){
            baraja.push(figura+palo);
        }

        baraja.push(ace+palo);
    }

    return _.shuffle(baraja);

}

function generarRutaImagen (carta){
    const img = document.createElement('img');
    img.setAttribute('src', `assets/cartas/${carta}.png`);
    img.classList.add('carta');
    return img;

}


function calcularPuntosDeCarta (carta){
    const numeroCarta = carta.substring(0, carta.length-1);
    let valorCarta = parseInt(numeroCarta);

    if(isNaN(numeroCarta)){
        const letra = numeroCarta.toUpperCase();
        switch (letra){

            case "A": return 11;
            case "J":
            case "Q":
            case "K":
                return 10;
        }
    } else {
        return valorCarta;
    }
}

function repartirCarta (contenedor, baraja){
    const carta = baraja.shift();
    contenedor.append(generarRutaImagen(carta));
    return carta;

}

// function detener(btnPedir, btnDetener){
//     btnPedir.disable();
//     btnDetener.disable();
// }

function escribirPuntos (contenedor, puntos){
    return contenedor.innerHTML = parseInt(contenedor.innerText) + puntos;
}

function comprobarPuntos (puntos, elemento){
    if (puntos >= 21){
        elemento.innerText = "Has perdido";
    }
}


