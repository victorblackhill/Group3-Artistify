const { storage } = require('debug/src/browser');
const multer = require('multer');

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb({ message: 'Unsupported file format' }, false)
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 300 * 200 },
    fileFilter: fileFilter,
})

module.exports = upload;