import { useNavigate } from "react-router-dom";
import React, { useState, useRef, createContext } from "react";
import styles from './MainLayout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export const ActiveButtonContext = createContext();

export const MainLayout = (props) => {
    const [activeButton, setActiveButton] = useState();
    const navigate = useNavigate();

    const goToUsers = () => {
        navigate('/users');
    }

    const goToApendix = () => {
        navigate('/apendix')
    }

    const goToMedia = () => {
        navigate('/media');
    }

    const goToSvg = () => {
        navigate('/svg');
    }

    const goToTodos = () => {
        navigate('/todos');
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
        <div className={styles.main_content}>
            <div className={styles.fixed_nav_div}>
                <div ref={navigationDiv} className={styles.navigation_div}>
                    <button onClick={goToUsers} className={activeButton === 'users'? styles.active_button : styles.nav_button}><FontAwesomeIcon icon="users"/> Users</button>
                    <button onClick={goToApendix} className={activeButton === 'apendix'? styles.active_button : styles.nav_button}><FontAwesomeIcon icon="paperclip"/> Apendix</button>
                    <button onClick={goToMedia} className={activeButton === 'media'? styles.active_button : styles.nav_button}><FontAwesomeIcon icon='photo-video'/> Media</button>
                    <button onClick={goToSvg} className={activeButton === 'svg'? styles.active_button : styles.nav_button}><FontAwesomeIcon icon="bezier-curve"/> SVG</button>
                    <button onClick={goToTodos} className={activeButton === 'todos'? styles.active_button : styles.nav_button}><FontAwesomeIcon icon="clipboard-check"/> Todos</button>
                    <div className={styles.search_container}>
                        <form>
                            <input type="text" placeholder="Search..." name="search"></input>
                            <button type="submit" className={styles.search_button}><FontAwesomeIcon icon="search"></FontAwesomeIcon></button>
                        </form>
                    </div>
                    <button className={styles.icon} onClick={showVerticalNav}><FontAwesomeIcon  icon={faBars} /></button>
                </div>
            </div>
            
            <div className={styles.children}>
                <ActiveButtonContext.Provider value={setActiveButton}>
                    {props.children}
                </ActiveButtonContext.Provider>   
            </div>
        </div>
        
    )
}