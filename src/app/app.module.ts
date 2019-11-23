import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'
import { FalconeService } from './services/falcone.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
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
