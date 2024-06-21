import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SongService } from '../shared/services/song.service';
import { Router } from '@angular/router';
import { Song } from '../shared/models/song';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  songs: Song[] = [];
  

  constructor ( private router: Router, private http: HttpClient, private songService: SongService ) {};

  ngOnInit(): void {
    this.loadSongTitles();
  }

  loadSongTitles(): void {
    this.songService.getSongName().subscribe(songs => {
      this.songs = songs.map((song, index) => ({ _id: song._id, title: song.title, lyrics: '' }));
    });
  }  
  

  hostUpload() {
    this.router.navigate(['./upload-song']);
  }

  // viewSong(songId: String) {
  //   this.router.navigate(['./song-lyrics', songId]);
  // }
  navigateToSong(songId: string): void {
    this.router.navigate(['song-lyrics', songId]);
  }  
  
}
