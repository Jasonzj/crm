import React from 'react'
import PropTypes from 'prop-types'

// component
import Header from 'components/Header'

// style
import './style.scss'

const HomeContainer = ({ children }) => (
    <div>
        <Header />
        <main className="main">
            { children }
        </main>
    </div>
)

HomeContainer.propTypes = {
    children: PropTypes.any
}

export default HomeContainer