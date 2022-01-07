import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100"

  constructor(
    private http: HttpClient
  ) { }

  get apiListAllPokemons(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      tap(res => {
        res.results.map((resPokes: any) => {
          this.apiGetPokeStats(resPokes.url).subscribe(
            res => resPokes.status = res
          )
        })
      })
    )
  }

  public apiGetPokeStats(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      map(
        res => res
      )
    )
  }




}