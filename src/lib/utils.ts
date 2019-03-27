// import fetch from "node-fetch";
import debounce from "lodash/debounce";

const API_KEY = "0fc37f0c9c3ecd71b6cfd5a301226346";

enum LANGUAGE {
  BR = "pt-BR",
  US = "en-US"
}

export enum IMAGE_SIZE {
  w92 = "w92",
  w154 = "w154",
  w185 = "w185",
  w342 = "w342",
  w500 = "w500",
  w780 = "w780"
}

function queryMoviesURL(
  query: string,
  lang: LANGUAGE = LANGUAGE.BR,
  includeAdult: boolean = false
) {
  return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=${lang}&query=${query}&page=1&include_adult=${includeAdult}`;
}

function getMovieByIdURL(movieId: string, lang: LANGUAGE = LANGUAGE.BR) {
  return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${lang}`;
}

function getImageURL(posterPath: string, size: IMAGE_SIZE = IMAGE_SIZE.w500) {
  return `http://image.tmdb.org/t/p/${size}${posterPath}`;
}

export async function queryForMovies(
  searchText: string
): Promise<formatedResult[]> {
  if (searchText === "") return [];
  try {
    const response = await fetch(queryMoviesURL(searchText.replace(/ /g, "-")));

    const { results } = await response.json();

    return format(results);
  } catch (err) {
    return [];
  }
}

export type MovieResult = {
  overview: string;
  title: string;
  voteAverage: number;
  voteCount: number;
  runtime: number;
  posterURL: string;
  id: string;
};

export async function getMovieById(
  id: string,
  size: IMAGE_SIZE
): Promise<MovieResult> {
  try {
    const response = await fetch(getMovieByIdURL(id));

    const {
      overview,
      title,
      vote_average,
      vote_count,
      runtime,
      backdrop_path,
      poster_path
    } = await response.json();
    return {
      overview,
      title,
      runtime,
      voteAverage: vote_average,
      voteCount: vote_count,
      id,
      posterURL: !!backdrop_path
        ? getImageURL(backdrop_path, size)
        : getImageURL(poster_path, size)
    };
  } catch (err) {
    throw err;
  }
}

export type DesiredData = { id: string; title: string; poster_path: string };
export type formatedResult = { id: string; title: string; posterURL: string };

function format(items: DesiredData[]): formatedResult[] {
  return items.map(({ id, title, poster_path }) => ({
    id,
    title,
    posterURL: getImageURL(poster_path)
  }));
}

export function runtimeToHourAndMinute(runtime: number) {
  const hour = Math.floor(runtime / 60);
  const minutes = runtime - hour * 60;

  return `${hour}h${minutes}m`;
}

export const isMovieWatched = (
  watchedList: { id: string }[],
  movieId: string
) => watchedList.findIndex(({ id }) => id === movieId) >= 0;

export const getMovieWatched = (
  watchedList: { id: string; fId: string }[],
  movieId: string
) => {
  const index = watchedList.findIndex(({ id }) => id === movieId);
  return watchedList[index];
};
