import React from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header/Header';

function App() {
  return (
    <>
      <Header />
      <div className='wrapper'>
        <main>
          <h1>Welcome to ecommerce</h1>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
