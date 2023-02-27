import './App.css';
import { Formik,Form } from 'formik';
import {useState} from 'react'

const REGEX = {
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  phone: /^0[0-9]{9}$/,
};

const ERROR = {
  email: "Email sai định dạng",
  phone: "Phone sai định dạng",
  birthyear: "Năm sinh phải lớn hơn 1900",
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
    const require_list = ["name","IDcard","sex","nationality","city","distict","ward","address"]
    if (!form.email) {
      errors.email = "Required"
    } else if (!REGEX.email.test(form.email)) {
      errors.email = ERROR.email
    }
    if (!form.phone) {
      errors.phone = "Required"
    } else if (!REGEX.phone.test(form.phone)) {
      errors.phone = ERROR.phone
    }
    if (!form.birthyear) {
      errors.birthyear = "Required"
    } else if (parseInt(form.birthyear)>1900) {
      errors.birthyear = ERROR.birthyear
    }
    for (const i of require_list) {
      if (!form[i]) {
        errors[i] = "Required"
      }
    }
    console.log(errors)
    return errors
  }
  function handleSubmit() {
    alert("Khai báo thành công!!!");
  }
  const FIELD_LIST = [
    {name:"name",label:"Họ tên"},
    {name:"IDcard",label:"Số hộ chiếu/CMND"},
    {name:"birthyear",label:"Năm sinh"},
    {name:"sex",label:"Giới tính"},
    {name:"nationality",label:"Quốc tịch"},
    {name:"dept",label:"Bộ phận làm việc"},
    {name:"healthinsurance",label:"Có thẻ bảo hiểm y tế"},
  ]
  const FIELD_LIST_2 = [
    {name:"city",label:"Tỉnh thành"},
    {name:"distict",label:"Quận/Huyện"},
    {name:"ward",label:"Phường/Xã"},
    {name:"address",label:"Số nhà, phố, tổ dân phố/thôn/đội"},
    {name:"phone",label:"Điện thoại"},
    {name:"email",label:"Email"},
  ]
  const ask1 = ["Sốt","Ho","Khó thở","Viêm phổi","Đau họng","Mệt mỏi"]
  const ask2 = ["Người bệnh hoặc nghi ngờ, mắc bệnh COVID-19",
                "Người từ nước có bệnh COVID-19",
                "Người có biểu hiện (Sốt, ho, khó thở, viêm phổi)"]
  const initialValues = {}
  for (const i of FIELD_LIST) initialValues[i.name] = ""
  for (const i of FIELD_LIST_2) initialValues[i.name] = ""
  return (
    <>
    <Formik
      initialValues={initialValues}
      validate={handleValidate}
      onSubmit={handleSubmit}
    >
      {({ errors, handleSubmit }) => (
        <div className="container">
          <Form onSubmit={handleSubmit}>
            <h2>Tờ khai y tế</h2>
            {FIELD_LIST.map(i=>(
              <div className={`custom-input ${errors[i.name] ? "custom-input-error" : ""}`}>
                <label htmlFor={i.name}>{i.label}</label>
                { (i.name==="sex")
                  ? <>
                    <label htmlFor="sexMale" style={{display:"inline-block"}}>Nam</label><input style={{width:"auto"}} id="sexMale" type="radio" name="sex" value="male"/>
                    <label htmlFor="sexFemale" style={{display:"inline-block"}}>Nữ</label><input style={{width:"auto"}} id="sexFemale" type="radio" name="sex" value="female"/>
                    </>
                  : <input id={i.name} name={i.name} onChange={handleChange}/>
                }
                <p className="error">{errors[i.name]}</p>
              </div>
            ))}
            <h3>Địa chỉ liên lạc tại Việt Nam</h3>
            {FIELD_LIST_2.map(i=>(
              <div className={`custom-input ${errors[i.name] ? "custom-input-error" : ""}`}>
                <label htmlFor={i.name}>{i.label}</label>
                <input id={i.name} name={i.name} onChange={handleChange}/>
                <p className="error">{errors[i.name]}</p>
              </div>
            ))}
            <label htmlFor="ask1"><b>Trong vòng 14 ngày qua, Anh//Chị có đến quốc gia/vùng lãnh thổ nào (Có thể đi qua nhiều quốc gia)</b></label>
            <textarea name="ask1" id="ask1" value=""/>
            <label htmlFor="ask1"><b>Trong vòng 14 ngày qua, Anh//Chị có thấy xuất hiện dấu hiệu nào sau đây không?</b></label>
            {ask1.map((e,i)=>(
              <>
                <input type="checkbox" id={"ask1_"+(i+1)} name={"ask1_"+(i+1)} style={{display:"inline-block",width:"auto"}}/>
                <label htmlFor={"ask1_"+(i+1)} style={{display:"inline-block",width:"auto"}}>{e}</label><br></br>
              </>
            ))}
            <label htmlFor="ask1"><b>Trong vòng 14 ngày qua, Anh//Chị có tiếp xúc với?</b></label>
            {ask2.map((e,i)=>(
              <>
                <input type="checkbox" id={"ask2_"+(i+1)} name={"ask2_"+(i+1)} style={{display:"inline-block",width:"auto"}}/>
                <label htmlFor={"ask2_"+(i+1)} style={{display:"inline-block",width:"auto"}}>{e}</label><br></br>
              </>
            ))}
            <button type="submit">Submit</button>
          </Form>
        </div>
      )}
    </Formik>
    </>
  );
}

export default App;
