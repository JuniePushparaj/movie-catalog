const AppStore = (state = {}, action) =>{
    if(action.type === 'SEARCH_REQUEST'){
        return Object.assign({},state,{
            isFetching: true
        });
    }
    if(action.type === 'SEARCH_SUCCESSFUL'){
        return Object.assign({},state,{
            movies:action.movies,
            errorMsg: '', 
            isFetching: false
        });
    }
    if(action.type === 'SEARCH_FAILED'){
        return Object.assign({},state,{
            isFetching: false,
            errorMsg:action.errorMsg,
            movies:[]
        })
    }
    return state;
}

export default AppStore;