"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MovieType, TrailerResponseType } from "@/types";
import { getMovieTrailers } from "@/utils/get-data";
import { TrailerDialog } from "../trailer/TrailerDialog";
import { Button } from "../ui/button";
import { MdOutlinePlayArrow } from "react-icons/md";
import { Star } from "lucide-react";
 

type MovieCarouselProps = {
  movies: MovieType[];
};

export function MovieCarousel({ movies }: MovieCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Carousel setApi={setApi} className="w-screen">
        <CarouselContent>
          {movies.map((movie, index,) => (
            <MovieCarouselItem key={index} movie={movie} 
            />
          
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-13" />
        <CarouselNext className="right-13" />
      </Carousel>
      <div className="flex gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <div
            onClick={() => {
              api?.scrollTo(index);
            }}
            key={index}
            className={`rounded-full size-4 ${
              index + 1 === current ? "bg-white" : "bg-gray-600"
            }`}
          ></div>
        ))}
      </div>
    </>
  );
}

const MovieCarouselItem = ({ movie }: { movie: MovieType }) => {
  const [trailerKey, setTrailerKey] = React.useState("");

  const getTrailerData = async () => {
    const trailerData: TrailerResponseType = await getMovieTrailers(
      movie.id.toString()
    );
    const trailer = trailerData.results.find((item) => item.type === "Trailer");
    setTrailerKey(trailer?.key || "");
  };

  React.useEffect(() => {
    getTrailerData();
  }, []);

  return (
   <CarouselItem
              // key={index}
              className=" relative h-160  bg-no-repeat bg-cover bg-center text-white"
            >
              <img
                className="w-full  h-full"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              />
              <div className="p-1 absolute top-[108px] left-[140px]">
                <div className="">
                  <p>Now Playing :</p>
                  <p className="text-[36px] font-bold">{movie.title}</p>
                  <p className="flex gap-2 items-center text-[18px] pt-[10px]">
                    <Star className="h-[28px] w-[28px] fill-[#FDe047]" color="#FDE047" />
                    6.9<span className="text-[16px] color-[#71717A]">/10</span>
                  </p>
                  <p className="w-[500px] text-[12px] font-normal pt-[26px]">
                    {" "}
                    {movie.overview}
                  </p>
                  <Button className="bg-white text-black mt-4">
                    <MdOutlinePlayArrow />
                    Watch Trailer
                  </Button>
                </div>
              </div>
            </CarouselItem>
  );
};
