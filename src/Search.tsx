import * as React from 'react';

export interface ISearch {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Search: React.FC<ISearch> = ({ onChange, text, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <input
          type="text"
          name="search"
          aria-label="search"
          onChange={onChange}
          value={text}
        />
      </fieldset>
      <button type="submit" disabled={!text.length}>
        Search
      </button>
    </form>
  );
};
