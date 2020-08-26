import React, { Component } from 'react'
import {connect} from 'react-redux'
import {newEdit} from '../../store/reducers/Actions/projectActions'
import {  Redirect } from 'react-router-dom'

 class EditUser extends Component {
     state={
        id:'',
        ufName:'',
        ulName:'',
        phone:'',
        address:'',
        crop:''

     }

     handleChange=(e)=>{
         this.setState({
             [e.target.id]:e.target.value
         })
         console.log('From EditUser.js')
     }

     
     handleSubmit=(e)=>{
        e.preventDefault();
        console.log(this.state);
        this.props.newEdit(this.state)
        // this.props.history.push('/');
    }
    render() {

        const {auth} = this.props;
        if(!auth.uid) return <Redirect to='/signin'/>
        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Edit user details here</h5>
                    <div className="input-field">
                        <label htmlFor="ufName">Firstname</label>
                        <input type="text" id="ufName" onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <label htmlFor="ulName">Lastname</label>
                        <input type="text" id="ulName" onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" id="phone" onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <label htmlFor="address">Address</label>
                       <textarea name="textarea" id="address" className="materialize-textarea"  onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-field">
                        <label htmlFor="crop">Crop</label>
                        <input type="text" id="crop" onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <button className="btn green accent-3 z-depth-0">Update User</button>
                    </div>
                </form>
            </div>
        )
    }
    
}



const mapStateToProps = (state)=>{
    return{
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        newEdit:(id)=>dispatch(newEdit(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EditUser)
