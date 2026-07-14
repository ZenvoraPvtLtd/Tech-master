import React, { useState, useEffect } from 'react';
import * as contactServices from '../../Services/contactServices.js';

export default function ContactPage() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        contactServices.getContacts().then(res => {
            if (res.success) setContacts(res.data);
        });
    }, []);

    return (
        <div>
            <h1>Contact Page</h1>
            {contacts.map(c => <div key={c._id}>{c.name || 'Unnamed'}</div>)}
        </div>
    );
}
