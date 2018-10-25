import { HttpEvent, HttpHandler, HttpInterceptor,  HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiUrl = environment.apiUrl;
    const apiReq = req.clone({ url: `${apiUrl}${req.url}` });
    return next.handle(apiReq);

  }

}
