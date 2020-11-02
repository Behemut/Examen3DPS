import React,{useState, useEffect} from "react";

import DirectionsCarIcon from '@material-ui/icons/DirectionsCar'

const AutomovilesForm = (props) =>{

    const initialFieldValue={
        fullname: '',
        mobile: '',
        email: '',
        address: ''
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
   <form autoComplete="off" onSubmit={handleFormSubmit}>
    <div className="form-group input-group">
        <div className="input-group-prepend">
            <div className="input-group-text">
            <i className="fas fa-user"></i>
        </div>
    </div>
    <input className="form-control" placeholder="Full Name" name="fullname" value={values.fullname} 
    onChange={handleInputChange}></input>
    </div>


    <div className="form-group input-group">
        <div className="input-group-prepend">
            <div className="input-group-text">
            <i className="fas fa-mobile"></i>
        </div>
    </div>
    <input className="form-control" placeholder="Mobile" name="mobile" value={values.mobile}
     onChange={handleInputChange} ></input>
    </div>


    <div className="form-group input-group">
        <div className="input-group-prepend">
            <div className="input-group-text">
           <DirectionsCarIcon/>
        </div>
    </div>
    <input className="form-control" placeholder="Email" name="email" value={values.email}
      onChange={handleInputChange} ></input>
    </div>


    <div className="form-group input-group">
        <div className="input-group-prepend">
            <div className="input-group-text">
            <i className="fas fa-home"></i>
        </div>
    </div>
    <input className="form-control" placeholder="Address" name="address" value={values.address}
      onChange={handleInputChange} ></input>
    </div>

    <div className="form-group">
    <input type="submit" value = {props.currentId === '' ? "Save":"Update"} className="btn btn-primary btn-block" />
  
    </div>

   </form>


</>
    );

}

export default AutomovilesForm;