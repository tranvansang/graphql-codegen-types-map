export declare type KeysObj<T extends string> = {
    [key in T]: null;
};
export declare const unionToArray: <T extends string>(obj: KeysObj<T>) => string[];
export declare const pickKeys: <T extends string & keyof O, O extends {}>(obj: O, keysObj: KeysObj<T>) => Pick<O, T>;
