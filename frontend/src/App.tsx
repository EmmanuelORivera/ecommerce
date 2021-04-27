import React from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header/Header';
import Home from './Pages/Home';
import Product from './Pages/Product';
import { BrowserRouter as Router, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Header />
      <div className='wrapper'>
        <main>
          <Route path='/' component={Home} exact />
          <Route path='/product/:id' component={Product} />
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
