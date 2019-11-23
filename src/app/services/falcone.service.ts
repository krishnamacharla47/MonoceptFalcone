import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FalconeService {

  private planets_url='https://findfalcone.herokuapp.com/planets';
  private vehicles_url='https://findfalcone.herokuapp.com/vehicles';

  constructor(private http:HttpClient) { 
        localStorage.setItem('TOKEN','newtoken');

  }

   getPlanets(){
     return this.http.get<any>(this.planets_url)
   }

   getVehicles(){
     return this.http.get<any>(this.vehicles_url)

   }

// getAllData(){
//     return Observable.forkJoin(
//             this.http.get(this.planets_url),
//          this.http.get(this.vehicles_url)
//           )
//       }



  getGeneatetoken(){
    return !!localStorage.getItem('TOKEN');
  }

  getToken(){
  return  localStorage.getItem('TOKEN');
  }

}
