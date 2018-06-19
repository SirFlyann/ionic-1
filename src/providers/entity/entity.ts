import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { EntityModel } from './../../models/entity.model';
import { Observable } from 'rxjs/Observable';
import * as firebase from  'firebase';
import 'firebase/storage';

@Injectable()
export class EntityProvider extends BaseService {

  entities: Observable<EntityModel[]>;

  constructor(
    public db: AngularFireDatabase
  ) { 
    super() 
    this.setEntities()
  }

  createEntity(entity: {uuid: string, title: string, value1: string, value2: string}, uuid: string): Promise<void> {
    return this.db.object(`/entities/${uuid}`)
      .set(entity)
      .catch(this.handlePromiseError);
  }

  private setEntities(): void {
    this.entities = this.mapListKeys<EntityModel>(
      this.db.list<EntityModel>(`/entities`, 
        (ref: any) => ref.orderByChild('title')
      )
    )
  }

  get(entityId: string): AngularFireObject<EntityModel> {
    return this.db.object<EntityModel>(`/entities/${entityId}`);
  }
}
