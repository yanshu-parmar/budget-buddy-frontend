import { useRef, useState } from 'react';
import { Avatar, IconButton, Box } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const ProfilePhoto = ({ name = 'User', size = 100 }) => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Box position="relative" width={size} height={size}>
      <Avatar
        src={image}
        sx={{
          width: size,
          height: size,
          fontSize: size / 2.5,
          bgcolor: '#1976d2',
        }}
      >
        {!image && getInitials(name)}
      </Avatar>
      <IconButton
        onClick={handleClick}
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          bgcolor: 'white',
          p: 0.5,
          '&:hover': { bgcolor: '#eee' },
        }}
      >
        <PhotoCamera fontSize="small" />
      </IconButton>
      <input
        type="file"
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={handleImageChange}
      />
    </Box>
  );
};

export default ProfilePhoto;