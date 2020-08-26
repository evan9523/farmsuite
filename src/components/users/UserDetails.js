import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect} from 'react-redux-firebase'
import { compose } from 'redux'
import {deleteProject, toggleFavItem, editProject, newEdit} from '../../store/reducers/Actions/projectActions'
import EditUser from './EditUser'

 const UserDetails= (props)=> {
    //  const id= props.match.params.id;
    //  console.log(props)

    const [showEditBox, setshowEditBox] = useState(false);
    const [fav, setfav] = useState(true);
    const [grab,setGrab]=useState('')
    
    const toggleFav=()=>{
        // console.log(project.fav)
        setfav(!fav)
        const { id } = props;
        // console.log(props);
        
        // // // e.preventDefault();
       
        

        props.toggleFavItem(id);
        console.log('jell')
        // // alert('Deleted')
        props.history.push('/');
        
       
    }
    const handleDelete=(e)=>{
        // alert('Delete Working')
        const { id } = props;
        console.log(props);
        
        // e.preventDefault();
        props.deleteProject(id);
        // alert('Deleted')
        props.history.push('/');
        // you can push to dashboard after deleting...
    }
    const toggleEditView=()=>{
        setshowEditBox(!showEditBox);
        const { id } = props;
    //     // console.log(props);
        // props.editProject(id);
    }
   
    const {project}=props;
    const handleEdit=()=>{
        // alert('Peyechi')
    //    console.log('Reached HandleEdit');
       
    //    editProject()
        const { id } = props;
    //     // console.log(props);
    setshowEditBox(!showEditBox);
    props.newEdit(id);
        // props.editProject(project,id);
        // console.log(props)

      
        // props.history.push('/edit/'+id);
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
                    {project.ufName} {project.ulName}
                </span>
                
                <p>
                    {project.phone}

                </p>
                <p>
                    {project.address}
                </p>
                <p>
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
        {/* <a class="waves-effect waves-light btn-small pink darken-2" onClick={()=>toggleFav()} ><i class="material-icons left">favorite</i>Mark as Favourite</a> */}
          
            {/* <a class="waves-effect waves-light btn-small" onClick={()=>handleEdit()} style={{marginLeft:20}}><i class="material-icons left">create</i>Edit</a> */}
            {/* {
                showEditBox?(
                    <a class="waves-effect waves-light btn-small" onClick={()=>handleEdit()} style={{marginLeft:20}}><i class="material-icons left">save</i>Save</a>   
                ):(
                    <a class="waves-effect waves-light btn-small" onClick={()=>handleEdit()} style={{marginLeft:20}}><i class="material-icons left">create</i>Edit</a>
                )
            } */}
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

// const mapDistpacthToProps = (state,dispatch,ownProps) => {
// console.log(state)
//     // const id= ownProps.match.params.id;
//     // const projects = state.firestore.data.farmers;
//     // const project = projects?projects[id]:null
//     // console.log('From Delete' +id)
//     return {
//         deleteProject: (id) => dispatch(deleteProject(id))
//     }
// }
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