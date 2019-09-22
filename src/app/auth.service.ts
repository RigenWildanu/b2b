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
  public postUpdateProfile(updatePofile){
    return Observable.create(observer => {
      let apiToken=localStorage.getItem('api_token');
      // siapkan header
      let headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');
      // siapkan body
      let body = new URLSearchParams();
      body.append('name', updatePofile.name);
      body.append('email', updatePofile.email);
      body.append('phone', updatePofile.phone);
      
      // call API
        return this.http.post(this.baseurl+'auth/user.php?method=updateProfile&api_token='+apiToken,body.toString(), {headers:headers}).subscribe(res => { 
          observer.next(res.json());
          observer.complete();  
      }, (err) => { 
        console.log(err);
        });
      });
      //console.log(return this.http.post);
  }

  public postRegisterMitra(registerMitra){
    return Observable.create(observer => {
      let apiToken=localStorage.getItem('api_token');
      // siapkan header
      let headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');
      // siapkan body
      let body = new URLSearchParams();
      body.append('nama_toko', registerMitra.nama_toko);
      body.append('nama_pemilik', registerMitra.nama_pemilik);
      body.append('jenis_kepemilikan', registerMitra.jenis_kepemilikan);
      body.append('nomor_ktp', registerMitra.nomor_ktp);
      body.append('nomor_telepon', registerMitra.nomor_telepon);
      body.append('tempat_lahir', registerMitra.tempat_lahir);
      body.append('tanggal_lahir', registerMitra.tanggal_lahir);
      body.append('alamat', registerMitra.alamat);
      body.append('kode_pos', registerMitra.kode_pos);
      body.append('agent_type', registerMitra.agent_type);
      body.append('bidang_usaha', registerMitra.bidang_usaha);
      body.append('notes', registerMitra.notes);

      // call API
        return this.http.post(this.baseurl+'auth/user.php?method=registerMitra&api_token='+apiToken,body.toString(), {headers:headers}).subscribe(res => { 
          observer.next(res.json());
          observer.complete();  
      }, (err) => { 
        console.log(err);
        });
      });
      //console.log(return this.http.post);
  }

  public getMitra(){
    //let baseUrl = "http://178.128.127.241/b2b/api/";
    let params = new URLSearchParams();
    let apiToken=localStorage.getItem('api_token');

    params.set('api_token', apiToken); // ?api_token=qwertyu
    params.set('method','displayRegisterMitra'); // ?method=listFilterSurat

    //console.log(params.set);
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
