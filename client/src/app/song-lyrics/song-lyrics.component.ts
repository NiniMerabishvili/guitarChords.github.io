import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from '../shared/services/song.service';
import { Song } from '../shared/models/song';

@Component({
  selector: 'app-song-lyrics',
  templateUrl: './song-lyrics.component.html',
  styleUrls: ['./song-lyrics.component.scss']
})
export class SongLyricsComponent implements OnInit {
  song: Song | null = null;

  constructor(private route: ActivatedRoute, private songService: SongService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const songId = params['id'];
      if (songId) {
        this.loadSongDetails(songId);
      }
    });
  }

  loadSongDetails(songId: string): void {
    this.songService.getSongById(songId).subscribe(song => {
      this.song = song;
    });
  }


}
