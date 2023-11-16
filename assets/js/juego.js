// import _ from "./underscore-min";

document.addEventListener("DOMContentLoaded", function(){
    const jugadorCartas     = document.getElementById('jugador-cartas');
    const computadoraCartas = document.getElementById('computadora-cartas');
    const btnNuevo          = document.getElementById('btnNuevo');
    const btnPedir          = document.getElementById('btnPedir');
    const btnDetener        = document.getElementById('btnDetener');
    const estado            = document.getElementById('estado');
    const puntosJugador     = document.getElementById('puntosJugador');
    const puntosComputadora = document.getElementById('puntosComputadora');

    estado.innerText = "Turno Jugador1";
    let marcadorComputadora = 0;
    let marcadorJugador = 0;
    let barajaBarajada = generarBaraja();
    console.log(barajaBarajada);


    btnPedir.addEventListener('click', function() {

        let carta = repartirCarta(jugadorCartas, barajaBarajada);
        let puntosCarta = calcularPuntosDeCarta(carta);
        marcadorJugador+=puntosCarta;
        escribirPuntos(puntosJugador, marcadorJugador);


        if (marcadorJugador >=21){
            btnPedir.disabled = true;
        }


    });


    btnDetener.addEventListener('click', function (){
        estado.innerText = "Turno de computadora";
        do {
            let carta = repartirCarta(computadoraCartas, barajaBarajada);
            let puntosCarta = calcularPuntosDeCarta(carta);
            marcadorComputadora+=puntosCarta;
            escribirPuntos(puntosComputadora, marcadorComputadora);





        } while (marcadorComputadora <=21)

        comprobarGanador(marcadorJugador, marcadorComputadora, estado);
    });


    btnNuevo.addEventListener('click', function(){
        location.reload();
    });


    comprobarGanador(marcadorJugador, marcadorComputadora, estado);
});



function comprobarGanador (marcadorJugador, marcadorComputadora, estado){
    if (marcadorJugador === 0){
        estado.innerText = "Turno Jugador 1";
    } else if (marcadorJugador >= 21){
        estado.innerText = "Pierde Jugador 1";
    } else if (marcadorJugador < marcadorComputadora){
        estado.innerText = "Gana Jugador 1";
    } else {
        estado.innerText = "Gana Computadora";
    }
}

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

    if(isNaN(valorCarta)){
        const letra = numeroCarta.toUpperCase();
        console.log("letra?" + letra);

        switch (letra){
            case 'A': return 11;
            case 'J':
            case 'Q':
            case 'K':
                return 10;
        }
    } else {
        return valorCarta;
    }
}

function calcularPuntosDeTodasLasCartas (cartaAnterior, cartaActual){
    const puntosCartaAnterior = calcularPuntosDeCarta(cartaAnterior);
    const puntosCartaActual = calcularPuntosDeCarta(cartaActual);

    return puntosCartaAnterior + puntosCartaActual;
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
    console.log("puntos> " + puntos);
    console.log("contenedor> " + contenedor);
    contenedor.innerText = puntos;

}

function comprobarPuntos (puntos, elemento){
    if (puntos >= 21){
        elemento.innerText = "Has perdido";
    }

    return false;
}


