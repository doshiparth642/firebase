import React,{useState,useEffect} from "react";
import fireDb from '../firebase';
import {Link} from 'react-router-dom'
import './Home.css';
import { toast } from "react-toastify";

const Home = () =>{
  const [data,setData]=useState({});
  const [sortedData,setsortedData]= useState([]);
  const [sorted, setSorted] = useState(false)

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
      }
  },[])

  const ondelete=(id)=>{
         if(window.confirm("Are you sure that you want to delete that contact ?")){
            fireDb.child(`contacts/${id}`).remove((err)=>{
                if(err){
                    toast.error(err)
                }else{
                    toast.success("Contact Deleted Successfully")
                }
            })
         }
  }

  const handleChange = (e) =>{
  setSorted(true);
  fireDb.child("contacts")
  .orderByChild(`${e.target.value}`)
  .on("value", (snapshot)=>{
      let sortedData = [];
      snapshot.forEach((snapshot)=>{
       sortedData.push(snapshot.val())
      })
      setsortedData(sortedData)

  });

  }
                         
  const handleReset = () =>{
      setSorted(false);
      fireDb.child("contacts").on("value",(snapshot)=>{
        if(snapshot.val() !== null){
            setData({...snapshot.val()})
        }else{
            setData({})
        }
    });
  }

  const filterData = (val) => {
        fireDb.child("contacts").orderByChild("status").equalTo(val).on("value", (snapshot)=>{
            const data = snapshot.val();
            setData(data)
        })
  }
    return(
        <div style={{marginTop: "100px"}}>
            <table className="styled-table">
                <thead>
                    <tr>
                      <th style={{textAlign:'center'}}>No.</th>
                      <th style={{textAlign:'center'}}>Name</th>
                      <th style={{textAlign:'center'}}>Email</th>
                      <th style={{textAlign:'center'}}>Contact</th>
                      <th style={{textAlign:'center'}}>Status</th>

                      {!sorted && <th style={{textAlign:'center'}}>Action</th>}
                  </tr>
                </thead>
        
                    {!sorted && ( 
                        <tbody>
                              {Object.keys(data).map((id,index)=>{
                                return (
                                    <tr key={id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data[id].name}</td>
                                        <td>{data[id].email}</td>
                                        <td>{data[id].contact}</td>
                                        <td>{data[id].status}</td>

                                        
                                        <td>
                                            <Link to={`/update/${id}`}>
                                                <button className="btn btn-edit">Edit</button>
                                            </Link>
                                            <button className="btn btn-delete" onClick={()=>ondelete(id)}>Delete</button>
                                            <Link to={`/view/${id}`}>
                                                <button className="btn btn-view">View</button>
                                            </Link>
                                        </td>
        
                                    </tr>
                                )
                            })}
                            </tbody>
                    )}              
                {sorted && (
                    <tbody>
                        {sortedData.map((item,index)=>{
                            return (
                                <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.contact}</td>
                                <td>{item.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                )}
            </table>
            <label>Sort By:</label>
            <select className="dropdown" name="colValue" onChange={handleChange}>
                <option>Please Select </option>
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="contact">Contact</option>
                <option value="status">Status</option>

            </select>
            <button className="btn btn-reset" onClick={handleReset}>Reset</button>
            <br/>
            <label>Status: </label>
            <button className="btn btn-active" onClick={()=>filterData("Active")}>Active</button>
            <button className="btn btn-inactive" onClick={()=>filterData("Inactive")}>Inactive</button>

        </div>
    )
}

export default Home