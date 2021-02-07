// Import Modules
const express = require("express");
const server = express();
const pages = require('./pages.js');

// Import of Multer.js for upload of images
// const multer = require('multer');
// const path = require('path');
// const crypto = require('crypto');

// // Configuration multer
// const upload = multer({
//     dest: path.resolve(__dirname, '..', '..', 'public', 'assets', 'uploads'),
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, path.resolve(__dirname, '..', 'public', 'assets', 'uploads'));
//         },
//         filename: (req, file, cb) => {
//             crypto.randomBytes(16, (err, hash) => {
//                 if(err) {
//                     cb(err)
//                 }

//                 const fileName = `${hash.toString('hex')}-${file.originalname}`

//                 cb(null, fileName);
//             })
//         }
//     }),
//     limits: {
//         // Responsável por limitar alguma coisa, nesse caso, vou limitar a imagem em 10mb 
//         fileSize: 10 * 1024 * 1024
//     },
//     fileFilter: (req, file, cb) => {
//         const allowedMimes = [
//             'image/jpeg',
//             'image/pjpeg',
//             'image/png',
//             'image/gif',
//             'image/svg'
//         ]

//         if(allowedMimes.includes(file.mimetype)) {
//             cb(null, true);
//         } else {
//             cb(new Error('Invalid file type.'))
//         }
//     }
// });

const upload = require('./multer.js');

// Config Template Engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

server
    // Defining the 'public' folder as the public path
    .use(express.static("public"))
    // Enable data usage with json
    .use(express.json())
    // Use req body
    .use(express.urlencoded({extended: true}))

    // Create routes
    .get('/', pages.index)
    .get("/create-point", pages.createPoint)
    .get("/search", pages.search)
    .get('/point', pages.point)
    .get("/edit-search", pages.editSearch)
    .post("/save-point", upload.single('image'), pages.savePoint)
    .post("/update-point", upload.single('image'), pages.updatePoint)

// Connect server
server.listen(5000, () => {
    console.log('Servidor rodando!');
});

