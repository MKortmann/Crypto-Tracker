import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';

import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

// import the table
import { TableModule } from 'primeng/table';

// For ngx translation
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
// our config file for ngx-translate bib
import { CustomTranslateLoader } from 'src/customTranslateLoader';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { TableComponent } from './components/home/table/table.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';

// Add Service

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    TableComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
      },
    }),
  ],
  providers: [],

  bootstrap: [AppComponent],
})
export class AppModule {}
