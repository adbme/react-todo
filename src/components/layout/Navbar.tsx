import navbarImg from '../../assets/navbar.svg';
import Button from '../ui/Button';
import { Swiper } from 'swiper';

const Navbar = ({ swiper, activeIndex }: { swiper: Swiper | null, activeIndex: number }) => {
    return (
        <nav className="z-40 fixed w-screen bottom-0 flex justify-center items-center">
            <div className='w-[90%] md:w-[50%] max-w-sm flex items-center justify-center'>
                <img src={navbarImg} className="drop-shadow-lg w-full custom-shadow" alt="navbar background" />
            </div>

            <div className='absolute flex items-center gap-4 scale-75'>
                <Button 
                    variant={activeIndex === 0 ? "fill" : "outline"} 
                    rounded="full"
                    onClick={() => swiper?.slideTo(0)}
                >
                    <svg className="w-4 h-8" fill='currentColor' viewBox="0 0 448 512">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path>
                    </svg>
                </Button>

                <Button 
                    variant={activeIndex === 1 ? "fill" : "outline"} 
                    rounded="full" 
                    onClick={() => swiper?.slideTo(1)}
                >
                    <svg className="w-4 h-8 rotate-180" fill='currentColor' viewBox="0 0 448 512">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path>
                    </svg>
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;