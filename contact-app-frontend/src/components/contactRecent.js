import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecentContacts = () => {
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/api/contacts/recent', {
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

  if (loading) {
    return <div>Loading recent contacts...</div>;
  }

  return (
    <div>
      <h1>Recent Contacts</h1>
      {recentContacts.length === 0 ? (
        <p>No recent contacts available.</p>
      ) : (
        <ul>
          {recentContacts.map((contact) => (
            <li key={contact.id}>
              <strong>{contact.name}</strong> - {contact.email}
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentContacts;
