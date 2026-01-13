
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

  const EditContacts = () => {
  const [n,setName]=useState('')
  const [s,setPh_no]=useState(0)
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [contacts,setContacts]=useState([])
   useEffect(()=>{
           axios.get("http://localhost:8080/contacts/"+id)
     .then((response) => {
      setName(response.data.name);
      setPh_no(response.data.ph_no);
    })
            .catch((errmsg)=>{console.log(errmsg)})
    },[id])

    const handleSubmit=(e)=>{
        e.preventDefault()
        const cont={name:n,ph_no:s}
        axios.put("http://localhost:8080/contacts/"+id,cont)
        .then(
          router.push('/view'))
        .catch((errmsg)=>{console.log(errmsg)})
    }
    
    const handlereset = () => {
      setName("");
      setPh_no("");
};
    return(
        <div style={{width:'100%',margin:'auto',backgroundColor:"#383734"}}>
                <br/><br/>
            
             <br/><br/>    
             <div class="card p-4 shadow" style={{backgroundColor:"#383734",width:'600px',margin:'auto'}}>
               <h4 style={{textAlign:'center' , padding:'10px',color:"white"}}>Contact number Modification</h4>
            <form onSubmit={handleSubmit} style={{color:"white"}}>
            <div class="mb-3">
                <label>Enter Name</label>
                <input class="form-control" type="text" name="n" onChange={(e)=>{setName(e.target.value)}} value={n}/>
            </div>
            <div class="mb-3">
                <label>Enter phone number</label>
                <input class="form-control" type="number" name="s" onChange={(e)=>{setPh_no(e.target.value)}} value={s}/>
            </div>
            <div class="mb-3" style={{textAlign:'center'}}>
                <input type="submit" value="Update" class="btn btn-success" style={{fontSize:'20px'}}/>&nbsp;&nbsp;
                <input type="reset" onClick={handlereset} class="btn btn-danger" style={{fontSize:'20px'}}/>
            </div>
            </form>
            </div>
            <br/><br/>
            <br/><br/>
            <br/><br/>
            <br/><br/>
            <br/><br/>
        </div>
    );
}
export default EditContacts