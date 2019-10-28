import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RfoService } from '../rfo.service';
import { LoadingController, NavController, AlertController, Platform, } from '@ionic/angular';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {

  public sub;
  public no_invoice;
  public var_no_invoice;
  public no_rfo;
  public harga_total;
  public ongkos_kirim;
  public alamat;
  public tanggal_invoice;
  public nama_mitra;
  public tipe_pembayaran;
  public metode_pembayaran;

  public invoiceDet=[];

  constructor(public route: ActivatedRoute,
    private platform:Platform,
    public navCtrl:NavController,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController,
    public rfo:RfoService,
    public router:Router) { 

    this.sub = this.route.params.subscribe(params => {
      this.no_invoice = params['no_invoice']; 
      console.log('no_invoice '+this.no_invoice);
      
      console.log('invoice '+this.no_invoice);

      this.rfo.getInvoice(this.no_invoice).subscribe(data=>{
        console.log('invoice '+data.data[0].no_invoice);

        this.no_rfo=data.data[0].no_rfo;
        this.var_no_invoice=data.data[0].no_invoice;
        this.tanggal_invoice=data.data[0].tanggal_invoice;
        this.tipe_pembayaran=data.data[0].tipe_pembayaran;
        this.metode_pembayaran=data.data[0].metode_pembayaran;
        this.nama_mitra=data.data[0].nama_mitra;
        this.alamat=data.data[0].alamat;
      
        this.harga_total=data.data[0].harga_total;
        this.ongkos_kirim=data.data[0].ongkos_kirim;
       
        console.log(this.invoiceDet=data.data[0].detail_product);


      });

   });
  }

  ngOnInit() {
  }
  

}
