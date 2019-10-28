import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RfoService {
  public baseurl='http://178.128.127.241/b2b/api/';
  constructor(public http:Http, public http2:Http) {   }

  public postRfo(rfo){
    return Observable.create(observer => {
      let apiToken=localStorage.getItem('api_token');
      console.log(apiToken);
      // siapkan header
      let headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');
      // siapkan body
      let body = new URLSearchParams();
      body.append('description', rfo.description);
      body.append('weight', rfo.unit);
      body.append('unit', rfo.unit)
      // call API
        return this.http.post(this.baseurl+'auth/user.php?method=orderRFO&api_token='+apiToken,body.toString(), {headers:headers}).subscribe(res => { 
          observer.next(res.json());
          observer.complete();  
      }, (err) => { 
        console.log(err);
        });
      });
      //console.log(return this.http.post);
  }

  public postUpdateRfo(year,docid,description){
    return Observable.create(observer => {
      let apiToken=localStorage.getItem('api_token');
      console.log(apiToken);
      // siapkan header
      let headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');
      // siapkan body
      let body = new URLSearchParams();
      body.append('year', year);
      body.append('docid', docid)
      body.append('description', description);
      
      // call API
        return this.http.post(this.baseurl+'auth/user.php?method=updateRFO&api_token='+apiToken,body.toString(), {headers:headers}).subscribe(res => { 
          observer.next(res.json());
          observer.complete();  
      }, (err) => { 
        console.log(err);
        });
      });
      //console.log(return this.http.post);
  }

  public getRfo(){
    //let baseUrl = "http://178.128.127.241/b2b/api/";
    let params = new URLSearchParams();
    let apiToken=localStorage.getItem('api_token');

    params.set('api_token', apiToken); // ?api_token=qwertyu
    params.set('method','listRFO'); // ?method=listFilterSurat
    return Observable.create(observer => { this.http.get(this.baseurl+'auth/user.php?'+params.toString()).subscribe(res => { 
      observer.next(res.json());
      observer.complete();  
    }, (err) => {
      console.log(err);
      });
    });
  }

  public getRfoDet(year,docid){
    //let baseUrl = "http://178.128.127.241/b2b/api/";
    let params = new URLSearchParams();
    let apiToken=localStorage.getItem('api_token');

    params.set('api_token', apiToken); // ?api_token=qwertyu
    params.set('method','detailRFO'); // ?method=listFilterSurat
    params.set('year',year);
    params.set('docid',docid);
    return Observable.create(observer => { this.http.get(this.baseurl+'auth/user.php?'+params.toString()).subscribe(res => { 
      observer.next(res.json());
      observer.complete();  
    }, (err) => {
      console.log(err);
      });
    });
  }

  public getPenawaranHarga(year,docid){
    let params = new URLSearchParams();
    let apiToken=localStorage.getItem('api_token');

    params.set('api_token', apiToken); // ?api_token=qwertyu
    params.set('method','detailPenawaranRFO'); // ?method=listFilterSurat
    params.set('year',year);
    params.set('docid',docid);
    return Observable.create(observer => { this.http.get(this.baseurl+'auth/user.php?'+params.toString()).subscribe(res => { 
      observer.next(res.json());
      observer.complete();  
    }, (err) => {
      console.log(err);
      });
    });
  }

  public postDeleteRfo(year,docid){
    return Observable.create(observer => {
      let apiToken=localStorage.getItem('api_token');
      console.log(apiToken);
      // siapkan header
      let headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');
      // siapkan body
      let body = new URLSearchParams();
      body.append('year', year);
      body.append('docid', docid)
      // call API
        return this.http.post(this.baseurl+'auth/user.php?method=deleteRFO&api_token='+apiToken,body.toString(), {headers:headers}).subscribe(res => { 
          observer.next(res.json());
          observer.complete();  
      }, (err) => { 
        console.log(err);
        });
      });
      //console.log(return this.http.post);
  }

  public fetchSubMenu(item){
    return Observable.create(observer => {
      let apiToken=localStorage.getItem('api_token');
      console.log(apiToken);
      // siapkan header
      let headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');
      // siapkan body
      let body = new URLSearchParams();
      //body.append('api_token', apiToken);
      body.append('year', item.year);
      body.append('docid', item.docid);
      // call API
        return this.http.post(this.baseurl+'auth/user.php?method=listSubMenuRFO&api_token='+apiToken,body.toString(), {headers:headers}).subscribe(res => { 
          observer.next(res.json());
          observer.complete();  
      }, (err) => { 
        console.log(err);
        });
      });
      //console.log(return this.http.post);
  }

  public postPenawaran(year,docid,approve,catatan){
    return Observable.create(observer => {
      let apiToken=localStorage.getItem('api_token');
      console.log(apiToken);
      // siapkan header
      let headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');
      // siapkan body
      let body = new URLSearchParams();
      body.append('year', year);
      body.append('docid', docid);
      body.append('approve',approve);
      body.append('catatan',catatan);
      // call API
        return this.http.post(this.baseurl+'auth/user.php?method=approveRFO&api_token='+apiToken,body.toString(), {headers:headers}).subscribe(res => { 
          observer.next(res.json());
          observer.complete();  
      }, (err) => { 
        console.log(err);
        });
      });
      //console.log(return this.http.post);
  }

  public getInvoice(no_invoice){
    let params = new URLSearchParams();
    let apiToken=localStorage.getItem('api_token');

    params.set('api_token', apiToken); // ?api_token=qwertyu
    params.set('method','detailInvoice'); // ?method=listFilterSurat
    params.set('no_invoice',no_invoice);
    return Observable.create(observer => { this.http.get(this.baseurl+'auth/user.php?'+params.toString()).subscribe(res => { 
      observer.next(res.json());
      observer.complete();  
    }, (err) => {
      console.log(err);
      });
    });
  }
}
