import { Formik, Form } from 'formik'
import { useState } from 'react';
import './App.css';

const REGEX = {
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  phone: /^0[0-9]{9}$/,
};

const ERROR = {
  email: "Email is invalid",
  phone: "Phone is invalid",
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
    if (!form.phone) {
      errors.email = "Required"
    } else if (!REGEX.phone.test(form.phone)) {
      errors.phone = ERROR.phone
    }
    return errors
  }

  function handleSubmit() {
    alert("Send infomation successfully!!!");
  }
  return (
    <Formik
      initialValues={{
        name: "",
        phone: "",
        email: "",
        message: "",
      }}
      validate={handleValidate}
      onSubmit={handleSubmit}
    >
      {({ errors, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className="custom-input">
            <label htmlFor="yourName">Name</label>
            <input id="yourName" name="name" onChange={handleChange} placeholder='Name'/>
          </div>
          <div className={`custom-input ${errors.email ? "custom-input-error" : ""}`}>
          <label htmlFor="yourEmail">Email</label>
          <input id="yourEmail" name="email" onChange={handleChange} placeholder='Email'/>
          <p className="error">{errors.email}</p>
          </div>
          <div className={`custom-input ${errors.phone ? "custom-input-error" : ""}`}>
          <label htmlFor="yourPhone">Phone</label>
          <input id="yourPhone" name="phone" onChange={handleChange} placeholder='Phone'/>
          <p className="error">{errors.phone}</p>
          </div>
          <div className="custom-input">
            <label htmlFor="yourMessage">Message</label>
            <input id="yourMessage" name="messagge" onChange={handleChange} placeholder='Message'/>
          </div>
          <br/>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default App;
