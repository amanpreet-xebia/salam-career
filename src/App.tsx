import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContext from './AppContext';
import Footer from './components/Footer';
import Form from './components/Form';
import JobListing from './components/JobListing';
import Navbar from './components/Navbar';
import SuccessfulScreen from './components/SuccessfulScreen';
import { translations } from './constants';
import './App.css';
import ScrollToTop from './ScrollToTop';

function App() {
  const [locale, setLocale] = useState('en');
  const translation: any = translations;

  return (
    <div dir="ltr" className="">
      <Router basename="/recruitment">
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
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<JobListing />} />
            <Route path="/job/:jobId" element={<Form />} />
            <Route path="/success" element={<SuccessfulScreen />} />
          </Routes>
          <Footer />
        </AppContext.Provider>
      </Router>
    </div>
  );
}

export default App;
