import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EntityProvider } from './../../providers/entity/entity';
import { Observable } from 'rxjs/Observable';
import { EntityModel } from './../../models/entity.model';
import { EntityCreatePage } from '../entity-create/entity-create';

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

  onEntity(entity: EntityModel): void {

    this.entityProvider.mapObjectKey<EntityModel>(
      this.entityProvider.get(entity.uuid)
    )
      .first()
      .subscribe((entity: EntityModel) => {        

        this.navCtrl.push(EntityModel, {
          recipientEntity: entity
        });

      });

  }
}
