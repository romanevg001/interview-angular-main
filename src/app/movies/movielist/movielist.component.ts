import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { BehaviorSubject, filter, debounceTime, map, Observable, tap, switchMap, combineLatest } from 'rxjs';
import { IMovie, Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent {
  searchField$ = new BehaviorSubject('');
  checkAll$ = new BehaviorSubject<boolean | undefined>(undefined);

  movies$: Observable<IMovie[]> = combineLatest([
    this.checkAll$, 
    this.searchField$.pipe(
      debounceTime(500), 
      filter(str=> str.length>3 || str.length == 0)
    )
  ]).pipe(
    switchMap(([isAllCheck,str]) => (str ? this.moviesService.getMovies(str.trim(),true) : this.moviesService.getMovies()).pipe(
      map(list=> (typeof isAllCheck =='boolean') ? list.map(m=>new Movie({...m, isOnline: isAllCheck})) : list)
    )),
  );

  constructor(private moviesService: MoviesService) {
  
  }

  searchMovie(searchstr: any) {
    console.log('search=',searchstr)
    this.searchField$.next(searchstr);
  }


  checkAll(isAllCheck: boolean) {
    console.log('checkAll',isAllCheck)
    this.checkAll$.next(isAllCheck);
   
  }

  clear() {
    this.searchField$.next('');

  }




}
