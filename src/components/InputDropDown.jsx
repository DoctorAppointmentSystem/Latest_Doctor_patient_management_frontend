import { useState } from 'react';
import VisionInput from './VisionInput';

function InputDropDown(prop) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleLineClick = () => {
    setIsFormOpen(prev => !prev); 
  };


  return (
    <div className="p-4">
      <div
        className="cursor-pointer bg-background p-4 rounded hover:bg-highlight text-primary"
        onClick={handleLineClick}
      >
        {prop.name}
      </div>

      {isFormOpen && ( 
        <form
          className="w-ful gap-4 bg-white p-4 rounded shadow"
        >
          <div className='flex flex-col gap-4 mb-4'>
            <div className='flex items-center justify-center w-full '>
              <hr className='w-[30%] ' />
              <p className='px-4 py-2 border-1 border-background rounded-xl text-primary'>===OD===</p>
              <hr className='w-[30%]' />
            </div>
            <VisionInput />
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-center w-full '>
              <hr className='w-[30%] ' />
              <p className='px-4 py-2 border-1 border-background rounded-xl text-primary'>===OS===</p>
              <hr className='w-[30%]' />
            </div>
            <VisionInput />
          </div>
        </form>
      )}
    </div>
  );
}

export default InputDropDown;
