import React from 'react';
import Home from './pages/Home';
import "./styles.css"
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';



const App = ()=>{
    return(
        <Home/>
    )
}

export default App