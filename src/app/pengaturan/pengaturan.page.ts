import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-pengaturan',
  templateUrl: './pengaturan.page.html',
  styleUrls: ['./pengaturan.page.scss'],
})
export class PengaturanPage implements OnInit {
  public old_password;
  public new_password;
  public re_password;

  constructor(
    public auth:AuthService,
    public loadingCtrl:LoadingController, 
    public alertCtrl:AlertController,
    public router:Router,
    public toastCtrl:ToastController) { }

  ngOnInit() {
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async changePassword(){
    const loading = await this.loadingCtrl.create({
      spinner: "crescent",
      message: 'Mengubah password...',
      translucent: true,
      showBackdrop: true
  });
  await loading.present();

  let chpassvar={
    old_password  : this.old_password,
    new_password : this.new_password,
    re_password : this.re_password
  }
  
  console.log(chpassvar)
  this.auth.postUpdatePassword(chpassvar).subscribe(data=>{
    loading.dismiss();  
    console.log('respon json API', data);
    if(data.status){
      console.log(data.data[0].api_token);
      this.presentAlert('Password berhasil dirubah');
      this.old_password='';
      this.new_password='';
      this.re_password='';

      this.router.navigateByUrl('/tabs/pengaturan');
    }else{
      this.presentAlert(data.message);
      console.log(data.message);
    }
  });
  }

  logout(){
    this.auth.logoutService().subscribe(data=>{
      
      if(data.status){
        localStorage.clear();
        this.router.navigateByUrl('/login');
      }else{
        this.presentToast(data.message);
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
