import './App.css';
import {useState} from "react"

function useIncrement(addAmount) {
  const [count, setCount] = useState(0)
  const increase = () => {
    setCount(count + addAmount)
  }
  return [count, increase]
}

function Counter1() {
  const [count, increase] = useIncrement(1)
  return (
    <div>
      Count: {count}<br/>
      <button onClick={increase}>Add 1</button>
    </div>
  )
}

function Counter2() {
  const [count, increase] = useIncrement(2)
  return (
    <div>
      Count: {count}<br/>
      <button onClick={increase}>Add 2</button>
    </div>
  )
}

function App() {
  return (
    <>
      <Counter1/>
      <Counter2/>
    </>
  );
}

export default App;
