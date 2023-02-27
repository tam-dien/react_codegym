import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from './components/BookList';
import FormBook from './components/FormBook'

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/addbook" element={<FormBook />} />
          <Route path="/:id" element={<FormBook />} />
          {/* <Route path="invoices" element={<Invoices />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
