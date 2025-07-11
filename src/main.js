import './style.css';
import Sidebar from './components/Sidebar/Sidebar.js'
import Navbar from './components/Navbar/Navbar.js'
import Button from './components/Button/Button.js'

const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;
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
  try{
    const res = await fetch(url);
    const data = await res.json();
    mapImages(data.results);
  } catch (error) {
    printButtons(searchButtons);
  }
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
    if(searchInput.value === ""){
      const main = document.querySelector('main');
      const title = document.querySelector('h2');
      main.removeChild(title);
    }
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

//FUNCIÓN QUE PINTARÁ BOTONES EN CASO DE CATCH EN LA PROMESA 
//siento el jaleo pero improvisar es malo... Si ves que necesito ordenar todo mejor dimelo y lo intento! 

const searchButtons = ["NewYork", "Coches", "Animales"];

const printButtons = (filters) => {
  const gallery = document.getElementById('image-gallery');
  const orientation = document.getElementById('orientation');
  const arrows = document.querySelector('.arrows');
  const main = document.querySelector('main');
  const title = document.createElement('h2');
  gallery.innerHTML = "";
  title.textContent = "Busqueda fallida, prueba con alguna de estas sugerencias...";
  main.insertBefore(title, gallery);
  arrows.style.display = "none";
  orientation.style.display = "none";
  gallery.classList.replace("image-grid", "Buttons");
  filters.forEach((filter) => {
    const li = document.createElement('li');
    li.innerHTML = Button(filter, null, "filterButton");
    gallery.appendChild(li);
  })
  addButtonListeners();
};

//CREO LA FUNCION QUE AÑADIRÁ LOS LISTENERS A LOS BOTONES EN CASO DE QUE SALTE EL CATCH, SI LOS PONGO ANTES DA ERROR YA QUE LOS BOTONES NO ESTÁN CREADOS EN EL DOM. 

const addButtonListeners = () =>{
  const btnNewyork = document.getElementById("NewYork");
  const btnCoches = document.getElementById("Coches");
  const btnAnimales = document.getElementById("Animales");

  if (btnNewyork) {
    btnNewyork.addEventListener("click", () => {
      getImages("New York", 1);
      const title = document.querySelector("h2");
      const arrows = document.querySelector(".arrows");
      const orientation = document.getElementById("orientation");
      const gallery = document.getElementById("image-gallery");
      const main = document.querySelector("main");
      gallery.classList.replace("Buttons", "image-grid");
      main.removeChild(title);
      arrows.style.display = "flex";
      orientation.style.display = "flex";
    });
  }
  if (btnCoches) {
    btnCoches.addEventListener("click", () => {
      getImages("Coches", 1);
      const title = document.querySelector("h2");
      const arrows = document.querySelector(".arrows");
      const orientation = document.getElementById("orientation");
      const gallery = document.getElementById("image-gallery");
      const main = document.querySelector("main");
      gallery.classList.replace("Buttons", "image-grid");
      main.removeChild(title);
      arrows.style.display = "flex";
      orientation.style.display = "flex";
    });
  }
  if (btnAnimales) {
    btnAnimales.addEventListener("click", () => {
      getImages("Animales", 1);
      const title = document.querySelector("h2");
      const arrows = document.querySelector(".arrows");
      const orientation = document.getElementById("orientation");
      const gallery = document.getElementById("image-gallery");
      const main = document.querySelector("main");
      gallery.classList.replace("Buttons", "image-grid");
      main.removeChild(title);
      arrows.style.display = "flex";
      orientation.style.display = "flex";
    });
  }
}



//---------------------------------------------

window.addEventListener('DOMContentLoaded', () =>{
  getImages("cat", 1);
});