import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public profile=[];

  constructor(public auth:AuthService, public loadingCtrl:LoadingController) { 
    this.auth.getProfile().subscribe(data=>{
      console.log(data);

      this.profile=data.data;
    });
  }
  ngOnInit() {
  }

}
