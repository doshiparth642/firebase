import React,{useState,useEffect} from "react";
import {useHistory,useParams} from 'react-router-dom'
import fireDb from '../firebase';
import {toast} from 'react-toastify';
import './AddEdit.css'

const initialState = {
    name:'',
    email:'',
    contact:'',
    status: ''
}

const AddEdit= () =>{
    const [state,setState]= useState(initialState);
    const [data,setData] = useState({});

    const history = useHistory();
    const {id} = useParams();
    const {name,email,contact, status} = state;


    useEffect(()=>{
        fireDb.child("contacts").on("value",(snapshot)=>{
            if(snapshot.val() !== null){
                setData({...snapshot.val()})
            }else{
                setData({})
            }
        });
  
        return ()=>{
            setData({})
        };
    },[id]);

    useEffect(()=>{
          if(id){
              setState({...data[id]})
          }else{
              setState({...initialState})
          }

          return ()=>{
            setState({...initialState})
        };
    },[id,data])

    const handleInputChange =(e)=>{
       setState({...state, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!name || !email || !contact || !status){
            toast.error("Please provide value in each input field")
        }
        else{
            if(!id){
                fireDb.child("contacts").push(state, (err)=>{
                    if(err){
                        toast.error(err)
                    }else{
                        toast.success("Contact Added Successfully")
                    }
                }); 
            }else{
                fireDb.child(`contacts/${id}`).set(state, (err)=>{
                    if(err){
                        toast.error(err)
                    }else{
                        toast.success("Contact Updated Successfully")
                    }
                });
            }
            setTimeout(()=>history.push("/"),500)
        
        }
    }
    return(
        <div style={{marginTop:"100px"}}>
            <form onSubmit={handleSubmit}
            style={{margin:"auto",
                padding:"15px",
                maxWidth:"400px",
                alignContent:"center"
            }}
            >

                <label htmlFor="name">Name</label>
                <input type="text"
                id="name"
                name="name"
                placeholder="Your Name..."
                value={name || ""}
                onChange={handleInputChange}
                />
               <label htmlFor="email">Email</label>
                <input type="email"
                id="email"
                name="email"
                placeholder="Your Email..."
                value={email || ""}
                onChange={handleInputChange}
                />

               <label htmlFor="contact">Contact</label>
                <input type="number"
                 id="contact"
                 name="contact"
                 placeholder="Your Contact No..."
                 value={contact || ""}
                 onChange={handleInputChange}
                />

             <label htmlFor="status">Status</label>
                <input type="text"
                id="status"
                name="status"
                placeholder="Your Status..."
                value={status || ""}
                onChange={handleInputChange}
                />

                <input type="submit" value ={id ? "Update": "Save"}  />
                
            </form>
        </div>
    )
}

export default AddEdit