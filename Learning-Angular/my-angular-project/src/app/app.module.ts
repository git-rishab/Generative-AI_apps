import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CounterComponent } from './counter/counter.component';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    HelloComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
