import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loading from '../Loading/Loading';
import "./Contact.scss";

export default function Contact({ contactId, firstName, secondName, avatar, phone }) {
    const contacts = useSelector(state => state.contacts);
    const dispatch = useDispatch();

    const history = useHistory();

    const [encodedAvatar, setencodedAvatar] = useState(`data:image/png;base64,${avatar}`);
    const [state, setstate] = useState("");
    const apiUrl = useSelector(action => action.apiUrl);

    async function erase() {
        const url = `${apiUrl}/api/contacts/${contactId}`;
        // Unsafety code! Probably token should be provided
        setstate("pending");
        const response = await fetch(url, { method: "DELETE", mode: "cors" });
        console.log(response);
        if (response.ok)
            setstate("deleting");
        setTimeout(() => {
            const updatedContacts = contacts.filter(c => c.contactId != contactId);
            console.log(updatedContacts);
            dispatch({ type: 'UPDATE_CONTACTS', text: updatedContacts });
        }, 1000);
        return response.ok;
    }

    function update() {

    }

    return <div className={`contact ${state}`}>
        <img src={encodedAvatar} />
        <div className="textes">
            <h3>{firstName} {secondName}</h3>
            <h5><span>Primary Phone:</span> <span className="number">{phone}</span></h5>
            {
                state != "" ?
                    <Loading color="black" style={{ alignSelf: "flex-start" }} />
                    :
                    <>
                        <button className="delete-button" onClick={erase}>Delete</button>
                        <button className="update-button" onClick={() => history.push(`/Update/${contactId}`)}>Update</button>
                    </>
            }
        </div>
    </div>
}