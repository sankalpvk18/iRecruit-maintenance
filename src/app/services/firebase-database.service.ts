import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject,  } from '@angular/fire/compat/database';
import Indents from '../models/Indents';
import * as firebase from 'firebase/compat/app';
import { pathToFileURL } from 'url';


@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {


  
  // private userID= firebase.default.auth().currentUser.uid;
  // private dbPath = '/indents/'+this.userID;
  private dbPath = '/indents/';

  indentsRef: AngularFireList<Indents>;
  constructor(public db: AngularFireDatabase) { 
    this.indentsRef = db.list(this.dbPath);
  }

  setRef(path:string) {
    this.dbPath = this.dbPath+path;
  }

  getAll(): AngularFireList<Indents> {
    return this.indentsRef;
  }

  create(indent: Indents): any {
    return this.indentsRef.push(indent);
  }

  update(key: string, value: any): Promise<void> {
    return this.indentsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.indentsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.indentsRef.remove();
  }

}
