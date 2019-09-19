import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseurl='http://178.128.127.241/b2b/api/';
  constructor(public http:Http, public http2:Http) { }

  public postLogin(auth){
    return Observable.create(observer => {
      // siapkan header
      let headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');
      // siapkan body
      let body = new URLSearchParams();
      body.append('email', auth.email);
      body.append('password', auth.password);
      // call API
        return this.http.post(this.baseurl+'auth/user.php?method=login',body.toString(), {headers:headers}).subscribe(res => { 
          observer.next(res.json());
          observer.complete();  
      }, (err) => { 
        console.log(err);
        });
      });
      //console.log(return this.http.post);
  }

  public getProfile(){
    //let baseUrl = "http://178.128.127.241/b2b/api/";
    let params = new URLSearchParams();
    let apiToken=localStorage.getItem('api_token');

    params.set('api_token', apiToken); // ?api_token=qwertyu
    params.set('method','profile'); // ?method=listFilterSurat
    return Observable.create(observer => { this.http.get(this.baseurl+'auth/user.php?'+params.toString()).subscribe(res => { 
      observer.next(res.json());
      observer.complete();  
    }, (err) => {
      console.log(err);
      });
    });
  }

  public logoutService(){
    let apiToken=localStorage.getItem('api_token');
    
    return Observable.create(observer => {
      // siapkan header
      let headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');
      // siapkan body
      let body = new URLSearchParams();
      //body.append('email', auth.email);
      body.append('api_token', apiToken);
      // call API
        return this.http.post(this.baseurl+'auth/user.php?method=logout',body.toString(), {headers:headers}).subscribe(res => { 
          observer.next(res.json());
          observer.complete();  
      }, (err) => { 
        console.log(err);
        });
      });
      //console.log(return this.http.post);
  }
}
