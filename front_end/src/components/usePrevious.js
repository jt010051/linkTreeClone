import {React} from 'react';
import { useEffect, useState, useRef } from "react";


const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value; //assign the value of ref to the argument
    },[value]); //this code will run when the value of 'value' changes
    return ref.current;
};

export default usePrevious;