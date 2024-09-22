import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { EngineerService } from './services/engineer.service'; // Adjust the import path as necessary
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), EngineerService],
};
