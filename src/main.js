class Song {
    constructor(codigo, nombre, autor, duracion, anio, genero, urlSong) {
        this.codigo = codigo
        this.nombre = nombre;
        this.autor = autor;
        this.duracion = duracion;
        this.anio = anio;
        this.genero = genero;
        this.urlSong = urlSong;
    }
}

class PlayList {
    constructor(herramientaInterfaz) {
        this.catalogoDisponible = [new Song(1, "Corazon de Acero", "Yiyo Saratee", "3:44", "2016", "salsa", "img1"),
        new Song(2, "Blackbird Blackbird - Pure", "Omar Alfanno", "8:24", "2010", "salsa", "img2"),
        new Song(3, "Destino o Casualidad", "Melendi", "4:45", "2018", "romantica", "img3")];
        this.listafiltrada = this.catalogoDisponible;
        this.herramientaInterfaz = herramientaInterfaz;
        this.herramientaInterfaz.establecerEventosFiltrado();
        this.cargar();
    }

    cargar() {
        this.herramientaInterfaz.cargarListaCanciones(this.listafiltrada);
    }
    restablecerCanciones() {
        this.listafiltrada = this.catalogoDisponible;
        this.cargar();
    }
    filtrarCanciones(textoFiltro) {
        let text = textoFiltro.toLowerCase()
        this.listafiltrada = this.catalogoDisponible.filter((cancion) => {
            return cancion.nombre.toLowerCase().indexOf(text) != -1 ||
                cancion.autor.toLowerCase().indexOf(text) != -1 ||
                cancion.genero.toLowerCase().indexOf(text) != -1
        })
        this.cargar();
    }

    addSongToPlaylist(song) {
        this.listaCanciones.push(song);
    }
    removeSongToPlaylist(song) {
        this.listaCanciones = this.listaCanciones.filter(s => s !== song);
    }
}

class ListaFavoritos {
    constructor(herramientaInterfaz) {
        this.listaCanciones = new Array();
        this.herramientaInterfaz = herramientaInterfaz;
    }

    agregarCancion(cancion) {
        if (this.listaCanciones.indexOf(cancion) == -1) {
            this.herramientaInterfaz.agregarListaFavoritos(cancion)
            this.listaCanciones.push(cancion)
        }
    }
    removerCancion(cancion) {
        if (this.listaCanciones.indexOf(cancion) != -1) {
            this.herramientaInterfaz.removerListaFavoritos(cancion)
            let indice = this.listaCanciones.indexOf(cancion)
            if (indice != 1) {
                this.listaCanciones.splice(indice, 1);
            }
        }
    }
}

class ListaReproductor {
    constructor(herramientaInterfaz) {
        this.listaCanciones = new Array();
        this.herramientaInterfaz = herramientaInterfaz;
    }

    agregarCancion(cancion) {
        if (this.listaCanciones.indexOf(cancion) == -1) {
            this.herramientaInterfaz.agregarListaReproduccion(cancion)
            this.listaCanciones.push(cancion)
        }
    }
    removerCancion(cancion) {
        console.log(cancion)
        if (this.listaCanciones.indexOf(cancion) != -1) {
            this.herramientaInterfaz.removerListaReproduccion(cancion)
            let indice = this.listaCanciones.indexOf(cancion)
            if (indice != 1) {
                this.listaCanciones.splice(indice, 1);
            }
        }
        this.herramientaInterfaz.reproducirLista(this.listaCanciones, cancion);
    }

    reproducirLista(Lista, cancion) {
        this.listaCanciones = new Array();
        let indiceCancionesSeleccionadas = Lista.indexOf(cancion)
        if (this.indiceCancionesSeleccionadas != -1) {
            for (let indiceCancionActual = indiceCancionesSeleccionadas; indiceCancionActual < Lista.length; indiceCancionActual++) {
                this.listaCanciones.push(Lista[indiceCancionActual])
            }
            for (let indiceCancionActual = 0; indiceCancionActual < indiceCancionesSeleccionadas; indiceCancionActual++) {
                this.listaCanciones.push(Lista[indiceCancionActual])
            }
        }
        this.herramientaInterfaz.reproducirLista(this.listaCanciones);
    }
}

class herramientaInterfaz {
    constructor(reproductor) {
        this.domListaCanciones = document.getElementById("listaCanciones");
        this.domListaFavoritos = document.getElementById("listaFavoritos");
        this.domListaInformacion = document.getElementById("ListaInformacion");
        this.domListaReproductor = document.getElementById("ListaReproductor");
        this.reproductor = reproductor;
    }


    establecerEventosFiltrado() {
        this.domCatalogoBotonFiltrarCanciones = document.getElementById("BotonFiltroCanciones");
        this.domCatalogoRestablecerCanciones = document.getElementById("BotonRestablecerCanciones");

        if (this.domCatalogoBotonFiltrarCanciones) {
            this.domCatalogoBotonFiltrarCanciones.addEventListener("click", function () {
                this.domCatalogoTextoFiltrarCanciones = document.getElementById("TextoFiltroCanciones");
                this.reproductor.listaCanciones.filtrarCanciones(this.domCatalogoTextoFiltrarCanciones.value);
            });
        }
        if (this.domCatalogoRestablecerCanciones) {
            this.domCatalogoRestablecerCanciones.addEventListener("click", function () {
                this.domCatalogoBotonFiltrarCanciones = document.getElementById("TextoFiltroCanciones");
                this.reproductor.limpiarListaCanciones.restablecerCanciones();
            });
        }
    }

    cargarListaCanciones(listarFiltrado) {
        this.limpiarListaCanciones()
        listarFiltrado.forEach((cancion) => {
            this.agregarListaCancion(cancion);
        })
    }

    limpiarListaCanciones() {
        while (this.domListaCanciones && this.domListaCanciones.firstChild) {
            this.domListaCanciones.removeChild(this.domListaCanciones.firstChild);
        }
    }

    agregarListaCancion(cancion) {
        let elementoCancion = this.crearElementoListaCanciones(cancion);
        if (this.domListaCanciones != null)
            this.domListaCanciones.appendChild(elementoCancion);

    }

    crearElementoListaCanciones(cancion) {
        let botonReproducir = document.createElement("i")
        botonReproducir.className = "bi bi-play-circle m-1"
        botonReproducir.addEventListener("click", function () {
            console.log(reproductor.listaCanciones)
            reproductor.ListaReproductor.reproducirLista(reproductor.listaCanciones.listafiltrada, cancion);

        })

        let botonFavorito = document.createElement("i");
        botonFavorito.className = "bi bi-heart m-1";
        botonFavorito.addEventListener("click", function () {
            reproductor.ListaFavoritos.agregarCancion(cancion);
        })

        let botonAgregar = document.createElement("i");
        botonAgregar.className = "bi bi-plus-circle m-1";
        botonAgregar.addEventListener("click", function () {
            reproductor.ListaReproductor.agregarCancion(cancion);
        })

        let spanNombreCancion = document.createElement("span")
        spanNombreCancion.innerText = cancion.nombre

        let elementoCancion = document.createElement("li")
        elementoCancion.className = "list-group-item d-flex justify-content-between"

        let divBotones = document.createElement("div")
        divBotones.appendChild(botonReproducir)
        divBotones.appendChild(botonFavorito)
        divBotones.appendChild(botonAgregar)

        elementoCancion.appendChild(spanNombreCancion)
        elementoCancion.appendChild(divBotones)

        return elementoCancion
    }

    agregarListaFavoritos(cancion) {
        let elementoCancion = this.crearElementoListaFavoritos(cancion)
        console.log(this.domListaFavoritos)
        if (elementoCancion)
            this.domListaFavoritos.appendChild(elementoCancion)
    }

    removerListaFavoritos(cancion) {

        let elementoCancion = document.getElementById("elementoFavorito_" + cancion.codigo)
        if (elementoCancion) {
            while (elementoCancion.firstChild) {
                elementoCancion.removeChild(elementoCancion.firstChild)
            }
            elementoCancion.parentElement.removeChild(elementoCancion)
        }
    }

    crearElementoListaFavoritos(cancion) {
        let botonFavorito = document.createElement("i");
        botonFavorito.className = "bi bi-heart-fill m-1";
        botonFavorito.addEventListener("click", function () {
            reproductor.ListaFavoritos.removerCancion(cancion);
        })

        let botonReproducir = document.createElement("i");
        botonReproducir.className = "bi bi-play-circle m-1";
        botonReproducir.addEventListener("click", function () {
            reproductor.ListaReproductor.reproducirLista(reproductor.ListaFavoritos.listaCanciones, cancion);
        })

        let botonAgregar = document.createElement("i");
        botonAgregar.className = "bi bi-plus-circle m-1";
        botonAgregar.addEventListener("click", function () {
            reproductor.ListaReproductor.agregarCancion(cancion);
        })

        let spanNombreCancion = document.createElement("span")
        spanNombreCancion.innerText = cancion.nombre

        let elementoCancion = document.createElement("li")
        elementoCancion.className = "list-group-item d-flex justify-content-between"
        elementoCancion.id = "elementoFavorito_" + cancion.codigo
        let divBotones = document.createElement("div")

        divBotones.appendChild(botonReproducir)
        divBotones.appendChild(botonFavorito)
        divBotones.appendChild(botonAgregar)

        elementoCancion.appendChild(spanNombreCancion)
        elementoCancion.appendChild(divBotones)

        return elementoCancion
    }

    agregarListaReproduccion(cancion) {
        let elementoCancion = this.crearElementListaDeReproduccion(cancion)
        console.log(elementoCancion)
        this.domListaReproductor.appendChild(elementoCancion)
    }

    limpiarListaReproduccion(cancion) {
        while (this.domListaReproductor.firstChild) {
            this.domListaReproductor.removeChild(this.domListaReproductor.firstChild);
        }
    }

    removerListaReproduccion(cancion) {
        let elementoCancion = document.getElementById("elementoReproduccion_" + cancion.codigo)
        if (elementoCancion) {
            while (elementoCancion.firstChild) {
                elementoCancion.removeChild(elementoCancion.firstChild)
            }
            elementoCancion.parentElement.removeChild(elementoCancion)
        }
    }


    reproducir(cancion) {
        this.limpiarListaReproduccion();
        this.agregarListaReproduccion(cancion);
    }

    reproducirLista(lista) {
        this.limpiarListaReproduccion()
        lista.forEach(cancion => {
            this.agregarListaReproduccion(cancion)
        });
        this.limpiarListaInformacion()
        this.reproductor.empezarReproduccion()
    }


    crearElementListaDeReproduccion(cancion) {
        let botonReproducir = document.createElement("i")
        botonReproducir.className = "bi bi-play-circle m-1"
        botonReproducir.addEventListener("click", function () {
            reproductor.reproducir(cancion);
        })

        let botonRemover = document.createElement("i")
        botonRemover.className = "bi bi-dash-circle m-1"
        botonRemover.addEventListener("click", function () {
            reproductor.ListaReproductor.removerCancion(cancion);
        })

        let spanNombreCancion = document.createElement("span")
        spanNombreCancion.innerText = cancion.nombre

        let elementoCancion = document.createElement("li")
        elementoCancion.className = "list-group-item d-flex justify-content-between"
        elementoCancion.id = "elementoReproduccion_" + cancion.codigo
        let divBotones = document.createElement("div")

        divBotones.appendChild(botonReproducir)
        divBotones.appendChild(botonRemover)

        elementoCancion.appendChild(spanNombreCancion)
        elementoCancion.appendChild(divBotones)

        return elementoCancion
    }

    crearListaInformacion(cancion) {
        this.limpiarListaInformacion()
        let elementoNombreCancion = document.getElementById("listaInformacionNombreCancion")
        if (elementoNombreCancion)
            elementoNombreCancion.innerText = "Nombre: " + cancion.nombre

        let elementoNombreAutor = document.getElementById("listaInformacionNombreAutor")
        if (elementoNombreAutor)
            elementoNombreAutor.innerText = "Nombre Artista: " + cancion.autor

        let elementoAnio = document.getElementById("listaInformacionAnio")
        if (elementoAnio)
            elementoAnio.innerText = "Año: " + cancion.anio

        let elementoImagen = document.getElementById("listaInformacionImagen")
        if (elementoImagen)
            elementoImagen.src = "../assets/" + cancion.urlSong + ".png"
    }

    limpiarListaInformacion() {
        let elementoNombreCancion = document.getElementById("listaInformacionNombreCancion")
        if (elementoNombreCancion)
            elementoNombreCancion.innerText = "Nombre: "

        let elementoNombreAutor = document.getElementById("listaInformacionNombreAutor")
        if (elementoNombreAutor)
            elementoNombreAutor.innerText = "Nombre Artista: "

        let elementoAnio = document.getElementById("listaInformacionAnio")
        if (elementoAnio)
            elementoAnio.innerText = "Año: "
    }

    establecerEventosReproductor() {
        this.domReproductorBotonAnterior = document.getElementById("ReproductorBotonAnterior")
        if (this.domReproductorBotonAnterior)
            this.domReproductorBotonAnterior.addEventListener("click", function () {
                reproductor.reproducirAnterior()
            })


        this.domReproductorBotonSiguiente = document.getElementById("ReproductorBotonSiguiente")
        if (this.domReproductorBotonSiguiente)
            this.domReproductorBotonSiguiente.addEventListener("click", function () {
                reproductor.reproducirSiguiente()
            })

        this.domReproductorBotonPausa = document.getElementById("ReproductorBotonPausa")
        if (this.domReproductorBotonPausa) {
            this.domReproductorBotonPausa.addEventListener("click", function () {
                reproductor.pausarReproduccion()
            })
        }
        this.domReproductorBotonReproductor = document.getElementById("ReproductorBotonReproducir")
        if (this.domReproductorBotonReproductor) {
            this.domReproductorBotonReproductor.addEventListener("click", function () {
                reproductor.continuarReproduccion()
            })
        }
    }
}

class Reproductor {
    constructor() {
        this.indiceCancionPorReproducir = 0
        this.herramientas = new herramientaInterfaz(this)
        this.listaCanciones = new PlayList(this.herramientas)
        this.ListaFavoritos = new ListaFavoritos(this.herramientas)
        this.ListaReproductor = new ListaReproductor(this.herramientas)
        this.reproductorDeAudio = new Audio()
        this.reproductorDeAudio.volume = 0.2
        this.reproductorDeAudio.addEventListener("ended", function () {
            reproductor.reproducirSiguiente()
        })
        this.herramientas.establecerEventosReproductor()
    }

    empezarReproduccion() {
        reproductor.reproductorDeAudio.pause()
        this.reproducir()
    }

    reproducir(cancion) {
        if (reproductor.ListaReproductor.listaCanciones.length > 0) {
            if (!cancion) {
                reproductor.indiceCancionPorReproducir = 0
                cancion = reproductor.ListaReproductor.listaCanciones[this.indiceCancionPorReproducir]
            }
            else {
                reproductor.indiceCancionPorReproducir = reproductor.ListaReproductor.listaCanciones.indexOf(cancion)
            }
            if (reproductor.indiceCancionPorReproducir != -1) {
                reproductor.herramientas.crearListaInformacion(cancion)
                let rutaArchivoCancion = "../assets/" + cancion.nombre + ".mp3"
                reproductor.reproductorDeAudio.src = rutaArchivoCancion
                reproductor.reproductorDeAudio.autoplay = true;

            }
        }
    }
    reproducirAnterior(cancion) {
        if (reproductor.ListaReproductor.listaCanciones.length > 0) {
            if (!reproductor.indiceCancionPorReproducir == 0) {
                const cancion = reproductor.ListaReproductor.listaCanciones[reproductor.ListaReproductor.listaCanciones.length - 1]
                reproductor.reproducir(cancion)
            }
            else {
                const cancion = reproductor.ListaReproductor.listaCanciones[reproductor.indiceCancionPorReproducir - 1]
                reproductor.reproducir(cancion)
            }
        }
    }

    reproducirSiguiente() {
        if (reproductor.ListaReproductor.listaCanciones.length > 0) {
            if (reproductor.indiceCancionPorReproducir == reproductor.ListaReproductor.listaCanciones.length - 1) {
                const cancion = reproductor.ListaReproductor.listaCanciones[0]
                reproductor.reproducir(cancion)
            }
            else {
                const cancion = reproductor.ListaReproductor.listaCanciones[reproductor.indiceCancionPorReproducir + 1]
                reproductor.reproducir(cancion)
            }
        }
    }

    pausarReproduccion() {
        reproductor.reproductorDeAudio.pause()
    }

    continuarReproduccion() {
        reproductor.reproductorDeAudio.play()
    }

}

const reproductor = new Reproductor();