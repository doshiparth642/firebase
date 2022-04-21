import React,{useEffect, useState} from "react";
import {Link, useLocation, useHistory} from 'react-router-dom';
import './Header.css';

const Header = ()=>{
   const [activetab,setActiveTab]=useState("Home");
   const[search,setSearch]= useState("");

   const location = useLocation();
   const history = useHistory();

   useEffect(()=>{
     if(location.pathname === '/'){
         setActiveTab("Home")
     }else if(location.pathname === '/add'){
         setActiveTab("AddContact")
     }else if(location.pathname === '/about'){
         setActiveTab("About")
     }
   },[location])

   const handleSubmit = (e) =>{
           e.preventDefault();
          history.push(`/search?name=${search}`);
          setSearch("")
   }
    return(
       <div className="header">
           <p className="logo">Contact App</p>
           <div className="header-right">
               <form onSubmit={handleSubmit} style={{display: "inline"}}>
                   <input type="text" 
                   className="inputField"
                   placeholder="searchname"
                   value={search}
                   onChange={(e)=>setSearch(e.target.value)}
                   />
               </form>
               <Link to="/">
                   <p
                   className={`${activetab === "Home" ? "active" : "" }`}
                   onClick={()=>setActiveTab("Home")} 
                   >
                       Home
                   </p>
               </Link>
               <Link to="/add">
                   <p
                   className={`${activetab === "AddContact" ? "active" : "" } `}
                   onClick={()=>setActiveTab("AddContact")} 
                   >
                       Add Contact
                   </p>
               </Link>
               <Link to="/about">
                   <p
                   className={`${activetab === "About" ? "active" : "" } `}
                   onClick={()=>setActiveTab("About")} 
                   >
                       About
                   </p>
               </Link>
           </div>
       </div>
    )

}

export default Header