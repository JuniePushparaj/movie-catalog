import SearchClient from '../service-clients/SearchClient';
import _ from 'lodash';

const searchRequest = ()=>({type: 'SEARCH_REQUEST'});

const searchSuccess = (movies)=>({
    type: 'SEARCH_SUCCESSFUL',
    movies
});

const searchFailed = (errorMsg) =>({
    type: 'SEARCH_FAILED',
    errorMsg
});

export const search = (text, page) => {
    const searchClient = new SearchClient();
    return (dispatch) => {
        dispatch(searchRequest());
        searchClient.search(text, page)
        .then(result => {
            if (!_.has(result, 'Error')) {
                dispatch(searchSuccess(result));
            }
            else{
                dispatch(searchFailed('Movie not found!'));
            }
        })
        .catch(()=>{
            dispatch(searchFailed('Oops something went wrong!'));
        })
    }
}