import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { EntityModel } from './../../models/entity.model';
import { Observable } from 'rxjs/Observable';
import 'firebase/storage';

@Injectable()
export class EntityProvider extends BaseService {

  entities: Observable<EntityModel[]>;

  currentEntity: AngularFireObject<EntityModel>;

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
    this.currentEntity = this.entities[0]
  }

  get(entityId: string): AngularFireObject<EntityModel> {
    this.currentEntity = this.db.object<EntityModel>(`/entities/${entityId}`);
    return this.currentEntity;
  }

  editEntity(entity: {uuid: string, title: string, value1: string, value2: string}): Promise<void> {
    return this.db.object<EntityModel>(`/entities/${entity.uuid}`)
      .update(entity)
      .catch(this.handlePromiseError);
  }

  removeEntity(entity: {uuid: string, title: string, value1: string, value2: string}): Promise<void> {
    return this.db.object<EntityModel>(`/entities/${entity.uuid}`)
      .remove()
      .catch(this.handlePromiseError);
  }
}
