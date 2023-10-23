import React from 'react';
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import HomePage from './components/HomePage';
import GetDetails from './components/GetDetails';

function App() {

  return (

  <Router>

    <Routes>
      <Route  exact path='/' element={<HomePage />}/>
      <Route  exact path='/post-details' element={<GetDetails/>} />
      <Route  exact path='/post-details/:objId' element={<GetDetails/>} />
    </Routes>


    
  </Router>

  )
  
}

export default App;
