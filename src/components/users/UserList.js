import React from 'react'
import UserSummary from './UserSummary'
import { Link } from 'react-router-dom'

const UserList=({projects})=>{
    return(
        <div className="user-list section">
           {projects && projects.map(project =>{
               return(
                  <Link to={'/user/'+project.id}>
                       <UserSummary project={project} key={project.id}  />
                  </Link>
                   
               )
           })}
        </div>
    )
}

export default UserList