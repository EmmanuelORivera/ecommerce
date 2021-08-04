import { Location } from 'history';
export const redirectLoggedUser = (location: Location<unknown>) => {
  return location.search ? location.search.split('=')[1] : '/';
};
