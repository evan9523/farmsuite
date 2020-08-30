import React,{Component} from 'react'
import Notifications from './Notifications'
import UserList from '../users/UserList'
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Redirect } from 'react-router-dom'
import FavList from '../users/FavList'

class Dashboard extends Component{
    render()
    {
        console.log(this.props);
        const {projects,auth}=this.props;
        if(!auth.uid) return <Redirect to='/signin'/>
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                    <span className="card-title" style={{fontSize:32,marginLeft:-5}}>All Farmers</span>
                        <UserList projects={projects}/>
                    </div>
                    <div className="col s12 m5 offset-m1">
                    <span className="card-title" style={{fontSize:32,marginLeft:-5}}>Favourites</span>
                        <FavList projects={projects}/>
                        </div>
                </div>
            </div>
        )
    }
}

const mapperState=(state)=>{
    console.log(state)
    return{
        projects:state.firestore.ordered.farmers,
        auth:state.firebase.auth
    }
}

export default compose(
    
    connect(mapperState),
    firestoreConnect([
        {collection: 'farmers', orderBy:['createdAt','desc']}
    ])
    )(Dashboard)