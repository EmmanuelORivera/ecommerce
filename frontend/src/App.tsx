import React from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header/Header';
import Home from './Pages/Home';

function App() {
  return (
    <>
      <Header />
      <div className='wrapper'>
        <main>
          <Home />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
