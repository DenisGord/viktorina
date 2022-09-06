import React, {useState} from 'react';

const Label = ({span, func}) => {
    const [value, setValue]=useState('');

    const pres=(e)=>{
        func(e.target.value, span)
        setValue('');
    }

    return (
        <label className='flex-container'>
        <span className='span' >{span}</span>
        <input
         className='input bigger'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) =>
            e.key === "Enter" && pres(e)
          }
          type="number"
          placeholder="очко ставишь?"
        />
      </label>
    );
};

export default Label;