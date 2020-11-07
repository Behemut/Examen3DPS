/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react"
import firebaseDb from "../firebase"
import { ToastContainer, toast} from 'react-toastify';
import ContactsForm from "./SucursalesForm"
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText"

const Sucursales = () =>{


    <ToastContainer/>
    var [contactObjs, setcontactObjs] = useState({});
    var [currentId, setCurrentId] = useState('');
    const result = Object.values(contactObjs);
    const [checked, setChecked] = React.useState({
        foo: false,
        bar: false
      });

      const handleChange = event => {
        setChecked({ ...checked, [event.target.name]: event.target.checked });
        console.log(checked)
      };

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
       
        if (obj.sucursal===''|| obj.ganancias <=1000 && obj.nempleados <=10){
            if(obj.sucursal==='' ||  obj.ganancias<0 && obj.nempleados<0){
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
    
        const sumatoriaTotal = () =>{
            var suma=0;
            for(var i=0; i<result.length; i++)
            {
                suma+= parseInt(result[i].ganancias);
            }
            console.log(suma);
            return (
                <>
                <br></br>
            <h2>Ganancias total de la empresa: ${suma}</h2>
                </>
            )
        }
      

    return (
    <>
    <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4 text-center">Registro general</h1>
        </div>
       {sumatoriaTotal()}
        
    </div>
    <div className="row">
        <div className="col-md-5">
          <ContactsForm {...{addOrEdit, currentId, contactObjs}}/>
        
        </div>


     

      
        <div className="col-md-7">
            
        <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Filtro de las sucursales</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.foo}
                onChange={handleChange}
                name="foo"
              />
            }
            label="Sucursales que obtienen ganancias entre $1,000 y $25,000"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.bar}
                onChange={handleChange}
                name="bar"
              />
            }
            label="Sucursales que obtienen ganancias mayores de $30,000"
          />
        </FormGroup>
      </FormControl>
    </div>
            <table className="table table-borderless table-stripped">
            <thead>
                <tr>
                    <th>Nombre Sucursal</th>
                    <th>Empleados</th>
                    <th>Ganancias</th>
                    <th>Mensaje</th>
                </tr>
            </thead>
            <tbody>
                { 
            
                    Object.keys(contactObjs).map(id=>{ 
                      
                    if(checked.foo===true){
                        if (contactObjs[id].ganancias>=1000 && contactObjs[id].ganancias<=25000 ){
                    return <>
                    <tr key={id}>
                   
                        <td>{contactObjs[id].sucursal}</td>
                        <td>{contactObjs[id].nempleados}</td>
                        <td>${contactObjs[id].ganancias }</td>
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
                        </>
                            } 
                        }

                    if(checked.bar===true){
                            if (contactObjs[id].ganancias>=30000){
                        return <>
                        <tr key={id}>
                       
                            <td>{contactObjs[id].sucursal}</td>
                            <td>{contactObjs[id].nempleados}</td>
                            <td>${contactObjs[id].ganancias }</td>
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
                            </>
                                } 
                            }
                         
                            }
                    )
                }
            </tbody>
            </table>
        </div>
        </div>
    </>
    )
}

export default Sucursales ;