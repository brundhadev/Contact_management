"use client"
import Link from "next/link"
import { useEffect,useState } from "react"
import axios from 'axios'
import { useRouter } from "next/navigation"

const ListContact=()=>{
   
    const[contacts,setContacts]=useState([])
    const router=useRouter()
    const [search, setSearch] = useState("");

   
    useEffect(()=>{
        axios.get("http://localhost:8080/contacts")
        .then((response)=>setContacts(response.data))
        .catch((errmsg)=>{ console.log(errmsg)})
    },[])

    
    const handledelete = (id) => {
  var conf = confirm("are you sure TO DELETE");   
    if (conf) {
      axios.delete("http://localhost:8080/contacts/"+id)
            .then(
        setContacts(contacts.filter((c) => c.id !== id)))
        .catch((err) => {
          console.log(err);
        })
    }
  };
  const gotoedit = (id) => {
    router.push('/update/'+id);
  };
  const filteredContacts = contacts.filter((c) =>
  c.name.toLowerCase().includes(search.toLowerCase()) ||
  c.ph_no.toString().includes(search)
);
    return(
        <div style={{width:'100%',margin:'auto', backgroundColor:"#383734"}}>
             <br/><br/>
                <div className="mb-3  justify-content-center" style={{backgroundColor:"#383734", width:'100%'}}>
               <div style={{textAlign:'center'}}>
                <Link href='/add'>
               <button type="button" class="btn btn-outline-info" style={{fontSize:'15px', justifyContent:"center"}} >Add New Contact</button>
                </Link>
            </div><br/>
            <div className="mb-3 d-flex justify-content-center">
            <input type="text" style={{width:'50%'}} className="form-control" placeholder="Search by name or phone number"value={search} onChange={(e) => setSearch(e.target.value)}
  />
</div>
            <br/>
            <h2 style={{textAlign:'center',color:"white"}}>Contact Details</h2>
            <br/>
         <table
  className="table table-dark table-hover mx-auto"
  style={{ width: "75%" }}
>
                <thead  style={{fontSize:'25px',textAlign:'center'}}>
                    <tr>
                        <th>NAME</th><th>PHONE_NO</th><th>ACTIONS</th>
                    </tr>
                </thead><tbody style={{ fontSize: "20px", textAlign: "center" }}>
  {filteredContacts.map((cont) => (
    <tr key={cont.id}>
      <td>{cont.name}</td>
      <td>{cont.ph_no}</td>
      <td>
        <button
          className="btn btn-warning"
          onClick={() => gotoedit(cont.id)}
        >
          Edit
        </button>
        &nbsp;&nbsp;
        <button
          className="btn btn-danger"
          onClick={() => handledelete(cont.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
            </table>
            </div>
            <br/><br/>
        </div>
    );
}

export default ListContact