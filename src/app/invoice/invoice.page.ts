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
  public year;
  public docid;
  public approve;
  public catatan

  constructor(public route: ActivatedRoute,
    private platform:Platform,
    public navCtrl:NavController,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController,
    public rfo:RfoService,
    public router:Router) { 

    this.sub = this.route.params.subscribe(params => {
      this.year = params['year']; 
      this.docid = params['docid'];
      console.log('year'+this.year+this.docid);

   });
  }

  ngOnInit() {
  }
  

}
