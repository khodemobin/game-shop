import { Box, IconButton } from '@mui/material';
import { useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface Media {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

interface ProductGalleryProps {
  media: Media[];
  title: string;
}

export default function ProductGallery({ media, title }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderMedia = (item: Media) => {
    if (item.type === 'video') {
      return (
        <Box sx={{ position: 'relative', width: '100%', height: 400 }}>
          <video
            src={item.url}
            controls
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 8
            }}
          />
        </Box>
      );
    }

    return (
      <Box
        component='img'
        src={item.url}
        alt={title}
        sx={{
          width: '100%',
          height: 400,
          objectFit: 'cover',
          borderRadius: 2
        }}
      />
    );
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {renderMedia(media[currentIndex])}

      {media.length > 1 && (
        <>
          <IconButton
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper'
            }}
            onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : media.length - 1))}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'background.paper'
            }}
            onClick={() => setCurrentIndex((prev) => (prev < media.length - 1 ? prev + 1 : 0))}
          >
            <NavigateNextIcon />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              mt: 2,
              overflowX: 'auto',
              pb: 1
            }}
          >
            {media.map((item, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onClick={() => setCurrentIndex(index)}
              >
                <Box
                  component='img'
                  src={item.type === 'video' ? item.thumbnail : item.url}
                  alt={`${title} ${item.type} ${index + 1}`}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover',
                    borderRadius: 1,
                    border: currentIndex === index ? 2 : 0,
                    borderColor: 'primary.main'
                  }}
                />
                {item.type === 'video' && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '50%',
                      p: 0.5
                    }}
                  >
                    <PlayArrowIcon sx={{ fontSize: 20, color: 'white' }} />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
