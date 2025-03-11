import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">login</Link></li>
          <li><Link to="/register">Sing up</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Index/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
    </Router>

    
  )
}

export default App
