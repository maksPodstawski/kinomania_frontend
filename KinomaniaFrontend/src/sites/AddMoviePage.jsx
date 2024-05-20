import React, {useState} from 'react';
import axios from 'axios';
import  '../styles/addMovieStyle.css';
import Header from "../components/Header.jsx";

function AddMoviePage() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [director, setDirector] = useState('');
    const [duration, setDuration] = useState(0);
    const [img, setImg] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }
    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    }
    const handleDirectorChange = (event) => {
        setDirector(event.target.value);
    }
    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    }
    const handleImgChange = (event) => {
        setImg(event.target.value);
    }

    const refreshPage = () => {
        window.location.reload();
    };


    const handleSubmit = async () => {
        const movieData = {
            title: title,
            description: description,
            genre: genre,
            director: director,
            duration: duration,
            img_url: img,
        }
        const url = 'http://localhost:8080/api/v1/panel/addMovie';

        const token = localStorage.getItem('token');

        const headers = {
            Authorization: `Bearer ${token}`,
        }



        axios.post(url, movieData, {headers: headers})
            .then(response => {
                console.log('Film dodany:', response.data)
                alert("Dodano film");
                refreshPage();
            })
            .catch(error => {
                console.error('Błąd podczas dodawania filmu:', error);
            });
    }

    return(
        <>
            <Header/>
        <div className="add-movie-container">
            <h1>Dodaj Film</h1>
            <div className="movie-container">
                <input type="text" id="add-movie-input" placeholder="Wprowadź nazwę filmu" required onChange={handleTitleChange}/>
                <br/>
                <input type="text" id="add-movie-input" placeholder="Wprowadź opis filmu" required onChange={handleDescriptionChange}/>
                <br/>
                <input type="text" id="add-movie-input" placeholder="Wprowadź reżysera filmu" required onChange={handleDirectorChange}/>
                <br/>
                <input type="text" id="add-movie-input" placeholder="Wprowadź gatunek filmu" required onChange={handleGenreChange}/>
                <br/>
                <input type="number" id="add-movie-input" placeholder="Wprowadź czas trwania filmu" required
                       onChange={handleDurationChange}/>
                <br/>
                <input type="text"  id="add-movie-input" placeholder="Wprowadź adres url do plakatu filmu" required
                       onChange={handleImgChange}/>
                <br/>
                <br/>
                <button type="submit" onClick={handleSubmit}>Dodaj</button>
            </div>
        </div>
        </>
    )
}

export default AddMoviePage;