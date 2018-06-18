import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EntityProvider } from './../../providers/entity/entity';
import EntityModel from './../../models/entity.model';
import { EntityCreatePage } from '../entity-create/entity-create';

@Component({
  selector: 'page-entities',
  templateUrl: 'entities.html',
})
export class EntityListPage {
  constructor(
    entityProvider: EntityProvider,
    public navCtrl: NavController
  ) {
  }

  onAdd(): void {
    this.navCtrl.push(EntityCreatePage);
  }
}
