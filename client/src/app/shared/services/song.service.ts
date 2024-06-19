import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private url='http://localhost:3000/song/all';
  private titlesUrl='http://localhost:3000/song/title';

  constructor(private http:HttpClient){ }

  public getSong(): Observable<Song[]>{
    return this.http.get<Song[]>(this.url);
  }

  public getSongTitle(): Observable<Song[]>{
    return this.http.get<Song[]>(this.url);
  }

  public getSongName(): Observable<{title: String} []>{
    return this.http.get<{title: String} []>(this.titlesUrl);
  }

  // public getOne(id: string): Observable<Song> {
  //   return this.http.get<Song>(`http://localhost:3000/song/${id}`);
  // }
  getSongById(songId: string): Observable<Song> {
    const url = `${this.titlesUrl}/${songId}`;
    return this.http.get<Song>(url);
  }

  public addSong(chords:Song){
    return this.http.post<Song>(this.url, chords);
  }   
}
