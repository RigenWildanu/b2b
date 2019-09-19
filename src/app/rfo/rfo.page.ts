import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-rfo',
  templateUrl: './rfo.page.html',
  styleUrls: ['./rfo.page.scss'],
})
export class RfoPage implements OnInit {
  public displayMitra=[];

  public nama_toko;
  public nama_pemilik;
  public jenis_kepemilikan;
  public nomor_ktp;
  public nomor_telepon;
  public tempat_lahir;
  public tanggal_lahir;
  public alamat;
  public kode_pos;
  public agent_type;
  public bidang_usaha;
  public notes;

  constructor(public mitra:RegisterService,
    public router:Router,
    private platform:Platform,
    public navCtrl:NavController,
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController
    ) {
      this.mitra.getMitra().subscribe(data=>{
        console.log(data);
  
        this.displayMitra=data.data;
      });
     }

  ngOnInit() {
  }

  async register_mitra(){
    //console.log(this.email);
    //console.log(this.password);
    //this.presentAlert('TES');
    //this.router.navigateByUrl('/tabs');
    //let apiToken = localStorage.getItem('api_token');
    const loading = await this.loadingCtrl.create({
        spinner: "crescent",
        message: 'Registrasi akun...',
        translucent: true,
        showBackdrop: true
    });
    await loading.present();

    let regvar={
      nama_toko  : this.nama_toko,
      nama_pemilik : this.nama_pemilik,
      jenis_kepemilikan : this.jenis_kepemilikan,
      nomor_ktp : this.nomor_ktp,
      nomor_telepon : this.nomor_telepon,
      tempat_lahir : this.tempat_lahir,
      tanggal_lahir : this.tanggal_lahir,
      alamat : this.alamat,
      kode_pos : this.kode_pos,
      agent_type : this.agent_type,
      bidang_usaha : this.bidang_usaha,
      notes : this.notes
    }

    console.log(regvar);
    this.mitra.postRegisterMitra(regvar).subscribe(data=>{
      loading.dismiss();  
      console.log('respon json API', data);
      if(data.status){
        console.log(data.data[0].api_token);

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
