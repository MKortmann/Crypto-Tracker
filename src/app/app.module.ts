import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';

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
import { GraphicDashboardComponent } from './components/home/graphic-dashboard/graphic-dashboard.component';
import { CardDashboardComponent } from './components/home/card-dashboard/card-dashboard.component';
import { FormatCurrencyPipe } from './tools/format-currency.pipe';

import { ButtonModule } from 'primeng/button';

import { ChartModule } from 'primeng/chart';

import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { SubNavComponent } from './components/sub-nav/sub-nav.component';

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
    GraphicDashboardComponent,
    CardDashboardComponent,
    FormatCurrencyPipe,
    SubNavComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    CommonModule,
    ChartModule,
    AccordionModule,
    CardModule,
    BrowserAnimationsModule,
    InputTextModule,
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
