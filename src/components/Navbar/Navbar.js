import "./Navbar.css";
import Button from "../Button/Button"
import Footer from "../Footer/Footer"
import Orientation from "../Orientation_Filter/Orientation"

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
        <div id="orientation">
        ${Orientation()}
        </div>
        <ul id="image-gallery" class="image-grid"></ul>
        <div class="arrows">
        ${Button("previous", "./arrow-narrow-left.svg")}
        ${Button("next", "./arrow-narrow-right.svg")}
        </div>
    </main>
    ${Footer()}
`

export default Navbar;