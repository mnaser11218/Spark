import React, {useState} from 'react'
import AWS from 'aws-sdk'


const UploadImageToS3WithNativeSdk = () => {

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showImage, setShowImage] = useState(false)

   const S3_BUCKET = 'mybucketlists123'
   const REGION = 'us-west-2'


AWS.config.update({
  accessKeyId: `${process.env.SPARK_ACCESS_KEY}` ,
  secretAccessKey: `${process.env.SPARK_ACCESS_SECRET_KEY}`
})


const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        setShowImage(true)
        console.log("link to get photo " + `https://mybucketlists123.s3.us-west-2.amazonaws.com/${selectedFile?.name}`)
    } 

    const uploadFile = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }


    return <div>
        <div>Native SDK File Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
       <button >get image</button> 
     { {showImage} && <img src={`https://mybucketlists123.s3.us-west-2.amazonaws.com/${selectedFile?.name}`}></img> }
    </div>
}

export default UploadImageToS3WithNativeSdk; 