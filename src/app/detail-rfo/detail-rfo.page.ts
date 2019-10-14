import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { RfoService } from '../rfo.service';

@Component({
  selector: 'app-detail-rfo',
  templateUrl: './detail-rfo.page.html',
  styleUrls: ['./detail-rfo.page.scss'],
})
export class DetailRfoPage implements OnInit {

  public sub;
  public id;

  public dataDet
  constructor(public route: ActivatedRoute, public rfo:RfoService) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
      console.log('id rfo '+this.id);

      this.rfo.getRfoDet(this.id).subscribe(data=>{
        //console.log('rfo'+data.data[0].description);
        this.dataDet=data.data;

      });
   });

  }
  ngOnInit() {
    
  }
  

}
