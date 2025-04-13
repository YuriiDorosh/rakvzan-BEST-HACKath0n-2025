import { Box, colors } from '@mui/material';
import { useRef, ChangeEvent, FC } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';

// Змінюємо інтерфейс так, щоб зберігалися File об’єкти
interface LoadImageInterface {
  selectedFiles: File[];
  setSelectedFiles: (value: File[]) => void;
}

const LoadImage: FC<LoadImageInterface> = ({ selectedFiles, setSelectedFiles }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBlockClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files); 
      //@ts-ignore
      setSelectedFiles(newFiles);
    }
  };

  // Видаляємо файл із списку за індексом
  const handleClearImage = (index: number): void => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
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

      {selectedFiles.length > 0 && (
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
          {selectedFiles.map((file, index) => (
            <Box key={index} sx={{ position: 'relative', display: 'inline-block' }}>
              {/* Генеруємо URL для прев'ю, але сам файл зберігаємо у стані */}
              <img
                src={URL.createObjectURL(file)}
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
