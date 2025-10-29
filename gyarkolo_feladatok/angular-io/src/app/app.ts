import { Component, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Song, SongService } from './song.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-io');

  songs$ !: Observable<Song[]>

  selectedSong : Song | null = null

  private songService = inject(SongService)

  constructor(){
    this.songs$ = this.songService.getProducts()
  }

  onSongSelected(song: Song) : void{
    this.selectedSong = song;
  }

}
