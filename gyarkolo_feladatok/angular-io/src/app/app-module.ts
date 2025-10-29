import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SongListComponent } from './song-list/song-list.component';
import { SongDetail } from './song-detail/song-detail';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App,
    SongListComponent,
    SongDetail
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
