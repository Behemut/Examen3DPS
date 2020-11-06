/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react"
import firebaseDb from "../firebase"
import { ToastContainer, toast} from 'react-toastify';
import ContactsForm from "./SucursalesForm"

const Sucursales = () =>{


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
 
    //EVALUANDO ANTES DEL SUBMIT
       
        if (obj.sucursal===''|| obj.ganancias <=1000 || obj.nempleados <=10){
            if(obj.sucursal==='' ||  obj.ganancias<0 || obj.nempleados<0){
                alert('Valores no permitidos, rellene el formulario correctamente')
            }
           else alert("No se permite ganancias inferiores a $1000 y registro de empleados menos a 10 personas, relleno el formulario nuevamente")
        }
        

        if (obj.sucursal!=='' && obj.ganancias >=1000 && obj.nempleados >=10){
          
            //Si todo es correcto entonces se dejara realizar la entrada de los valores
         if (currentId === "") {
            firebaseDb.database().ref().child('contacts').push(obj,err =>{
                toast.success("Registro añadido con éxito");
            });
                
            }
        else{
            firebaseDb.database().ref().child(`contacts/${currentId}`).set(
                obj,err =>{
                    if(err)
                     console.log('')
                    else
                    setCurrentId('')
                });
                toast("Registro actualizado", {type: "info"});
            }


        }

        

        }

        const onDelete = key =>{
            if(window.confirm('¿Esta seguro de eliminar el registro?')){
                firebaseDb.database().ref().child(`contacts/${key}`).remove(
                    err =>{
                        if(err)
                         console.log('') 
                        else
                        setCurrentId('')
                    });
                    toast.error("Registro eliminado");
            }
        }
    

     

    return (
    <>
    <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4 text-center">Registro general</h1>
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
                    <th>Nombre Sucursal</th>
                    <th>Empleados</th>
                    <th>Ganancias</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(contactObjs).map(id=>{
                        if (contactObjs[id].ganancias > 1050){

                        return <tr key={id}>
                        <td>{contactObjs[id].sucursal}</td>
                        <td>{contactObjs[id].nempleados}</td>
                        <td>{contactObjs[id].ganancias }</td>
                        <td>{contactObjs[id].estado}</td>
                            <td>
                                <a className="btn text-primary" onClick={()=> {setCurrentId(id)}   }>
                                    <i className="fas fa-pencil-alt"></i>
                                </a>          
                                <a className="btn text-danger" onClick={() => {onDelete(id)}}>
                                    <i className="fas fa-trash-alt"></i>
                                </a>


                            </td>
                        </tr>
                        }
                    })
                }
            </tbody>
            </table>
        </div>
        </div>
    </>
    )
}

export default Sucursales ;