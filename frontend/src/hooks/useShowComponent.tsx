import { useState } from 'react';

export const useStateShowComponent = (initialState: boolean) =>
  useState<boolean>(initialState);

export type ShowComponent = ReturnType<typeof useStateShowComponent>;
export type ShowComponentValue = ShowComponent[0];
export type ShowComponentSetValue = ShowComponent[1];
