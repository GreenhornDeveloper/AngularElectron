import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule, MatButtonModule, MatToolbarModule} from '@angular/material';

import  {DbService } from './app.service';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, BrowserAnimationsModule, MatListModule, MatButtonModule, MatToolbarModule],
    bootstrap: [AppComponent],
    providers: [DbService]
})

export class AppModule { }
 