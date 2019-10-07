import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RfoService } from '../rfo.service';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-rfo',
  templateUrl: './rfo.page.html',
  styleUrls: ['./rfo.page.scss'],
})
export class RfoPage implements OnInit {
  public statusMitra=[];
  public datarfo=[];

  public description;

  constructor(
    
    public router:Router,
    private platform:Platform,
    public navCtrl:NavController,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController,
    public mitra:AuthService,
    public rfo:RfoService
    ) {
        this.mitra.getMitra().subscribe(data=>{
          console.log(data);

          if(data.data!=''){
            console.log(this.statusMitra=data.message);
            this.statusMitra=data.data;
          }else{
            this.statusMitra=data.status;
          }

          // this.statusMitra=data.status;
        });

        this.rfo.getRfo().subscribe(data=>{
          console.log('rfo'+data);

          if (data.data!=null) {
            this.datarfo=data.data;
          } else {
            this.datarfo=data.data;
          }

          //this.datarfo=data.data;
        });
    }

  ngOnInit() {}

  doRefresh(event) {
    console.log('tes refresh');
    this.mitra.getMitra().subscribe(data=>{
      console.log(data);

      if(data.data!=''){
        console.log(this.statusMitra=data.message);
        this.statusMitra=data.data;
      }else{
        this.statusMitra=data.status;
      }

      // this.statusMitra=data.status;
    });
    

    this.rfo.getRfo().subscribe(data=>{
      console.log('rfo'+data);

          if (data.data!='') {
            this.datarfo=data.data;
          } else {
            this.datarfo=data.status;
          }
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      
      event.target.complete();
    }, 2000);
  }

  async postRfo(){
    const loading = await this.loadingCtrl.create({
      spinner: "crescent",
      message: 'Mengirim Pesanan...',
      translucent: true,
      showBackdrop: true
  });
  await loading.present();

  let rfovar={
    description  : this.description,
    weight : 100,
    unit : 1,
  }
  
  console.log(rfovar)
  this.rfo.postRfo(rfovar).subscribe(data=>{
    loading.dismiss();  
    console.log('respon json API', data);
    if(data.status){
      console.log(data.data[0].api_token);
      this.presentAlert('RFO berhasil dikirim, admin kami akan menghubungi anda beberapa saat lagi');
      this.description='';

      this.router.navigateByUrl('/tabs/rfo');
    }else{
      this.presentAlert(data.message);
      console.log(data.message);
    }
  });
  }

  // async getRfoDet(id){

  // }
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
