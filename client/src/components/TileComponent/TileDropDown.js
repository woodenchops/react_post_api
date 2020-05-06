import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const TileDropDown = ({image, title, body, cta, slug}) => {
 
    return ( 
        <div className="tile__dropdown">
            <div className="tile_dropdown-child tile_dropdown-child--image">
                 {(image.src) ? (<img src={image.src} alt={image.alt}/>) : ''}
            </div>
            <div className="tile_dropdown-child tile_dropdown-child--text">
                <h3>{title}</h3>
                <p>{body}</p>
                {(cta.text) ? (<Link to={'/post/' + slug} className="tile_dropdown-child--cta">{cta.text}</Link>) : ''}
            </div>
        </div>
     );
}

TileDropDown.propTypes = {
    image: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    cta: PropTypes.object.isRequired
  }
 
export default TileDropDown;