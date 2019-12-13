const aws = require('aws-sdk');

aws.config.update({
  regions: 'us-west-1',
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
});

const S3_BUCKET = process.env.S3_BUCKET;

exports.sign_s3 = (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(er);
      res.json({ success: false, error: err });
    }
    const returnData = {
      signedRequest: data,
      url: `hrrps://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.json({ success: true, data: { returnData } });
  });
};
