import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContext from './AppContext';
import Footer from './components/Footer';
import Form from './components/Form';
import JobListing from './components/JobListing';
// import Header from './components/Header';
import Navbar from './components/Navbar';
import { translations } from './constants';
function App() {
  const [locale, setLocale] = useState('en');
  const translation: any = translations;

  return (
    <div dir={locale === 'en' ? 'ltr' : 'rtl'} className="App">
      <Router>
        <AppContext.Provider
          value={{
            state: {
              languages: translation[locale],
              locale: locale,
              // user: JSON.parse(sessionStorage.getItem('UserData')) || {},
            },
            setLocale: setLocale,
            // setUser: setUser,
          }}
        >
          <Navbar />
          {/* <Header /> */}
          <Routes>
            {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route> */}
            <Route path="/" element={<JobListing />} />
            <Route path="/form" element={<Form />} />
          </Routes>
          <Footer />
        </AppContext.Provider>
      </Router>
    </div>
  );
}

export default App;
