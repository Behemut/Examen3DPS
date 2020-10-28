import React,{useState, useEffect} from "react";

const ContactsForm = (props) =>{

    const initialFielValue={
        fullname: '',
        mobile: '',
        email: '',
        address: '',
        }

        var  [values,setValues]= useState(initialFielValue)

const handleInputChange = e =>{
    var {name, value} =e.target 

    setValues({
        ...values,
        [name]: value
    });
}

const handleFormSubmit = e =>{
    e.preventDefault();

    props.addOrEdit(values);
}


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
            <i className="fas fa-envelope"></i>
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

    <div className="form-group input-group">
        <div className="input-group-prepend">
            <div className="input-group-text">
            <i className="fas fa-home"></i>
        </div>
    </div>
    <div className="form-control">
    <input type="submit" value="Save" className="btn btn-primary btn-block"></input>
    </div>
    </div>


   </form>


</>
    );

}

export default ContactsForm ;