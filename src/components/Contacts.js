import ContactsForm from "./ContactsForm"

import React from "react"

import firebaseDb  from '../firebase';

const Contacts = () =>{

    const AddOrEdit = obj => {
        firebaseDb.child('contacts').push(
            obj,
            //TryCatch si falla traer la coleccion de Firebase
            err => {
                if (err){
                console.log(err);
                }
            }
        )
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
          <ContactsForm AddOrEdit={AddOrEdit}/>
        </div>
        <div className="col-md-7">
            <div>List of contacts</div>
        </div>
        </div>
    </>
    )
}

export default Contacts ;