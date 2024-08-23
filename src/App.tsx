import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from "./pages/home.tsx";
import { Store } from "./pages/store.tsx";
import { About } from "./pages/about.tsx";
import { Navbar } from "./components/navbar/navbar.tsx";
import { ShoppingCartProvider } from "./context/ShoppingCartContext.tsx";
import './index.css'
 
function App() {
  return (
    <ShoppingCartProvider>
    <Navbar />
      <Container className="mb-4">
      <Routes>      
      <Route path="/" element={<Home />} /> 
      <Route path="/store" element={<Store />} /> 
      <Route path="/about" element={<About />} /> 
    </Routes>
  </Container>
  </ShoppingCartProvider>
  )
}

export default App
