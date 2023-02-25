import {useState, useEffect} from "react"
import './App.css';

var interval;

function App() {
  const [timer,setTimer] = useState(10)
  useEffect(() => {
    interval = setInterval(() => {
      if (timer>0) setTimer(timer-1)
      else {
        alert("Time's up")
        clearInterval(interval)
      }
    },1000)
    return () => {clearInterval(interval)}
  })
  return (
    <div>Count down from {timer}</div>
  );
}

export default App;
