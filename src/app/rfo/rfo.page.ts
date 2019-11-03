import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, AlertController, Platform, } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RfoService } from '../rfo.service';
import { ThrowStmt } from '@angular/compiler';
import { ActionSheetController } from '@ionic/angular';



@Component({
  selector: 'app-rfo',
  templateUrl: './rfo.page.html',
  styleUrls: ['./rfo.page.scss'],
})
export class RfoPage implements OnInit {
  public statusMitra:String;
  public datarfo=[];

  public description;
  public year;
  public docid;
  public no_invoice;


  constructor(
    
    public router:Router,
    private platform:Platform,
    public navCtrl:NavController,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController,
    public mitra:AuthService,
    public rfo:RfoService,
    public actionSheetController: ActionSheetController
    ) {
        this.mitra.getMitra().subscribe(data=>{
          //console.log(data);
          // console.log(data.data[0].status);

          if(data.data!=''){
            //console.log(this.statusMitra=data.message);
            this.statusMitra=data.data[0].status;
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
        //console.log(this.statusMitra=data.message);
        this.statusMitra=data.data[0].status;
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

  async showSubMenu(buttons, title = 'PESANAN'){
    const actionSheet = await this.actionSheetController.create({
      header: title,
      buttons: buttons
    });
    await actionSheet.present();
  }

  itemClick(item){
    console.log(item);
    this.rfo.fetchSubMenu({docid:item.docid, year:item.year}).subscribe(data=>{
      let buttons = [];
      if(data.status){
        for (const element of data.data) {
          console.log("Our Data : " + element.method_id);

          switch (element.method_id){
            case "detailRFO":
            buttons.push(
              {
                text:element.method_name,
                handler:()=>{
                  console.log('detail rfo clicked'+item.year+item.docid);
                  this.router.navigate(['/detail-rfo', item.year, item.docid]);
                  
                }
              }
              );
            break;
            case "detailPenawaranRFO":
              buttons.push(
                {
                  text:element.method_name,
                  handler:()=>{
                    console.log('detail penawaran rfo clicked');
                    this.router.navigate(['/penawaran-harga', item.year, item.docid]);
                  }
                }
              );
            break;
            case "detailInvoice":
              buttons.push(
                {
                  text:element.method_name,
                  handler:()=>{
                    console.log('invoice clicked');
                    this.router.navigate(['/invoice', item.no_invoice]);
                  }
                }
              );
            break;
            case "deleteRFO":
              buttons.push(
                {
                  text:element.method_name,
                  handler:()=>{
                    console.log('delete rfo clicked');
                    this.alertDelete(item.year,item.docid);

                  }
                }
              );
            break;
            }
        }
          buttons.push({
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          });
          this.showSubMenu(buttons);
          
      }else{
        this.presentAlert(data.message);
      } 
    });
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

  async presentAlert(message) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: '',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async alertDelete(year,docid) {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Apakah anda yakin ingin menghapus penawaran ini?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ya',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteRfo(year,docid);
          }
        }
      ]
    });
    await alert.present();
  }
  
  async deleteRfo(year,docid){
    const loading = await this.loadingCtrl.create({
      spinner: "crescent",
      message: 'Menghapus pesanan...',
      translucent: true,
      showBackdrop: true
  });
  await loading.present();

  
  console.log(year+docid)
  this.rfo.postDeleteRfo(year,docid).subscribe(data=>{
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


}
