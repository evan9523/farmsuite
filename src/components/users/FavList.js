import React from 'react'
import FavSummary from './FavSummary'
import { Link } from 'react-router-dom'

const FavList=({projects})=>{

return(
    <div className="user-list section">
    {projects  && projects.map(project =>{
        if(project.fav===true){

            return(
               <Link to={'/user/'+project.id}>
                    <FavSummary project={project} key={project.id}  />
               </Link>
                
            )
        }
        else{
            return null
        }
    })}
 </div>
)

}
export default FavList