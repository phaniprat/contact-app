import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ContactDetails from './components/ContactDetails';
import ContactRecent from './components/contactRecent';
import ContactFav from './components/ContactFav';
import SignupForm from './components/Signup';
import LoginForm from './components/login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/contact" element={<ContactList />} />
          <Route path="/contact/recent" element={<ContactRecent />} />
          <Route path="/contact/fav" element={<ContactFav />} />
          <Route path="/" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create" element={<ContactForm />} />
          <Route path="/edit/:id" element={<ContactForm />} />
          <Route path="/contact/:id" element={<ContactDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
