import { useEffect, useState } from 'react';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import LandingView from './views/LandingView';
import TodoListView from './views/TodoListView';
import './styles/index.css';
import Loader from './components/ui/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Background from './components/ui/Background';
import type { Swiper as SwiperType } from 'swiper';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const HALO_OPACITIES = [0.2, 0.4, 0.6, 0.8, 1] as const;
  const BASE_TRANSITION_DURATION = 0.08;
  const TRANSITION_DECREMENT = 0.02;

  useEffect(() => {
    const timer = new Promise((resolve) => setTimeout(resolve, 2000));

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    Promise.all([timer]).then(() => {
      setIsLoading(false);
      setTimeout(() => setShowLoader(false), 500);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="flex justify-center h-screen">
      {HALO_OPACITIES.map((opacity, index) => (
        <div
          key={opacity}
          className="halo"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transition: `all ${BASE_TRANSITION_DURATION - index * TRANSITION_DECREMENT}s linear`,
          }}
        />
      ))}

      {showLoader && <Loader isLoading={isLoading} />}

      <Background activeIndex={activeIndex} />

      <Header activeIndex={activeIndex} />

      <main className="w-screen">
        <Swiper
          className="mySwiper h-full"
          onSwiper={setSwiper}
          onSlideChange={(s) => setActiveIndex(s.activeIndex)}
        >
          <SwiperSlide>
            <LandingView />
          </SwiperSlide>

          <SwiperSlide>
            <TodoListView />
          </SwiperSlide>
        </Swiper>
      </main>

      <Navbar swiper={swiper} activeIndex={activeIndex} />
    </div>
  );
};

export default App;
