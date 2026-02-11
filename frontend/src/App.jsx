import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const handleSearch = (city) => {
    console.log('Searching weather for:', city);
    // TODO: call backend API and update weather state
  };

  return (
    <div className="min-h-screen flex flex-col items-center mt-20 px-4 py-12">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-2 tracking-tight">
        Weather Man
      </h1>
      <p className="text-gray-800/50 mb-8 text-base">
        Search any city to get the latest weather
      </p>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default App;
