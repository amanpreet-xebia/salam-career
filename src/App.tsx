import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContext from './AppContext';
import Footer from './components/Footer';
import Form from './components/Form';
import JobListing from './components/JobListing';
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
            },
            setLocale: setLocale,
          }}
        >
          <Navbar />
          <Routes>
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
