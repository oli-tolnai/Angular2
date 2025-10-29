import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Song } from '../song.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-song-list',
  standalone: false,
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss',
})
export class SongListComponent {
  @Input() songs$ !: Observable<Song[]>

  @Output() selectedSong: EventEmitter<Song> = new EventEmitter<Song>


  select(song: Song){
    this.selectedSong.emit(song)
  }


}
