import React, { useState } from 'react'

const FavSummary=({project})=>{

    const id=project.id

    return(
        <div className="card z-depth-0 user-summary">
                <div className="card content grey-text text-darken-3">
                <div className="card-action pink accent-3 grey-text">
                <span class="material-icons" style={{color:"#fff"}}>sentiment_satisfied_alt</span>
    <span className="card-title" style={{color:"#fff"}}> {project.ufName} {project.ulName}</span>
    <div style={{color:"#fff"}}><span class="material-icons">call</span>{project.phone}</div>
                </div>
                <div className="card-action pink accent-3 grey-text">
    <div style={{color:"#fff"}}><span class="material-icons">location_on</span>{project.address}</div>
    <div style={{color:"#fff"}}><span class="material-icons">eco</span>{project.crop}</div>
                </div>
                <div className="card-action pink accent-3 grey-text">
    <div style={{color:"#fff"}}>
    <span class="material-icons">create</span>
        Posted by {project.authorFirstName} {project.authorLastName}</div>
   
    
                </div>
            
                </div>
            </div>
    )
}

export default FavSummary