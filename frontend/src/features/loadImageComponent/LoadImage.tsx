import { Box, colors } from '@mui/material';
import { useRef, ChangeEvent, FC, useEffect } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface LoadImageInterface {
  selectedImages: string[];
  setSelectedImages: (value: string[]) => void;
}

const LoadImage: FC<LoadImageInterface> = ({ selectedImages, setSelectedImages }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBlockClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    let tempArray: string[] = []
    if (files && files.length > 0) {
      console.log(files)
      const imagesArray = Array.from(files).map(file => URL.createObjectURL(file));
      //@ts-ignore
      tempArray = tempArray.concat(imagesArray)
    }
    setSelectedImages(tempArray);
  };

  useEffect(()=>{
    console.log(selectedImages)
  }, [selectedImages])

  const handleClearImage = (index: number): void => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  return (
    <Box style={{ textAlign: 'center', width: "100%" }}>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        multiple
      />

      <Box
        onClick={handleBlockClick}
        sx={{
          cursor: 'pointer',
          width: 'calc(100% - 58px)',
          border: `1px dashed ${colors.blue[200]}`,
          background: colors.common.white,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '29px'
        }}
      >
        <UploadFileIcon sx={{ marginBottom: '15px' }} />
        Прикріпіть фото до відгуку
      </Box>

      {selectedImages?.length > 0 && (
        <Box
          className="preview"
          sx={{
            marginTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center'
          }}
        >
          {selectedImages[0] && selectedImages?.map((image, index) => (
            <Box key={index} sx={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                style={{
                  maxWidth: '200px',
                  height: 'auto',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
              <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                <button
                  onClick={() => handleClearImage(index)}
                  style={{
                    margin: '5px',
                    padding: '3px 6px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Видалити
                </button>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default LoadImage;
