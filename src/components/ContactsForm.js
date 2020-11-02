import React,{useState, useEffect} from "react";
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'
import PeopleIcon from '@material-ui/icons/People';
import FingerprintIcon from '@material-ui/icons/Fingerprint';


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

const ContactsForm = (props) =>{
    const classes = useStyles();


    const initialFieldValue={
        fullname: '',
        dui: '',
        matricula: '',
        reparacion: '',
        fecha_reparacion: '',
        }

    const [values,setValues]= useState(initialFieldValue);

const handleInputChange = e =>{
    const {name, value} = e.target ;
    setValues({...values,[name]: value});
}

const handleFormSubmit = e =>{
    e.preventDefault();

   props.addOrEdit(values);
    setValues({...initialFieldValue});
}

useEffect(()=>{
if (props.currentId ==='')
    setValues({...initialFieldValue})
else
setValues({
    ...props.contactObjs[props.currentId]
})
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
    <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fullname"
              value={values.fullname}
              onChange={handleInputChange}
              label="Nombre completo"
              name="fullname"
              autoFocus
            />
    </div>


    <div className="form-group input-group">
        <div className="input-group-prepend">
            <div className="input-group-text">
            <FingerprintIcon/>
        </div>
    </div>
    <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="dui"
              value={values.dui}
              onChange={handleInputChange}
              label="Documento Único de Identidad"
              name="dui"
              autoFocus
            />


    </div>


    <div className="form-group input-group">
        <div className="input-group-prepend">
            <div className="input-group-text">
           <DirectionsCarIcon/>
        </div>
    </div>
    <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="matricula"
              value={values.matricula}
              onChange={handleInputChange}
              label="Matricula"
              name="matricula"
              autoFocus
            />
    </div>


    <div className="form-group input-group">
        <div className="input-group-prepend">
            <div className="input-group-text">
            <i className="fas fa-home"></i>
        </div>
    </div>
    <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="reparacion"
              value={values.reparacion}
              onChange={handleInputChange}
              label="Costo de reparación"
              name="reparacion"
              autoFocus
            />
    </div>

    <div className="form-group input-group">
        <div className="input-group-prepend">
            <div className="input-group-text">
            <i className="fas fa-home"></i>
        </div>
    </div>
    <TextField
        id="fecha_reparacion"
        name="fecha_reparacion"
        label="Fecha de reparación"
        type="date"
        defaultValue="2020-10-01"
        value={values.fecha_reparacion}
        onChange={handleInputChange}
        className={classes.textField}
        InputLabelProps={{
        shrink: true,
        }}
      />
    </div>
     
    <div className="form-group">
    <input type="submit" value = {props.currentId === '' ? "Save":"Update"} className="btn btn-primary btn-block" />
    </div>

   </form>
</>
    );

}

export default ContactsForm ;