import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { ChordsService } from '../shared/services/chords.service';
import { Chords } from '../shared/models/chords';
import { Song } from '../shared/models/song';
import { SongService } from '../shared/services/song.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song-upload',
  templateUrl: './song-upload.component.html',
  styleUrls: ['./song-upload.component.scss']
})
export class SongUploadComponent {
  chords: Chords[] = [];
  songs: Song[] = [];
  lyrics = '';
  songName= '';
  selectedStart = 0;
  selectedEnd = 0;
  selectedChord = '';
  allChords: string[] = [];
  displayChords: boolean = false;
  songUploaded: boolean = false;
  lyricsWithChords: { chord: string, text: string }[] = [];

  constructor(
    private http: HttpClient,
    private elementRef: ElementRef,
    private chordsService: ChordsService,
    private songService: SongService,
    private router: Router
  ) {
    this.fetchAllChords();
  }

  ngOnInit(): void {
    this.loadChords();
    this.loadSongs();
  }

  loadChords() {
    this.chordsService.getChords().subscribe(c => {
      this.chords = c;
    });
  }

  loadSongs() {
    this.songService.getSong().subscribe(s => {
      this.songs = s;
    });
  }

  selectChord(chord: string) {
    this.selectedChord = chord;
    const textArea = this.elementRef.nativeElement.querySelector('#lyricsTextarea');
    if (textArea) {
      this.selectedStart = textArea.selectionStart;
      this.selectedEnd = textArea.selectionEnd;
      this.insertChordInLyrics();
      this.sendToBackend();
    }
  }

  insertChordInLyrics() {
    const beforeSelection = this.lyrics.slice(0, this.selectedStart);
    const selectedText = this.lyrics.slice(this.selectedStart, this.selectedEnd);
    const afterSelection = this.lyrics.slice(this.selectedEnd);

    this.lyricsWithChords.push({ chord: this.selectedChord, text: selectedText });
    this.lyrics = `${beforeSelection}[${this.selectedChord}]${selectedText}${afterSelection}`;
  }

  sendToBackend() {
    this.http.post('http://localhost:3000/song/add', {
      start: this.selectedStart,
      end: this.selectedEnd,
      chord: this.selectedChord
    }).subscribe(response => {
      console.log(response);
    });
  }

  fetchAllChords() {
    // this.http.get<string[]>('http://localhost:3000/chords/all').subscribe((chords) => {
    //   this.allChords = chords;
    // });
  }

  toggleDisplayChords() {
    this.displayChords = !this.displayChords;
  }

  uploadSong() {
    const data = {
      title: this.songName,
      lyrics: this.lyrics
    };

    this.http.post('http://localhost:3000/song/add', data).subscribe(response => {
      console.log('Song uploaded:', response);
      this.songUploaded = true; // Set flag to true after song is uploaded
      this.loadSongs(); // Refresh the list of songs
    });
  }

  parseLyrics(lyrics: string): { chord: string, text: string }[] {
    const segments: { chord: string, text: string }[] = [];
    const regex = /\[([^\]]+)\]/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(lyrics)) !== null) {
      const chord = match[1];
      const text = lyrics.slice(lastIndex, match.index);
      if (text) {
        segments.push({ chord: '', text });
      }
      segments.push({ chord, text: '' });
      lastIndex = regex.lastIndex;
    }

    const remainingText = lyrics.slice(lastIndex);
    if (remainingText) {
      segments.push({ chord: '', text: remainingText });
    }

    return segments;
  }

  goHomePage() {
    this.router.navigate(['./landing-page']);
  }
}