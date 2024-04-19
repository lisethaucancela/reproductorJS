
let playlistData;

window.onload = cargarPlaylist();
  

function cargarPlaylist(){
    fetch('./assets/playlist.json')
      .then(response => response.json())
      .then(data => { 
        playlistData = data; 
      })
      .catch(error => console.error('Error al cargar el archivo JSON:', error));
}

function play(){
  let audio = new audio();
  audio.play();
}

function buscar(){
  let contenedorBusqueda = document.getElementById("busqueda");
}