const multer = require('multer');
const storage = multer.memoryStorage(); // we use memory buffer for Supabase upload
const upload = multer({ storage });
module.exports = upload;
