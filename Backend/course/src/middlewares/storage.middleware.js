import multer from 'multer'
import fs from 'fs';

const upload = multer({
    storage: multer.diskStorage({
        destination(req, File,cb){
            cb(null, 'src/uploads/');
        },
        filename(req, file, cb){
            const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, Date.now() + '-' + fileName);
        }
    }),
    limits:{fileSize: 1024 * 1024 * 5},
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(jpg | jpeg | png)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(null, true);
    },
});

export const removeFileFromUploads = async (file) =>{
    fs.unlink(file.path, (err)=>{
        if(err){
            console.log(err);
            return false;
        }
        console.log(`File removed from ${file.path} successfully`);
    });
    return true;
};

export default upload;