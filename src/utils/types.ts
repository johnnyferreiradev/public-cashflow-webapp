import { Dispatch, SetStateAction as ReactSetStateAction } from 'react';

export type SetStateAction<T> = Dispatch<ReactSetStateAction<T>>;
