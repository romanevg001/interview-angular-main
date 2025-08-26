import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MovieListComponent } from './movies/movielist/movielist.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [ AppComponent, MovieListComponent ],
  bootstrap: [ AppComponent ],
  providers: [HttpClient]
})
export class AppModule { }
