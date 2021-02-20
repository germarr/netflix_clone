import React, { useState, useEffect } from 'react'
import axios from "./axios";
import "./Row.css"
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url= "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchURL, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    // A snippet of code which runs based on a specific condition/variable

    useEffect(()=>{
        // if [], run once when the row loads, and dont run again
        async function fetchData(){
            const request = await axios.get(fetchURL);
            //this call will fetch the basURL needed to call the API
            setMovies(request.data.results);
            return request;
        }
        fetchData()
    },[fetchURL]);

    const opts = {
        height:"390",
        width : "100%",
        playerVars: {
            autoplay: 1
        }
    }

    const handleClick = (movie) =>{
        if (trailerUrl){
            setTrailerUrl('');
        }else{
            movieTrailer(movie?.name || '')
            .then((url) => { 
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error)=> console.log(error))
        }
    }


    return (
        <div className="row">
            <h2>{title}</h2>
            
            <div className="row__posters">
                {/* row__posters */}
                {movies.map(movie=>(
                    <img
                    onClick = {()=> handleClick(movie)}
                    key={movie.id}
                    className={ `row__poster ${isLargeRow && "row__posterLarge"}` }
                    src={`${base_url}${
                         isLargeRow ? movie.poster_path: movie.backdrop_path}`} 
                     alt={movie.name} />
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts = {opts} />}
            
        </div>
    )
}

export default Row
