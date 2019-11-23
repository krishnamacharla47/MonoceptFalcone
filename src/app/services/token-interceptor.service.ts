import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { WrappedNodeExpr } from '@angular/compiler';
import { FalconeService } from './falcone.service';



@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor  {

  constructor(private injector:Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler
) {
    let falconeService =this.injector.get(FalconeService);
    let tokenreq=request.clone({
//  setHeaders:{
//    authorization:'xx yyx x',
//  }
    });
    return next.handle(tokenreq);
  }
}
