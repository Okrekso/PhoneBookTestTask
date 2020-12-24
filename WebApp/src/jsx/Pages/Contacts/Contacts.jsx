import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../Components/Loading/Loading';
import "./Contacts.scss";
import $ from 'jquery';
import Contact from '../../Components/Contact/Contact';
import { useHistory } from 'react-router-dom';

async function fetchContacts(apiUrl) {
    const url = `${apiUrl}/api/contacts`;
    const response = await fetch(url, { method: "GET", mode: "cors" });
    return await (response).json();
}

function ContactList({ contacts = [] }) {
    const search = useSelector(state => state.search);

    return <div>
        {
            contacts
                .filter(c => `${c.firstName} ${c.secondName} ${c.phone}`.toLowerCase().includes(search.toLowerCase()))
                .map(c => <Contact key={c.contactId} {...c} />)
        }
    </div>
}

export default function Contacts() {
    // const [contacts, setcontacts] = useState([]);
    const contacts = useSelector(state => state.contacts);
    const apiUrl = useSelector(action => action.apiUrl);
    const dispatch = useDispatch();

    useEffect(async () => {
        const fetched = await fetchContacts(apiUrl);
        console.log("updated: ", fetched);
        dispatch({ type: 'UPDATE_CONTACTS', text: fetched });
    }, []);

    useEffect(() => {
        console.log(contacts);
    }, [contacts]);

    return <div id="contacts-page" className="page">
        {
            contacts.length == 0 ?
                <Loading color="black" style={{ margin: "1em" }} />
                :
                <ContactList contacts={contacts} />
        }
    </div>
}