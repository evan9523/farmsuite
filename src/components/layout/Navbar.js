import React from 'react'
import {Link} from 'react-router-dom'
import SignedinLinks from './SignedInLinks'
import SignedoutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar=(props)=>{
    const {auth,profile}=props;



const links = auth.uid?<SignedinLinks profile={profile}/>:<SignedoutLinks/>;
    return(
        <nav className="nav-wrapper deep-purple accent-4">
            <div className="container">
             

                <Link to='/' className="brand-logo left" >FarmSuite</Link>
                
                {links}
            </div>
        </nav>

    )
}

const mapStateToProps=(state)=>{
    console.log(state)
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}
export default connect(mapStateToProps)(Navbar);