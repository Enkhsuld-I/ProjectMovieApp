import { TrailerDialog } from "@/components/trailer/TrailerDialog";
import { MovieType, TrailerResponseType } from "@/types";
import { getMovieDetail, getMovieTrailers } from "@/utils/get-data";


type DetailDynamicPageProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: DetailDynamicPageProps) => {
  const dynamicParams = await params;
  const id = dynamicParams.id;
  const movieDetailData = await getMovieDetail(id);

  return {
    title: `MovieZ | ${movieDetailData.title}`,
  };
};

const DetailDynamicPage = async ({ params }: DetailDynamicPageProps) => {
  const dynamicParams = await params;
  const id = dynamicParams.id;
  const movieDetailData = await getMovieDetail(id);

  const trailerData: TrailerResponseType = await getMovieTrailers(id);

  const trailer = trailerData.results.find((item) => item.type === "Trailer");



  return (
    <div className="max-w-[1440px] m-auto px-[180]">
       <div className="text-[36px] font-bold">
        {movieDetailData.title}
       </div>
       <h1>{movieDetailData.release_date}</h1>
     
     <div className="flex gap-8">
     <img
        className="w-[290px] h-[428px] "
        src={`https://image.tmdb.org/t/p/original/${movieDetailData.backdrop_path}`}
      />
       <img
          className="w-[760px] h-[428px]"
          src={`https://image.tmdb.org/t/p/original/${movieDetailData.backdrop_path}`}
        />
        </div>
              
      <>
        <TrailerDialog youtubeKey={trailer?.key} />
      </>
    
    </div>
   
  );
};

export default DetailDynamicPage;
