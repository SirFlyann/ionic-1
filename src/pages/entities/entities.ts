import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EntityProvider } from './../../providers/entity/entity';
import { Observable } from 'rxjs/Observable';
import { EntityModel } from './../../models/entity.model';
import { EntityCreatePage } from '../entity-create/entity-create';
import { EntityEditPage } from '../entity-edit/entity-edit';

@Component({
  selector: 'page-entities',
  templateUrl: 'entities.html',
})
export class EntityListPage {

  entities: Observable<EntityModel[]>;

  constructor(
    public entityProvider: EntityProvider,
    public navCtrl: NavController
  ) {}

  onAdd(): void {
    this.navCtrl.push(EntityCreatePage);
  }

  ionViewDidLoad() {
    this.entities = this.entityProvider.entities;
  }

  onEntityEditClick(entity: EntityModel): void {
    this.navCtrl.push(EntityEditPage, { entity: entity });
  }

  onEntityDeleteClick(entity: EntityModel): void {
    this.entityProvider.removeEntity(entity)
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err);
    })
  }
}
