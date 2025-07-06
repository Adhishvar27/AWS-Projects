const AWS=require('aws-sdk');
const path=require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

let s3bucket=new AWS.S3({
        accessKeyId:process.env.AWS_USER_ID,
        secretAccessKey:process.env.AWS_SCRECT_KEY
});

function awsS3Services(data, filename) {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: filename,
    Body: data,
    ACL: 'public-read'
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, (err, data) => {
      if (err) {
        console.error('S3 Upload Error:', err);
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
}

module.exports={
    awsS3Services
}