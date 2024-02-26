import AddProductForm from './Addproducts';
import './App.css';
import Myapp from './Myapp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
   <>
  
  
   <Router>
      <Routes>
        <Route path="/" element={ <Myapp/>} />
        <Route path="/add" element={<AddProductForm/>} />
      </Routes>
      </Router>
   </>
  );
}

export default App;
