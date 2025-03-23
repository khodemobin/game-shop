import { Box, useMediaQuery, useTheme } from '@mui/material';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SliderProps {
  children: React.ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  autoplay?: boolean;
}

export default function Slider({ children, slidesPerView = 3, spaceBetween = 20, autoplay = true }: SliderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={spaceBetween}
      slidesPerView={isMobile ? 1 : slidesPerView}
      navigation
      pagination={{ clickable: true }}
      autoplay={false}
      breakpoints={{
        320: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: slidesPerView
        }
      }}
    >
      {children.map((child, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <SwiperSlide key={index}>
          <Box sx={{ px: 1 }}>{child}</Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
