import "./Navbar.css";
import Button from "../Button/Button"
import Footer from "../Footer/Footer"
import Orientation from "../Orientation_Filter/Orientation"

//CREAMOS LA FUNCION QUE PINTARÁ LA BARRA DE BUSQUEDA EN LA APP.  

const Navbar = () => `
    <header id="navbar">
    <div id="wrapper">
        <a href="#"><img id="app-logo" src="./letter-t-svgrepo-com.svg" alt"app-logo"/></a>
        <div class="input-wrapper">
            <img src="./search.svg"/>
            <input id="search-input" type="text" placeholder="Que imagenes quieres..."/>
            ${Button("Buscar")}
        </div>
        <div class="user-wrapper">
            ${Button("user", "./user.svg")}
            ${Button("options", "./caret-down.svg")}
        </div>
    </div>
        <div id="sidebar-responsive">
            <nav class="nav-responsive">
                <ul class="ul-responsive">
                    <li><a href="index.html"><img class="logo" src="./home.svg" alt="Home"/></a></li>
                    <li><a href="#"><img class="logo" src="./compass.svg" alt="Explore"/></a></li>
                    <li><a href="#"><img class="logo" src="./octagon-plus.svg" alt="Add"/></a></li>
                    <li><a href="#"><img class="logo" src="./bell-ringing.svg" alt="Notification"/></a></li>
                    <li><a href="#"><img class="logo" src="./message-2.svg" alt="Messages"/></a></li>
                </ul>
            </nav>
        </div>
    </header>
    <main>
        ${Orientation()}
        <ul id="image-gallery" class="image-grid"></ul>
        <div class="arrows">
        ${Button("previous", "./arrow-narrow-left.svg")}
        ${Button("next", "./arrow-narrow-right.svg")}
        </div>
    </main>
    ${Footer()}
`;

export default Navbar;