import React from 'react'

  import { 
    CurrencyInputProps, 
    useCurrencyFormat, 
  } from 'input-currency-react';

  const MyCustomCurrencyInput = (props) => {
    const { value, options, onChangeEvent, ...otherProps } = props;
 
    // You would need to provide your own implementation for `useCurrencyFormat` hook
    // assuming it returns the necessary values.
    const [
        formattedValue, 
        handleOnChange,
        handleOnKeyDown, 
        handleOnClick 
    ] = useCurrencyFormat(value, { ...options, onChangeCallBack: onChangeEvent });

    // Replace `useCurrencyFormat` with your actual implementation
    // of the hook or provide the necessary functions directly here.

    return (
        // Your JSX here
        <input 
            type="text" 
            style={{ textAlign: "right" }}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            onClick={handleOnClick}
            value={formattedValue}
            {...otherProps} 
        />
    );
}

export default MyCustomCurrencyInput