import InputGroup from '../components/ui/InputGroup';

const LandingView = () => {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        <InputGroup placeholder="Add new task">
          <svg
            className="w-4 h-8"
            fill="currentColor"
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
          </svg>
        </InputGroup>
      </div>
    </>
  );
};

export default LandingView;
