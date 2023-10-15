import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Header from './component/header';
import Home from "./pages/Home";
import Info from './pages/Info';



const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/info/:id' element={<Info />} />

      
      </Routes>
    </BrowserRouter>
  )
}
export default App;
