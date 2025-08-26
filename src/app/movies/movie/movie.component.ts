import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie',
  template: '',
})
export class MovieComponent {
  movies$ = this.moviesService.getMovies();
  constructor(private moviesService: MoviesService) {
    this.moviesService.httpRequestMovies();
  }



}
