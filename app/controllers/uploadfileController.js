var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "./public/");
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).single("files");

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
