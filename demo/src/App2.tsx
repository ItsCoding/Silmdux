import React from 'react';
import { useStore } from './Slimdux';

// const useStore = createHook("general")

export const App2 = () => {
    const [state, setState] = useStore("general", 0);
    const [state2, setState2] = useStore("general-2","Lol");
    return (<> <p>Our State: {state}</p>#
        <p>Na-State: {state2}</p>
    </>);
}
