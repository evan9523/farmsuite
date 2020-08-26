import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect} from 'react-redux-firebase'
import { compose } from 'redux'
import {deleteProject, toggleFavItem, editProject, newEdit} from '../../store/reducers/Actions/projectActions'
import EditUser from './EditUser'

 const UserDetails= (props)=> {
    const [showEditBox, setshowEditBox] = useState(false);
    const [fav, setfav] = useState(true);
    const [grab,setGrab]=useState('')
    
    const toggleFav=()=>{
        setfav(!fav)
        const { id } = props;
        props.toggleFavItem(id);
        console.log('jell')
        props.history.push('/');
        
       
    }
    const handleDelete=(e)=>{
        const { id } = props;
        console.log(props);
        props.deleteProject(id);
        props.history.push('/');
    }
    const toggleEditView=()=>{
        setshowEditBox(!showEditBox);
        const { id } = props;
    }
   
    const {project}=props;


    const handleEdit=()=>{
    const { id } = props;
    setshowEditBox(!showEditBox);
    props.newEdit(id);
    }

    const handleChange=(e)=>{
      
        setGrab(e)
        console.log(setGrab)
    }
    if(project){
        return(

        <div className="container section user-details">
            
        <div className="card z-depth">
            <div className="card-content">
                <span className="card-title">
            
                <span class="material-icons" style={{color:"#311b92"}}>account_circle</span>
                
                    {project.ufName} {project.ulName}
                </span>
                
                <p>
                <span class="material-icons" style={{color:"#311b92"}}>call</span>
                    {project.phone}

                </p>
                <p>
                <span class="material-icons" style={{color:"#311b92"}}>location_on</span>
                    {project.address}
                </p>
                <p>
                <span class="material-icons" style={{color:"#311b92"}}>eco</span>
                    {project.crop}
                </p>


            </div>
            <div className="card-action grey lighten-4 grey-text">
        <div>Added by {project.authorFirstName} {project.authorLastName}</div>
       
       {fav && project.fav===false?
       ( <a class="waves-effect waves-light btn-small  indigo darken-3" onClick={()=>toggleFav()} ><i class="material-icons left">favorite_border</i>Mark as Favourite</a>):
       fav && project.fav===true?
       ( <a class="waves-effect waves-light btn-small pink darken-2" onClick={()=>toggleFav()} ><i class="material-icons left">favorite</i>Unmark Favourite</a>):
       (<p>Awesome ! Now lets see the changes</p>)
        }

            <a class="waves-effect waves-light btn-small red darken-4" onClick={()=>handleDelete()} style={{marginLeft:20}}><i class="material-icons left">delete</i>Delete</a>
            </div>
        </div>
       
        
       {
           showEditBox?(

         <EditUser project={project} key={project.id}/>
           ):null
       } 
    </div>
    
        )
    }
    else{

        return (
            
         <div className="container center">
             <p>Fetching User Details...</p>
         </div>  
        )
    }
}

const mapStateToProps=(state, ownProps)=>{
    console.log(state);
    const id= ownProps.match.params.id;
    const projects = state.firestore.data.farmers;
    const project = projects? projects[id]:null
    return{
        project:project,
        id:id
    }
}

const mapDistpacthToProps = (dispatch) => {
    return {
        deleteProject: (id) => dispatch(deleteProject(id)),
        editProject:(project,id)=>dispatch(editProject(project,id)),
        toggleFavItem:(id)=>dispatch(toggleFavItem(id)),
        newEdit:(id)=>dispatch(newEdit(id))
    }
}

export default compose(
    connect(mapStateToProps,mapDistpacthToProps),
    firestoreConnect([
        {
            collection:'farmers'
        }
    ])
)(UserDetails)