import { Component } from '@angular/core';
import { EntityProvider } from './../../providers/entity/entity';
import { AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import EntityModel from './../../models/entity.model';
import { AuthProvider } from '../../providers/auth/auth';
import * as firebase from 'firebase/app';
import { EntityListPage } from '../../pages/entities/entities';

const uuidv1 = require('uuid/v1');

@Component({
  selector: 'page-entity-create',
  templateUrl: 'entity-create.html',
})
export class EntityCreatePage {

  entityForm: FormGroup

  constructor(
    private navCtrl: NavController,
    public entityProvider: EntityProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authProvider: AuthProvider,
    public navParams: NavParams,
  ) {
     this.navCtrl = navCtrl;

     this.entityForm = this.formBuilder.group({
       title: ['', [Validators.required, Validators.minLength(3)]],
       value1: ['', [Validators.required, Validators.minLength(3)]],
       value2: ['', [Validators.required, Validators.minLength(3)]],
     });
  }

  onAdd(): void {
    this.navCtrl.push(EntityCreatePage);
  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();
    let entityForm = this.entityForm.value;
    var uuid: string = uuidv1();
    this.entityProvider.createEntity({
      title: entityForm.title,
      value1: entityForm.value1,
      value2: entityForm.value2,
    }, uuid).then(() => {
      console.log('Usuario cadastrado!');
      this.navCtrl.setRoot(EntityListPage);
      loading.dismiss();
    }).catch((error: any) => {
      console.log(error);
      loading.dismiss();
      this.showAlert(error);
    });
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    return loading;
  }
}
