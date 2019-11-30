import * as React from 'react';

import { Image } from './Image';

export interface IFilm {
  title: string;
  filmArt: string;
  releaseDate: string;
}

export interface IFilms {
  films: IFilm[];
}

export const Film: React.FC<IFilm> = ({ filmArt, releaseDate, title }) => {
  return (
    <article className="film">
      <h3>{title}</h3>
      <figure>
        <Image src={filmArt} alt={title} />
        {releaseDate && <figcaption>({releaseDate})</figcaption>}
      </figure>
    </article>
  );
};

export const Films: React.FC<IFilms> = ({ films }) => {
  return (
    <div className="films">
      {films.map(({ filmArt, releaseDate, title }, index) => (
        <Film
          key={title + index}
          filmArt={filmArt}
          releaseDate={releaseDate}
          title={title}
        />
      ))}
    </div>
  );
};
