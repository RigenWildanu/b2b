import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public username;
  public password;

  constructor(public router:Router) { }

  ngOnInit() {
  }

  async login(){
    console.log(this.username);
    console.log(this.password);

    this.router.navigateByUrl('/tabs');
  }

  async register(){
    this.router.navigateByUrl('/register');
  }
  
}
