import "./Navbar.css";
import Button from "../Button/Button"

//CREAMOS LA FUNCION QUE PINTARÁ LA BARRA DE BUSQUEDA EN LA APP.  

const Navbar = () => `
<header id="navbar">
    <div class="input-wrapper">
        <img src="./search.svg"/>
        <input id="search-input" type="text" placeholder="Que imagenes quieres..."/>
        ${Button("Buscar")}
    </div>
    <div class="user-wrapper">
        ${Button("user", "./user.svg")}
        ${Button("options", "./caret-down.svg")}
    </div>
</header>
<main>
    <ul id="image-gallery" class="image-grid"></ul>
</main>
`

export default Navbar;