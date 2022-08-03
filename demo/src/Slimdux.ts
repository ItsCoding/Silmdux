import { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type SignalHandler<T> = (change: T | React.SetStateAction<T>) => void | Promise<void>;

type SignalSubscriber<T> = {
  subscriberID: string;
  handler: SignalHandler<T>;
  key: string;
};

type StoreValueType = {
    [key: string]: unknown;
}

export class Slimdux {
  private static instance: Slimdux;
  private constructor() {}
  private listeners: SignalSubscriber<any>[] = [];
  private storeValues: StoreValueType = {};
  public static getInstance() {
    if (!Slimdux.instance) {
      Slimdux.instance = new Slimdux();
    }
    return Slimdux.instance;
  }
  public on<T>(key:string, handler: SignalHandler<T>): string {
    let subscriberID = uuidv4();
    this.listeners.push({
      subscriberID,
      handler,
      key
    });
    return subscriberID;
  }
  public dispatch<T>(key: string, change: T) {
    this.storeValues[key] = change;
    this.listeners.forEach((lt) => {
        if(lt.key === key) lt.handler(change)
    });
  }
  public off(subscriberID: string): void {
    this.listeners = this.listeners.filter(
      (s) => s.subscriberID !== subscriberID
    );
  }
  public get<T>(key: string): T | undefined {
    return this.storeValues[key] as T ?? undefined;
  }
  public get keys(): string[]{
    return Object.keys(this.storeValues);
  }
}

export const useStore = <T>(key: string, initialValue: T): [T | undefined, any] => {
  const instance = Slimdux.getInstance();
  const [state, setState] = useState<T>(instance.get(key) ?? initialValue);
  useEffect(() => {
    instance.on(key,(val: T | React.SetStateAction<T>) => {
      setState(val);
    });
  });
  const toggle = useCallback((change: T): void => instance.dispatch(key,change), [
    instance,
    key
  ]);
  return [state, toggle];
};
