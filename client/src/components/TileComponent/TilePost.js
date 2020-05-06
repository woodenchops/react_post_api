import React, {useContext, useEffect, useState} from 'react';
import {TileContext} from '../../contexts/tileContext';
import {Link} from 'react-router-dom';


const TilePost = (props) => {

    const {fetchData} = useContext(TileContext);
    let [post, setpost] = useState([]);
    let [loading, setloading] = useState(true);
    let urlParam = props.match.params.slug;
    useEffect(() => {
        fetchData(`http://localhost:5000/api/posts/${urlParam}`)
            .then( (res) => {
               setpost(res);
               setloading(false);
            }).catch((err) => {
                console.log(err);
            })
    }, [fetchData, urlParam])

    let standAlonePost = (post.length > 0) ? post.map((item, index) => (
        <div className="post" key={index}>
            {(item.title) ? (<h3>{item.title}</h3>) : (<h3>This post doesn't have a title</h3>)}
            {(item.body) ? (<p>{item.body}</p>) : (<p>This post doesn't have text content</p>)}
            {(item.image) && (<img src={item.image.src} alt={item.image.alt}/>)} 
            {(item.cta) && (
                    <div className="single-post__cta-container">
                        <a href={item.cta.link} className="single-post__cta">Book now</a>
                    </div>
                )}
        </div>
    )) : (
        <div className="err no-post">
        <p>{`Looks like there is no post... "${urlParam}"`}</p>
        <div className="single-post__cta-container">
             <Link to="/" className="single-post__cta">Go back to homepage</Link>
        </div>
    </div>
    )

    return(

        <div className="single-post">
            <h1>single post</h1>

            {loading ? (<p>...loading</p>) : (standAlonePost)}
        
        </div>

    )
}

export default TilePost;