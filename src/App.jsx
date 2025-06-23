import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import OrderCakes from './pages/OrderCakes';
import OrderSweets from './pages/OrderSweets';
import OrderTieredCakes from './pages/OrderTieredCakes';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalog />} />
          <Route path="contato" element={<Contact />} />
          <Route path="pedido/bolos" element={<OrderCakes />} />
          <Route path="pedido/doces" element={<OrderSweets />} />
          <Route path="pedido/bolos-andar" element={<OrderTieredCakes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

