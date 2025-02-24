"use client";

interface DialogsProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Dialogs({ children, onClose }: DialogsProps) {
  return (
    <>
      <div className="fixed z-1000 inset-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
        <div className=" w-[550px] h-[700px] rounded-lg bg-gradient-to-r from-red-400 via-pink-400 to-red-400 flex flex-col justify-center items-center p-4 shadow-lg">
          {children}
          {onClose && (
            <button className="text-red-500" onClick={onClose}>
              close
            </button>
          )}
        </div>
      </div>
    </>
  );
}
