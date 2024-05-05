import styles from './Styles/navbar.module.css'

import { NavLink } from 'react-router-dom';

export const NavBar = () => {
    const navLink = ({ isActive }) => isActive ? styles.active : styles.navItem

    return (
        <div className={styles.navBar}>
            <nav>
                <div className={styles.navItems}>
                    <NavLink to="/chats" className={navLink}>
                        Chats
                    </NavLink>

                    <NavLink to="/me" className={navLink}>
                        Profile
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};