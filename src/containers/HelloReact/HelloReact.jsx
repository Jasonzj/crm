import React from 'react'
import { Link } from 'react-router-dom'

const HelloReact = () => (
    <div>
        <h1>React starter!</h1>
        <Link to="/">
            <button>jump index</button>
        </Link>
    </div>
)

export default HelloReact