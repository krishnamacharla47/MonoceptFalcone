import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import{HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'
import { FalconeService } from './services/falcone.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
const routes: Routes = [
  { path: '', component: AppComponent }
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  providers: [FalconeService,TokenInterceptorService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
      
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
