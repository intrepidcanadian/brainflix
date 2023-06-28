import logoimage from "../../assets/images/BrainFlix-logo.svg";
import avatar from "../../assets/images/Mohan-muruge.jpg";
import "./Header.scss"


function Header({ logo }) {
    return (
        <header className="header__component">
            <div>
            <img src={logoimage} className = "logo"></img>
            </div>
            <div className = "header__row">
                <input className="search__icon" type="text" placeholder="Search" />

            </div>

            <div className = "header__row">
                <button className ="upload__button">UPLOAD</button>
                <img src = {avatar} className = "avatar"></img>
            </div>

        </header>
    );
}

export default Header;


