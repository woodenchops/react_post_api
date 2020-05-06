const express = require('express');
const Post = require('../models/PostModel');
const ErrorResponse = require('../utils/errorResponse');
const router = express.Router();


router.get('/', (req, res) => {

  const pagination = req.query.pagination ? parseInt(req.query.pagination) : 8;
  const page = req.query.page ? parseInt(req.query.page) : 1;
    Post.find()
      .skip((page - 1) * pagination)
      .limit(pagination)
      .then(posts => res.json(posts))
      .catch(err => res.status(400).json('Error:' + err));        
});



router.post('/add', async (req, res) => {
  try {
    const post = new Post({
      slug: req.body.slug,
      title: req.body.title,
      body: req.body.body,
      isActive: req.body.isActive,
      image: req.body.image,
      cta: req.body.cta
  });

 const savedPost = await post.save();
 res.json({success: true, msg: 'Post added', data: savedPost});
 
  } catch (error) {
    // console.log(`Error posting: ${error}`);
    console.log(new ErrorResponse(error));
    res.status(400).json({success: false, msg: `Something went wrong... ${error}`})
  } 
});


router.get('/:slug', (req, res) => {

  Post.find({slug: req.params.slug})
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Err ' + err))
   
});


module.exports = router;