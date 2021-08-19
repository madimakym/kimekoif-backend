var multer = require("multer");
const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, files, cb) => {
    if (files.mimetype == "image/png" || files.mimetype == "image/jpg" || files.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
}).array('files', 6);

const uploadFileController = {
  upload: (req, res) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).send({
        status: 200,
        message: req.file,
      });
    });
  },
};
module.exports = uploadFileController;
