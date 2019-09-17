import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public username;
  public password;

  constructor(public router:Router,
    private platform:Platform,
    public navCtrl:NavController,
    public alertCtrl:AlertController,
    ) { }

  ngOnInit() {
  }

  async login(){
    console.log(this.username);
    console.log(this.password);

    this.presentAlert('TES');
    this.router.navigateByUrl('/tabs');
  }

  async register(){
    this.router.navigateByUrl('/register');
  }
 
  async presentAlert(message) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: '',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
