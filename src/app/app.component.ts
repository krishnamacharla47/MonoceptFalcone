import { Component, OnInit } from '@angular/core';
import { FalconeService } from './services/falcone.service';
import { Planets } from './models/planets';
import { Vehicles } from './models/vehicles';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Falconemonocept';
  public planetList:Planets[]=[];
  public vehicleList:Vehicles[]=[];

  constructor(private falconeServie:FalconeService){

  }

  ngOnInit(){
    this.getPlanets();
    this.getVehicles();

  }

  public getPlanets(){
    this.falconeServie.getPlanets().subscribe(data=>
   this.planetList.push(...data)
   
      );
      console.log(this.planetList)   
  }

  public getVehicles(){
    this.falconeServie.getVehicles().subscribe(data=>
      this.vehicleList.push(...data)
      );
      console.log(this.vehicleList);
  }

  changePlanet1(filterVal: any) {

    console.log(filterVal);
        // this.planetList = this.planetList.filter((item) => item.name == filterVal);

}
changePlanet2(filterVal: any) {
  // this.planetList = this.planetList.filter((item) => item.name == filterVal);
  console.log(filterVal);
}
changePlanet3(filterVal: any) {
  // this.planetList = this.planetList.filter((item) => item.name == filterVal);
  console.log(filterVal);

}
changePlanet4(filterVal: any) {
  // this.planetList = this.planetList.filter((item) => item.name == filterVal);
  console.log(filterVal);

}
}