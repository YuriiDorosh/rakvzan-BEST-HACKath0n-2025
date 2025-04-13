import { Box, colors } from '@mui/material';
import { useRef, ChangeEvent, FC } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface LoadImageInterface {
    selectedImage: string | null
    setSelectedImage: (value: string | null) => void
}

const LoadImage: FC<LoadImageInterface> = ({
    selectedImage,
    setSelectedImage
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBlockClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleClearImage = (): void => {
    setSelectedImage(null);
  };

  return (
    <Box 
        style={{ 
            textAlign: 'center', 
            margin: '20px',
            width: "100%"
        }}
    >
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <Box
        onClick={handleBlockClick}
        sx={{
          cursor: 'pointer',
          width: 'clac(100% - 58px)',
          border: `1px dashed ${colors.blue[200]}`,
          background: colors.common.white,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '29px'
          
        }}
      >
        <UploadFileIcon
            sx={{
                marginBottom: '15px'
            }}
        />
        Прикрипіть фото до відгуку
      </Box>

      {selectedImage && (
        <Box className="preview" style={{ marginTop: '20px' }}>
          <img
            src={selectedImage}
            alt="Preview"
            style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ccc' }}
          />
          <Box>
            <button
              onClick={handleClearImage}
              style={{
                marginTop: '10px',
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Видалити фото
            </button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LoadImage;
