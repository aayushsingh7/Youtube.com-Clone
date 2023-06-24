
const multer = require('multer');
const path = require('path');
const { randomInt } = require('crypto');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public'), function (err, success) {
      if (err) throw err;
    });
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${randomInt(10000000000)}-${Math.floor(
        Math.random() * 100000000000
      )}${path.extname(file.originalname)}`
    );
  },
});

const fileUploadMiddleware = (req, res, next) => {
  const fileUpload = multer({
    storage: storage,
    limits: {
      fileSize: 5000000000, // 200 MB
    },
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(mp4|MPEG-4|png|jpg|jpeg|webp)$/)) {
        return cb(new Error('Plz upload a valid file'));
      }
      cb(undefined, true);
    },
  }).fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]);

  fileUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: 'Error uploading file' });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
    console.log('file uploades middleware passed')
  });
};

module.exports = fileUploadMiddleware;
