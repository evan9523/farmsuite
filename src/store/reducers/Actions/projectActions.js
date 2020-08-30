import { useState } from "react";

export const createProject =(project)=>{
    return(dispatch,getState,{ getFirebase,getFirestore })=>{

        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        console.log(authorId); 
       
      
         var fav=false;
        console.log(fav);
        firestore.collection('farmers').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt:new Date(),
            fav:fav

        }).then(()=>{

            dispatch({type: 'CREATE_USER',project});
        }).catch((err)=>{
            dispatch({type: 'CREATE_USER_ERROR',err});
        })
    }
};


export const toggleFavItem =(id)=>{
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    var notun = getState().firestore.data.farmers[id].fav;
    console.log('Here is ID', id)
    if(notun===true){
      console.log('found new')
      console.log(notun)
      firestore.collection('farmers').doc(id)
        .update({
          fav:false
        })
        .then(() => console.log('reached'))
          .catch(() => {
         console.log('Not Reached')
      })
    }
    if(notun===false){
      //console.log('Not Found')
      console.log('Not Found')
      console.log(notun)
      firestore.collection('farmers').doc(id)
        .update({
          fav:true
        })
        .then(() => console.log('reached'))
          .catch(() => {
         console.log('Not Reached')
      })
    }
  }
}

export const editProject =(project, id)=>{
  return(dispatch,getState,{ getFirebase,getFirestore })=>{

    const firestore = getFirestore();
    const profile = getState().firebase.profile;
 
    var firstName=project.ufName;
    var lastName = project.ulName;
    var address = project.address;
    var phone = project.phone;
    var crop = project.crop;
    // console.log(firstName+ ' '+lastName)
    // console.log(project)
    // console.log(id);
    var newArray=[]
    newArray = project;
    console.log(newArray,id)
    firestore.collection('farmers').doc(id).update({
      project:newArray
    }).then(()=>{
      console.log('project Updated successfully')
    }).catch(err=>{
      console.log('Error',err)
    })
}
}

export const newEdit=(id)=>{
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const v= firestore.collection('farmers').doc(id).get();
    console.log(id)
    const dekha=id.toString();
    console.log(dekha)
    var firstName = getState().firestore.data.farmers[id].ufName;
    var lastName = getState().firestore.data.farmers[id].ulName;
    var address = getState().firestore.data.farmers[id].address;
    var phone = getState().firestore.data.farmers[id].phone;
    var crop = getState().firestore.data.farmers[id].crop;
    console.log(firstName+ ','+ lastName+','+address+','+phone+','+crop)
    console.log(dekha)
  }
}


export const deleteProject = (id) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      
      firestore.collection('farmers').doc(id)
        .delete()
        .then(() => {
          dispatch({ type: 'DELETE_PROJECT', id })
        }).catch(err => {
          dispatch({ type: 'DELETE_PROJECT_ERROR', err })
      })
    }
  };
