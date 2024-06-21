import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../models/song';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private url = environment.apiUrl;


  constructor(private http: HttpClient) { }

  public getSong(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.url}/song/all`);
  }

  public getSongTitle(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.url}/song/title`);
  }

  public getSongName(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.url}/song/all`);
  }

  // public getOne(id: string): Observable<Song> {
  //   return this.http.get<Song>(`http://localhost:3000/song/${id}`);
  // }
  getSongById(songId: string): Observable<Song> {
    const url = `${this.url}/song/${songId}`;
    return this.http.get<Song>(url);
  }

  public addSong(chords: Song) {
    return this.http.post<Song>(`${this.url}/song/add`, chords);
  }
}
