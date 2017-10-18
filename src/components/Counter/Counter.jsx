import React from 'react'
import PropTypes from 'prop-types'

const Counter = ({
    value,
    getData,
    onIncrement,
    onDecrement,
    onIncrementAsync,
    onDecrementAsync
}) => (
    <div>
        <h1>{ value }</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrementAsync}>async +</button>
        <button onClick={onDecrementAsync}>saync -</button>
        <button onClick={getData}>获取列表</button>
    </div>
)

Counter.propTypes = {
    value: PropTypes.number,
    getData: PropTypes.func,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func,
    onIncrementAsync: PropTypes.func,
    onDecrementAsync: PropTypes.func
}

export default Counter