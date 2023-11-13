// import _ from "./underscore-min";

document.addEventListener("DOMContentLoaded", function(){
    const jugadorCartas     = document.getElementById('jugador-cartas');
    const computadoraCartas = document.getElementById('computadora-cartas');
    const btnNuevo          = document.getElementById('btnNuevo');
    const btnPedir          = document.getElementById('btnPedir');
    const btnDetener        = document.getElementById('btnDetener');
    const estado            = document.getElementById('estado');


    let barajaBarajada = generarBaraja();
    console.log(barajaBarajada);




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
    const img = document.createElement(img);
    img.setAttribute()

}

