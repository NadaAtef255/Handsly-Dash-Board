import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Make sure this is included

bootstrapApplication(AppComponent, {
  providers: [appConfig.providers, HttpClientModule, provideAnimationsAsync()],
}).catch((err) => console.error(err));
