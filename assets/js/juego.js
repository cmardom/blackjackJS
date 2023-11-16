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

    //si el jugador supera los 21 puntos, se desactiva su boton y pasa al turno de la computadora
        if (marcadorJugador >=21){
            btnPedir.disabled = true;
            btnDetener.click();
        }

    });



    //turno de computadora :
    btnDetener.addEventListener('click', function (){
        estado.innerText = "Turno de computadora";
        do {
            let carta = repartirCarta(computadoraCartas, barajaBarajada);
            let puntosCarta = calcularPuntosDeCarta(carta);
            marcadorComputadora+=puntosCarta;
            escribirPuntos(puntosComputadora, marcadorComputadora);

        } while (marcadorComputadora <=21)

        //se comparan los marcadores y se escribe el estado, devuelve true o false
        if (comprobarGanador(marcadorJugador, marcadorComputadora, estado)){
            desactivarBotones(btnDetener,btnPedir);
        }

    });

    // se recarga la pagina
    btnNuevo.addEventListener('click', function(){
        location.reload();
    });


});


function comprobarGanador (marcadorJugador, marcadorComputadora, estado){
    //reglas para ganar

    if (marcadorJugador === 0 && marcadorComputadora > 1) {
        // NO se puede pulsar detener sin haber sacado cartas antes
        estado.innerText = "Jugada invalidada. Pulsa NUEVO JUEGO";
        return true;

    } else if (marcadorJugador === 0){
        // primer turno
        estado.innerText = "Turno Jugador 1";
        return false;

    } else if (marcadorJugador >= 21 && marcadorJugador > marcadorComputadora){
        //si los puntos del jugador son mayores a 21 y mayores a los de la computadora
        estado.innerText = "Pierde Jugador 1";
        return true;

    } else if (marcadorJugador < marcadorComputadora && marcadorComputadora > 21){
        //si los puntos de la computadora son mayores que los del jugador, y mayores a 21
        estado.innerText = "Gana Jugador 1";
        return true;

    } else {
        // empate = gana computadora
        estado.innerText = "Gana Computadora";
        return true;
    }
}

function desactivarBotones (btnDetener, btnPedir){
    btnDetener.disabled=true;
    btnPedir.disabled=true;
}

function generarBaraja(){
    //valores
    const palos = "CDHS".split('');
    const figuras = "JQK".split('');
    const ace = "A"; //no se usa la palabra "as" pq esta reservada
    const cartaMin = 2;
    const cartaMax = 10;
    //baraja vacia
    let baraja = [];

    //asignacion de valores
    for (const palo of palos){
        for (let carta = cartaMin; carta <= cartaMax ; carta++) {
            baraja.push(carta+palo);
        }

        for (const figura of figuras){
            baraja.push(figura+palo);
        }

        baraja.push(ace+palo);
    }

    //la devuelve barajada
    return _.shuffle(baraja);
}

function generarRutaImagen (carta){
    const img = document.createElement('img');
    img.setAttribute('src', `assets/cartas/${carta}.png`);
    img.classList.add('carta');

    return img;
}


function calcularPuntosDeCarta (carta){
    //se extrae el primer char
    const numeroCarta = carta.substring(0, carta.length-1);
    let valorCarta = parseInt(numeroCarta);

    //si no es un numero, comprobar letra
    if(isNaN(valorCarta)){
        const letra = numeroCarta.toUpperCase();
        //asignar valor
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


function repartirCarta (contenedor, baraja){
    //saca la primera carta y la imprime en su contenedor
    const carta = baraja.shift();
    contenedor.append(generarRutaImagen(carta));

    return carta;
}


function escribirPuntos (contenedor, puntos){
    //escribe puntos en los marcadores
    contenedor.innerText = puntos;

}

