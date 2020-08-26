import React from 'react'
import {NavLink,Link} from 'react-router-dom'
import {signOut} from '../../store/reducers/Actions/authActions'
import { connect } from 'react-redux'

const SignedinLinks=(props)=>{
    
    return(
        <ul className="right">
            <li><NavLink to='/create'>Add User</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/' className='btn btn-floating green accent-3'>
            {props.profile.initials}    
             </NavLink></li>

        </ul>

    )
}

const mapDispatchToProps= (dispatch)=>{
    return{
        signOut :()=>dispatch(signOut())
    }

}

export default connect(null,mapDispatchToProps)(SignedinLinks);