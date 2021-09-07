import multer from 'multer';

const storage = multer.memoryStorage();

export const multerUploads = multer({ storage }).single('image');
