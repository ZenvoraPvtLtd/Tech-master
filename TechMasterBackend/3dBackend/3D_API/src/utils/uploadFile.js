// import cloudinary from "../config/cloudinary.js";

// const uploadFile = async (filePath, folder = "3d-project") => {
//   const result = await cloudinary.uploader.upload(filePath, {
//     folder,
//   });

//   return result.secure_url;
// };

// export default uploadFile;

import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";


const uploadFile = async (
  buffer,
  folder = "3d-project",
  resourceType = "auto"
) => {

  return new Promise((resolve, reject) => {


    const uploadStream =
      cloudinary.uploader.upload_stream(

        {
          folder,
          resource_type: resourceType,
        },


        (error, result) => {

          if (error) {
            return reject(error);
          }


          resolve({

            url: result.secure_url,

            publicId: result.public_id,

            type: result.resource_type,

            size: result.bytes,

            format: result.format,

          });

        }

      );


    streamifier
      .createReadStream(buffer)
      .pipe(uploadStream);


  });

};



export default uploadFile;