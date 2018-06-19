import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from  'firebase';

@Injectable()
export class EntityProvider extends BaseService {
  constructor(public afdb: AngularFireDatabase) { 
    super() 
  }

  createEntity(entity: {title: string, value1: string, value2: string}, uuid: string): Promise<void> {
    return this.afdb.object(`/entities/${uuid}`)
      .set(entity)
      .catch(this.handlePromiseError);
  }
}
