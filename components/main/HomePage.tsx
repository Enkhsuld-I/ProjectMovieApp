import { MoviesContainer } from "@/components/home";
import { MovieCarousel } from "@/components/main/";
import { movieResponseType } from "@/types";
import { getMoviesList } from "@/utils/get-data";

export async function HomePage() {
  const upcomingMovies: movieResponseType = await getMoviesList("upcoming");
  const popularMovies: movieResponseType = await getMoviesList("popular");
  const topRatedMovies: movieResponseType = await getMoviesList("top_rated");
  const nowPlayingMovies: movieResponseType = await getMoviesList(
    "now_playing"
  );

  return (
    <div className="pl-20 pr-20">
      <MovieCarousel movies={nowPlayingMovies.results} />
      <MoviesContainer
        movies={upcomingMovies.results}
        title="Upcoming"
        link="upcoming"
      />
      <MoviesContainer
        movies={popularMovies.results}
        title="Popular"
        link="popular"
      />
      <MoviesContainer
        movies={topRatedMovies.results}
        title="Top Rated"
        link="top_rated"
      />
    </div>
  );
}
