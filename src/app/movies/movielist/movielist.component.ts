import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { BehaviorSubject, filter, debounceTime, map, Observable, zip, switchMap, combineLatest,defaultIfEmpty,  of, bufferCount, scan, pairwise, tap, concatAll, ReplaySubject, firstValueFrom, race, withLatestFrom } from 'rxjs';
import { IMovie, Movie } from 'src/app/models/movie.model';
import { BaseComponent } from 'src/app/components/base.component';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent extends BaseComponent {
  update$ = new BehaviorSubject(false);
  searchField$ = new BehaviorSubject('');
  checkAll$ = new BehaviorSubject<boolean | undefined>(undefined);
  editItemField$ = new BehaviorSubject<string>('empty');


  private isUpdateTrigger = false;
  movies$: Observable<IMovie[]> = combineLatest([
      this.checkAll$, 
      this.searchField$.pipe(
        debounceTime(500), 
        filter(str=> str.length>3 || str.length == 0)
      ),
      this.update$.pipe(tap(_=>this.isUpdateTrigger=true)),
  ]).pipe(
    switchMap(([isAllCheck,str]) => (str ? this.moviesService.getMovies(str.trim(),true) : this.moviesService.getMovies('',this.isUpdateTrigger)).pipe(
      map(list=> (typeof isAllCheck =='boolean') ? list.map(m=>new Movie({...m, isOnline: isAllCheck})) : list),
      tap(_=>this.isUpdateTrigger=false)
    )),
  );

  constructor(private moviesService: MoviesService) {
       super();
  }

  searchMovie(searchstr: any) {
    this.searchField$.next(searchstr);
  }


  checkAll(isAllCheck: boolean) {
    this.checkAll$.next(isAllCheck);
  }

  clear() {
    this.searchField$.next('');
  }

  edit(m: IMovie) {
    
    if(this.editItemField$.value == 'empty') { this.editItemField$.next(m.name); }

    const newvalue = this.editItemField$.value.trim();
    m._isEdit = !m._isEdit;
   
    if(!m._isEdit && newvalue) {
      m.name = newvalue;
      this.moviesService.updateMovie(new Movie({...m, name: newvalue})).pipe(this.unsubscribeOnDestroy()).subscribe(()=>{
        this.editItemField$.next('empty');
      });
    }
  }

  editItemField(val:string) {
    this.editItemField$.next(val);
  }

  delete(id: string) {
    this.moviesService.deleteMovie(id).pipe(this.unsubscribeOnDestroy()).subscribe(()=>this.update$.next(true))
  }




}
