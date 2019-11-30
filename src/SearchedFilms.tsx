import * as React from 'react';

import { Films, IFilm } from './Film';

interface ISearchedFilms {
  films: IFilm[];
  query: string;
  isLoading: boolean;
}

export const SearchedFilms: React.FC<ISearchedFilms> = ({
  query,
  films,
  isLoading
}) => {
  const hasResults = !!films.length;
  return (
    <>
      <h2>You searched for: {query}</h2>
      {hasResults && <Films films={films} />}
      {!hasResults && !isLoading && (
        <p>
          No results found <span aria-hidden>😞</span>
        </p>
      )}
    </>
  );
};
