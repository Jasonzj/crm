import React from 'react'
import { Link } from 'react-router-dom'

// scss
import './style.scss'

const Header = () => (
    <header className="header">
        <span className="header__logo">?</span>
        <Link to="/">
            <h1 className="header__title">React</h1>
        </Link>
        <h2 className="header__title-s">starter</h2>
    </header>
)

export default Header