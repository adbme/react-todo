import logoIcon from '../../assets/logo.svg';
import profilePicture from '../../assets/profile-picture.svg';

const Header = ({ activeIndex }: { activeIndex: number }) => {
  return (
    <header
      className={`responsive-header z-40 fixed w-screen top-0 px-10 transition-all duration-700 ease-in-out  
            ${activeIndex === 1 ? 'py-20 bg-white border-b border-b-gray-200' : 'py-10 border-b border-b-white/0'}`}
    >
      <div className="flex justify-between w-full max-w-7xl mx-auto ">
        {/* logo */}
        <img
          src={logoIcon}
          className="h-8 w-auto transition-all hover:scale-95"
          alt="reado logo"
        />

        {/* profile icon */}
        <img src={profilePicture} className="h-8 w-auto" alt="profile" />
      </div>
    </header>
  );
};

export default Header;
