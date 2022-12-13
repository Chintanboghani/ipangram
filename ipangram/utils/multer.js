const uid = require('uid');
const path_ext = require('path');

const multer = require("multer");
let fs = require('fs-extra');
const storage = multer.diskStorage({  
  destination: function (req, file, cb) {
    
    if (file.mimetype === 'application/pdf') {
      let path = `./public/upload/PDF`;
      fs.mkdirsSync(path);
      cb(null, path)
    }
    else{
      let path = `./public/upload/image`;
      fs.mkdirsSync(path);
      cb(null, path)
   }
  },
 
  filename: function (req, file, cb) {
    const ext = path_ext.extname(file.originalname);
    cb(null, uid.uid(10) + 
    ext)
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'|| file.mimetype === 'application/pdf') {
    cb(null, true);
  }
  else {
    cb(null, false);
  }
}

const upload = multer({
   storage:storage,
   limits:{
    fileSize: 1024*1024*10
   },
   fileFilter:fileFilter
 })
exports.imgupload = upload.single("file");

