import React from 'react'

export default class BrowseMovies extends React.Component {
		state = {
			movies: [],
			error: ''
		}
		
		componentDidMount() {
			fetch('http://localhost:3001/movies')
			.then((response) => response.json())
			.then(movieslist => {
				this.setState({ movies: movieslist });
			});
		}



		render() {
			return (
				<ul>

					{this.state.movies.map((movies) => (
							<li key={movies.movieId}>{movies.title}</li>
					))}
				</ul>
			)
		}
	}