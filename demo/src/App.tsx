import React from 'react';
import './App.css';
import {App2} from './App2';
import { useStore } from './Slimdux';


function App() {

  const [state,setState] = useStore<number>("general",0)
  const [state2,setState2] = useStore("general-2","Na")

  return (
    <div className="App">
      <button onClick={() => setState((state?? 0) + 1)}> Increment </button>
      <button onClick={() => setState2(`${state2}Na`)}> Add Na </button>
      <hr />
    </div>
  );
}

export default App;
