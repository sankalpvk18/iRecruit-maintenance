import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject,  } from '@angular/fire/compat/database';
import Indents from '../models/Indents';
import Applications from '../models/Applications';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {

  currentRef = "";

  indentsRef: AngularFireList<Indents>;
  applicationRef:AngularFireList<Applications>;
  // particularIndentRef:AngularFireList<Indents>;
  constructor(public db: AngularFireDatabase) { 
    
    this.indentsRef = db.list('/indents/' + sessionStorage.getItem("firebaseUserId"));
    // this.particularIndentRef=db.list('/indents/' + sessionStorage.getItem("firebaseUserId"));
   // this.applicationRef=db.list('indents/'+sessionStorage.getItem("firebaseUserId")+'/applications');
  }

  getAll(): AngularFireList<Indents> {
    return this.indentsRef;
  }


  getCurrentIndentRef(indentId: string): AngularFireList<Indents>{
    return this.db.list('/indents/' + sessionStorage.getItem("firebaseUserId") + '/' + indentId);
  }

  getCurrentUserIDRef(userID: string,indentId: string): AngularFireList<Applications>{
    return this.db.list('indents/'+userID+'/'+indentId+'/applications');
  }

  getAllApplications(ref: AngularFireList<Applications>): AngularFireList<Applications> {
    return ref;
  }

  getRejectedUserIDRef(userID: string,indentId: string): AngularFireList<Applications>{
    return this.db.list('indents/'+userID+'/'+indentId+'/rejected');
  }

  

  getParicularIndent(ref: AngularFireList<any>):AngularFireList<any>{
    return ref;
  }

  create(indent: Indents): any {
    return this.indentsRef.push(indent);
  }



  createApplication(applications: Applications, ref: AngularFireList<Applications>): any {
    return ref.push(applications);
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
