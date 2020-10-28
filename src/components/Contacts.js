import ContactsForm from "./ContactsForm"
import React, { useState, useEffect } from "react"
import firebaseDb from "../firebase"
import { toast } from "react-toastify";

const Contacts = () =>{

    var [contactObjs, setcontactObjs] = useState({});
    var [currentId, setCurrentId] = useState('');


    useEffect(()=>{
        firebaseDb.child('contacts').on('value', snapshot=> {
            if(snapshot.val()!=null)
            setcontactObjs({...snapshot.val()})
            else
               setcontactObjs({})
        })
    },[])

  
    const addOrEdit =  (obj) => {
  
         if (currentId === "") {

                firebaseDb.child('contacts').push(obj,err =>{if(err) console.log(err)});
                toast("Se agrego un Alumno", {
                    type: "success",
                   });
            }
        else{
            firebaseDb.child(`contacts/${currentId}`).set(
                obj,err =>{
                    if(err)
                     console.log(err) 
                    else
                    setCurrentId('')
                });
                toast("Se actualizo un Alumno", {type: "success"});
            }
        }

        const onDelete = key =>{
            if(window.confirm('¿Esta seguro de eliminar el registro?')){
                firebaseDb.child(`contacts/${key}`).remove(
                    err =>{
                        if(err)
                         console.log(err) 
                        else
                        setCurrentId('')
                    });
                    toast("Se elimino un contacto", {type: "error"});
            }
        }
    

    return (
    <>
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