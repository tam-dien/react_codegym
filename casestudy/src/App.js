import CustomerSide from './components/CustomerSide';
import { Routes, Route } from 'react-router-dom'
import AdminSide from './components/AdminSide';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerSide />} />
      <Route path="/admin" element={<AdminSide />} />
    </Routes>
  );
}

export default App;
