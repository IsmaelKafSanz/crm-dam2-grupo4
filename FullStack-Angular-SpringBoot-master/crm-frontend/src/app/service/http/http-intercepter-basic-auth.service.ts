import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpClient } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {

  constructor(private basicAuthenticationService: BasicAuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('🔍 Interceptor called for URL:', request.url);

    const basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();
    const username = this.basicAuthenticationService.getAuthenticatedUser();

    console.log('👤 Username:', username);
    console.log('🔑 Token:', basicAuthHeaderString ? basicAuthHeaderString.substring(0, 20) + '...' : 'NULL');

    if (basicAuthHeaderString && username) {
      console.log('✅ Adding Authorization header to request');
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      });
    } else {
      console.log('❌ No token or username - request will fail with 401');
    }

    return next.handle(request);
  }
}
