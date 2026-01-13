
'use client'
import Link from "next/link"
import { useState } from "react"
import axios from 'axios'
import { useRouter } from "next/navigation";
const AddContact=()=>{
    const [name,setName]=useState('')
    const [ph_no,setPh_no]=useState(0)
    const [phError, setPhError] = useState("");
    const router = useRouter();
    const handleSubmit=(e)=>{
        e.preventDefault()
        const contobj={name:name,ph_no:parseInt(ph_no)}
        axios.post("http://localhost:8080/contacts",contobj)
      .then(() => {
          router.push('/view');
        })
        .catch((errmsg)=>{ console.log(errmsg)})
    }
    const handleReset = () => {
      setName("");
      setPh_no("");
};
const handlePhoneChange = (e) => {
const value = e.target.value;
setPh_no(value);
if (value.length !== 10) 
    {
setPhError("Phone number must be 10 digits");
} 
else {
    setPhError("");
  }
};

    return(
        <div style={{width:'100%',margin:'auto',backgroundColor:"#383734"}}>
               <br/>
               <br/><br/>
            <div class="card p-4 shadow" style={{backgroundColor:"#383734",width:'600px',margin:'auto'}}>
          <h4 style={{textAlign:'center' , padding:'10px',color:"white"}}>ADD CONTACT</h4>
          <form onSubmit={handleSubmit} style={{color:"white"}}>
            <div class="mb-3">
                <label>Enter Name</label>
                <input type='text' class="form-control" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </div>
            <div class="mb-3">
                <label>Enter Phone number</label>
                <input type='number' class="form-control" value={ph_no}  onChange={handlePhoneChange}/>
               {phError && <small style={{ color: "red" }}>{phError}</small>}
            
           </div>
            <div class="mb-3" style={{textAlign:'center'}}>
               <input type='submit' value="Save" class="btn btn-success" style={{fontSize:'20px'}}/>&nbsp;&nbsp;
                <input type='reset' class="btn btn-danger" onClick={handleReset} style={{fontSize:'20px'}}/>
            </div>
          </form>
          </div>    
           <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    )
}

export default AddContact
