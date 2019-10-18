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

}
