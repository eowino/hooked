import * as React from 'react';
import { render } from 'react-dom';

import { Header } from './Header';
import { Search } from './Search';
import { FavouriteFilms } from './FavouriteFilms';
import { SearchedFilms } from './SearchedFilms';
import { useFilms, IResponse } from './hooks/useFilms';
import { IFilm } from './Film';

import './styles.scss';

function responseToFilm(response: IResponse[] = []): IFilm[] {
  return response.map(res => ({
    title: res.title,
    filmArt: res.poster_path,
    releaseDate: res.release_date
  }));
}

function App() {
  const [text, setText] = React.useState('');
  const [search, setSearch] = React.useState('');
  const { data, error, isLoading } = useFilms(search);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value }
    } = e;
    setText(value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearch(text);
    setText('');
  }

  return (
    <>
      <Header />
      <main>
        <Search text={text} onChange={handleChange} onSubmit={handleSubmit} />
        {error && <h3 className="error">{error}</h3>}
        {!data && <FavouriteFilms />}
        {data && (
          <SearchedFilms
            isLoading={isLoading}
            query={search}
            films={responseToFilm(data)}
          />
        )}
      </main>
    </>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
