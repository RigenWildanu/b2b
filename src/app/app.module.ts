import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

declare var require: any;

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule, HttpModule],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // public localNotifications;

  constructor(public localNotifications: LocalNotifications){
    let email = localStorage.getItem('email');
    let telepon = localStorage.getItem('telepon');

    console.log(telepon);

    let notif=this;

    const socket = require('socket.io-client')('http://178.128.127.241:3000/');
    socket.emit('register',localStorage.getItem('telepon'));
    socket.on('notif',function(data){
      var username = data.username;
      var message = data.message;
      
      notif.notif(message);

      console.log('data pek');
    });
  }

  public notif(msg){

    this.localNotifications.schedule({
      id: 1,
      text: msg,
      // sound: 'file://sound.mp3',
      data: { secret: 'key_data' }
    });

  }
}
