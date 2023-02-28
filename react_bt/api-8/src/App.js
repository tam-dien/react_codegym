import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactList from './components/ContactList';
import FormContact from './components/FormContact'

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/addcontact" element={<FormContact />} />
          <Route path="/:id" element={<FormContact />} />
          {/* <Route path="invoices" element={<Invoices />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
