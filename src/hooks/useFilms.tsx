import * as React from 'react';

export interface IUseFilms {
    isLoading: boolean;
    data?: IResponse[];
    error?: string;
}

export interface IResponse {
    /** Relative path */
    poster_path: string;
    id: number;
    original_title: string;
    title: string;
    overview: string;
    release_date: string;
}
/**
 * docs: https://developers.themoviedb.org/3/search/search-movies
 * api: https://www.themoviedb.org/settings/api
 * images: https://www.themoviedb.org/talk/568e3711c3a36858fc002384
 */
const API_KEY = 'api_key=4a61f278507f62fc581cbb113edf09fb'; // please be gentle 🙂
const BASE = 'https://api.themoviedb.org/3/search/movie?';
const BASE_IMG = ' http://image.tmdb.org/t/p/w185';

function getRequest(query: string) {
    return `${BASE}query=${encodeURI(query)}&${API_KEY}&language=en-GB&page=1`;
}

function shapeResponse(results: any[]): IResponse[] {
    return results
        .filter(result => !!result.poster_path)
        .map((result: any) => ({
            poster_path: `${BASE_IMG}${result.poster_path}`,
            id: result.id,
            original_title: result.original_title,
            title: result.title,
            overview: result.overview,
            release_date: result.release_date
        }));
}

export function useFilms(search: string): IUseFilms {
    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState<IResponse[]>();
    const [error, setError] = React.useState();

    React.useEffect(() => {
        if (!search) return;

        const requestUrl = getRequest(search);
        setIsLoading(true);
        setData(undefined); // cleanup

        fetch(requestUrl)
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                setData(shapeResponse(data.results));
            })
            .catch(err => {
                setIsLoading(false);
                setError(err.message);
            });
    }, [search]);

    return {
        isLoading,
        data,
        error
    };
}
