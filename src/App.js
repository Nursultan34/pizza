import React from 'react';

import Home from './pages/Home';
import Header from './components/Header';
import {
  Routes,
  Route,
} from "react-router-dom";
import './scss/app.scss';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart'
import { useSelector, useDispatch } from 'react-redux'
import { decrement,increment } from './redux/Slice/filterSlice';


export const SearchContext = React.createContext()


function App() {
  
  const [searchValue,setSearchValue] = React.useState('')
  
  return (
    <div className="wrapper">
      
      <SearchContext.Provider value={{ searchValue,setSearchValue }}>
              <Header />
      <div className="content">
        <div className="container">
         <Routes>
           <Route path='/' element={<Home searchValue={searchValue} setSearchValue={setSearchValue} />}/>
           <Route path='*' element={<NotFound/>}/>
           <Route path='cart' element={<Cart/>}/>
         </Routes>
        </div>
      </div>
      </SearchContext.Provider>
    </div>
   
  );
}

export default App;
