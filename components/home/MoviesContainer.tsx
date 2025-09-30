import { MovieType } from "@/types";
import { MovieCard } from "./MovieCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type MoviesContainerProps = {
  movies: MovieType[];
  title: string;
  link: string;
};

export const MoviesContainer = ({
  movies,
  title,
  link,
}: MoviesContainerProps) => {
  return (
    <div className="m-auto max-w-[1280px]">
      <div className="flex w-full justify-between mb-8">
        <h2 className="text-3xl font-bold">{title}</h2>
         <Link className="flex items-center gap-2" href={`/more?title=${link}`}>
          <span>See more</span> <ChevronRight />
        </Link>
        
      </div>
        
      <div className="flex gap-8 flex-wrap mb-[52px]">
        {movies.slice(0, 20).map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            score={movie.vote_average}
            image={movie.poster_path}
          />
        ))}
      </div>
    
    </div>
  );
};
