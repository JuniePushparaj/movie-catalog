import BaseConfig from '../config/base-config';
import axios from 'axios';
export default class SearchClient{
    constructor(){
        this.baseUrl = `${BaseConfig.searchService.host}?i=${BaseConfig.searchService.i}&apikey=${BaseConfig.searchService.apikey}`;
    }

    search(text, page){
        return axios(`${this.baseUrl}&s=${text}&page=${page}`)
        .then(response=>response.data)
        .catch((error)=>{
            return new Promise.reject(error);
        });
    }
}