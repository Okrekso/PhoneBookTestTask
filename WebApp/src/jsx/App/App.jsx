import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch, createStoreHook, Provider } from 'react-redux';
import { createStore } from 'redux';

import Header from '../Components/Header/Header'
import About from '../Pages/About/About'
import Contacts from '../Pages/Contacts/Contacts'
import Home from '../Pages/Home/Home'

import "./App.scss";
import Update from '../Pages/Update/Update';

function storage(state = { search: "", apiUrl: "https://localhost:44340", contacts:[] }, action) {
    switch (action.type) {
        case 'UPDATE_SEARCH': state.search = action.text; break;
        case 'UPDATE_CONTACTS': state.contacts = action.text; break;
    }
    return state;
}
const searchStore = createStore(storage);

export function App() {
    return <Provider store={searchStore}>
        <Router>
            <Header />
            <Route exact path={["/", "/Home"]} component={Home}></Route>
            <Route path="/Contacts" component={Contacts}></Route>
            <Route path="/About" component={About}></Route>
            <Route path="/Update/:id" component={Update}></Route>
        </Router>
    </Provider>
}

export default function Render(to) {
    ReactDOM.render(<App />, to);
}