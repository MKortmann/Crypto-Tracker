import { environment } from '../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';

import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { CryptosComponent } from './components/cryptos/cryptos.component';
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
import { TableCryptosComponent } from './components/cryptos/table-cryptos/table-cryptos.component';

import { CardsCryptosComponent } from './components/cryptos/cards-cryptos/cards-cryptos.component';
import { FormatCurrencyPipe } from './tools/format-currency.pipe';
import { FormatUrlPipe } from './tools/format-url.pipe';
import { FormatDatePipe } from './tools/format-date.pipe';

import { ButtonModule } from 'primeng/button';

import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { SubNavComponent } from './components/sub-nav/sub-nav.component';
import { GraphicFullYearComponent } from './components/cryptos/graphic-full-year/graphic-full-year.component';

import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { Graphic24HoursComponent } from './components/cryptos/graphic-24-hours/graphic-24-hours.component';
import { SidebarModule } from 'primeng/sidebar';

import { ExchangesComponent } from './components/exchanges/exchanges.component';
import { NewsComponent } from './components/news/news.component';

import { CardsGlobalDataComponent } from './components/cryptos/cards-global-data/cards-global-data.component';
import { TableExchangesComponent } from './components/exchanges/table-exchanges/table-exchanges.component';
import { TabViewModule } from 'primeng/tabview';
import { SingleFeedComponent } from './components/news/single-feed/single-feed.component';
import { PanelModule } from 'primeng/panel';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ServiceWorkerModule } from '@angular/service-worker';

import { OverlayPanelModule } from 'primeng/overlaypanel';

// Authentication Auth0
import { AuthModule } from '@auth0/auth0-angular';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    CryptosComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    TableCryptosComponent,
    CardsGlobalDataComponent,
    CardsCryptosComponent,
    FormatCurrencyPipe,
    FormatUrlPipe,
    FormatDatePipe,
    SubNavComponent,
    GraphicFullYearComponent,
    Graphic24HoursComponent,
    ExchangesComponent,
    NewsComponent,
    TableExchangesComponent,
    SingleFeedComponent,
    AuthComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CarouselModule,
    FormsModule,
    BrowserModule,
    CalendarModule,
    AppRoutingModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    SidebarModule,
    CommonModule,
    AccordionModule,
    CardModule,
    TabViewModule,
    BrowserAnimationsModule,
    InputTextModule,
    HttpClientModule,
    PanelModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,
    OverlayPanelModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    AuthModule.forRoot({
      domain: 'dev-oeeh6hdb.eu.auth0.com',
      clientId: 'Ti2w3qtNUsaBZMTdz3t63QQJhSPQDOAU',
    }),
  ],
  providers: [ConfirmationService],

  bootstrap: [AppComponent],
})
export class AppModule {}
