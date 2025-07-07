import "./Sidebar.css";
import  Button  from "../Button/Button";

//CREO LA FUNCION QUE PINTARÁ EL SIDEBAR EN LA APP. 

const Sidebar = () => `
    <aside id="sidebar">
        <nav>
            <ul class="sidebar">
                <li><a href="index.html"><img class="app-logo" src="./letter-t-svgrepo-com.svg"/></a></li>
                <li><a href="#"><img class="logo" src="./home.svg"/></a></li>
                <li><a href="#"><img class="logo" src="./compass.svg"/></a></li>
                <li><a href="#"><img class="logo" src="./octagon-plus.svg"/></a></li>
                <li><a href="#"><img class="logo" src="./bell-ringing.svg"/></a></li>
                <li><a href="#"><img class="logo" src="./message-2.svg"/></a></li>
            </ul>
            ${Button("settings", "public/settings.svg")}
        </nav>
    </aside>
`;

export default Sidebar;
