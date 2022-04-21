import React, { Component } from "react";
import {Route,Switch, Redirect} from 'react-router-dom' 
import About from "./pages/About";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import View from "./pages/View";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import Search from "./pages/Search";

class App extends Component {
  render() {

    return (
      <div className="App">
        <Header />
       <ToastContainer position="top-center"/>
       <Switch>
         <Route path="/" component={Home} exact/>
         <Route path="/add" component={AddEdit}/>
         <Route path="/update/:id" component={AddEdit}/>
         <Route path="/view/:id" component={View}/>
         <Route path="/about" component={About}/>
         <Route path="/search" component={Search}/>

         <Redirect to='/' />




          
        
       </Switch>
       


      </div>
    );
  }
}

export default App;
