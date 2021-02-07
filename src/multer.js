// Import of Multer.js for upload of images
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const multerJS = multer({
    dest: path.resolve(__dirname, '..', '..', 'public', 'assets', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'public', 'assets', 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) {
                    cb(err)
                }

                const fileName = `${hash.toString('hex')}-${file.originalname}`

                cb(null, fileName);
            })
        }
    }),
    limits: {
        // Responsável por limitar alguma coisa, nesse caso, vou limitar a imagem em 10mb 
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
            'image/svg'
        ]

        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'))
        }
    }
});

module.exports = multerJS;