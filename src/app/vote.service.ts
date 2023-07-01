import { Injectable } from '@angular/core';
import { Picture } from './picture';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  pictures: Picture[] = []
  //picturesMap: Map<string, Picture> = new Map<string, Picture> ()

  constructor(private db: AngularFireDatabase) {

    db.list<Picture>('pictures').valueChanges().subscribe(t => {
      this.pictures = t
    })

    /*this.db.object('trips').valueChanges().subscribe(t => {
      this.picturesMap = new Map(Object.entries(t as object));
    });*/

   }

   add(p:Picture){
    this.db.list('pictures').push(p)
   }



}
