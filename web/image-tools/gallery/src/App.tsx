import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type Image = {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
};

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);

  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const fetchImages = async () => {
    try {
      const url = search
        ? `https://api.unsplash.com/search/photos?client_id=${accessKey}&page=${page}&query=${search}`
        : `https://api.unsplash.com/search/photos?client_id=${accessKey}&page=${page}&query=nature`;
      const response = await axios.get(url);
      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error as Error);
    }
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setImages([]);
    fetchImages();
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center gap-10 text-red-500 text-2xl">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSearchSubmit}
        className="flex justify-center gap-5 w-full p-5"
      >
        <input
          type="text"
          placeholder="Search"
          value={search}
          className="p-2 border border-gray-300 rounded-lg w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="p-2 bg-blue-500 text-white rounded-lg">
          Search
        </button>
      </form>

      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<h4 className="w-full text-center">Loading...</h4>}
        style={{
          overflow: "hidden",
        }}
      >
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
        >
          <Masonry gutter="20px">
            {images.map((image: Image) => {
              return (
                <img
                  key={image.id}
                  src={image.urls.regular}
                  alt={image.alt_description}
                  style={{ width: "100%", borderRadius: "8px", margin: "3px" }}
                />
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </div>
  );
}
