import "./Sidebar.css";
import  Button  from "../Button/Button";

//CREO LA FUNCION QUE PINTARÁ EL SIDEBAR EN LA APP. 

const Sidebar = () => `
    <aside id="sidebar">
        <nav>
            <ul class="sidebar">
                <li><a href="#"><img class="app-logo" src="./letter-t-svgrepo-com.svg" alt"app-logo"/></a></li>
                <li><a href="index.html"><img class="logo" src="./home.svg" alt="Home"/></a></li>
                <li><a href="#"><img class="logo" src="./compass.svg" alt="Explore"/></a></li>
                <li><a href="#"><img class="logo" src="./octagon-plus.svg" alt="Add"/></a></li>
                <li><a href="#"><img class="logo" src="./bell-ringing.svg" alt="Notification"/></a></li>
                <li><a href="#"><img class="logo" src="./message-2.svg" alt="Messages"/></a></li>
            </ul>
            ${Button("settings", "public/settings.svg")}
        </nav>
    </aside>
`;

export default Sidebar;
