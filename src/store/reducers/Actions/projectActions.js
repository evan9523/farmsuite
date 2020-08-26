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
    // const authorId = getState().firestore.data.farmers['04VWaeu8VMfW7LslfRAh'];
    // const seePath=getState().firestore.data.farmers[project]
    // console.log('This is see Path', seePath)
    // console.log(authorId); 
    // console.log(id)
    // console.log('Here is ID', id);
    // console.log(project[id])
 
    var firstName=project.ufName;
    var lastName = project.ulName;
    var address = project.address;
    var phone = project.phone;
    var crop = project.crop;
    console.log(firstName+ ' '+lastName)
    console.log(project)
    console.log(id);

    // firestore.collection('farmers').doc('04VWaeu8VMfW7LslfRAh').update({
    //   ufName:firstName,
    //   ulName:lastName,
    //   address:address,
    //   phone:phone,
    //   crop:crop
    // }).then(()=>{
    //   dispatch({type: 'EDIT_USER',project});
    // }).catch((err)=>{
    //   dispatch({type: 'EDIT_USER_ERROR',err});
    // })
     

    
    // firestore.collection('farmers').doc([project]).update({
    //   ufName:"TESTER",
    //   ulName:"LETS SEE",
    // }).then(()=>{
    //   dispatch({type: 'EDIT_USER',project});
    // })
    // .catch((err)=>{
    //       dispatch({type: 'EDIT_USER_ERROR',err});
    //   })
   
  
    //  var fav=false;
    // console.log(fav);
    // firestore.collection('farmers').add({
    //     ...project,
    //     authorFirstName: profile.firstName,
    //     authorLastName: profile.lastName,
    //     authorId: authorId,
    //     createdAt:new Date(),
    //     fav:fav

    // }).then(()=>{

    //     dispatch({type: 'CREATE_USER',project});
    // }).catch((err)=>{
    //     dispatch({type: 'CREATE_USER_ERROR',err});
    // })
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
    // firestore.collection('farmers').doc(dekha).update({
    //   ufName:firstName
    // })
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
