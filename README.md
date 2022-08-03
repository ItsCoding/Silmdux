# Slimdux
A simple StateMager made for the simple TypeScript developer that also uses React.
### Installation
```
yarn add slimdux 
npm i --save slimdux
```
### Usage for React
#### useStore(key:string, initialValue: T): [T | undefined, (change: T) => void]
Using the statemanager in React is as simple as using the normal `useState`. 
```TypeScript
import React from 'react';
import { useStore } from 'Slimdux';

function App() {
  const [state,setState] = useStore("myStore",0)
  return (
    <div className="App">
      <button onClick={() => setState(state + 1)}> Increment </button>
      <hr />
      {state}
    </div>
  );
}

export default App;
```
### Usage for TypeScript
#### getInstace(): Slimdux
To get the statemanager we need to call for the instance instead of creating a new statemanager. Its simple as
```TypeScript
const instance = Slimdux.getInstance();
```
#### on(key:string, handler: SignalHandler): string
You can listen to change events in the statemanager with the `on` function. This will return your subscriberID. You will need this for unsubscribing.
```TypeScript
const instance = Slimdux.getInstance();

let subscriberID = instance.on("myStore",(event) => {
    ... do stuff
})
```
#### off(subscriberID:string): void
Off lets you unsubscribe from an Event
```TypeScript
const instance = Slimdux.getInstance();

let subscriberID = instance.on("myStore",(event) => {
    ... do stuff
    instance.off(subscriberID);
})
```
#### dispatch(key:string, change: T): void
With dispatch you can trigger an state change from anywhere!
```TypeScript
const instance = Slimdux.getInstance();

let subscriberID = instance.on("myStore",(event) => {
    console.log(event); //Would print "Hello World"
})

instance.dispatch("myStore","Hello World");
```
#### get(key:string, change: T): void
Lets you query an state manually
```TypeScript
const instance = Slimdux.getInstance();

let something = instance.get("myStore");
```

### Types
#### SignalHandler
```TypeScript
type SignalHandler<T> = (change: T | React.SetStateAction<T>) => void | Promise<void>;
```
#### SignalSubscriber
```TypeScript
type SignalSubscriber<T> = {
  subscriberID: string;
  handler: SignalHandler<T>;
  key: string;
};
```

###ToDos:
- Write tests
- Get Typing to work propperly
- Be able to import middlewares/reducer
