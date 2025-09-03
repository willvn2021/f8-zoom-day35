import { NavLink } from "react-router";
import styles from "./Navigation.module.scss";
import clsx from "clsx";

const navItems = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Counter",
        path: "/Counter",
    },
    {
        name: "Todo",
        path: "/Todo",
    },
    {
        name: "Profile",
        path: "/Profile",
    },
    {
        name: "Products",
        path: "/Products",
    },
    {
        name: "Comments",
        path: "/Comments",
    },
    {
        name: "Weather",
        path: "/Weather",
    },
    {
        name: "Buttons",
        path: "/Buttons",
    },
];

function Navigation() {
    return (
        <nav className={styles.navigation}>
            <ul className={styles.navList}>
                {navItems.map((item, index) => (
                    <li key={index} className={styles.navItem}>
                        <NavLink
                            className={({ isActive }) =>
                                clsx(styles.navLink, {
                                    [styles.active]: isActive,
                                })
                            }
                            to={item.path}
                            end={item.path === "/"}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navigation;
