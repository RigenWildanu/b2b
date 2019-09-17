import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public nama;
  public telp;
  public email;
  public password;

  constructor(public auth:RegisterService,
    public router:Router,
    private platform:Platform,
    public navCtrl:NavController,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController
    ) { }

  ngOnInit() {
  }

  async register(){
    //console.log(this.email);
    //console.log(this.password);
    //this.presentAlert('TES');
    //this.router.navigateByUrl('/tabs');
    const loading = await this.loadingCtrl.create({
        spinner: "crescent",
        message: 'Registrasi akun...',
        translucent: true,
        showBackdrop: true
    });
    await loading.present();
    let regvar={
      nama  : this.nama,
      telp : this.telp,
      email : this.email,
      password : this.password,
      re_password : this.password
    }

    console.log(regvar);
    this.auth.postRegister(regvar).subscribe(data=>{
      loading.dismiss();  
      console.log('respon json API', data);
      if(data.status){
        console.log(data.data[0].api_token);

        // localStorage.setItem('api_token',data.data[0].api_token);
        // let api_token = localStorage.getItem('api_token');

        this.router.navigateByUrl('/login');
      }else{
        this.presentAlert(data.message);
        console.log(data.message);
      }
    });
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
