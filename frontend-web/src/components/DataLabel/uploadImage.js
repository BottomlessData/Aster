import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


 
const UploadImage = () => {
  const [images, setImages] = useState([]);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const maxNumber = 69;
  
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const uploadimages = () => {
    for(var i = 0; i < images.length; i++){
        const fd = new FormData();
        //console.log(images[a])
        fd.append('image', images[i]['file']);
    
        axios.post('https://us-central1-aster-38850.cloudfunctions.net/api/task/PqwzBtc9OPqknRVbJW9f/data', fd, {
        headers: {
            'content-type': 'multipart/form-data'
        }
        }
        ).then(res=>{
        console.log("success!!");
        setImages([]);
        setUploadSuccessful(true);
        }).catch(error => {
        console.log(error);
        })
    }
  }
 
  return (
    <div className="App">
     
      <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <div className="mainbtndiv">
              <button className="btn btn-primary"
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </button>
             
              <button className="btn btn-danger" onClick={onImageRemoveAll}>Remove all images</button>
              <Box
                sx={{
                  height: 10
                }}
              />
            </div>
            {imageList.map((image, index) => (
              <div key={index} className="image-item mt-5 mb-5 mr-5">
                <img style={{width: 165, height: 165}} src={image['data_url']} />
                <div className="image-item__btn-wrapper">
                  <button className="btn btn-primary" onClick={() => onImageUpdate(index)}>Update</button>
                  <button className="btn btn-danger" onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
      
      <Button  variant="contained" onClick={() => uploadimages()}>Submit</Button>

      {
          uploadSuccessful ? 
          <p>image upload success!</p>
          :
          <> </>
      }
    </div>
  );
};

export default UploadImage;
