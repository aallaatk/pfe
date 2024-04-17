import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';






import Login from './Pages/Login';
import Signup from './Pages/SignUp';
import Home from './Pages/Home';
import Sites from './Pages/Sites';
import TopContact from './Components/TopContact';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { contactInfo } from './functions';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import Tours from './Pages/Tours';
// import Dashboard from './Pages/Dashboard';
import Create from './Components/Create';

function App() {
  return (
    <Router>     
      <TopContact {...contactInfo} />
        <Header/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/sites" element={<Sites />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        {/* <Route path="/create" element={<Create />} /> */}
        <Route path="/create" element={<Create />} />
      </Routes>
      <Footer {...contactInfo} />
    </Router>
  );
}

export default App;
