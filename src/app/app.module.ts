import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';

import {AppRoutingModule} from "./app-routing.module";
import {ServiceWorkerModule} from "@angular/service-worker";
import {environment} from "../environments/environment";
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			registrationStrategy: 'registerImmediately'
		})
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
