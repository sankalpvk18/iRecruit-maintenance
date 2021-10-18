import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject,  } from '@angular/fire/compat/database';
import Indents from '../models/Indents';
import Applications from '../models/Applications';
import * as firebase from 'firebase/compat/app';
import { pathToFileURL } from 'url';


@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {


  
  // private userID= firebase.default.auth().currentUser.uid;
  // private dbPath = '/indents/'+this.userID;
 // public static dbPath = '/indents/';
  // public static dbPath2 = "/indents/"

  indentsRef: AngularFireList<Indents>;
  applicationRef:AngularFireList<Applications>;
  constructor(public db: AngularFireDatabase) { 
    
    this.indentsRef = db.list('/indents/xq1K5xx1rbP3xw4ybBTd4G2IZ3p1');
    this.applicationRef=db.list('indents/xq1K5xx1rbP3xw4ybBTd4G2IZ3p1/applications');
  }

 

  getAll(): AngularFireList<Indents> {
    return this.indentsRef;
  }

  getAllApplications(): AngularFireList<Applications> {
    return this.applicationRef;
  }

  create(indent: Indents): any {
    return this.indentsRef.push(indent);
  }
  createApplication(applications: Applications): any {
    return this.applicationRef.push(applications);
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
