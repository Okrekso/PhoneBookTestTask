import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "./Update.scss";

export default function Update() {
    const { id } = useParams();
    const apiUrl = useSelector(action => action.apiUrl);
    async function fetchInfo() {
        const url = `${apiUrl}/api/contacts/${id}`;
        const response = await fetch(url, { method: "GET", mode: "cors" });
        return await (response).json();
    }

    async function sendUpdate() {
        setstate("updating");
        const url = `${apiUrl}/api/contacts/${id}`;
        const body = {
            contactId: Number(id),
            firstName: eFirstName,
            secondName: eSecondName,
            phone: ePhone,
            avatar: defaultAvatar,
        };
        console.log(body);
        const response = await fetch(url, {
            method: "PUT", mode: "cors", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
        });
        console.log(response);
        setstate("success");
        setTimeout(() => {
            setstate("");
        }, 2500);
        return response.ok;
    }

    const [state, setstate] = useState("loading");
    const [encodedAvatar, setencodedAvatar] = useState("");
    const [eFirstName, seteFirstName] = useState("");
    const [eSecondName, seteSecondName] = useState("");
    const [ePhone, setePhone] = useState("");
    const [eAvatar, seteAvatar] = useState("");
    const [defaultAvatar, setdefaultAvatar] = useState("");

    useEffect(async () => {
        const { firstName, secondName, phone, avatar } = await fetchInfo();
        setencodedAvatar(`data:image/png;base64,${avatar}`);
        seteFirstName(firstName);
        seteSecondName(secondName);
        setePhone(phone);
        setdefaultAvatar(avatar);
        setstate("");
    }, []);

    function getButtonTitle() {
        if (state == "updating") return "Updating...";
        if (state == "lading") return "Loading...";
        if (state == "success") return "Success!";
        return "Update";
    }

    return <div id="update-page">
        <img src={encodedAvatar}></img>
        <input value={eFirstName} disabled={state == "loading"} onChange={e => seteFirstName(e.target.value)} placeholder="First Name" />
        <input value={eSecondName} disabled={state == "loading"} onChange={e => seteSecondName(e.target.value)} placeholder="Second Name" />
        <input value={ePhone} disabled={state == "loading"} onChange={e => setePhone(e.target.value)} placeholder="Phone" />
        {/* <input value={eAvatar} disabled={state == "loading"} onChange={e => seteAvatar(e.target.value)} placeholder="New avatar url" /> */}
        <button onClick={sendUpdate} disabled={state != ""} >{getButtonTitle()}</button>
    </div>
}