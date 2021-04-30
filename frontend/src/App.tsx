import React from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header/Header';
import Home from './Pages/Home';
import Product from './Pages/Product';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from './Components/Helper/ScrollToTop';
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <div className='wrapper'>
        <main>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/product/:id' component={Product} />
          </Switch>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
