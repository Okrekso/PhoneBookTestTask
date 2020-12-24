import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "./Header.scss";

export default function Header() {
    const [search, setsearch] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "UPDATE_SEARCH", text: search });
    }, [search]);

    return <header>
        <Link to="/">Home</Link>
        <Link to="/Contacts">Contacts</Link>
        <Link to="/About">About</Link>
        <div id="search">
            <img src="../../../img/search.png" />
            <input type="text" value={search} onChange={e => setsearch(e.target.value)}></input>
        </div>
    </header >
}