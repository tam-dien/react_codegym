import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import StudentInfoComponent from './components/StudentInfoComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));

const list_student = [
  {
    name: "Nguyễn Văn A",
    age: 19,
    address: "Hà Nội",
  },
  {
    name: "Nguyễn Văn B",
    age: 20,
    address: "Hồ Chí Minh",
  },
  {
    name: "Nguyễn Văn C",
    age: 21,
    address: "Hải Phòng",
  },
]

root.render(
  <StudentInfoComponent list_student={list_student} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
