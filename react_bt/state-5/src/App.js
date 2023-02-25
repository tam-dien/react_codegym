import './App.css';
import {Component} from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: [
        {id:1,name:"Nguyễn Văn A",phone:"0909090909",email:"anv@gmail.com"},
        {id:2,name:"Nguyễn Văn B",phone:"0909090709",email:"bnv@gmail.com"},
        {id:3,name:"Nguyễn Văn C",phone:"0909090509",email:"cnv@gmail.com"},
      ],
      count: 3,
      form: {name:"",phone:"",email:""},
      isValid: false,
      indexSelected: -1,
    }
  }
  handleChange = (event) => {
    this.setState((state) => {
      const form = state.form
      form[event.target.name] = event.target.value
      return { form }
    }, () => this.checkInvalidForm())
  }
  handleSelect = (id) => {
    const index = this.state.studentList.findIndex(e=>e.id===id)
    this.setState({
      form: JSON.parse(JSON.stringify(this.state.studentList[index])),
      indexSelected: index,
    })
  }
  checkInvalidForm = () => {
    const { name, phone, email } = this.state.form
    const value = name && phone && email
    this.setState({
      isValid: value
    })
  }
  handleSubmit = () => {
    var {count, studentList, indexSelected, form} = this.state
    if(this.state.isValid){
      // const newList = this.state.studentList
      if (this.state.indexSelected > -1) {
        studentList[indexSelected] = form
        indexSelected = -1
      } else {
        count += 1
        form.id = count
        studentList.push(form)
      }
      this.setState({
        form: {name:"",phone:"",email:""},
        count: count,
        studentList: studentList,
        indexSelected,
        isValid: false,
      })
    }
  }
  handleDelete = (id) => {
    var {studentList, indexSelected, form, isValid} = this.state
    const index = this.state.studentList.findIndex(e=>e.id===id)
    if (index === indexSelected) {
      form = {name:"",phone:"",email:""}
      indexSelected = -1
      isValid = false
    }
    studentList.splice(index,1)
    this.setState({
      form: form,
      studentList: studentList,
      indexSelected,
      isValid: isValid,
    })
  }
  render () {
    const { studentList, form } = this.state
    return (
      <div>
        <div>
            <h1>Student List</h1>
            <div>
              <label>Name: </label>
              <input name="name" value={form.name} onChange={this.handleChange} />
            </div>
            <div>
              <label>Phone: </label>
              <input type="number" name="phone" value={form.phone} onChange={this.handleChange} />
            </div>
            <div>
              <label>Email: </label>
              <input name="email" value={form.email} onChange={this.handleChange} />
            </div>
            <button onClick={this.handleSubmit}>Submit</button>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((sd) => (
                  <tr st_id={sd.id}>
                    <td>{sd.name}</td>
                    <td>{sd.phone}</td>
                    <td>{sd.email}</td>
                    <td>
                      <button onClick={e=>this.handleSelect(sd.id)}>Edit</button>
                      <button onClick={e=>this.handleDelete(sd.id)}>Delete</button>
                    </td>
                  </tr>
                )) 
                }
              </tbody>
            </table>
        </div>
      </div>
      )
    }
}

export default App;
