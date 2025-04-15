import { bootstrapApplication } from '@angular/platform-browser';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import {AppComponent} from './app/app.component';
import {appConfig} from './app/app.config';

const moment = _rollupMoment || _moment;

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
