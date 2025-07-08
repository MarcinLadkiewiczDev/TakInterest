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
const previousPage = document.getElementById("previous");
const nextPage = document.getElementById("next");
const landscape = document.getElementById("landscape");
const portrait = document.getElementById("portrait");
const squarish = document.getElementById("squarish");

//HACEMOS LA FUNCION CON LA PROMESA CON COGERÁ LAS FOTOS DE LA API.
//almacenamos la palabra de la busqueda y la página para poder hacer la función de cambio de pagina. 

let currentKeyword = "";
let currentPage = 1;

const getImages = async (keyword, page) => {

  currentKeyword = keyword;
  currentPage = page;
  let url = `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=${keyword}&page=${page}&per_page=20`;
  if(landscape.checked){url += `&orientation=landscape`}
  if(portrait.checked){url+=`&orientation=portrait`}
  if(squarish.checked){url+=`&orientation=squarish`}
  const res = await fetch(url);
  const data = await res.json();
  mapImages(data.results);
}


//FUNCION PARA MAPEAR LOS RESULTADOS DEL FETCH Y QUEDARNOS CON LO QUE NOS INTERESA 

const mapImages = (images) =>{
  const mappedImages = images.map((image)=>({
    alt: image.alt_description,
    image: image.urls.regular,
    raw_image: image.urls.raw
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
  getImages(searchInput.value, 1);
});

searchInput.addEventListener('keydown', (ev) =>{
  if(ev.key === 'Enter'){
    ev.preventDefault();
    searchBtn.click();
  }
})

//FUNCION PARA CAMBIO DE PAGINA Y AÑADO EL CURRENT PAGE ENTRE AMBOS BOTONES. 
nextPage.addEventListener('click', () =>{
  getImages(currentKeyword, currentPage + 1);
  //esté código lo que hará será que la pagina vuelva hacia arriba para evitar tener que hacer scroll manualmente tras darle al botón. 
  window.scrollTo({
    top:0,
    behavior:'smooth'
  })
  paintCurrentPage(currentPage);
})

previousPage.addEventListener('click', () => {
  if(currentPage != 1){
    getImages(currentKeyword, currentPage - 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    paintCurrentPage(currentPage);
  }

})

//RECUPERO EL CONTENEDOR DE LAS FLECHAS. 
//AÑADO UN NUEVO ELEMENTO QUE ME MARCARÁ LA PAGINA ENTRE AMBAS FLECHAS DE CAMBIO DE PÁGINA. 
const arrowContainer = document.querySelector(".arrows");
const pageNumber = document.createElement("span");
pageNumber.textContent = currentPage;
arrowContainer.insertBefore(pageNumber, nextPage);

//CREO LA FUNCIÓN PARA QUE CAMBIE EL TEXTCONTENT DEL SPAN CON EL NÚMERO DE PAGINA.
const paintCurrentPage = (currentPage) => {
  pageNumber.textContent = '';
  pageNumber.textContent = currentPage;
}

//EVENTOS PARA FILTROS DE IMAGEN

landscape.addEventListener("change", () => {
  if (landscape.checked) {
    portrait.checked = false;
    squarish.checked = false;
  }
  getImages(currentKeyword, currentPage);
});
portrait.addEventListener("change", () => {
  if (portrait.checked) {
    landscape.checked = false;
    squarish.checked = false;
  }
  getImages(currentKeyword, currentPage);
});
squarish.addEventListener("change", () => {
  if (squarish.checked) {
    landscape.checked = false;
    portrait.checked = false;
  }
  getImages(currentKeyword, currentPage);
});



window.addEventListener('DOMContentLoaded', () =>{
  getImages("cat", 1);
});