const router = require('express').Router();
/* This is destructuring the functions from the author.model.js file. */
const { createAuthor, getAuthorAll, getAuthorById, deleteAuthorById, deleteAuthorAll, updateAuthorById } = require("../../models/author.model");
/* This is destructuring the checkSchema function from the express-validator module. */
const { checkSchema } = require("express-validator");
/* This is destructuring the newAuthor and checkError functions from the validators.js file. */
const { newAuthor, updateAuthor, checkError, checkAuthor } = require("../../helpers/validators");

/**
 * CREATE NEW AUTHOR
 * 
 * This is creating a new author.
 */
router.post("/new", checkSchema(newAuthor), checkError, async (req, res) => {
    const newAuthor = req.body;
    try {
        /* This is creating a new author. */
        const result = await createAuthor(newAuthor);
        const author = await getAuthorById(result.insertId);
        res.json(author);
        // res.send('CREATE NEW AUTHOR');
    } catch (error) {
        /* This is sending the error message back to the client. */
        res.json({ Error: error.message });
    }
});

/**
 * GET ALL AUTHORS
 * 
 * This is getting all authors.
 */
router.get('/', async (req, res) => {
    try {
        /* This is getting all authors. */
        const arrAuthor = await getAuthorAll();
        /* Sending the response back to the client. */
        if (arrAuthor.length === 0) {
            res.json({ Message: 'There is no author', arrAuthor });
        } else {
            res.json(arrAuthor);
        }
        // res.send('GET ALL AUTHORS');
    } catch (error) {
        /* This is sending the error message back to the client. */
        res.json({ Error: error.message });
    }
});

/**
 * GET ONE AUTHOR
 * 
 * This is getting an author by their id.
 */
router.get('/author=:authorId', checkAuthor, async (req, res) => {
    /* Destructuring the authorId from the req.params object. */
    const { authorId } = req.params;
    try {
        /* This is getting an author by their id. */
        const author = await getAuthorById(authorId);
        /* Sending the response back to the client. */
        res.json(author);
        // res.send('GET ONE AUTHOR');
    } catch (error) {
        /* This is sending the error message back to the client. */
        res.json({ Error: error.message });
    }
});

/**
 * DELETE ONE POST
 * 
 * This is deleting an author by their id.
 */
router.delete('/delete/author=:authorId', checkAuthor, async (req, res) => {
    /* Destructuring the authorId from the req.params object. */
    const { authorId } = req.params;
    try {
        /* This is deleting an author by their id. */
        const result = await deleteAuthorById(authorId);
        const arrAuthor = await getAuthorAll();
        /* Sending the response back to the client. */
        res.json(arrAuthor);
        // res.send('DELETE ONE AUTHOR');
    } catch (error) {
        /* This is sending the error message back to the client. */
        res.json({ Error: error.message });
    }
});

/**
 * DELETE ALL AUTHORS
 * 
 * This is deleting all authors. 
 */
router.delete('/delete/all', async (req, res) => {
    try {
        /* Deleting all authors. */
        const result = await deleteAuthorAll();
        const arrAuthor = await getAuthorAll();
        /* Sending the response back to the client. */
        res.json({ Message: 'There is no author', arrAuthor });
        // res.send('DELETE ALL AUTHORS');
    } catch (error) {
        /* Sending the error message back to the client. */
        res.json({ Error: error.message });
    }
});

/**
 * UPDATE ONE POST
 *
 * The above code is updating an author by their id. 
 */
router.put('/update/author=:authorId', checkSchema(updateAuthor), checkError, checkAuthor, async (req, res) => {
    /* Destructuring the authorId from the req.params object. */
    const { authorId } = req.params;
    const newAuthor = req.body;
    try {
        /* Updating the author by their id. */
        const result = await updateAuthorById(authorId, newAuthor);
        const author = await getAuthorById(authorId);
        /* Sending the response back to the client. */
        res.json(author);
        // res.send('UPDATE ONE AUTHOR');
    } catch (error) {
        /* Sending the error message back to the client. */
        res.json({ Error: error.message });
    }
});

/* This is exporting the router object. */
module.exports = router;