import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MovieListComponent } from './movies/movielist/movielist.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [ AppComponent, MovieListComponent, CardComponent ],
  bootstrap: [ AppComponent ],
  providers: [HttpClient]
})
export class AppModule { }
