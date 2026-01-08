import { useState } from 'react';

interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox = ({
  checked,
  defaultChecked = false,
  onChange,
}: CheckboxProps) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  return (
    <div className="flex items-center">
      <label className="relative cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="sr-only"
        />

        <div
          className={`
                    w-6 h-6 rounded-md border-2 flex items-center justify-center
                    transition-all duration-300 ease-in-out
                    ${
                      isChecked
                        ? 'bg-black border-black scale-110'
                        : 'bg-white border-gray-300 hover:border-gray-400'
                    }
                `}
        >
          <svg
            className={`w-4 h-4 text-white transition-all duration-300 ease-in-out
                            ${isChecked ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                        `}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </label>
    </div>
  );
};

export default Checkbox;