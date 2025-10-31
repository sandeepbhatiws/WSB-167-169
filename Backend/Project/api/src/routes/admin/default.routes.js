const express = require('express');
const { create, view, details, update, changeStatus, destroy } = require('../../controllers/admin/default.controller');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/default' })
const path = require('path')

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/default')
        },
        filename: function (req, file, cb) {
            extension = path.extname(file.originalname);

            const uniqueSuffix = Date.now()+extension;
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })

    const uploads = multer({ storage: storage })

    const singleImage = uploads.single('image');
    const multipleImage = uploads.single('images');
    const imageUploads = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 8 }])

    router.post('/create', singleImage, create);

    router.post('/view', upload.none(), view);

    router.post('/details/:id', upload.none(), details);

    router.put('/update/:id', singleImage, update);

    router.put('/change-status', upload.none(), changeStatus);

    router.put('/delete', upload.none(), destroy);

    server.use('/api/admin/default', router);
}