import Navbar from "../components/Navbar";
import SearchBox from "../components/SearchBox";
import WeatherCard from "../components/WeatherCard";

const Home = () => {
  return (
    <>
      <Navbar />

      <main className="max-w-3xl mx-auto p-6">
        <SearchBox />
        <WeatherCard />
      </main>

      <section className="max-w-3xl mx-auto p-6 mt-12">
        {/* About section will go here */}
      </section>
    </>
  );
};

export default Home;
