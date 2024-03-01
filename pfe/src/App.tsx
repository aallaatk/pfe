import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import Login from './Pages/Login';
import Signup from './Pages/SignUp';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
<Routes>
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />
  
  <Route path="/home" element={<Home />} />
</Routes>
    </Router>
  );
}

export default App;
