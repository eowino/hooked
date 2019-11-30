import * as React from 'react';

import { Films } from './Film';
import { films } from './data';

export const FavouriteFilms: React.FC = () => {
  return (
    <>
      <h2>Sharing a few of our favourite movies</h2>
      <Films films={films} />
    </>
  );
};
