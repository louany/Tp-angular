import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Category } from 'src/core/models/category';

import { GameDto, Game } from 'src/core/models/game';

@Injectable({
  providedIn: 'root'
})
export class GameApiService {

  private _urlApi:string = 'http://localhost:3000/'
  private _keyApi:string;
  
  constructor(private HttpCLient : HttpClient ) { }

  public getCategories(): Observable<Category[]>{
    this._keyApi = 'genres'
    return this.HttpCLient.get<Category[]>(this._urlApi + this._keyApi)
  }

  public getGames(){
    this._keyApi = 'games'
    return forkJoin([
      this.HttpCLient.get<GameDto[]>(this._urlApi + this._keyApi),
      this.getCategories()
    ]).pipe(
      delay(1000),
      map(([
          games,
          categories
      ]) => this.convert(games, categories))
    )
  }

  private convert(games: GameDto[], categories: Category[]): Game[] {
    return games.map( game => ({
      ...game, 
      genres: game.genres.map( 
        genre => categories.find( 
          category => category.id === Number(genre))
      )
    }))
  }

  // public getPublisher(): Observable<Category[]>{
  //   this._keyApi = 'genres'
  //   return this.HttpCLient.get<Category[]>(this._urlApi + this._keyApi)
  // }

  // public getDeveloper(): Observable<Developer[]>{
    
  // }
}
