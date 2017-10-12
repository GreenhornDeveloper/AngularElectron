import { Component } from '@angular/core';
import { DbService } from './app.service';

import {remote} from 'electron';
const path = require('path')

@Component({
  selector: 'App',
  template:
  `
  <div> 
  <mat-toolbar>Welcome to the {{name}} Application </mat-toolbar>
      <button (click)="readDb()" mat-raised-button color="primary">Get Results</button>
      <mat-list>
        <mat-list-item *ngFor="let result of results | async"> {{ result.info}} </mat-list-item>
      </mat-list>
  </div>
 `
})

export class AppComponent {

  private theDbRoot = remote.app.getPath('userData');
  private dbPath = path.resolve(this.theDbRoot, './db.sqlite3');

  public name: string = "Electron";
  results : Promise<any[]>;
  
  constructor(private dbService: DbService) {}

  readDb() {
    this.results = this.dbService.readDb(this.dbPath);
  };
}