import logoimage from "../assets/images/BrainFlix-logo.svg";
import avatar from "../assets/images/Mohan-muruge.jpg";
import "./component.scss"
import { Link, useParams } from 'react-router-dom';

function Header({ logo }) {
    return (
        <header className="header__component">
            <div>

                <Link to="/">
                    <img src={logoimage} className="logo"></img>
                </Link>

            </div>

            <div className="header__row">
                <input className="search__icon" type="text" placeholder="Search" />
                <Link to="/upload">
                    <button className="upload__button">UPLOAD</button>
                </Link>
                <img src={avatar} className="avatar"></img>
            </div>

        </header>
    );
}

export default Header;




