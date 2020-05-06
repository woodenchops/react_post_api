import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {TileProvider} from './contexts/tileContext';

import './App.css';
import TileComponent from './components/TileComponent/TileComponent';
import TilePost from './components/TileComponent/TilePost';
import AddPost from './components/TileComponent/AddPost';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TileProvider>
          <Switch>

            <Route exact path="/" component={TileComponent}/>
            <Route path="/post/:slug" component={TilePost}/>
            <Route path="/add-post" component={AddPost} />

          </Switch>
        </TileProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
