import loaderBg from '../../assets/loader.png';
import logoLight from '../../assets/logo-light.svg';
import background from '../../assets/background.png';

const Loader = ({ isLoading }: any) => {
    return (
        <div
            className={`z-50 fixed inset-0 z-50 w-screen h-screen bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out
                ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ backgroundImage: `url(${loaderBg})` }}
        >
            <div className="flex flex-col items-center gap-6">
                <img src={logoLight} className='h-10' alt="Logo" />
                <div className="w-48 h-[5px] bg-white/20 rounded-full overflow-hidden relative">
                    <div 
                        style={{ backgroundImage: `url(${background})` }} 
                        className="absolute top-0 left-0 h-full bg-cover bg-no-repeat animate-loading-bar"
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;