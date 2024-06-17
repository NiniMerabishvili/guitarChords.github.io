import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private url='http://localhost:3000/song/all';

  constructor(private http:HttpClient){ }

  public getSong(): Observable<Song[]>{
    return this.http.get<Song[]>(this.url);
}

public addSong(chords:Song){
    return this.http.post<Song>(this.url, chords);
}   
}
