import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContactDetails = () => {
  const [contact, setContact] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    window.location.href = '/login';
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/api/contacts/${id}`, {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
  })
      .then(response => setContact(response.data))
      .catch(error => console.error('There was an error fetching the contact!', error));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/api/contacts/${id}`, {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
  })
      .then(() => navigate('/contact'))
      .catch(error => console.error('There was an error deleting the contact!', error));
  };

  

  if (!contact) return <div>Loading...</div>;

  return (
    <div>
      <h1>{contact.name}</h1>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <p>Note: {contact.note}</p>
      <button><Link to={`/edit/${contact._id}`}>Edit</Link></button>
      <button onClick={handleDelete}>Delete</button>
      <div>
        <button>
        <Link to='/contact' >back</Link>
        </button>
        </div>

        <div><button onClick={handleLogout}>Logout</button></div>
    </div>
  );
}

export default ContactDetails;
