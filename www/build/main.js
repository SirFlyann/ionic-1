webpackJsonp([0],{

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_chat_chat__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chat_chat__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_chat_model__ = __webpack_require__(842);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_app__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = /** @class */ (function () {
    function HomePage(authProvider, navCtrl, userProvider, chatProvider, menuController) {
        this.authProvider = authProvider;
        this.navCtrl = navCtrl;
        this.userProvider = userProvider;
        this.chatProvider = chatProvider;
        this.menuController = menuController;
        this.view = 'chats';
    }
    HomePage.prototype.ionViewCanEnter = function () {
        return this.authProvider.authenticated;
    };
    HomePage.prototype.ionViewDidLoad = function () {
        // lista de chats do usuário
        this.chats = this.chatProvider.mapListKeys(this.chatProvider.chats)
            .map(function (chats) { return chats.reverse(); });
        // lista de usuário disponível, tirando eu
        this.users = this.userProvider.users;
        // habilita o menu depois que usuário estiver logado
        this.menuController.enable(true, 'user-menu');
    };
    // recebe como parâmetro quem está sendo chamdo
    // cria os chats
    HomePage.prototype.onChatCreate = function (recipientUser) {
        var _this = this;
        // chama chat e passa o usuário escolhido para fazer char
        this.userProvider
            .mapObjectKey(this.userProvider.currentUser)
            .first()
            .subscribe(function (currentUser) {
            _this.chatProvider
                .mapObjectKey(_this.chatProvider.getDeepChat(currentUser.$key, recipientUser.$key))
                .first()
                .subscribe(function (chat) {
                console.log('Chat ', chat);
                if (!chat.title) {
                    var timestamp = __WEBPACK_IMPORTED_MODULE_7_firebase_app__["database"].ServerValue.TIMESTAMP;
                    var chat1 = new __WEBPACK_IMPORTED_MODULE_6__models_chat_model__["a" /* Chat */]('', timestamp, recipientUser.name, '');
                    _this.chatProvider.create(chat1, currentUser.$key, recipientUser.$key);
                    var chat2 = new __WEBPACK_IMPORTED_MODULE_6__models_chat_model__["a" /* Chat */]('', timestamp, currentUser.name, '');
                    _this.chatProvider.create(chat2, recipientUser.$key, currentUser.$key);
                }
            });
        });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__chat_chat__["a" /* ChatPage */], {
            recipientUser: recipientUser
        });
    };
    // abre os chats
    HomePage.prototype.onChatOpen = function (chat) {
        var _this = this;
        var recipientUserId = chat.$key;
        this.userProvider.mapObjectKey(this.userProvider.get(recipientUserId))
            .first()
            .subscribe(function (user) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__chat_chat__["a" /* ChatPage */], {
                recipientUser: user
            });
        });
    };
    HomePage.prototype.onLogout = function () {
        this.authProvider.logout();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/mahezer/firebase-ionic/src/pages/home/home.html"*/'<ion-header>\n  \n  <custom-logged-header [title]="view | capitalize:true"> </custom-logged-header>\n  \n  <ion-toolbar>\n\n    <ion-segment [(ngModel)]="view">\n      <ion-segment-button value="chats">\n        Chats\n      </ion-segment-button>\n      <ion-segment-button value="users">\n        Users\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div [ngSwitch]="view">\n      <ion-list *ngSwitchCase="\'chats\'" no-lines>\n          <button ion-item *ngFor="let chat of chats | async" (click) = "onChatOpen(chat)"> \n            <h2> {{ chat.title }}</h2>\n            <p *ngIf="chat.lastMessage"> {{chat.timestamp | date: \'dd/mm/y H:mm\'}} - {{chat.lastMessage}}</p>\n            <p *ngIf="!chat.lastMessage"> no messages </p>\n          </button>\n      </ion-list>\n      <ion-list *ngSwitchCase="\'users\'" no-lines>\n          <button ion-item *ngFor="let user of users | async" (click)="onChatCreate(user)">\n            {{user.name}} - {{user.email}}\n          </button>\n      </ion-list>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/home/mahezer/firebase-ionic/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_0__providers_chat_chat__["a" /* ChatProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* MenuController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntityListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_entity_entity__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__entity_create_entity_create__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__entity_edit_entity_edit__ = __webpack_require__(454);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EntityListPage = /** @class */ (function () {
    function EntityListPage(entityProvider, navCtrl) {
        this.entityProvider = entityProvider;
        this.navCtrl = navCtrl;
    }
    EntityListPage.prototype.onAdd = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__entity_create_entity_create__["a" /* EntityCreatePage */]);
    };
    EntityListPage.prototype.ionViewDidLoad = function () {
        this.entities = this.entityProvider.entities;
    };
    EntityListPage.prototype.onEntityEditClick = function (entity) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__entity_edit_entity_edit__["a" /* EntityEditPage */], { entity: entity });
    };
    EntityListPage.prototype.onEntityDeleteClick = function (entity) {
        this.entityProvider.removeEntity(entity)
            .then(function (response) {
            console.log(response);
        }).catch(function (err) {
            console.log(err);
        });
    };
    EntityListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-entities',template:/*ion-inline-start:"/home/mahezer/firebase-ionic/src/pages/entities/entities.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Entidades</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-list>\n    <ion-item-sliding *ngFor="let entity of entities | async">\n      <ion-item>\n        {{entity.title}}\n      </ion-item>\n      <ion-item-options side="left">\n        <button ion-button color="secondary" (click)="onEntityEditClick(entity)">\n          <ion-icon name="create"></ion-icon> \n        </button>\n      </ion-item-options>\n      <ion-item-options side="right">\n        <button ion-button color="danger" (click)="onEntityDeleteClick(entity)">\n          <ion-icon name="trash"></ion-icon> \n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n  <ion-fab bottom right>\n    <button ion-fab color="primary" (click)="onAdd()">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/home/mahezer/firebase-ionic/src/pages/entities/entities.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_entity_entity__["a" /* EntityProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], EntityListPage);
    return EntityListPage;
}());

//# sourceMappingURL=entities.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntityProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_service__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_storage__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_storage__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EntityProvider = /** @class */ (function (_super) {
    __extends(EntityProvider, _super);
    function EntityProvider(db) {
        var _this = _super.call(this) || this;
        _this.db = db;
        _this.setEntities();
        return _this;
    }
    EntityProvider.prototype.createEntity = function (entity, uuid) {
        return this.db.object("/entities/" + uuid)
            .set(entity)
            .catch(this.handlePromiseError);
    };
    EntityProvider.prototype.setEntities = function () {
        this.entities = this.mapListKeys(this.db.list("/entities", function (ref) { return ref.orderByChild('title'); }));
        this.currentEntity = this.entities[0];
    };
    EntityProvider.prototype.get = function (entityId) {
        this.currentEntity = this.db.object("/entities/" + entityId);
        return this.currentEntity;
    };
    EntityProvider.prototype.editEntity = function (entity) {
        return this.db.object("/entities/" + entity.uuid)
            .update(entity)
            .catch(this.handlePromiseError);
    };
    EntityProvider.prototype.removeEntity = function (entity) {
        return this.db.object("/entities/" + entity.uuid)
            .remove()
            .catch(this.handlePromiseError);
    };
    EntityProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], EntityProvider);
    return EntityProvider;
}(__WEBPACK_IMPORTED_MODULE_1__base_service__["a" /* BaseService */]));

//# sourceMappingURL=entity.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_home__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SigninPage = /** @class */ (function () {
    function SigninPage(alertCtrl, authProvider, formBuilder, loadingCtrl, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.authProvider = authProvider;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        var emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.signinForm = this.formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].pattern(emailRegex)])],
            password: ['', [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].minLength(6)]],
        });
    }
    SigninPage.prototype.onSubmit = function () {
        var _this = this;
        var loading = this.showLoading();
        this.authProvider.signinWithEmail(this.signinForm.value)
            .then(function (isLogged) {
            if (isLogged) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__home_home__["a" /* HomePage */]);
                loading.dismiss();
            }
        }).catch(function (error) {
            console.log(error);
            loading.dismiss();
            _this.showAlert(error);
        });
    };
    SigninPage.prototype.onSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignupPage */]);
    };
    SigninPage.prototype.showLoading = function () {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        return loading;
    };
    SigninPage.prototype.showAlert = function (message) {
        this.alertCtrl.create({
            message: message,
            buttons: ['Ok']
        }).present();
    };
    SigninPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-signin',template:/*ion-inline-start:"/home/mahezer/firebase-ionic/src/pages/signin/signin.html"*/'<!--\n  Generated template for the SignupPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Sign In</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <h1 text-center>\n    <ion-icon class="auth-icon" name="person-add" color="primary"> </ion-icon>\n  </h1>\n  <form [formGroup]="signinForm" (ngSubmit) = "onSubmit(); $event.preventDefault()">\n\n    <ion-item>\n        <ion-icon name="mail" item-left> </ion-icon>\n        <ion-input type="email" placeholder="Email" formControlName="email"></ion-input>\n      </ion-item>\n\n      <ion-item>\n          <ion-icon name="lock" item-left> </ion-icon>\n          <ion-input type="password" placeholder="Password" formControlName="password"></ion-input>\n        </ion-item>\n\n        <br>\n\n        <button ion-button full type="submit" [disabled]="signinForm.invalid"> Enter </button>\n\n  </form>\n\n  <button ion-button full clear text-center (click)="onSignup()"> Sign Up </button>\n\n </ion-content>\n'/*ion-inline-end:"/home/mahezer/firebase-ionic/src/pages/signin/signin.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavParams */]])
    ], SigninPage);
    return SigninPage;
}());

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_service__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(75);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ChatProvider = /** @class */ (function (_super) {
    __extends(ChatProvider, _super);
    function ChatProvider(afAuth, db) {
        var _this = _super.call(this) || this;
        _this.afAuth = afAuth;
        _this.db = db;
        _this.getChats();
        console.log('Hello ChatProvider Provider');
        return _this;
    }
    // recupera os chats de um usuário autenticado,
    // ordenado por timestamp
    ChatProvider.prototype.getChats = function () {
        var _this = this;
        console.log("consulta os chats do usuário logado");
        this.afAuth.authState
            .subscribe(function (authUser) {
            if (authUser) {
                console.log("está logado");
                _this.chats = _this.db.list("/chats/" + authUser.uid, function (ref) { return ref.orderByChild('timestamp'); });
            }
        });
    };
    // cria um objeto de chat no firebase
    ChatProvider.prototype.create = function (chat, userId1, userId2) {
        return this.db.object("/chats/" + userId1 + "/" + userId2)
            .set(chat)
            .catch(this.handlePromiseError);
    };
    // retorna o chat criado entre userId1 e userId2
    ChatProvider.prototype.getDeepChat = function (userId1, userId2) {
        return this.db.object("/chats/" + userId1 + "/" + userId2);
    };
    ChatProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], ChatProvider);
    return ChatProvider;
}(__WEBPACK_IMPORTED_MODULE_1__base_service__["a" /* BaseService */]));

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 218:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 218;

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
var Message = /** @class */ (function () {
    function Message(userId, text, timestamp) {
        this.userId = userId;
        this.text = text;
        this.timestamp = timestamp;
    }
    return Message;
}());

//# sourceMappingURL=message.model.js.map

/***/ }),

/***/ 264:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 264;

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_service__ = __webpack_require__(80);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthProvider = /** @class */ (function (_super) {
    __extends(AuthProvider, _super);
    function AuthProvider(afAuth, http) {
        var _this = _super.call(this) || this;
        _this.afAuth = afAuth;
        _this.http = http;
        console.log('Hello AuthProvider Provider');
        return _this;
    }
    // cria uma autenticação com email e senha
    // retorna o UID da autenticação
    AuthProvider.prototype.createAuthUser = function (user) {
        return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
            .catch(this.handlePromiseError);
    };
    // login ou sign - entrada no sistema
    // retorna true se entrou e false se não entrou
    AuthProvider.prototype.signinWithEmail = function (user) {
        return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
            .then(function (authUser) {
            return authUser != null;
        }).catch(this.handlePromiseError);
    };
    // logout - encerra a conexão com o firebase
    AuthProvider.prototype.logout = function () {
        return this.afAuth.auth.signOut();
    };
    Object.defineProperty(AuthProvider.prototype, "authenticated", {
        // verifica se usuário está autenticado no Firebase
        get: function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.afAuth
                    .authState
                    .first()
                    .subscribe(function (authUser) {
                    (authUser) ? resolve(true) : reject(false);
                });
            });
        },
        enumerable: true,
        configurable: true
    });
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], AuthProvider);
    return AuthProvider;
}(__WEBPACK_IMPORTED_MODULE_3__base_service__["a" /* BaseService */]));

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_chat_chat__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_message_message__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_message_model__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_app__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ChatPage = /** @class */ (function () {
    function ChatPage(authProvider, chatProvider, messageProvider, navCtrl, navParams, userProvider) {
        this.authProvider = authProvider;
        this.chatProvider = chatProvider;
        this.messageProvider = messageProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userProvider = userProvider;
    }
    ChatPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // recupera o usuário que vai fazer chat
        this.recipient = this.navParams.get('recipientUser');
        this.pageTitle = this.recipient.name;
        // recupera usuário logado
        this.userProvider
            .mapObjectKey(this.userProvider.currentUser)
            .first()
            .subscribe(function (currentUser) {
            _this.sender = currentUser;
            _this.chat1 = _this.chatProvider.getDeepChat(_this.sender.$key, _this.recipient.$key);
            _this.chat2 = _this.chatProvider.getDeepChat(_this.recipient.$key, _this.sender.$key);
            var doSubscription = function () {
                _this.viewMessages = _this.messageProvider.mapListKeys(_this.messages);
                _this.viewMessages
                    .subscribe(function (messages) {
                    _this.scrollToBottom();
                });
            };
            _this.messages = _this.messageProvider
                .getMessages(_this.sender.$key, _this.recipient.$key);
            _this.messages
                .valueChanges()
                .first()
                .subscribe(function (messages) {
                if (messages.length === 0) {
                    _this.messages = _this.messageProvider
                        .getMessages(_this.recipient.$key, _this.sender.$key);
                    doSubscription();
                }
                else {
                    doSubscription();
                }
            });
        });
        console.log('ionViewDidLoad ChatPage');
    };
    ChatPage.prototype.ionViewCanEnter = function () {
        return this.authProvider.authenticated;
    };
    ChatPage.prototype.sendMessage = function (newMessage) {
        var _this = this;
        if (newMessage) {
            var currentTimestamp_1 = __WEBPACK_IMPORTED_MODULE_7_firebase_app__["database"].ServerValue.TIMESTAMP;
            this.messageProvider.create(new __WEBPACK_IMPORTED_MODULE_6__models_message_model__["a" /* Message */](this.sender.$key, newMessage, currentTimestamp_1), this.messages).then(function () {
                _this.chat1
                    .update({
                    lastMessage: newMessage,
                    timestamp: currentTimestamp_1
                });
                _this.chat2
                    .update({
                    lastMessage: newMessage,
                    timestamp: currentTimestamp_1
                });
            });
        }
    };
    ChatPage.prototype.scrollToBottom = function (duration) {
        var _this = this;
        setTimeout(function () {
            if (_this.content._scroll) {
                _this.content.scrollToBottom(duration || 300);
            }
        }, 50);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* Content */])
    ], ChatPage.prototype, "content", void 0);
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-chat',template:/*ion-inline-start:"/home/mahezer/firebase-ionic/src/pages/chat/chat.html"*/'<ion-header>\n\n  <custom-logged-header [title]="pageTitle"></custom-logged-header>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <message-box *ngFor="let m of viewMessages | async" [message]="m" [isFromSender]="(m.userId === sender.$key)"></message-box>\n \n  </ion-content>\n\n<ion-footer>\n\n  <ion-toolbar>\n    <ion-item no-lines>\n\n      <ion-input type="text" (keyup.enter)="sendMessage(newMessage); newMessage=\'\'" \n      placeholder="Message..." [(ngModel)]="newMessage">\n      </ion-input>\n\n      <button ion-button item-end (click)="sendMessage(newMessage); newMessage=\'\'">\n        <ion-icon name="send"></ion-icon>\n      </button>\n   \n    </ion-item>\n  \n  </ion-toolbar>\n\n</ion-footer>\n'/*ion-inline-end:"/home/mahezer/firebase-ionic/src/pages/chat/chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_0__providers_chat_chat__["a" /* ChatProvider */],
            __WEBPACK_IMPORTED_MODULE_1__providers_message_message__["a" /* MessageProvider */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* UserProvider */]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_service__ = __webpack_require__(80);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the MessageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var MessageProvider = /** @class */ (function (_super) {
    __extends(MessageProvider, _super);
    function MessageProvider(db) {
        var _this = _super.call(this) || this;
        _this.db = db;
        console.log('Hello MessageProvider Provider');
        return _this;
    }
    // cria uma mensagem no Firebase concatenando com as mensagens anteriores
    MessageProvider.prototype.create = function (nova, listMessages) {
        return Promise.resolve(listMessages.push(nova));
    };
    // recupera as mensagens realizadas entre userId1 e userId2
    MessageProvider.prototype.getMessages = function (userId1, userId2) {
        console.log(userId1, userId2);
        return this.db.list("/messages/" + userId1 + "-" + userId2, function (ref) { return ref.limitToLast(30).orderByChild('timestamp'); });
    };
    MessageProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], MessageProvider);
    return MessageProvider;
}(__WEBPACK_IMPORTED_MODULE_2__base_service__["a" /* BaseService */]));

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_user_user__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(121);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SignupPage = /** @class */ (function () {
    function SignupPage(alertCtrl, loadingCtrl, authProvider, formBuilder, navCtrl, navParams, userProvider) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.authProvider = authProvider;
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userProvider = userProvider;
        var emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.signupForm = this.formBuilder.group({
            name: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(3)]],
            cpf: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(6)]],
            username: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(3)]],
            email: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].pattern(emailRegex)])],
            password: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(6)]],
        });
    }
    SignupPage.prototype.onSubmit = function () {
        var _this = this;
        var loading = this.showLoading();
        var formUser = this.signupForm.value;
        var username = formUser.username;
        this.userProvider.userExists(username)
            .first()
            .subscribe(function (userExists) {
            if (!userExists) {
                _this.authProvider.createAuthUser({
                    email: formUser.email,
                    password: formUser.password
                }).then(function (authUser) {
                    delete formUser.password;
                    var uuid = authUser.uid;
                    _this.userProvider.create(formUser, uuid) // cria usuário
                        .then(function () {
                        console.log('Usuario cadastrado!');
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                        loading.dismiss();
                    }).catch(function (error) {
                        console.log(error);
                        loading.dismiss();
                        _this.showAlert(error);
                    });
                }).catch(function (error) {
                    console.log(error);
                    loading.dismiss();
                    _this.showAlert(error);
                });
            }
            else {
                _this.showAlert("O username " + username + " j\u00E1 est\u00E1 sendo usado em outra conta!");
                loading.dismiss();
            }
        });
    };
    SignupPage.prototype.showLoading = function () {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        return loading;
    };
    SignupPage.prototype.showAlert = function (message) {
        this.alertCtrl.create({
            message: message,
            buttons: ['Ok']
        }).present();
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/home/mahezer/firebase-ionic/src/pages/signup/signup.html"*/'<!--\n  Generated template for the SignupPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Sign Up</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <h1 text-center>\n    <ion-icon class="auth-icon" name="person-add" color="primary"> </ion-icon>\n  </h1>\n  <form [formGroup]="signupForm" (ngSubmit) = "onSubmit(); $event.preventDefault()">\n\n    <ion-item>\n      <ion-icon name="person" item-left> </ion-icon>\n      <ion-input type="text" placeholder="Name" formControlName="name"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="person" item-left> </ion-icon>\n      <ion-input type="text" placeholder="CPF" formControlName="cpf"></ion-input>\n    </ion-item>\n\n    <ion-item>\n        <ion-icon name="at" item-left> </ion-icon>\n        <ion-input type="text" placeholder="Username" formControlName="username"></ion-input>\n    </ion-item>\n\n    <ion-item>\n        <ion-icon name="mail" item-left> </ion-icon>\n        <ion-input type="email" placeholder="Email" formControlName="email"></ion-input>\n      </ion-item>\n\n      <ion-item>\n          <ion-icon name="lock" item-left> </ion-icon>\n          <ion-input type="password" placeholder="Password" formControlName="password"></ion-input>\n        </ion-item>\n\n        <br>\n\n        <button ion-button full type="submit" [disabled]="signupForm.invalid"> Create </button>\n\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/home/mahezer/firebase-ionic/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__providers_user_user__["a" /* UserProvider */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_signin_signin__ = __webpack_require__(206);

var BaseComponent = /** @class */ (function () {
    function BaseComponent(alertCtrl, authProvider, app, menuCtrl) {
        this.alertCtrl = alertCtrl;
        this.authProvider = authProvider;
        this.app = app;
        this.menuCtrl = menuCtrl;
    }
    BaseComponent.prototype.ngOnInit = function () {
        this.navCtrl = this.app.getActiveNavs()[0];
    };
    BaseComponent.prototype.onLogout = function () {
        var _this = this;
        this.alertCtrl.create({
            message: 'Do you want to quit?',
            buttons: [
                {
                    text: 'Yes',
                    handler: function () {
                        _this.authProvider.logout()
                            .then(function () {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__pages_signin_signin__["a" /* SigninPage */]);
                            // desabilita o menu
                            _this.menuCtrl.enable(false, 'user-menu');
                        });
                    }
                },
                {
                    text: 'No'
                }
            ]
        }).present();
    };
    return BaseComponent;
}());

//# sourceMappingURL=base.component.js.map

/***/ }),

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = /** @class */ (function () {
    function User(name, username, email, photo, cpf) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.photo = photo;
        this.cpf = cpf;
    }
    return User;
}());

//# sourceMappingURL=user.model.js.map

/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_user__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserProfilePage = /** @class */ (function () {
    function UserProfilePage(userProvider, authProvider, navCtrl, navParams) {
        this.userProvider = userProvider;
        this.authProvider = authProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.canEdit = false;
    }
    UserProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.userProvider.currentUser
            .valueChanges()
            .subscribe(function (user) {
            _this.currentUser = user;
        });
    };
    UserProfilePage.prototype.ionViewCanEnter = function () {
        return this.authProvider.authenticated;
    };
    UserProfilePage.prototype.onSubmit = function (event) {
        var _this = this;
        event.preventDefault();
        if (this.filePhoto) {
            var uploadTask_1 = this.userProvider.uploadPhoto(this.filePhoto, this.currentUser.$key);
            uploadTask_1.on('state_changed', function (snapshot) {
                _this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            }, function (error) {
                // catch error
            });
            uploadTask_1.then(function (UploadTaskSnapshot) {
                _this.editUser(uploadTask_1.snapshot.downloadURL);
            });
        }
        else {
            this.editUser();
        }
    };
    UserProfilePage.prototype.editUser = function (photoUrl) {
        var _this = this;
        console.log("Usuário editado");
        this.userProvider
            .edit({
            name: this.currentUser.name,
            username: this.currentUser.username,
            photo: photoUrl || this.currentUser.photo || ''
        }).then(function () {
            _this.canEdit = false;
            _this.filePhoto = undefined;
            _this.uploadProgress = 0;
        });
    };
    UserProfilePage.prototype.onPhoto = function (event) {
        this.filePhoto = event.target.files[0];
    };
    UserProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-user-profile',template:/*ion-inline-start:"/home/mahezer/firebase-ionic/src/pages/user-profile/user-profile.html"*/'<ion-header>\n\n    <custom-logged-header [title]="\'User Profile\'"></custom-logged-header>\n  \n  </ion-header>\n\n\n<ion-content padding>\n\n  <user-info [user]="currentUser"></user-info>\n\n  <button ion-button block (click)="canEdit = !canEdit">Edit</button>\n\n  <form (ngSubmit)="onSubmit($event)" *ngIf="canEdit" #profileForm="ngForm">\n\n    <ion-item>\n      <ion-icon name="person" item-start></ion-icon>\n      <ion-input\n        type="text"\n        placeholder="Name"\n        name="name"\n        [(ngModel)]="currentUser.name"\n        required\n        minlenght="3">\n      </ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="at" item-start></ion-icon>\n      <ion-input\n        type="text"\n        placeholder="Username"\n        name="username"\n        [(ngModel)]="currentUser.username"\n        required\n        minlenght="3">\n      </ion-input>\n    </ion-item>\n\n     \n    <ion-item>\n      <input type="file" accept="image/*" (change)="onPhoto($event)">\n    </ion-item>\n    \n     <progress-bar *ngIf="uploadProgress" [progress]="uploadProgress"></progress-bar>\n\n    <br>\n    <button ion-button block type="submit" [disabled]="profileForm.form.invalid">Save</button>\n\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/home/mahezer/firebase-ionic/src/pages/user-profile/user-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], UserProfilePage);
    return UserProfilePage;
}());

//# sourceMappingURL=user-profile.js.map

/***/ }),

/***/ 453:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntityCreatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_entity_entity__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_entities_entities__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var uuidv1 = __webpack_require__(847);
var EntityCreatePage = /** @class */ (function () {
    function EntityCreatePage(navCtrl, entityProvider, formBuilder, alertCtrl, loadingCtrl, authProvider, navParams) {
        this.navCtrl = navCtrl;
        this.entityProvider = entityProvider;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.authProvider = authProvider;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.entityForm = this.formBuilder.group({
            title: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(3)]],
            value1: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(3)]],
            value2: ['', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].minLength(3)]],
        });
    }
    EntityCreatePage_1 = EntityCreatePage;
    EntityCreatePage.prototype.onAdd = function () {
        this.navCtrl.push(EntityCreatePage_1);
    };
    EntityCreatePage.prototype.onSubmit = function () {
        var _this = this;
        var loading = this.showLoading();
        var entityForm = this.entityForm.value;
        var uuid = uuidv1();
        this.entityProvider.createEntity({
            uuid: uuid,
            title: entityForm.title,
            value1: entityForm.value1,
            value2: entityForm.value2,
        }, uuid).then(function () {
            console.log('Usuario cadastrado!');
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_entities_entities__["a" /* EntityListPage */]);
            loading.dismiss();
        }).catch(function (error) {
            console.log(error);
            loading.dismiss();
            _this.showAlert(error);
        });
    };
    EntityCreatePage.prototype.showAlert = function (message) {
        this.alertCtrl.create({
            message: message,
            buttons: ['Ok']
        }).present();
    };
    EntityCreatePage.prototype.showLoading = function () {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        return loading;
    };
    EntityCreatePage = EntityCreatePage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-entity-create',template:/*ion-inline-start:"/home/mahezer/firebase-ionic/src/pages/entity-create/entity-create.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Criar entidade</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <h1 text-center>\n    <ion-icon class="auth-icon" name="person-add" color="primary"> </ion-icon>\n  </h1>\n  <form [formGroup]="entityForm" (ngSubmit) = "onSubmit(); $event.preventDefault()">\n\n    <ion-item>\n      <ion-icon name="code" item-left> </ion-icon>\n      <ion-input type="text" placeholder="Titulo" formControlName="title"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="help" item-left> </ion-icon>\n      <ion-input type="text" placeholder="Valor 1" formControlName="value1"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="help" item-left> </ion-icon>\n      <ion-input type="text" placeholder="Valor 2" formControlName="value2"></ion-input>\n    </ion-item>\n    <br>\n\n    <button ion-button full type="submit" [disabled]="entityForm.invalid"> Create </button>\n\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/home/mahezer/firebase-ionic/src/pages/entity-create/entity-create.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__providers_entity_entity__["a" /* EntityProvider */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */]])
    ], EntityCreatePage);
    return EntityCreatePage;
    var EntityCreatePage_1;
}());

//# sourceMappingURL=entity-create.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EntityEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_entity_entity__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_entities_entities__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EntityEditPage = /** @class */ (function () {
    function EntityEditPage(navCtrl, entityProvider, authProvider, navParams) {
        this.navCtrl = navCtrl;
        this.entityProvider = entityProvider;
        this.authProvider = authProvider;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
    }
    EntityEditPage.prototype.ionViewWillLoad = function () {
        this.currentEntity = this.navParams.get("entity");
    };
    EntityEditPage.prototype.onSubmit = function (entity) {
        var _this = this;
        console.log(this.currentEntity);
        this.entityProvider.editEntity({
            uuid: this.currentEntity.$key,
            title: entity.title,
            value1: entity.value1,
            value2: entity.value2
        }).then(function (response) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_entities_entities__["a" /* EntityListPage */]);
        }).catch(function (err) {
            console.log(err);
        });
    };
    EntityEditPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-entity-edit',template:/*ion-inline-start:"/home/mahezer/firebase-ionic/src/pages/entity-edit/entity-edit.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Editar entidade</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <h1 text-center>\n    <ion-icon class="auth-icon" name="person-add" color="primary"> </ion-icon>\n  </h1>\n  <ion-item>\n    <ion-icon name="code" item-left> </ion-icon>\n    <ion-input \n      type="text" \n      name="title"\n      [(ngModel)]="currentEntity.title" \n      placeholder="Titulo">\n    </ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-icon name="help" item-left> </ion-icon>\n    <ion-input \n      type="text" \n      name="value1"\n      [(ngModel)]="currentEntity.value1" \n      placeholder="Valor 1">\n    </ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-icon name="help" item-left> </ion-icon>\n    <ion-input \n      type="text" \n      name="value2"\n      [(ngModel)]="currentEntity.value2" \n      placeholder="Valor 2">\n    </ion-input>\n  </ion-item>\n  <br>\n\n  <button ion-button full (click)="onSubmit(currentEntity);" type="submit"> Edit </button>\n</ion-content>\n'/*ion-inline-end:"/home/mahezer/firebase-ionic/src/pages/entity-edit/entity-edit.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__providers_entity_entity__["a" /* EntityProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */]])
    ], EntityEditPage);
    return EntityEditPage;
}());

//# sourceMappingURL=entity-edit.js.map

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(460);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_progress_bar_progress_bar__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_message_box_message_box__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_auth_auth__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(825);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_home__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_signin_signin__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_signup_signup__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_user_user__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_custom_logged_header_custom_logged_header__ = __webpack_require__(843);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pipes_capitalize_capitalize__ = __webpack_require__(844);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_chat_chat__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_chat_chat__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_message_message__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_user_info_user_info__ = __webpack_require__(845);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_user_menu_user_menu__ = __webpack_require__(846);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_user_profile_user_profile__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_entities_entities__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_entity_create_entity_create__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_entity_edit_entity_edit__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__providers_entity_entity__ = __webpack_require__(123);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var firebaseAppConfig = {
    apiKey: "AIzaSyAfJM7-ynATfVWWdZkUZAcgGNGixwPK9Qg",
    authDomain: "danielwpp-599e3.firebaseapp.com",
    databaseURL: "https://danielwpp-599e3.firebaseio.com",
    projectId: "danielwpp-599e3",
    storageBucket: "danielwpp-599e3.appspot.com",
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_19__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_18__pipes_capitalize_capitalize__["a" /* CapitalizePipe */],
                __WEBPACK_IMPORTED_MODULE_17__components_custom_logged_header_custom_logged_header__["a" /* CustomLoggedHeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_1__components_message_box_message_box__["a" /* MessageBoxComponent */],
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_22__components_user_info_user_info__["a" /* UserInfoComponent */],
                __WEBPACK_IMPORTED_MODULE_23__components_user_menu_user_menu__["a" /* UserMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_24__pages_user_profile_user_profile__["a" /* UserProfilePage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_entities_entities__["a" /* EntityListPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_entity_create_entity_create__["a" /* EntityCreatePage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_entity_edit_entity_edit__["a" /* EntityEditPage */],
                __WEBPACK_IMPORTED_MODULE_0__components_progress_bar_progress_bar__["a" /* ProgressBarComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_8_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseAppConfig),
                __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_19__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_user_profile_user_profile__["a" /* UserProfilePage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_entities_entities__["a" /* EntityListPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_entity_create_entity_create__["a" /* EntityCreatePage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_entity_edit_entity_edit__["a" /* EntityEditPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_20__providers_chat_chat__["a" /* ChatProvider */],
                __WEBPACK_IMPORTED_MODULE_28__providers_entity_entity__["a" /* EntityProvider */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_16__providers_user_user__["a" /* UserProvider */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_21__providers_message_message__["a" /* MessageProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the ProgressBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ProgressBarComponent = /** @class */ (function () {
    function ProgressBarComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], ProgressBarComponent.prototype, "progress", void 0);
    ProgressBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'progress-bar',template:/*ion-inline-start:"/home/mahezer/firebase-ionic/src/components/progress-bar/progress-bar.html"*/'<div class="progress-outer">\n    <div class="progress-inner" [style.width]="progress + \'%\'">\n      {{ progress }}%\n    </div>\n  </div>'/*ion-inline-end:"/home/mahezer/firebase-ionic/src/components/progress-bar/progress-bar.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ProgressBarComponent);
    return ProgressBarComponent;
}());

//# sourceMappingURL=progress-bar.js.map

/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageBoxComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_message_model__ = __webpack_require__(219);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the MessageBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var MessageBoxComponent = /** @class */ (function () {
    function MessageBoxComponent() {
        console.log('Hello MessageBoxComponent Component');
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_message_model__["a" /* Message */])
    ], MessageBoxComponent.prototype, "message", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], MessageBoxComponent.prototype, "isFromSender", void 0);
    MessageBoxComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'message-box',template:/*ion-inline-start:"/home/mahezer/firebase-ionic/src/components/message-box/message-box.html"*/'\n<div class="text" [ngClass]="{\'sender-background\': isFromSender}">\n  <p>{{ message.text }}</p>\n  <p class="timestamp"> {{ message.timestamp | date:\'dd/MM/y H:mm\' }} </p>\n</div>\n'/*ion-inline-end:"/home/mahezer/firebase-ionic/src/components/message-box/message-box.html"*/,
            host: {
                '[style.justify-content]': '((!isFromSender) ? "flex-start" : "flex-end")',
                '[style.text-align]': '((!isFromSender) ? "left" : "right")'
            }
        }),
        __metadata("design:paramtypes", [])
    ], MessageBoxComponent);
    return MessageBoxComponent;
}());

//# sourceMappingURL=message-box.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base_service__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_storage__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase_storage__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserProvider = /** @class */ (function (_super) {
    __extends(UserProvider, _super);
    function UserProvider(db, afAuth, firebaseApp) {
        var _this = _super.call(this) || this;
        _this.db = db;
        _this.afAuth = afAuth;
        _this.firebaseApp = firebaseApp;
        _this.listenAuthState();
        return _this;
    }
    // recupera a lista de usuários e retira usuário logado
    UserProvider.prototype.setUsers = function (uidToExclude) {
        this.users = this.mapListKeys(this.db.list("/users", function (ref) { return ref.orderByChild('name'); }))
            .map(function (users) {
            // retira o usuário logado da lista
            return users.filter(function (user) { return user.$key !== uidToExclude; });
        });
    };
    // cria um usuário no RealTime DataBase com o UID da autenticação
    UserProvider.prototype.create = function (user, uuid) {
        return this.db.object("/users/" + uuid)
            .set(user)
            .catch(this.handlePromiseError);
    };
    // verifica se o username utilizado no cadastro já existe
    UserProvider.prototype.userExists = function (username) {
        return this.db.list("/users", function (ref) { return ref.orderByChild('username').equalTo(username); })
            .valueChanges()
            .map(function (users) {
            console.log(" Tamanho " + users.length);
            return users.length > 0;
        }).catch(this.handleObservableError);
    };
    // executado quando usuário faz login
    UserProvider.prototype.listenAuthState = function () {
        var _this = this;
        this.afAuth
            .authState
            .subscribe(function (authUser) {
            if (authUser) {
                console.log('Auth state alterado!');
                _this.currentUser = _this.db.object("/users/" + authUser.uid);
                _this.setUsers(authUser.uid);
            }
        });
    };
    // recupera usuário pelo ID
    UserProvider.prototype.get = function (userId) {
        return this.db.object("/users/" + userId);
    };
    UserProvider.prototype.edit = function (user) {
        return this.currentUser
            .update(user)
            .catch(this.handlePromiseError);
    };
    UserProvider.prototype.uploadPhoto = function (file, userId) {
        return this.firebaseApp
            .storage()
            .ref()
            .child("/users/" + userId)
            .put(file);
    };
    UserProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_angularfire2__["b" /* FirebaseApp */]])
    ], UserProvider);
    return UserProvider;
}(__WEBPACK_IMPORTED_MODULE_4__base_service__["a" /* BaseService */]));

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


var extractError = function (error) {
    // In a real world app, we might use a remote logging infrastructure
    var errMsg;
    if (error instanceof __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Response */]) {
        var body = error.json() || '';
        var err = body.error || JSON.stringify(body);
        errMsg = error.status + " - " + (error.statusText || '') + " " + err;
    }
    else {
        errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return errMsg;
};
var BaseService = /** @class */ (function () {
    function BaseService() {
    }
    BaseService.prototype.handlePromiseError = function (error) {
        return Promise.reject(extractError(error));
    };
    BaseService.prototype.handleObservableError = function (error) {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].throw(extractError(error));
    };
    BaseService.prototype.mapListKeys = function (list) {
        return list
            .snapshotChanges()
            .map(function (actions) { return actions.map(function (action) { return (__assign({ $key: action.key }, action.payload.val())); }); });
    };
    BaseService.prototype.mapObjectKey = function (object) {
        return object
            .snapshotChanges()
            .map(function (action) { return (__assign({ $key: action.key }, action.payload.val())); });
    };
    return BaseService;
}());

//# sourceMappingURL=base.service.js.map

/***/ }),

/***/ 825:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_user_user__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_auth_auth__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(121);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(authProvider, platform, statusBar, splashScreen, userProvider) {
        var _this = this;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__["a" /* SigninPage */];
        authProvider
            .afAuth
            .authState
            .subscribe(function (authUser) {
            if (authUser) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */];
                userProvider.currentUser
                    .valueChanges()
                    .subscribe(function (user) {
                    _this.currentUser = user;
                });
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_signin_signin__["a" /* SigninPage */];
            }
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/mahezer/firebase-ionic/src/app/app.html"*/'<ion-menu [content]="content" enabled="false" id="user-menu" persistence="true"> \n    <user-menu [user]="currentUser"> </user-menu>\n</ion-menu>\n<ion-nav #content [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/mahezer/firebase-ionic/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_0__providers_user_user__["a" /* UserProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 842:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chat; });
var Chat = /** @class */ (function () {
    function Chat(lastMessage, timestamp, title, photo) {
        this.lastMessage = lastMessage;
        this.timestamp = timestamp;
        this.title = title;
        this.photo = photo;
    }
    return Chat;
}());

//# sourceMappingURL=chat.model.js.map

/***/ }),

/***/ 843:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomLoggedHeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_component__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(34);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the CustomLoggedHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var CustomLoggedHeaderComponent = /** @class */ (function (_super) {
    __extends(CustomLoggedHeaderComponent, _super);
    function CustomLoggedHeaderComponent(alertCtrl, authProvider, app, menuCtrl) {
        var _this = _super.call(this, alertCtrl, authProvider, app, menuCtrl) || this;
        _this.alertCtrl = alertCtrl;
        _this.authProvider = authProvider;
        _this.app = app;
        _this.menuCtrl = menuCtrl;
        return _this;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], CustomLoggedHeaderComponent.prototype, "title", void 0);
    CustomLoggedHeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'custom-logged-header',template:/*ion-inline-start:"/home/mahezer/firebase-ionic/src/components/custom-logged-header/custom-logged-header.html"*/'\n<ion-navbar>\n\n    <button ion-button menuToggle="user-menu">\n        <ion-icon name="menu"></ion-icon>\n    </button>\n\n  <ion-title> {{title}} </ion-title>\n\n  <ion-buttons end>\n\n    <button ion-button icon-only (click)="onLogout()"> \n      <ion-icon name="exit"> </ion-icon>\n    </button>\n  </ion-buttons>\n\n\n</ion-navbar>'/*ion-inline-end:"/home/mahezer/firebase-ionic/src/components/custom-logged-header/custom-logged-header.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* MenuController */]])
    ], CustomLoggedHeaderComponent);
    return CustomLoggedHeaderComponent;
}(__WEBPACK_IMPORTED_MODULE_1__base_component__["a" /* BaseComponent */]));

//# sourceMappingURL=custom-logged-header.js.map

/***/ }),

/***/ 844:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CapitalizePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CapitalizePipe = /** @class */ (function () {
    function CapitalizePipe() {
    }
    CapitalizePipe.prototype.transform = function (value, onlyFirst) {
        if (onlyFirst)
            return value.charAt(0).toUpperCase() + value.substr(1);
        var words = value.split(' ');
        var output = '';
        words.forEach(function (value, index, words) {
            output += value.charAt(0).toUpperCase() + value.substr(1).toLowerCase() + ' ';
        });
        return output;
    };
    CapitalizePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'capitalize'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], CapitalizePipe);
    return CapitalizePipe;
}());

//# sourceMappingURL=capitalize.js.map

/***/ }),

/***/ 845:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInfoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_user_model__ = __webpack_require__(451);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserInfoComponent = /** @class */ (function () {
    function UserInfoComponent() {
        this.isMenu = false;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_user_model__["a" /* User */])
    ], UserInfoComponent.prototype, "user", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], UserInfoComponent.prototype, "isMenu", void 0);
    UserInfoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'user-info',template:/*ion-inline-start:"/home/mahezer/firebase-ionic/src/components/user-info/user-info.html"*/'<div *ngIf="user">\n    <ion-avatar [ngClass]="{\'custom-background\': isMenu}">\n        <img class="round" [src]="user.photo || \'assets/imgs/no-photo.jpg\'">\n    </ion-avatar>\n  <h2 text-center>{{ user.name }}</h2>\n  <p text-center>@{{ user.username }}</p>\n</div>'/*ion-inline-end:"/home/mahezer/firebase-ionic/src/components/user-info/user-info.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], UserInfoComponent);
    return UserInfoComponent;
}());

//# sourceMappingURL=user-info.js.map

/***/ }),

/***/ 846:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_component__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_user_model__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_user_profile_user_profile__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_entities_entities__ = __webpack_require__(122);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the UserMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var UserMenuComponent = /** @class */ (function (_super) {
    __extends(UserMenuComponent, _super);
    function UserMenuComponent(alertCtrl, authProvider, app, menuCtrl) {
        var _this = _super.call(this, alertCtrl, authProvider, app, menuCtrl) || this;
        _this.alertCtrl = alertCtrl;
        _this.authProvider = authProvider;
        _this.app = app;
        _this.menuCtrl = menuCtrl;
        return _this;
    }
    UserMenuComponent.prototype.onProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_user_profile_user_profile__["a" /* UserProfilePage */]);
    };
    UserMenuComponent.prototype.onEntity = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_entities_entities__["a" /* EntityListPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('user'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__models_user_model__["a" /* User */])
    ], UserMenuComponent.prototype, "currentUser", void 0);
    UserMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'user-menu',template:/*ion-inline-start:"/home/mahezer/firebase-ionic/src/components/user-menu/user-menu.html"*/'<ion-content>\n\n    <user-info [user]="currentUser" [isMenu]="true"></user-info>\n  \n    <ion-list no-lines>\n      <button ion-item icon-right detail-none menuClose="user-menu" (click)="onProfile()">\n        Profile\n        <ion-icon name="person" item-end></ion-icon>\n      </button>\n      <button ion-item icon-right detail-none menuClose="user-menu" (click)="onEntity()">\n        Entidade\n        <ion-icon name="help" item-end></ion-icon>\n      </button>\n      <button ion-item icon-right detail-none menuClose="user-menu" (click)="onLogout()">\n        Logout\n        <ion-icon name="log-out" item-end></ion-icon>\n      </button>\n    </ion-list>\n  \n  </ion-content>\n'/*ion-inline-end:"/home/mahezer/firebase-ionic/src/components/user-menu/user-menu.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* MenuController */]])
    ], UserMenuComponent);
    return UserMenuComponent;
}(__WEBPACK_IMPORTED_MODULE_1__base_component__["a" /* BaseComponent */]));

//# sourceMappingURL=user-menu.js.map

/***/ })

},[455]);
//# sourceMappingURL=main.js.map