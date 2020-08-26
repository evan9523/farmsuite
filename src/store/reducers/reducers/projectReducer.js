const initState={
    users:[
        {
            id:1,
            ufName:"Evan",
            ulName:'Chatterjee',
            phone:'9176689903',
            address:'Sneha apartment Kolkata',
            crop:'rice'
        },
        {
            id:2,
            ufName:"Langur",
            ulName:'Chatterjee',
            phone:'917489903',
            address:'New Jersey',
            crop:'wheat'
        },
        {
            id:3,
            ufName:"Jhingur",
            ulName:'Chatterjee',
            phone:'9176689903',
            address:'Sneha apartment Kolkata',
            crop:'rice'
        },
    ]
}

const projectReducer=(state=initState,action)=>{
switch (action.type){
    case 'CREATE_USER':
        console.log('created user', action.project);
        return state;

    case 'CREATE_USER_ERROR':
        console.log('catch user error', action.err);
        return state;

        case 'DELETE_PROJECT':
            console.log('delete project');
            return state;
        case 'DELETE_PROJECT_ERROR':
            console.log('edit project error', 'state: ', state, 'action: ', action.project);
            return state;
    case 'EDIT_USER':
            console.log('edited project');
            return state;
        case 'EDIT_USER_ERROR':
            console.log('edit project error', 'state: ', state, 'action: ', action.project);
            return state;         
            
            
        
    default:
        return state    
}


}

export default projectReducer