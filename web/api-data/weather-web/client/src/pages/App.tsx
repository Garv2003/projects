import Loader from "../components/Loader/Loader";
import NotFound from "../components/NotFound/NotFound";
import Header from "../components/Header";
import ContentLeft from "../components/ContentLeft";
import ContentRight from "../components/ContentRight";
import { icon } from "../utils/utils";
import useWeather from "../Hooks/useWeather";

const App = () => {
  const {
    data,
    data1,
    error,
    isLoading,
    isLoading1,
    setUrl,
    search,
    handleSearch,
    active,
    setActive,
    geoLocation,
    handleAdd,
    loading,
  } = useWeather();

  if (isLoading || isLoading1) return <Loader />;

  if (error) return <NotFound setUrl={setUrl} city={"New Delhi"} />;

  return (
    <>
      <Header
        search={search}
        handleSearch={handleSearch}
        setActive={setActive}
        active={active}
        geoLocation={geoLocation}
        data={data}
      />
      <main>
        <article className="container">
          <ContentLeft
            data={data}
            icon={icon}
            handleAdd={handleAdd}
            loading={loading}
          />
          <ContentRight data={data} data1={data1} icon={icon} />
        </article>
      </main>
    </>
  );
};

export default App;
