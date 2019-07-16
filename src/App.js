import React from 'react';
import Footer from './components/footer';
import Header from './components/header';
import Dashboard from './components/dashboard';
import Body from './container/body';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Dashboard />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
