const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const config = require('../config/config');
const url = config.mongoose.url;

// Create a storage object with a given configuration
const storage = new GridFsStorage({
    url,
    file: (req, file) => {
        // console.log('file', file);
        return {
            filename: file.originalname,
            bucketName: 'files'
        };
    },
});

// Set multer storage engine to the newly created object
const upload = multer({ storage });

module.exports = upload;