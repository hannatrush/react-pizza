import React, {useState, useEffect} from 'react';

import Header from './scss/components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import {BrowserRouter, Routes, Route,} from "react-router-dom";


import './scss/app.scss';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');
 
  return (
     <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header />
        <div className="content">
          <div className="container">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart.html' element={<Cart/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
