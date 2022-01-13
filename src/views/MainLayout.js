import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import styles from './MainLayout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'



export const MainLayout = (props) => {

    const [activeButton, setActiveButton] = useState('users')

    const navigate = useNavigate();

    const goToUsers = () => {
        navigate('/users');
        setActiveButton('users');
    }

    const goToApendix = () => {
        navigate('/apendix')
        setActiveButton('apendix');
    }

    const goToMedia = () => {
        navigate('/media');
        setActiveButton('media');
    }

    const goToSvg = () => {
        navigate('/svg');
        setActiveButton('svg');
    }

    const navigationDiv = useRef()

    const showVerticalNav = () => {
        const element = navigationDiv.current
        if(element.className === styles.navigation_div) {
            element.className = styles.navigation_div_responsive
        } else {
            element.className = styles.navigation_div
        }
    }

    return (
        <div>
            <div ref={navigationDiv} className={styles.navigation_div}>
                <button onClick={goToUsers} className={activeButton === 'users'? styles.active_button : styles.nav_button}>Users</button>
                <button onClick={goToApendix} className={activeButton === 'apendix'? styles.active_button : styles.nav_button}>Apendix</button>
                <button onClick={goToMedia} className={activeButton === 'media'? styles.active_button : styles.nav_button}>Media</button>
                <button onClick={goToSvg}className={activeButton === 'svg'? styles.active_button : styles.nav_button}>SVG</button>
                <button className={styles.icon} onClick={showVerticalNav}><FontAwesomeIcon  icon={faBars} /></button>
            </div>
            <div>
                {props.children}
            </div>
        </div>
        
    )
}