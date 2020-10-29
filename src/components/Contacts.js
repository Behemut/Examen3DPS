import React, { useState, useEffect } from "react"
import firebaseDb from "../firebase"
import { ToastContainer, toast, Zoom, Bounce} from 'react-toastify';
import axios from 'axios'
import ContactsForm from "./ContactsForm"
import Menu from "./Menu"



const Contacts = () =>{

    <ToastContainer/>
    var [contactObjs, setcontactObjs] = useState({});
    var [currentId, setCurrentId] = useState('');


    useEffect(()=>{
        firebaseDb.database().ref().child('contacts').on('value', snapshot=> {
            if(snapshot.val()!=null)
            setcontactObjs({...snapshot.val()})
            else
               setcontactObjs({})
        })
    },[])

  
    const addOrEdit =  (obj) => {
  
         if (currentId === "") {

            firebaseDb.database().ref().child('contacts').push(obj,err =>{if(err) console.log(err)});
                toast.success("Registro añadido con éxito");
            }
        else{
            firebaseDb.database().ref().child(`contacts/${currentId}`).set(
                obj,err =>{
                    if(err)
                     console.log(err) 
                    else
                    setCurrentId('')
                });
                toast("Registro actualizado", {type: "info"});
            }
        }

        const onDelete = key =>{
            if(window.confirm('¿Esta seguro de eliminar el registro?')){
                firebaseDb.database().ref().child(`contacts/${key}`).remove(
                    err =>{
                        if(err)
                         console.log(err) 
                        else
                        setCurrentId('')
                    });
                    toast.error("Registro eliminado");
            }
        }
    

    return (
    <>

<Menu/>
    <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4 text-center">Contacts Register</h1>
        </div>

    
    </div>
    <div className="row">
        <div className="col-md-5">
          <ContactsForm {...{addOrEdit, currentId, contactObjs}}/>
        </div>
        <div className="col-md-7">
            <table className="table table-borderless table-stripped">
            <thead>
                <tr>
                    <th>Fullname</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(contactObjs).map(id=>{
                        return <tr key={id}>
                            <td>{contactObjs[id].fullname}</td>
                            <td>{contactObjs[id].mobile}</td>
                            <td>{contactObjs[id].email}</td>
                            <td>
                                <a className="btn text-primary" onClick={()=> {setCurrentId(id)}}>
                                    <i className="fas fa-pencil-alt"></i>
                                </a>

                                
                                <a className="btn text-danger" onClick={() => {onDelete(id)}}>
                                    <i className="fas fa-trash-alt"></i>
                                </a>
                            </td>
                        </tr>
                    })
                }
            </tbody>
            </table>
        </div>
        </div>
    </>
    )
}

export default Contacts ;