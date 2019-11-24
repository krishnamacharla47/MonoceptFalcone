import { Component, OnInit, ElementRef,ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FalconeService } from './services/falcone.service';
import { Planets } from './models/planets';
import { Vehicles } from './models/vehicles';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection:ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit {
  title = 'Falconemonocept';
  @ViewChild('radio1',{static:false}) currentradio:ElementRef;
  public planetList:Planets[]=[];
  public planetList2:Planets[]=[];
  public planetList3:Planets[]=[];
  public planetList4:Planets[]=[];

  public vehicleList:any[]=[];
  public vehicleList2:any[]=[];
  public vehicleList3:any[]=[];
  public vehicleList4:any[]=[];
  public planet_names:any[]=[];
  public vehicle_names:any[]=[];
  
  public dest1:string="";
  public dest2:string="";
  public dest3:string="";
  public dest4:string="";
  public Ismaincontainer:boolean=true;
  
  public Planet1:string="";
  public Planet2:string="";
  public Planet3:string="";
  public Planet4:string="";
  
  public FinalResult:{planet_name:string,status:string,timeTaken:number};
  
  public timeTaken1:number=0;
  public timeTaken2:number=0;
  public timeTaken3:number=0;
  public timeTaken4:number=0;
  
  public totalno:number=0;
  isPlanet1Selected:boolean=false;
  isPlanet2Selected:boolean=false;
  isPlanet3Selected:boolean=false;
  isPlanet4Selected:boolean=false;
  isFormValid:boolean =false;
  userDataSource = new BehaviorSubject<Array<any>>([]);
  
  constructor(private falconeServie:FalconeService, private router:Router){

  }



  ngOnInit(){
    this.getPlanets();
    this.getVehicles();
      this.falconeServie.getTokenFromAPI().subscribe(x=>{
      console.log(x.token);
      localStorage.setItem('TOKEN',x.token);
   })
  }

  public getPlanets(){
    this.falconeServie.getPlanets().subscribe(data=>
   {this.planetList.push(...data);
   this.planetList2.push(...data)
   });
      console.log(this.planetList)   
  }

  public getVehicles(){
    this.falconeServie.getVehicles().subscribe(data=>
      {
      
       this.userDataSource.next(data);

        this.vehicleList=[];
        this.vehicleList2=[]
        this.vehicleList3=[]
        this.vehicleList4=[]
        this.vehicleList.push(...data);
        this.vehicleList2.push(...data);
      this.vehicleList3.push(...data);
      this.vehicleList4.push(...data);
      });
      // console.log(this.vehicleList);
      // console.log("this.vehicleList");
  }

changePlanet1(filterVal: any) {
  //console.log(this.vehicleList);
  if(this.vehicleList.find(x=>x.name==filterVal.name)){
    this.falconeServie.getVehicles().subscribe(data=>
    {
     this.vehicleList =data; 
     this.vehicleList.find(x=>x.name==filterVal.name).total_no =(data.find(x=>x.name==filterVal.name).total_no -1);
     this.vehicleList2.find(x=>x.name==filterVal.name).total_no =this.vehicleList.find(x=>x.name==filterVal.name).total_no;
    });
  }
 this.timeTaken1 = (filterVal.max_distance - this.planetList.find(x=>x.name==this.Planet1).distance)/filterVal.speed; 
 this.isValid();
}

changePlanet2(filterVal: any) {

if(this.vehicleList2.find(x=>x.name==filterVal.name)){
  //  this.vehicleList2 =this.vehicleList; 
   this.vehicleList2.find(x=>x.name==filterVal.name).total_no=(this.vehicleList.find(x=>x.name==filterVal.name).total_no)-1;
}

this.timeTaken2 = (filterVal.max_distance - this.planetList.find(x=>x.name==this.Planet2).distance)/filterVal.speed; 
this.isValid();
}

changePlanet3(filterVal: any) {
 
  console.log(this.dest1);
  console.log(this.dest2);
  
if(this.vehicleList2.find(x=>x.name==filterVal.name)){
   this.vehicleList2.find(x=>x.name==filterVal.name).total_no=(this.vehicleList.find(x=>x.name==filterVal.name).total_no)-1;
}
  this.timeTaken3 = (filterVal.max_distance - this.planetList.find(x=>x.name==this.Planet3).distance)/filterVal.speed; 
  this.isValid();
}

changePlanet4(filterVal: any) {
    this.timeTaken4 = (filterVal.max_distance - this.planetList.find(x=>x.name==this.Planet4).distance)/filterVal.speed; 
    this.isValid();
  }

  Post(){
    this.planet_names=[];
    this.vehicle_names=[];
    this.planet_names.push(this.Planet1);
    this.planet_names.push(this.Planet2);
    this.planet_names.push(this.Planet3);
    this.planet_names.push(this.Planet4);
    this.vehicle_names.push(this.dest1);
    this.vehicle_names.push(this.dest2);
    this.vehicle_names.push(this.dest3);
    this.vehicle_names.push(this.dest4);
    console.log(this.planet_names);
    console.log(this.vehicle_names);
  this.falconeServie.FindFalcon(this.planet_names,this.vehicle_names).subscribe(x=>{
    console.log(x);
    this.FinalResult=x;
  })
  this.Ismaincontainer=false;
  }

  Plane3Change(){
    this.isPlanet3Selected=true;
    this.planetList4=[];
    this.planetList3.forEach(x=>{
      if(x.name !=this.Planet3){
        this.planetList4.push(x);
      }
  })
  this.isValid();
  }

Plane1Change(){
  this.isPlanet1Selected=true;
    this.planetList2=[];
    this.planetList.forEach(x=>{
      if(x.name !=this.Planet1){
        this.planetList2.push(x);
      }
  })
  this.isValid();
}

Plane2Change(){
  this.isPlanet2Selected=true;
    this.planetList3=[];
    this.planetList2.forEach(x=>{
      if( x.name !=this.Planet2){
        this.planetList3.push(x);
      }
  })
  this.isValid();
}
Plane4Change(){
  this.isPlanet4Selected=true;
  this.planetList4=[];
  this.planetList3.forEach(x=>{
    if( x.name !=this.Planet3){
      this.planetList4.push(x);
    }
})
this.isValid();

}
isValid(){
  if(this.dest1.length>0 && this.dest2.length>0 &&  this.dest3.length>0 && this.dest4.length>0 && this.Planet1.length>0 && this.Planet2.length>0 && this.Planet3 && this.Planet4.length>0){
     this.isFormValid=true;
  }
  else{
    this.isFormValid= false;
  }
}

reset(){
  location.reload();
}
  
}