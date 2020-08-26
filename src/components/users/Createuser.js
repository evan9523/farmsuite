import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createProject} from '../../store/reducers/Actions/projectActions'
import {  Redirect } from 'react-router-dom'

 class CreateUser extends Component {
     state={
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
     }

     
     handleSubmit=(e)=>{
        e.preventDefault();
        // console.log(this.state);
        this.props.createProject(this.state)
        this.props.history.push('/');
    }
    render() {

        const {auth} = this.props;
        if(!auth.uid) return <Redirect to='/signin'/>
        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Add New User</h5>
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
                        <button className="btn green accent-3 z-depth-0">Create User</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        auth: state.firebase.auth
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        createProject:(project)=>dispatch(createProject(project))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CreateUser)
