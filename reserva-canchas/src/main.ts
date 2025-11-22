import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { urlInterceptor } from './app/core/interceptors/url.interceptor';
import { tokenInterceptor } from './app/core/interceptors/token.interceptor';
import { errorInterceptor } from './app/core/interceptors/error.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    // 🔥 Aquí se registran los interceptores en orden
    provideHttpClient(
      withInterceptors([
        urlInterceptor,
        tokenInterceptor,
        errorInterceptor
      ])
    )
  ]
});
