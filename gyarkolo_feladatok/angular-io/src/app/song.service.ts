import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

export interface Song{
  id: number;
  title: string;
  artist: string;
  album: string;
  year: number;
  duration: string;
}


@Injectable({
  providedIn: 'root',
})
export class SongService {
  
  private http: HttpClient = inject(HttpClient)

  private songs: Song[] = [
      {
        id: 1,
        title: 'Tavaszi Szél',
        artist: 'Omega',
        album: 'Élő Koncert',
        year: 1973,
        duration: '4:12'
      },
      {
        id: 2,
        title: 'Az Éj Még Soha Nem Volt Ilyen Sötét',
        artist: 'Kispál és a Borz',
        album: 'Sika, Kasza, Léc',
        year: 1995,
        duration: '3:47'
      },
      {
        id: 3,
        title: 'Olyan Ő',
        artist: 'Bagossy Brothers Company',
        album: 'A Nap Felé',
        year: 2017,
        duration: '3:58'
      },
      {
        id: 4,
        title: 'Valami Amerika',
        artist: 'Bon Bon',
        album: 'Valami Amerika',
        year: 2002,
        duration: '4:05'
      },
      {
        id: 5,
        title: '8 óra munka',
        artist: 'Beatrice',
        album: 'Beatrice 78–88',
        year: 1988,
        duration: '3:29'
      }
    ]


  getProducts(): Observable<Song[]>{
    return of(this.songs).pipe(
      delay(1000)
    )
  }

  getProducts2(): Observable<Song[]>{
    return this.http.get<Song[]>("http://localhost:5188/api/product")
  }
}
