import bgLayer1 from '../../assets/bg-layer-1.png';

const Background = ({ activeIndex }: { activeIndex: number }) => {
    return (
        <div className="fixed w-screen h-screen overflow-hidden">
            <img 
                src={bgLayer1} 
                className={`fixed w-screen mt-[10vh] h-[90vh] object-cover transition-all duration-700 ease-in-out
                    ${activeIndex === 1 ? 'border-[80px] border-white' : 'border-[0px] border-transparent'}
                `} 
                alt="background layer" 
            />

            <div className='fixed h-screen w-screen bg-blur-custom pointer-events-none'>
            </div>
        </div>
    );
};

export default Background;