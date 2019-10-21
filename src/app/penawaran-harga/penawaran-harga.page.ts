import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RfoService } from '../rfo.service';
import { LoadingController, NavController, AlertController, Platform, } from '@ionic/angular';


@Component({
  selector: 'app-penawaran-harga',
  templateUrl: './penawaran-harga.page.html',
  styleUrls: ['./penawaran-harga.page.scss'],
})
export class PenawaranHargaPage implements OnInit {
  public sub;
  public year;
  public docid;
  public approve;
  public catatan;

  public harga_total;
  public dataDet=[];

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

      this.rfo.getPenawaranHarga(this.year,this.docid).subscribe(data=>{
        console.log('rfo'+data.data[0].detail_product[0].product_name);

        this.harga_total=data.data[0].harga_total;
        // this.dataDet=data.data[0].detail_product;
       
        this.dataDet=data.data[0].detail_product;


      });
   });
   }

  ngOnInit() {
  }

  async postPenawaran(year,docid,approve,catatan){
    const loading = await this.loadingCtrl.create({
      spinner: "crescent",
      message: 'Mengirim Respon...',
      translucent: true,
      showBackdrop: true
  });
  await loading.present();

  year = this.year;
  docid = this.docid;
  approve = this.approve;
  catatan = this.catatan;
  
  console.log(year+docid+approve+catatan)
  this.rfo.postPenawaran(year,docid,approve,catatan).subscribe(data=>{
    loading.dismiss();  
    console.log('respon json API', data);
    if(data.status){
      console.log(data.data[0].api_token);
      this.presentAlert('Respon Anda telah berhasil dikirim!');

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
