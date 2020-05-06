import React, {useContext} from 'react';
import {TileContext} from '../../contexts/tileContext'; 

const NavBar = () => {
    const {tiles} = useContext(TileContext);
    return ( 
        <div>
            <h1>Total number of tiles: {tiles.length}</h1>
        </div>
     );
}
 
export default NavBar;
