import './App.css';
import React, { useState } from 'react';
import { Formik,Form } from 'formik';

function App() {
  const [books,setBooks] = useState([])
  const [form,setForm] = useState([])
  const [indexSelected,setIndexSelected] = useState(-1)
  const [count,setCount] = useState(books.length)
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  function handleValidate() {
    const errors = {};
    if (!form.title) {
      errors.title = "Required"
    }
    if (!form.number) {
      errors.number = "Required"
    }
    return errors
  }
  function handleSelect(id) {
    const index = books.findIndex(e=>e.id===id)
    setForm(JSON.parse(JSON.stringify(books[index])))
    setIndexSelected(index)
  }
  function handleDelete(id) {
    const index = books.findIndex(e=>e.id===id)
    books.splice(index,1)
    if (index === indexSelected) {
      setForm({})
      setIndexSelected(-1)
    }
    setBooks(books)
  }
  function handleSubmit() {
    if (indexSelected > -1) {
      books[indexSelected] = JSON.parse(JSON.stringify(form))
      setBooks(books)
      setForm({})
    }
    else {
      books.push({
        id:count+1,
        title:form.title,
        number:form.number
      })
      setBooks(books)
      setForm({})
      setCount(count+1)
    }
  }
  return (
    <>
    <Formik
      initialValues={{
        title: "",
        number: "",
      }}
      validate={handleValidate}
      onSubmit={handleSubmit}
    >
      {({ errors, handleSubmit }) => (
      <Form onSubmit={handleSubmit}>
        <div className={`custom-input ${errors.title ? "custom-input-error" : ""}`}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" value={form.title} onChange={handleChange} placeholder='Title'/>
        <p className="error">{errors.title}</p>
        </div>
        <div className={`custom-input ${errors.number ? "custom-input-error" : ""}`}>
        <label htmlFor="number">Number</label>
        <input id="number" name="number" value={form.number} onChange={handleChange} placeholder='Number'/>
        <p className="error">{errors.number}</p>
        </div>
        <br/>
        <button type="submit">Submit</button>
      </Form>
      )}
    </Formik>
    <table>
      <tr>
        <th>Title</th>
        <th>Number</th>
        <th>Action</th>
      </tr>
      {books.map(b=>(
        <tr>
          <td>{b.title}</td>
          <td>{b.number}</td>
          <td>
            <button onClick={()=>handleSelect(b.id)}>Edit</button>
            <button onClick={()=>handleDelete(b.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </table>
    </>
  )
}

export default App;
