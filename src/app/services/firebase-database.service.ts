import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject,  } from '@angular/fire/compat/database';
import Indents from '../models/Indents';


@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {


  private dbPath = '/indents/';

  indentsRef: AngularFireList<Indents>;
  constructor(public db: AngularFireDatabase) { 
    this.indentsRef = db.list(this.dbPath);
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
