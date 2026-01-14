import { Suspense, useEffect, useState } from 'react';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import './styles/index.css';
import './styles/animations.css';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import Background from './components/ui/Background';
import type { Swiper as SwiperType } from 'swiper';
import Main from './components/layout/Main';
import Spinner from './components/ui/Spinner';
import { ErrorBoundary } from 'react-error-boundary';

const App = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const HALO_OPACITIES = [0.2, 0.4, 0.6, 0.8, 1] as const;
  const BASE_TRANSITION_DURATION = 0.08;
  const TRANSITION_DECREMENT = 0.02;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

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

      <ToastContainer position="top-right" theme="dark" />
      <Background activeIndex={activeIndex} />
      <Header activeIndex={activeIndex} />

      <ErrorBoundary fallback={"Failed to load todos"} onError={(error) => { toast.error(error.message); }}>
        <Suspense fallback={<Spinner variant="button" text="Loading" />}>
          <Main setSwiper={setSwiper} swiper={swiper} setActiveIndex={setActiveIndex} />
        </Suspense>
      </ErrorBoundary>

      <Navbar swiper={swiper} activeIndex={activeIndex} />
    </div>
  );
};

export default App;
