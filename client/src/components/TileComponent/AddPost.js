import React, {useEffect, useState} from 'react';

const AddPost = () => {

    let [success, setSuccessOrFail] = useState('')

    let [postSuccess, setPostSuccess] = useState(null);

    // let [tileCount, setTileCount] = useState(0);

    let [post, setPost] = useState({
        title: '',
        body: '',
    });

    let [postImage, setPostImage] = useState({
        src: '',
        alt: '',
    });

    let [postCta, setPostCta] = useState({
        text: '',
        link: '',
    });


    useEffect(() => {
        fetch("http://localhost:5000/api/posts")
            .then((res) => {
               return res.json();
            })
            .then((res) => {
                // setTileCount(res.length);
                console.log("DB length:", res);
            })
    }, []) 

    const onSubmit = (e) => {
        e.preventDefault();

         fetch("http://localhost:5000/api/posts/add", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
                body: JSON.stringify({
                    title: post.title,
                    body: post.body,
                    isActive: false,
                    image: {
                        src: postImage.src.trim() || null,
                        alt: postImage.alt.trim() || null
                    },
                    cta: {
                        text: postCta.text.trim() || null,
                        link: postCta.link.trim() || null
                    }
                })
            })
            .then( (response) => { 
                return response.json();
            }).then((response) => {
                
                console.log('res:', response);
                setPostSuccess(response.msg);
                setSuccessOrFail(response.success);
                setPost({
                    title: '',
                    body: ''
                });
          
                setPostImage({
                    src: '',
                    alt: ''
                });
          
                setPostCta({
                    text: '',
                    link: ''
                });

            })

    }



    const updateField = e => {
        setPost({
          ...post,
          [e.target.name]: e.target.value
        });

        setPostImage({
            ...postImage,
            [e.target.name]: e.target.value
          });

          setPostCta({
            ...postCta,
            [e.target.name]: e.target.value
          });
      };


      const postNotification = () => {
            return (postSuccess) && (<h3 className={(success) ? (`post-added-success`) : (`post-added-fail`)}>{postSuccess}</h3>)
      }

        return ( 
            <div className="form-container" onSubmit={onSubmit}>
                {postNotification()}
                <h1>Add new post</h1>
                <form>
                <div class="form-group">
                    <label htmlFor="title">Add Title</label>
                    <input type="text" id="title" name="title" className="text-muted" value={post.title} onChange={updateField}/>
                </div>
                <div class="form-group">
                    <label htmlFor="body">Add Body</label>
                    <textarea name="body" id="body" value={post.body} onChange={updateField}></textarea>
                </div>
                <div class="form-group">
                    <label htmlFor="image-src">Image Src</label>
                    <input type="text"  name="src" value={postImage.src} onChange={updateField}/>
                </div>
                <div class="form-group">
                    <label htmlFor="">Image Alt</label>
                    <input type="text" name="alt" value={postImage.alt} onChange={updateField}/>
                </div>
                <div class="form-group">
                    <label htmlFor="">CTA text</label>
                    <input type="text" name="text" value={postCta.text} onChange={updateField}/>
                </div>
                <div class="form-group">
                    <label htmlFor="">CTA link</label>
                    <input type="text" name="link" value={postCta.link} onChange={updateField}/>
                </div>
                    <button className="btn btn-primary">Submit</button>
                </form>

            </div>
         );
    
}
 
export default AddPost;