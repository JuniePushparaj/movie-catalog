import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import AppStore from './reducers';
import thunk from 'redux-thunk';
import MovieCatalog from './components/MovieCatalog.jsx';

const store = createStore(AppStore,applyMiddleware(thunk));

const App = () => {
    return (
      <Provider store={store}>
        <div>
          <MovieCatalog/>
        </div>
      </Provider>
    );
  };
  export default App;
  ReactDOM.render(<App />, document.getElementById("app"));