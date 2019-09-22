import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-rfo',
  templateUrl: './rfo.page.html',
  styleUrls: ['./rfo.page.scss'],
})
export class RfoPage implements OnInit {
  public statusMitra=[];

  constructor(
    
    public router:Router,
    private platform:Platform,
    public navCtrl:NavController,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController,
    public mitra:AuthService
    ) {
        this.mitra.getMitra().subscribe(data=>{
          console.log(data);

          this.statusMitra=data.status;
          //this.displayMitra=data.message;
        });
    }

  ngOnInit() {}


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
