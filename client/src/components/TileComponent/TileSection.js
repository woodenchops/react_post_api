import React, { Fragment, useContext } from 'react';
import {TileContext} from '../../contexts/tileContext';
import Tile from './Tile';



const TileSection = () => {

     const {tiles} = useContext(TileContext);
    
        let tile = tiles.map((item, index) => (
            <Tile item={item} index={index} key={index} slug={item.slug}/>
        ));

        return (
            <Fragment>
                {tile}
            </Fragment> 
         );
    
}


 
export default TileSection;