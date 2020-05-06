import React from 'react';
import TileDropDown from './TileDropDown';
import TileThumbnail from './TileThumbnail';
import PropTypes from 'prop-types';


const Tile = ({item, index, slug}) => {
    return ( 

        <div className={"tile-section " + (item.isActive ? "tile-section--active-tile" : "")} aria-label={(item.isActive) ? (`${item.title} is open`) : (`${item.title} is closed`) } aria-live="assertive">
                <TileThumbnail title={item.title} image={item.image} index={index}/>
                <TileDropDown title={item.title} body={item.body} image={item.image} cta={item.cta} index={index} slug={slug} /> 
        </div>


     );
}

Tile.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
  }
 
export default Tile;