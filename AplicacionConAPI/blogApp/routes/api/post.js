const router = require('express').Router();
/* Importing the functions from the `post.model.js` file. */
const { createPost, getPostAll, getPostById, deletePostById, deletePostAll, updatePostById, getPostByAuthor } = require("../../models/post.model");
/* This is destructuring the checkSchema function from the express-validator module. */
const { checkSchema } = require("express-validator");
const { newPost, updatePost, checkError, checkPost, checkAuthor } = require("../../helpers/validators");

/**
 * CREATE NEW POST
 * 
 * Creating a new post.
 */
router.post("/new", checkSchema(newPost), checkError, checkAuthor, async (req, res) => {
    const newpost = req.body;
    try {
        /* Creating a new post. */
        const result = await createPost(newpost);
        const post = await getPostById(result.insertId);
        /* Sending the response to the client. */
        res.json(post);
        // res.send('CREATE NEW POST');
    } catch (error) {
        /* Sending the error message to the client. */
        res.json({ Error: error.message });
    }
});

/**
 * GET ALL POSTS
 * 
 * Getting all the posts from the database.
 */
router.get('/', async (req, res) => {
    try {
        /* Getting all the posts from the database. */
        const arrPost = await getPostAll();
        /* Sending the response to the client. */
        if (arrPost.length === 0) {
            res.json({ Message: 'There is no post', arrPost });
        } else {
            res.json(arrPost);
        }
        // res.send('GET ALL POSTS');
    } catch (error) {
        /* Sending the error message to the client. */
        res.json({ Error: error.message });
    }
});

/**
 * GET ONE POST
 * 
 * Getting the post by the id.
 */
router.get('/post=:postId', checkPost, async (req, res) => {
    /* Destructuring the postId from the req.params. */
    const { postId } = req.params;
    try {
        /* Getting the post by the id. */
        const post = await getPostById(postId);
        /* Sending the response to the client. */
        res.json(post);
        // res.send('GET ONE POST');
    } catch (error) {
        /* Sending the error message to the client. */
        res.json({ Error: error.message });
    }
});

/**
 * DELETE ONE POST
 * 
 * Deleting a post by the id.
 */
router.delete('/delete/post=:postId', checkPost, async (req, res) => {
    /* Destructuring the postId from the req.params. */
    const { postId } = req.params;
    try {
        /* Deleting the post by the id. */
        const result = await deletePostById(postId);
        const arrPost = await getPostAll();
        /* Sending the response to the client. */
        res.json(arrPost);
        // res.send('DELETE ONE POST');
    } catch (error) {
        /* Sending the error message to the client. */
        res.json({ Error: error.message });
    }
});

/**
 * DELETE ALL POSTS
 * 
 * Deleting all the posts from the database.
 */
router.delete('/delete/all', async (req, res) => {
    try {
        /* Deleting all the posts from the database. */
        const result = await deletePostAll();
        const arrPost = await getPostAll();
        /* Sending the response to the client. */
        res.json({ Message: 'There is no post', arrPost });
        // res.send('DELETE ALL POSTS');
    } catch (error) {
        /* Sending the error message to the client. */
        res.json({ Error: error.message });
    }
});

/**
 * UPDATE ONE POST
 * 
 * Updating a post by the id.
 */
router.put('/update/post=:postId', checkSchema(updatePost), checkError, checkPost, async (req, res) => {
    /* Destructuring the postId from the req.params. */
    const { postId } = req.params;
    const newData = req.body;
    try {
        /* Updating the post by the id. */
        const result = await updatePostById(postId, newData);
        const post = await getPostById(postId);
        /* Sending the response to the client. */
        res.json(post);
        // res.send('UPDATE ONE POST');
    } catch (error) {
        /* Sending the error message to the client. */
        res.json({ Error: error.message });
    }
});

/**
 * GET ALL POSTS BY AN AUTHOR
 * 
 * Getting all the posts of an especific author.
 */
router.get("/author/author=:authorId", checkAuthor, async (req, res) => {
    /* Destructuring the authorId from the req.params. */
    const { authorId } = req.params;
    try {
        /* Getting all the posts of an especific author. */
        const arrPost = await getPostByAuthor(authorId);
        /* Sending the response to the client. */
        if (arrPost.length === 0) {
            res.json({ Message: 'There is no post', arrPost });
        } else {
            res.json(arrPost);
        }
        // res.send('GET ALL POSTS OF AN ESPECIFIC AUTHOR');
    } catch (error) {
        /* Sending the error message to the client. */
        res.json({ Error: error.message });
    }
});

/* Exporting the router to be used in the `index.js` file. */
module.exports = router;