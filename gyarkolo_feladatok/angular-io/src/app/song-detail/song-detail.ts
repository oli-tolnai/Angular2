import { Component, Input } from '@angular/core';
import { Song } from '../song.service';

@Component({
  selector: 'app-song-detail',
  standalone: false,
  templateUrl: './song-detail.html',
  styleUrl: './song-detail.scss',
})
export class SongDetail {

  @Input() song : Song | null = null;
}
