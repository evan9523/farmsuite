import React, { Component } from 'react'
import {  Redirect } from 'react-router-dom'
import { connect} from 'react-redux'
import {signin, signUp} from '../../store/reducers/Actions/authActions'


 class SignUp extends Component {
     state={
        email:'',
        password:'',
        firstName:'',
        lastName:''

     }

     handleChange=(e)=>{
         this.setState({
             [e.target.id]:e.target.value
         })
     }

     
     handleSubmit=(e)=>{
        e.preventDefault();
        this.props.signUp(this.state)
    }
    render() {
        const {auth,authError} = this.props;
        if(auth.uid) return <Redirect to='/'/>
        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="firstName">Firstname</label>
                        <input type="text" id="firstName" onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Lastname</label>
                        <input type="text" id="lastName" onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <button className="btn green accent-3 z-depth-0">Get Started</button>
                    </div>
                    <div className="red-text center">
                        {authError?
                        <p>{authError}</p>:null
                        }

                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
return{
    signUp: (newUser)=>dispatch(signUp(newUser))
}
}

const mapStateToProps = (state)=>{
    return{
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)
