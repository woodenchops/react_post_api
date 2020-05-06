import React, {useContext} from 'react';
import { TileContext } from '../../contexts/tileContext';

const TileLoadMore = () => {

    const {loadTiles} = useContext(TileContext);
    return (
        <div className="tile-load-more-container">

        <button className="tile-load-more"  
            onClick={() => {
                loadTiles();
            }}>
            LOAD MORE
            </button>

        </div>

     

     );
}
 
export default TileLoadMore;