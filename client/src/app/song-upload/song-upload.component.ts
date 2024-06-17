import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { ChordsService } from '../shared/services/chords.service';
import { Chords } from '../shared/models/Chords';
import { Song } from '../shared/models/song';
import { SongService } from '../shared/services/song.service';

@Component({
  selector: 'app-song-upload',
  templateUrl: './song-upload.component.html',
  styleUrls: ['./song-upload.component.scss']
})
export class SongUploadComponent {
  chords: Chords[] = [];
  songs: Song[] = [];
  lyrics = '';
  selectedStart = 0;
  selectedEnd = 0;
  selectedChord = '';
  allChords: string[] = [];
  displayChords: boolean = false;
  songUploaded: boolean = false;
  lyricsWithChords: {chord: string, text: string}[] = [];

  constructor(private http: HttpClient, private elementRef: ElementRef, private chordsService: ChordsService, private songService: SongService) {
    this.fetchAllChords();
  }

  ngOnInit(): void {
    this.loadChords();
    this.loadSong();
  }

  loadChords() {
    this.chordsService.getChords().subscribe(c => {
      this.chords = c;
    });
  }

  loadSong() {
    this.songService.getSong().subscribe(s => {
      this.songs = s;
    });
  }

  handleSelection() {
    const textArea = this.elementRef.nativeElement.querySelector('#lyricsTextarea');
    if (textArea) {
      this.selectedStart = textArea.selectionStart;
      this.selectedEnd = textArea.selectionEnd;
    }
  }

  selectChord(chord: string) {
    this.selectedChord = chord;
    this.insertChordInLyrics();
    this.sendToBackend();
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
    }).subscribe((response) => {
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
    this.http.post('http://localhost:3000/song/add', { lyrics: this.lyrics }).subscribe((response) => {
      console.log('Song uploaded:', response);
      this.songUploaded = true;  // Set flag to true after song is uploaded
    });
  }
}
