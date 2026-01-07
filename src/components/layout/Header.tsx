import logoIcon from '../../assets/logo.svg';
import profilePicture from '../../assets/profile-picture.svg';


const Header = ({ activeIndex }: any) => {
    return (
        <header className={`z-40 fixed w-screen top-0 px-10 transition-all duration-700 ease-in-out max-h-lg:bg-red-200  
            ${activeIndex === 1 ? 'py-20 bg-white border-b border-b-gray-200' : 'py-10 border-b border-b-white/0'}`}
        >
            <div className='flex justify-between w-full max-w-7xl mx-auto '>
                {/* logo */}
                <a href='/'>
                    <img src={logoIcon} className="h-8 w-auto transition-all hover:scale-95" alt="reado logo" />
                </a>

                {/* profile icon */}
                <div>
                    <img src={profilePicture} className="h-8 w-auto" alt="profile" />
                </div>
            </div>
        </header>
    );
};

export default Header;