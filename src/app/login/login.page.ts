import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public email;
  public password;

  constructor(public auth:AuthService,
    public router:Router,
    private platform:Platform,
    public navCtrl:NavController,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController
    ) { }

  ngOnInit() {
  }

  async login(){
    //console.log(this.email);
    //console.log(this.password);
    //this.presentAlert('TES');
    //this.router.navigateByUrl('/tabs');
    const loading = await this.loadingCtrl.create({
        spinner: "crescent",
        message: 'Autentifikasi akun...',
        translucent: true,
        showBackdrop: true
    });
    await loading.present();
    let authvar={
      email : this.email,
      password : this.password
    }

    //console.log(authvar);
    this.auth.postLogin(authvar).subscribe(data=>{
      loading.dismiss();  
      console.log('respon json API', data);
      if(data.status){
        // socket.emit('register','user1');
        console.log(data.data[0].api_token);
        console.log(data.data[0].email);

        localStorage.setItem('api_token',data.data[0].api_token);
        localStorage.setItem('email',data.data[0].email);
        localStorage.setItem('telepon',data.data[0].telepon);

        let api_token = localStorage.getItem('api_token');
        let email = localStorage.getItem('email');

        // console.log(localStorage.getItem('telepon'))

        this.router.navigateByUrl('/tabs');
      }else{
        this.presentAlert(data.message);
        console.log(data.message);
      }
    });
    //this.presentAlert('TES');
    
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
