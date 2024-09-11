import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ContactForm = () => {
  const [contact, setContact] = useState({ name: '', email: '', phone: '' , note:''});
  const { id } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    window.location.href = '/login';
  };

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/contacts/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => setContact(response.data))
      .catch(error => console.error('There was an error fetching the contact!', error));
    }
  }, [id]);
  

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:3000/api/contacts/${id}`, JSON.stringify(contact), {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json'
        }
      })
        .then(() => navigate('/contact'))
        .catch(error => console.error('There was an error updating the contact!', error));
    } else {
        axios.post("http://localhost:3000/api/contacts", JSON.stringify(contact), {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            'Content-Type': 'application/json'
          },
        })        
        .then(() => navigate('/contact'))
        .catch(error => console.error('There was an error creating the contact!', error));
    }

  };

  return (
    <div>
      <h1>{id ? 'Edit Contact' : 'Create Contact'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={contact.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={contact.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" name="phone" value={contact.phone} onChange={handleChange} required />
        </div>
        <div>
          <label>Notes:</label>
          <input type="text" name="note" value={contact.note} onChange={handleChange} />
        </div>
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
      <div><button onClick={handleLogout}>Logout</button></div>
    </div>
  );
}

export default ContactForm;
