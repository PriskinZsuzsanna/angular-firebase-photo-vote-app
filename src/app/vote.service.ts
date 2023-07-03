import { Injectable } from '@angular/core';
import { Picture } from './picture';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  //ictures: Picture[] = []
  picturesMap: Map<string, Picture> = new Map<string, Picture> ()
  voters: string[] = []
  error: boolean = false
  actualEdit: Picture = new Picture();
  actualEditKey: string = '';

  constructor(private db: AngularFireDatabase) {

    /*db.list<Picture>('pictures').valueChanges().subscribe(t => {
      this.pictures = t
    })*/

    this.db.object('pictures').valueChanges().subscribe(t => {
      this.picturesMap = new Map(Object.entries(t as object));
    });

    this.db.list<string>('voters').valueChanges().subscribe(t => {
      this.voters = t;
    })

  }

  add(p: Picture) {
    this.db.list<Picture>('pictures').push(p)
  }

  addVoter(name:string, key:any, value:any) {
    console.log(this.voters)
    console.log(name)
    console.log(this.voters.find(t => t == name) == undefined)
    if (this.voters.find(t => t == name) == undefined) {
      this.db.list<string>('voters').push(name);
      this.edit(key, value)
    } else {
      this.error = true
      setTimeout(()=> {
        this.error = false
      },3000)
    }
  }

  update(id: string, t: Picture){
    this.db.list('pictures').update(id, t);
  }

  edit(key: string, value: Picture) {
    this.actualEdit = this.getPictureCopy(value);
    this.actualEditKey = key;
    console.log(this.actualEdit)
    console.log(this.actualEditKey)
    this.update(this.actualEditKey, this.actualEdit);
    this.actualEdit = new Picture();
    this.actualEditKey = '';
  }

  getPictureCopy(input: Picture): Picture {
    let t = new Picture();
    t.id = input.id;
    t.title = input.title;
    t.url = input.url;
    t.votes = input.votes + 1;
    t.email = input.email;
    t.displayName = input.displayName;
    return t;
  }

  /*getDisplayName() {
    this.displayName = JSON.stringify(localStorage.getItem('email'))
    return this.displayName
  }*/



}
