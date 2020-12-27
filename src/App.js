import React,{useState,useEffect} from 'react';
import Movie from './components/Movie'

// const api_key='38cbce8245e3a5245dddb4972989babd'
const FEATURED_API='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=38cbce8245e3a5245dddb4972989babd&page=1';
const SEARCH_API='https://api.themoviedb.org/3/search/movie?api_key=38cbce8245e3a5245dddb4972989babd&query=';

function App() {
  const [movies,setMovies]=useState([]);
  const [searchTerm,setSearchTerm]=useState("");
  useEffect(()=>{
    const fetchMovies=async ()=>{
      const response=await fetch(FEATURED_API)
      const responseJson=await response.json();
      setMovies(responseJson.results);
    }
    fetchMovies();
  },[])
  console.log(movies);

  const handleOnSubmit=(e)=>{
    e.preventDefault();
    if(searchTerm){
      const fetchMovies=async ()=>{
        const response=await fetch(`${SEARCH_API}${searchTerm}`)
        const responseJson=await response.json();
        setMovies(responseJson.results);
      }
      fetchMovies();
      setSearchTerm("");
    }
    
  }

  return (
    <React.Fragment>
      <header>          
          <form onSubmit={handleOnSubmit}>
            <input type="text" 
            className='search' 
            placeholder='Search...'
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            />
          </form>
        </header>
      <div className='movie-container'>      
        {movies.length>0 && movies.map((movie)=>(
          <Movie key={movie.id} data={movie}/>
        ))}
      </div>
    </React.Fragment>
  );
}

export default App;
