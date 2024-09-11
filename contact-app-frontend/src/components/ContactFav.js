import React, { useState, useEffect } from 'react';
import axios from 'axios';


const FavContacts = () => {
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    axios.get('http://localhost:3000/api/contacts/fav', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
    })
      .then((response) => {
        setRecentContacts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recent contacts:', error);
        setLoading(false);
      });
  }, []);

  const handleRemoveFavorite = (contactId) => {
    axios.patch(`http://localhost:3000/api/contacts/${contactId}`, {
      isFavorite: false
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    })
    .then((response) => {
      setRecentContacts((prevContacts) => {

        return prevContacts.filter((contact) => {
          return contact._id !== response.data._id;
        });
      });
      
      
    })
    .catch(error => console.error('There was an error updating the favorite status!', error));
  };
  


  if (loading) {
    return <div>Loading recent contacts...</div>;
  }

  return (
    <div>
      <h1>Favorite Contacts</h1>
      {recentContacts.length === 0 ? (
        <p>No recent contacts available.</p>
      ) : (
        <ul>
          {recentContacts.map((contact) => (
            <li key={contact.id} >
              <strong>{contact.name}</strong> - {contact.email}
              <br />
              <button 
                 onClick={ ()=>handleRemoveFavorite(contact._id)} 
              > Remove  Favorite</button>
              <br />

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavContacts;
