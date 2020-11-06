/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState, useEffect} from "react";
import PeopleIcon from '@material-ui/icons/People';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

const SucursalesForm = (props) =>{
    const classes = useStyles();



    const initialFieldValue={
        sucursal: '',
        ganancias: 0,
        nempleados: 0,
        estado: ''
        }

    const [values,setValues]= useState(initialFieldValue);

const handleInputChange = e =>{
    const {name, value} = e.target ;
    setValues({...values, [name]: value  
    });
}

const handleFormSubmit = e =>{
    e.preventDefault();
   
    //EVALUANDO ANTES DEL SUBMIT
    if(values.ganancias>=30000)
    values.estado="Excelente Trabajo"
    else
    values.estado="Bueno Trabajo"


   props.addOrEdit(values);
    setValues({...initialFieldValue});
}

useEffect(()=>{
if (props.currentId ==='')
    setValues({...initialFieldValue})
else

setValues({...props.contactObjs[props.currentId], values})
},[props.currentId, props.contactObjs])


return (
<>
<form className={classes.container} noValidate onSubmit={handleFormSubmit}>
    <div className="form-group input-group">

    <div className="input-group-prepend">
        <div className="input-group-text">
           <PeopleIcon/>
    </div>
    </div>
    <div className="container">
    <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id=""
              value={values.sucursal}
              onChange={handleInputChange}
              label="Nombre de la sucursal"
              name="sucursal"
              
            />
    </div>
  

  
    <div className="input-group-prepend">
        <div className="input-group-text">
           <PeopleIcon/>
    </div>
    </div>
    <div className="container">
    <TextField 
    type="number"
    margin="normal"
    fullWidth
    name="nempleados"
    value={values.nempleados}
    defaultValue="10"
    onChange={handleInputChange}
    label="Numero de empleados"
    InputProps={{
        inputProps: { 
           min: 10 
        }
    }}
    />
    </div>

    <div className="input-group-prepend">
        <div className="input-group-text">
           < MonetizationOnIcon/>
    </div>
    </div>
    <div className="container">

    <TextField 
    type="number"
    margin="normal"
    fullWidth
    name="ganancias"
    value={values.ganancias}
    defaultValue="10"
    onChange={handleInputChange}
    label="Ganancias"
    InputProps={{
        inputProps: { 
           min: 1000 
        }
    }}
    />


    </div>
    
    <div className="form-group">
    <input type="submit" value = {props.currentId === '' ? "Guardar":"Modificar"} className="btn btn-primary btn-block" />
    </div>

    </div>
   </form>


</>
    );

}

export default SucursalesForm ;