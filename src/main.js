import './style.css';
import Sidebar from "./components/Sidebar/Sidebar.js"
import Navbar from "./components/Navbar/Navbar.js"

const ACCESS_KEY = "LZU19IMPHQJS1SlRC0GuDfxpl9YOROvq6BgBk7C0OEg";
const app = document.getElementById('app');
const searchBtn = document.getElementById('Buscar');
const searchInput = document.getElementById('search-input');

app.innerHTML = `${Sidebar()}
${Navbar()}
`


//HACEMOS LA FUNCION CON LA PROMESA CON COGERÁ LAS FOTOS DE LA API.


const getImages = async () => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=cat&page=1&per_page=20`
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
  const gallery = document.getElementById("image-gallery");
  images.forEach(image => {
    const li = document.createElement('li');
    li.innerHTML = `
    <a href="${image.raw_image}" target="_blank" rel="noopener noreferrer">
    <img src="${image.image}" alt="${image.alt}"/>
    </a>
    `;
    gallery.appendChild(li);
  });
}



window.addEventListener("DOMContentLoaded", () =>{
  getImages();
});