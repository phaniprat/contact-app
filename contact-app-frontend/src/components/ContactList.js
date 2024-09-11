import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './contactList.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    window.location.href = '/login';
  };

  useEffect(() => {
    axios.get('http://localhost:3000/api/contacts', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
    .then(response => setContacts(response.data))
    .catch(error => console.error('There was an error fetching the contacts!', error));
  }, []);

  const handleSort = () => {
    axios.get('http://localhost:3000/api/contacts/sort', { 
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
    .then(response => setContacts(response.data))
    .catch(error => console.error('There was an error fetching the contacts!', error));
  };

  const handleFavorite = (contactId) => {
    axios.patch(`http://localhost:3000/api/contacts/${contactId}`, {
      isFavorite: true
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
    .then(() => {
   console.log("Added to Favourite...")
    })
    .catch(error => console.error('There was an error updating the favorite status!', error));
  };

  return (
    <div>
      <h1>Contact List</h1>
      <Link to="/create">Create New Contact</Link>
      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>
            <Link to={`/contact/${contact._id}`}>{contact.name}</Link>
            <br />

              <button 
                 onClick={ ()=>handleFavorite(contact._id)} 
              > Add  Favorite</button>

            <br />
            <br />
          </li>
        ))}
      </ul>

      <button onClick={handleSort}>Sort</button>
      <br/>
      <button>
        <Link to="/contact/recent">Recents</Link>
      </button>
      <br/>
      <button>
        <Link to="/contact/fav">View Fav</Link>
      </button>
      <div><button onClick={handleLogout}>Logout</button></div>
    </div>
  );
};

export default ContactList;
