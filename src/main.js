import './style.css';
import Sidebar from './components/Sidebar/Sidebar.js'
import Navbar from './components/Navbar/Navbar.js'

const ACCESS_KEY = 'LZU19IMPHQJS1SlRC0GuDfxpl9YOROvq6BgBk7C0OEg';
const app = document.getElementById('app');
app.innerHTML = `${Sidebar()}
${Navbar()}
`
const searchBtn = document.getElementById("Buscar");
const searchInput = document.getElementById("search-input");

//HACEMOS LA FUNCION CON LA PROMESA CON COGERÁ LAS FOTOS DE LA API.


const getImages = async (keyword) => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=${keyword}&page=1&per_page=20`
  );
  const data = await res.json();
  mapImages(data.results);
}

//FUNCION PARA MAPEAR LOS RESULTADOS DEL FETCH Y QUEDARNOS CON LO QUE NOS INTERESA 

const mapImages = (images) =>{
  const mappedImages = images.map((image)=>({
    alt: image.alt_description,
    image: image.urls.regular,
    raw_image: image.urls.raw,
    color: image.color
  }))
  printImages(mappedImages);
}

//CREAMOS LA FUNCIÓN QUE PINTARÁ LAS FOTOS EN LA APP. 

const printImages = (images) => {
  const gallery = document.getElementById('image-gallery');
  gallery.innerHTML = '';
  images.forEach(image => {
    const li = document.createElement('li');
    li.innerHTML = `
    <a href='${image.raw_image}' target='_blank' rel='noopener noreferrer'>
    <img src='${image.image}' alt='${image.alt}'/>
    </a>
    `;
    gallery.appendChild(li);
  });
}

//AÑADO EL EVENTO QUE ESCUCHA EL CLICK DEL BOTON BUSCAR CON EL VALOR DEL IMPUT.

searchBtn.addEventListener('click', () =>{
  getImages(searchInput.value);
});


window.addEventListener('DOMContentLoaded', () =>{
  getImages("cat");
});