import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoadingController, NavController, AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  //public profile=[];
  public name: string;
  public email: string;
  public phone: string;

  //data mitra
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
  public sales_id;

  constructor(
    public auth:AuthService,
    public mitra:AuthService,
    public sales:AuthService,
    public loadingCtrl:LoadingController,
    public router:Router,
    private platform:Platform,
    public navCtrl:NavController,
    public alertCtrl:AlertController,
    ) { 
        this.auth.getProfile().subscribe(data=>{
          console.log(data);

          this.name=data.data[0].name;
          this.email=data.data[0].email;
          this.phone=data.data[0].phone;    
        });

        this.mitra.getMitra().subscribe(data=>{
          console.log(data);

          if (data.status==true) {
            this.displayMitra=data.data;
          } else {
            this.displayMitra=data.status;
          }
          //this.displayMitra=data.message;
        });

        this.auth.getSales().subscribe(data=>{
          console.log(data);
  
          this.sales=data.data;
        });
  }
  ngOnInit() {
  }

  doRefresh(event) {
    console.log('tes refresh');

    this.mitra.getMitra().subscribe(data=>{
      console.log(data);

      this.displayMitra=data.data;
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      
      event.target.complete();
    }, 2000);
  }

  async register_mitra(){
    //console.log(this.email);
    //console.log(this.password);
    //this.presentAlert('TES');
    //this.router.navigateByUrl('/tabs');
    //let apiToken = localStorage.getItem('api_token');
    const loading = await this.loadingCtrl.create({
        spinner: "crescent",
        message: 'Registrasi mitra...',
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
      sales_id : this.sales_id,
      notes : this.notes
    }

    console.log(regvar);
    this.mitra.postRegisterMitra(regvar).subscribe(data=>{
      loading.dismiss();  
      console.log('respon json API', data);
      if(data.status){
        console.log(data.data[0].api_token);
        this.presentAlert('Terimakasih telah mendaftar menjadi mitra Marko, admin kami akan menghubungi anda untuk melakukan verifikasi data.');

        this.router.navigateByUrl('/tabs/profile');
      }else{
        this.presentAlert(data.message);
        console.log(data.message);
      }
    });
  }

  async updateProfile(){
    const loading = await this.loadingCtrl.create({
      spinner: "crescent",
      message: 'Update akun...',
      translucent: true,
      showBackdrop: true
  });
  await loading.present();

  let updvar={
    name  : this.name,
    email : this.email,
    phone : this.phone,
  }
  
  console.log(updvar);
  this.auth.postUpdateProfile(updvar).subscribe(data=>{
    loading.dismiss();  
    console.log('respon json API', data);
    if(data.status){
      console.log(data.data[0].api_token);

      this.router.navigateByUrl('/tabs/profile');
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
