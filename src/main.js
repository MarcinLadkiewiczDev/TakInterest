import './style.css'

const ACCESS_KEY = "LZU19IMPHQJS1SlRC0GuDfxpl9YOROvq6BgBk7C0OEg";

//PRIMERO HACEMOS UNA PROMESA PARA CONSEGUIR LOS DATOS DE LA API


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
}




window.addEventListener("DOMContentLoaded", () =>{
  getImages();
});