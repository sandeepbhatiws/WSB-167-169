const express = require('express');
const { register, login, viewProfile, updateProfile, changePassword, forgotPassword, resetPassword } = require('../../controllers/website/user.controller');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/users' })
const path = require('path')

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/users')
        },
        filename: function (req, file, cb) {
            extension = path.extname(file.originalname);

            const uniqueSuffix = Date.now()+extension;
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })

    const uploads = multer({ storage: storage })
    const singleImage = uploads.single('image');

    router.post('/register',upload.none(),register);

    router.post('/login', upload.none(), login);

    router.post('/view-profile', upload.none(), viewProfile);

    router.put('/update-profile', singleImage, updateProfile);

    router.put('/change-password', upload.none(), changePassword);

    router.post('/forgot-password', upload.none(), forgotPassword);

    router.put('/reset-password', upload.none(), resetPassword);

    server.use('/api/website/user', router);
}