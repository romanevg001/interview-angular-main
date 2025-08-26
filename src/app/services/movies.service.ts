import { map, Observable, of, shareReplay, switchMap } from "rxjs";
import { IMovie, Movie } from "../models/movie.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class MoviesService {
    private url = 'http://localhost:3000/';
    private movies$!: Observable<IMovie[]>;

    constructor(private http: HttpClient) {

    }

    getMovies(searchName: string = '', reload = false): Observable<IMovie[]> {
        
        if(!this.movies$ || reload) {
            this.movies$ = this.http.get<IMovie[]>(this.url+'movie').pipe( shareReplay({bufferSize: 1, refCount: true}) );
        }
        return this.movies$?.pipe(
            map(ms=> searchName ? ms.filter(m=>m.name.includes(searchName)) : ms )
        );
    }

    addMovie(name: string): Observable<any> {
        if (!name) return of();
        return this.http.post(this.url+'movie',new Movie({name}));
    }// - добавляет новый фильм (со статусом "не онлайн")

    updateMovie(movie: IMovie): Observable<any> {
         if (!(movie && movie.id)) return of();
        return this.http.put(this.url+'movie/'+movie.id,new Movie(movie));

    } //- обновляет фильм (например, меняет статус "онлайн")

    deleteMovie(id: string) {
        if (!id) return of();
        return this.http.delete(this.url+'movie/'+id);

    }
}