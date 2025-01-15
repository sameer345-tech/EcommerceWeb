import React, { useState } from 'react'
import Container from './Container'

function QuantityToggle({counter, setCounter, count, isReadOnly}) {


    const  handleMinusBtn = () => {
       if( counter <= 1) return false;
       setCounter((prev) => prev-1)

    }

    const handlePlusBtn = () => {
        if(counter >= count ) return false;
        setCounter((prev) => prev+1)
 
    };

  return (
    
 <>
    <div>
  <label htmlFor="Quantity" className="sr-only"> Quantity </label>

  <div className="flex items-center gap-1">
    <button type="button" className="size-10 leading-10 text-gray-600 transition hover:opacity-75" onClick={handleMinusBtn}>
      &minus;
    </button>

    <input
      type="number"
      id="Quantity"
      value={counter}
      readOnly={isReadOnly}
      onChange={(event)=> setCounter(event.target.value)}
      className="h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
    />

    <button type="button" className="size-10 leading-10 text-gray-600 transition hover:opacity-75" onClick={handlePlusBtn}>
      +
    </button>
  </div>
</div>
 </>

    
  )
}

export default QuantityToggle