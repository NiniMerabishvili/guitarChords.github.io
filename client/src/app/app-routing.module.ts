import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SongUploadComponent } from './song-upload/song-upload.component';
import { AppComponent } from './app.component';
import { SongLyricsComponent } from './song-lyrics/song-lyrics.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  { path: 'upload-song', component: SongUploadComponent },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'song-lyrics/:id', component: SongLyricsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
