const express = require('express');
const { viewMaterials, viewColors, viewSubSubCategory, create, view, details, update, changeStatus, destroy } = require('../../controllers/admin/product.controller');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/products' })
const path = require('path');
const { viewCategory } = require('../../controllers/admin/subCategory.controller');
const { viewSubCategory } = require('../../controllers/admin/subSubCategory.controller');

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/products')
        },
        filename: function (req, file, cb) {
            extension = path.extname(file.originalname);

            const uniqueSuffix = Date.now()+extension;
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })

    const uploads = multer({ storage: storage })
    const singleImage = uploads.single('image');
    const imageUploads = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 8 }])

    router.post('/view-materials', upload.none(), viewMaterials);
    
    router.post('/view-colors', upload.none(), viewColors);
    
    router.post('/view-parent-category', upload.none(), viewCategory);
    
    router.post('/view-sub-category', upload.none(), viewSubCategory);

    router.post('/view-sub-sub-category', upload.none(), viewSubSubCategory);

    router.post('/create', imageUploads, create);
    
    router.post('/view', upload.none(), view);

    router.post('/details/:id', upload.none(), details);

    router.put('/update/:id', imageUploads, update);

    router.put('/change-status', upload.none(), changeStatus);

    router.put('/delete', upload.none(), destroy);

    server.use('/api/admin/products', router);
}