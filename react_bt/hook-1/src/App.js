import './App.css';
import {useState} from 'react';

const carList = ["Mazda 3","Mazda 6","Mazda CX-3"]
const colorList = ["Black","Blue","Green"]

function App() {
  const [selectedCar,setSelectedCar] = useState({car:carList[0],color:colorList[0]})
  const selectCar = e => {
    setSelectedCar(pS => {
      pS = {...pS}
      pS[e.target.name] = e.target.value
      return pS
    });
  }
  return (
    <>
      <h1>Select your car</h1>
      <label>Select a car </label>
      <select name="car" onChange={selectCar}>
        {carList.map(e=>(
          <option value={e}>{e}</option>
        ))}
      </select><br/>
      <label>Select a color </label>
      <select name="color" onChange={selectCar}>
        {colorList.map(e=>(
          <option value={e}>{e}</option>
        ))}
      </select>
      <p><b>You selected a {selectedCar.color} - {selectedCar.car}</b></p>
    </>
  );
}

export default App;
