import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch())  // Configura HttpClient para usar fetch en el cliente y el servidor
    
  ]
};
