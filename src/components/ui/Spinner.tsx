import Button from "./Button";

interface SpinnerProps {
    variant?: 'button' | 'normal';
    text?: string;
}

const Spinner = ({ variant = 'normal', text = "" }: SpinnerProps) => {
    const loader = (
        <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {text && <span className="font-medium">{text}</span>}
        </div>
    );

    if (variant === 'normal') {
        return (
            <div className="flex flex-col items-center justify-center p-10 w-full animate-pulse">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4" />
                {text && <p className="text-gray-500">{text}</p>}
            </div>
        );
    }

    return (
        <div className="pointer-events-none inline-block">
            <Button variant="fill" rounded="normal">
                {loader}
            </Button>
        </div>
    );
};

export default Spinner;