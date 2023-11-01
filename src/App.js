import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import AddStaff from './components/AddStaff';
import UpdateStaff from './components/UpdateStaff';

import Home from './pages/Home';
import Detail from './pages/Detail';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  

  return (
    <div className="App">
 <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
 
        <Route path="/home" element={<Home />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/add" element={<AddStaff />}></Route>
        <Route path="/update/:id" element={<UpdateStaff />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
    </div>
  );
}

export default App;
