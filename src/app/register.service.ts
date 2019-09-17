import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public baseurl='http://178.128.127.241/b2b/api/auth/user.php?method=register';
  constructor(public http:Http) { }

  public postRegister(register){
    return Observable.create(observer => {
      // siapkan header
      let headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');
      // siapkan body
      let body = new URLSearchParams();
      body.append('name', register.nama);
      body.append('phone', register.telpon);
      body.append('email', register.email);
      body.append('password', register.password);
      body.append('re_password', register.password);
      // call API
        return this.http.post(this.baseurl,body.toString(), {headers:headers}).subscribe(res => { 
          observer.next(res.json());
          observer.complete();  
      }, (err) => { 
        console.log(err);
        });
      });
      //console.log(return this.http.post);
  }
}
