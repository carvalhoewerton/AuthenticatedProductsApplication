import { Inject, Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { DOCUMENT } from "@angular/common";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(@Inject(DOCUMENT) private document: Document){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.document.defaultView?.localStorage.getItem('accessToken');
    req = req.clone({
      setHeaders: {
        Authorization: token ? `Bearer ${token}` : '',
      }
    });

    return next.handle(req);
  }
}
