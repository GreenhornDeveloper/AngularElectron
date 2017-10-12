import { Injectable } from '@angular/core';

const sqlite3 = require('sqlite3').verbose();

@Injectable()
export class DbService {

  private db : any;
  private sql = `SELECT * FROM lorem`;

  // creates database when service is instantiated
  // the promise resolves to true when db exists.
  private initialized(dbPath:string): Promise<any>{
    this.db = new sqlite3.Database(dbPath);
    return new Promise(resolve => {
      
        this.db.serialize(() => {
          this.db.run("DROP TABLE IF EXISTS lorem");
          this.db.run("CREATE TABLE lorem (info TEXT)");
          let stmt = this.db.prepare("INSERT INTO lorem VALUES (?)");
          for (var i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
          }
          stmt.finalize();
          resolve(true);
        }); 
      })
  }

  constructor() { }

  readDb(dbPath:string) {
    // when the initialization promise is resolved, we get the data
    return this.initialized(dbPath).then(() => this.dbAll())
  }

  private dbAll() {
    return new Promise<any[]>((resolve, reject) => {
        this.db.all(this.sql, [], (err: any , rows: any[]) => {
          if (err) {
            console.log("error", err)
            reject(err);
          } else {
            resolve(rows);
          }
        });
    });
  }
}