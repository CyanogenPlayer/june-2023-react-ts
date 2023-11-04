import React from 'react';

import css from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className={css.Header}>
            <NavLink to={'home'}>home</NavLink>
            <NavLink to={'cars'}>cars</NavLink>
        </div>
    );
};

export default Header;