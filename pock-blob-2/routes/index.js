var express = require('express');
var router = express.Router();
const { Buffer } = require('buffer');

const uuid = require('uuid');
const azure = require('azure-storage');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async (req, res, next)=>{
    const blobSvc = azure.createBlobService("DefaultEndpointsProtocol=https;AccountName=veganhousestorageblobs;AccountKey=Uajg55TUpl1NErRdOVsway7oSkh56Ruaen1/rbsA/ZJwGKGCp65OeAEAmw3ae1W/0O6IU8o3Ml+mK6fGiuitWQ==;EndpointSuffix=core.windows.net");
    let filename = uuid.v1().toString() + '.jpg';
    let rawdata = req.body.image;
    let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let type = matches[1];
    let buffer = Buffer.from(matches[2], 'base64');  

   await blobSvc.createAppendBlobFromText('images', filename, buffer, {
     contentType: type
   }, 
      function (error, result, response){
          if (error){
            filename = 'default.png';
          };
      });

      const fileUrl = `https://veganhousestorageblobs.blob.core.windows.net/images/${filename}`;

    res.status(201).json({
      url: fileUrl
    });
});

module.exports = router;
