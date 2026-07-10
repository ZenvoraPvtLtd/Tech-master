import multer from "multer";

/*
|--------------------------------------------------------------------------
| MEMORY STORAGE
|--------------------------------------------------------------------------
| Files RAM buffer me aayengi.
| Cloudinary upload_stream ke through direct upload karenge.
|--------------------------------------------------------------------------
*/

const storage = multer.memoryStorage();



/*
|--------------------------------------------------------------------------
| IMAGE UPLOAD
|--------------------------------------------------------------------------
| Profile Image
| Introduction Image
| Vision Image
| Achievement Image
| Award Certificate Image
| Company Logo
|--------------------------------------------------------------------------
*/

const imageFilter = (req, file, cb) => {

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];


  if (!allowedTypes.includes(file.mimetype)) {

    return cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      ),
      false
    );

  }


  cb(null, true);

};



const upload = multer({

  storage,


  limits: {

    fileSize: 10 * 1024 * 1024, // 10 MB

  },


  fileFilter: imageFilter,

});





/*
|--------------------------------------------------------------------------
| MEDIA UPLOAD
|--------------------------------------------------------------------------
| Image + Video
|
| Used for:
| Story Gallery
| Story Featured Video
| Future CMS Media Modules
|--------------------------------------------------------------------------
*/


const mediaFilter = (req, file, cb) => {


  const allowedTypes = [

    // Images

    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",


    // Videos

    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/x-msvideo",
    "video/mpeg",

  ];



  if (!allowedTypes.includes(file.mimetype)) {

    return cb(
      new Error(
        "Only JPG, JPEG, PNG, WEBP images and MP4, WEBM, MOV, AVI, MPEG videos are allowed."
      ),
      false
    );

  }


  cb(null, true);

};





const uploadMedia = multer({

  storage,


  limits: {

    fileSize: 100 * 1024 * 1024, // 100 MB

  },


  fileFilter: mediaFilter,

});

export default upload;

export {
  uploadMedia
};