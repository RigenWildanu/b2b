import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pengaturan',
  templateUrl: './pengaturan.page.html',
  styleUrls: ['./pengaturan.page.scss'],
})
export class PengaturanPage implements OnInit {

  constructor(public auth:AuthService, public loadingCtrl:LoadingController, public router:Router, public toastCtrl:ToastController) { }

  ngOnInit() {
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
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

}
