import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, HttpBackend, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http'; // Importe o `withFetch`
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../guards/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }



  ],
};
