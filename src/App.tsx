import { useEffect, useState } from 'react'
import './App.css'
import './studentData'
import { studentData } from './studentData'



function App() {

const[Data, setData]= useState([]);
const[Name, setName]= useState('');
const[Age, setAge]= useState(0);
const[id, setid]= useState(0);
const[isUpdate, setisUpdate] = useState(false);

useEffect(() =>{
setData(studentData)

},[]);

const handleEdit =(id) =>{
   const dt = Data.filter(item => item.id === id);


 if (dt.length > 0){
    setisUpdate(true);
    setid(id)
    setName(dt[0].Name);
    setAge(dt[0].Age);
  }
}

const handleDelete =(id) =>{
if (id > 0){
  if (window.confirm("are you sure to delete this Data?")){
  const dt=Data.filter((item )=> item.id !== id);
  setData (dt);
  }
}
}

const handleSave =(e) =>{
e.preventDefault();
const dt = [...Data];
const newData ={
  
id : studentData.length +1,
Name : Name,
Age : Age,
}
dt.push(newData);
setData(dt);
handleClear()
}

const handleUpdate =() =>{
  const index = Data.map((item)=> {
    return item.id;
  }).indexOf(id);
  const dt = [...Data];
  dt [index].Name = Name;
  dt [index].Age = Age;
  setData(dt);
 handleClear()

}

const handleClear =() =>{
   setid(0)
    setName('');
    setAge(0);
    setisUpdate(false);
}
  return (
    <div className='app'>

<div style={{display: 'flex', justifyContent: 'center', margin: '10px'}}>
  <div>
    <label>Name:
    <input type="text" placeholder='Enter your Name Here'onChange={(e) => setName(e.target.value)} value={Name}/>
    </label>
    <label htmlFor="">Age:
    <input type="text" placeholder='Enter your Age ' onChange={(e) => setAge(Number(e.target.value))} value={Age} />
    </label>

{
  !isUpdate ?
        <button className='btn btn-primary'  onClick={(e)=> handleSave(e)}>Save</button>
 :
       <button className='btn btn-primary'  onClick={()=> handleUpdate()}>Update</button>


}
   
  </div>
 <div>
    
      <button className='btn btn-danger'  onClick={()=> handleClear()}>Clear</button>
    </div>
</div>


   <table className='table table-hover'>
    <thead>
      <tr>
        <td>Sr.No</td>
        <td>id</td>
        <td>Name</td>
        <td>Age</td>
        <td>Actions</td>
      </tr>
    </thead>
    <tbody>
      {
       Data.map((item, index)=>{

        return(
          <tr key={index}>

            <td>{index +1}</td>
            <td>{item.id}</td>
            <td>{item.Name}</td>
            <td>{item.Age}</td>
            <td><button className='btn btn-primary'  onClick={()=> handleEdit(item.id)}>Edit</button></td>
            <td><button className='btn btn-danger'onClick={()=> handleDelete(item.id)}>Delete</button></td>
          </tr>
        )


       })
      }
    </tbody>
   </table>

    </div>
 
  );
}



export default App
