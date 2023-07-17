import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { routeConnected, routeNotConnected } from '../../utils/routes'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../redux/store'

const RouterIndex = () => {
    let { connected } = useSelector((state: RootReducerType) => state.user)
    // connected = true

    return (
        <Router>
            <Routes>
                {connected ? routeConnected.map((route, i) => <Route key={i} path={route.path} element={<route.Element />} />) : routeNotConnected.map((route, i) => <Route key={i} path={route.path} element={<route.Element />} />)}
            </Routes>
        </Router>
    )
}

export default RouterIndex