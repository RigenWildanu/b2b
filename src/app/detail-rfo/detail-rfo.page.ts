import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RfoService } from '../rfo.service';
import { LoadingController, NavController, AlertController, Platform, } from '@ionic/angular';

@Component({
  selector: 'app-detail-rfo',
  templateUrl: './detail-rfo.page.html',
  styleUrls: ['./detail-rfo.page.scss'],
})
export class DetailRfoPage implements OnInit {

  public sub;
  public year;
  public docid;

  public no_rfo;
  public nama_warung;
  public description;
  public tgl_pesan;
  public button_update;

  // public dataDet
  constructor(
    public route: ActivatedRoute,
    private platform:Platform,
    public navCtrl:NavController,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController,
    public rfo:RfoService,
    public router:Router
    ) {
    this.sub = this.route.params.subscribe(params => {
      this.year = params['year']; 
      this.docid = params['docid'];
      console.log('year'+this.year+this.docid);

      this.rfo.getRfoDet(this.year,this.docid).subscribe(data=>{
        //console.log('rfo'+data.data[0].description);
        // this.dataDet=data.data;
        this.no_rfo=data.data[0].no_rfo;
        this.nama_warung=data.data[0].nama_warung;
        this.description=data.data[0].description;
        this.tgl_pesan=data.data[0].rfo_date;
        this.button_update=data.data[0].button_update;

      });
   });

  }
  ngOnInit() {}

  async postUpdateRfo(year,docid,description){
    const loading = await this.loadingCtrl.create({
      spinner: "crescent",
      message: 'Meperbarui Pesanan...',
      translucent: true,
      showBackdrop: true
  });
  await loading.present();

  // let rfovar={
  //   description  : this.description,
  //   weight : 100,
  //   unit : 1,
  // }

  
  console.log(year+docid+description);
  this.rfo.postUpdateRfo(year,docid,description).subscribe(data=>{
    loading.dismiss();  
    console.log('respon json API', data);
    if(data.status){
      console.log(data.data[0].api_token);
      this.presentAlert(data.data[0].msg);

      this.router.navigateByUrl('/tabs/rfo');
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
