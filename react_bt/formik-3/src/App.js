import logo from './logo.svg';
import './App.css';
import { Formik,Form } from 'formik';
import {useState} from 'react'

const REGEX = {
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const ERROR = {
  email: "Email is invalid",
}

function App() {
  const [form,setForm] = useState({})
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
  function handleValidate() {
    const errors = {};
    if (!form.email) {
      errors.email = "Required"
    } else if (!REGEX.email.test(form.email)) {
      errors.email = ERROR.email
    }
    if (!form.title) {
      errors.title = "Required"
    }
    if (!form.message) {
      errors.message = "Required"
    }
    return errors
  }
  function handleSubmit() {
    alert("Send mail successfully!!!");
  }
  return (
    <Formik
      initialValues={{
        email: "",
        title: "",
        message: "",
      }}
      validate={handleValidate}
      onSubmit={handleSubmit}
    >
      {({ errors, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className={`custom-input ${errors.email ? "custom-input-error" : ""}`}>
            <label htmlFor="email">To</label>
            <input id="email" name="email" onChange={handleChange} placeholder='To'/>
            <p className="error">{errors.email}</p>
          </div>
          <div className={`custom-input ${errors.title ? "custom-input-error" : ""}`}>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" onChange={handleChange} placeholder='Title'/>
            <p className="error">{errors.title}</p>
          </div>
          <div className={`custom-input ${errors.message ? "custom-input-error" : ""}`}>
            <label htmlFor="yourPhone">Message</label>
            <textarea id="message" name="message" onChange={handleChange} placeholder='Message'/>
            <p className="error">{errors.message}</p>
          </div>
          <div className="custom-input">
            <input id="file" name="file" type="file" onChange={handleChange}/>
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default App;
