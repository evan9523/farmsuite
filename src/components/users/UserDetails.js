import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect} from 'react-redux-firebase'
import { compose } from 'redux'
import {deleteProject, toggleFavItem, editProject, newEdit} from '../../store/reducers/Actions/projectActions'
import EditUser from './EditUser'
import { getFirestore } from 'redux-firestore'

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
        console.log('reached edit')
    const { project,id } = props;
    setshowEditBox(!showEditBox);
    console.log('From handleEdit'+ id)
    console.log(project)
    
    // props.editProject(project,id);
    }

    const [firstName,setFirstName]=useState("");
    
    const [lastName,setLastName]=useState("");
    
    const [phone,setPhone]=useState("");
    
    const [address,setAddress]=useState("");
    
    const [crop,setCrop]=useState("");


    const handleChange=(e)=>{
        

        console.log('From EditUser.js')
        console.log(grab)

    }

    
    const handleSubmit=(e)=>{

       // console.log(this.state);
    //    var newData=[]
    //    newData = this.state;
   
   const {project,id}=props;
    console.log(firstName);
    console.log(lastName);
    console.log(phone);
    console.log(address);
    console.log(crop)
    
    
    getFirestore().collection('farmers').doc(id).update({
        ufName:firstName?firstName:project.ufName,
        ulName:lastName?lastName:project.ulName,
        phone:phone?phone:project.phone,
        address:address?address:project.address,
        crop:crop?crop:project.crop
    })

    
    

    
    
    
       // this.props.editProject(this.state)
       // this.props.history.push('/');
   }
//    console.log('Loggin Firstname: '+ firstName);
//    console.log('Loggin Lastname: '+ lastName);
//    console.log('Loggin Phone: '+ phone);
//    console.log('Loggin Address: '+ address);
//    console.log('Loggin Crop: '+ crop);
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
   <a class="waves-effect waves-light btn-small green lighten-1" onClick={()=>handleEdit()} style={{marginLeft:20}}><i class="material-icons left">create</i>Edit</a>
            <a class="waves-effect waves-light btn-small red darken-4" onClick={()=>handleDelete()} style={{marginLeft:20}}><i class="material-icons left">delete</i>Delete</a>
            </div>
        </div>
       
        
       {
           showEditBox?(
            <div className="container">
            <form className="white" onSubmit={()=>handleSubmit()}>
                <h5 className="grey-text text-darken-3">Edit Farmer details here</h5>
                <div className="input-field">
                    <label>Firstname</label>
                    <input type="text" onChange={e=>setFirstName(e.target.value)}></input>
                </div>
                <div className="input-field">
                    <label htmlFor="ulName">Lastname</label>
                    <input type="text" id="ulName" onChange={e=>setLastName(e.target.value)}></input>
                </div>
                <div className="input-field">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" id="phone" onChange={e=>setPhone(e.target.value)}></input>
                </div>
                <div className="input-field">
                    <label htmlFor="address">Address</label>
                   <textarea name="textarea" id="address" className="materialize-textarea"  onChange={e=>setAddress(e.target.value)}></textarea>
                </div>
                <div className="input-field">
                    <label htmlFor="crop">Crop</label>
                    <input type="text" id="crop" onChange={e=>setCrop(e.target.value)}></input>
                </div>
                <div className="input-field">
                    <button className="btn green accent-3 z-depth-0">Update Farmer</button>
                </div>
            </form>
        </div>
           ):null

        //  <EditUser project={project} key={project.id}/>
        //    ):null
        
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
        editProject:(project,old,id)=>dispatch(editProject(project,old,id)),
        toggleFavItem:(id)=>dispatch(toggleFavItem(id)),
        // newEdit:(id)=>dispatch(newEdit(id))
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