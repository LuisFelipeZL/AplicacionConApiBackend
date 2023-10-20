// Importa la función 'validationResult' del módulo 'express-validator' para manejar la validación de datos.
const { validationResult } = require('express-validator');

// Importa la función 'getPostById' del archivo 'post.model.js' para obtener información de una publicación por su ID.
const { getPostById } = require("../models/post.model");
// Importa la función 'getAuthorById' del archivo 'author.model.js' para obtener información de un autor por su ID.
const { getAuthorById } = require("../models/author.model");


// Objeto de validación utilizado para validar datos al crear un nuevo autor.
const newAuthor = {
    
    name: {
        exists: true,
        
        trim: true,
        errorMessage: "El campo del nombre del autor es obligatorio",
    },
    
    email: {
        exists: {
            errorMessage: "El campo de correo electronico es obligatorio",
        },
        
        trim: true,
        isEmail: {
            errorMessage: "El correo electronico debe ser valido",
        }
    },
    
    image: {
        exists: true,
        
        trim: true,
        errorMessage: 'El campo de imagen es obligatorio'
    }
};
// Objeto de validación utilizado para actualizar datos de un autor.
const updateAuthor = {
    name: {
        optional: true,
        
        trim: true,
    },
    email: {
        optional: true,
        
        trim: true,
        
        isEmail: {
            errorMessage: "El correo electronico debe ser valido",
        }
    },
    image: {
        optional: true,
        
        trim: true,
    }
};
// Objeto de validación utilizado para validar datos al crear una nueva publicación.
const newPost = {
    title: {
       
        exists: {
            errorMessage: "El titulo de la publicacion es obligatorio",
        },
        
        trim: true,
        
        isLength: {
            options: {
                min: 2,
                max: 33
            },
            errorMessage: "La longitud maxima de caracteres es 33 y la minima 2",
        },
    },
    description: {
       
        exists: {
            errorMessage: "La descripcion de la publicacion es obligatoria",
        },
        
        trim: true,
        
        isLength: {
            options: {
                min: 10,
                max: 255
            },
            errorMessage: "La longitud maxima de caracteres es 255 y la minima 10"
        }
    },
    category: {
        
        exists: {
            errorMessage: "La descripcion de la publicacion es obligatoria",
        },
        
        trim: true,
        
        custom: {
            options: (value) => {
                const arrOption = ['news', 'sport', 'opinion', 'photography', 'research']
                return arrOption.includes(value.toLowerCase());
            },
            errorMessage: 'La categoria debe ser una de las siguientes: News, Sport, Opinion, Photography, or Research.'
        }
    }
};
// Objeto de validación utilizado para actualizar datos de una publicación.
const updatePost = {
    title: {
        optional: true,
        
        trim: true,
        
        isLength: {
            options: {
                min: 2,
                max: 33
            },
            errorMessage: "La longuitud maxima de caracteres es 33 y la minima 2",
        },
    },
    description: {
        optional: true,
        
        trim: true,
        
        isLength: {
            options: {
                min: 10,
                max: 255
            },
            errorMessage: "La longuitud maxima de caracter es 255 y la minima es 10"
        }
    },
    category: {
        optional: true,
        
        trim: true,
        
        custom: {
            options: (value) => {
                const arrOption = ['news', 'sport', 'opinion', 'photography', 'research']
                return arrOption.includes(value.toLowerCase());
            },
            errorMessage: 'La categoria debe ser una de las siguientes: News, Sport, Opinion, Photography, or Research.'
        }
    }
};
// Función que comprueba si hay errores de validación en una solicitud. Si hay errores, devuelve una respuesta de estado 400 y los errores.
const checkError = (req, res, next) => {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }
    
    next();
};
// Función que comprueba si una publicación existe antes de continuar con la solicitud.
const checkPost = async (req, res, next) => {
    const { postId } = req.params;
    
    if (await getPostById(postId)) {
        
        next();
    } else {
        res.status(404).json({ Message: 'That post does not exist' });
    }
};
// Función que comprueba si un autor existe antes de continuar con la solicitud.
const checkAuthor = async (req, res, next) => {
    
    let authorId = req.params.authorId;
    if (authorId === undefined) {
        authorId = req.body.authorId;
    }
    
    if (await getAuthorById(authorId)) {
        
        next();
    } else {
        res.status(404).json({ Message: 'Ese autor no existe' });
    }
};

// Exporta los objetos de validación y las funciones para su uso en otros archivos.
module.exports = {
    newAuthor, updateAuthor, newPost, updatePost, checkError, checkPost, checkAuthor
}