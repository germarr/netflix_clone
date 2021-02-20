import React, {useState, useEffect} from 'react'
import "./Navbar.css"

function Navbar() {
    const [show, handleShow] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll", ()=> {
            if (window.scrollY > 100){
                handleShow(true);
            } else handleShow(false)
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img className="nav__logo" 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png" 
            alt="Netflix Logo"/>

            <img src="https://image.flaticon.com/icons/png/512/168/168723.png" 
            alt="Netflix Avatar" 
            className="nav__avatar"/>
        </div>
    )
}

export default Navbar
