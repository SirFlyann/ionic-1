import { Component } from '@angular/core';
import { EntityProvider } from './../../providers/entity/entity';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { EntityModel } from './../../models/entity.model';
import { AuthProvider } from '../../providers/auth/auth';
import { EntityListPage } from '../../pages/entities/entities';

@Component({
  selector: 'page-entity-edit',
  templateUrl: 'entity-edit.html',
})
export class EntityEditPage {

  entityForm: FormGroup

  currentEntity: EntityModel;

  constructor(
    private navCtrl: NavController,
    public entityProvider: EntityProvider,
    public authProvider: AuthProvider,
    public navParams: NavParams,
  ) {
     this.navCtrl = navCtrl;
  }

  ionViewWillLoad() {
    this.currentEntity = this.navParams.get("entity");
  }

  onSubmit(entity: EntityModel): void {
    console.log(this.currentEntity);
    this.entityProvider.editEntity({
      uuid: this.currentEntity.$key,
      title: entity.title,
      value1: entity.value1,
      value2: entity.value2
    }).then(response => {
      this.navCtrl.push(EntityListPage);
    }).catch(err => {
      console.log(err);
    });
  }
}
