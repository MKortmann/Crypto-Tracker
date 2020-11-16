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
import { TableComponent } from './components/cryptos/table/table.component';

import { CardDashboardComponent } from './components/cryptos/card-dashboard/card-dashboard.component';
import { FormatCurrencyPipe } from './tools/format-currency.pipe';
import { FormatUrlPipe } from './tools/format-url.pipe';
import { FormatDatePipe } from './tools/format-date.pipe';

import { ButtonModule } from 'primeng/button';

import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { SubNavComponent } from './components/sub-nav/sub-nav.component';
import { GraphicDashboardCoinComponent } from './components/cryptos/graphic-dashboard-coin/graphic-dashboard-coin.component';

import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { GraphicDashboardTickersComponent } from './components/cryptos/graphic-dashboard-tickers/graphic-dashboard-tickers.component';
import { SidebarModule } from 'primeng/sidebar';

import { ExchangesComponent } from './components/exchanges/exchanges.component';
import { NewsComponent } from './components/news/news.component';

import { CardDashboardGlobalComponent } from './components/cryptos/card-dashboard-global/card-dashboard-global.component';
import { TableExchangesComponent } from './components/exchanges/table-exchanges/table-exchanges.component';
import { TabViewModule } from 'primeng/tabview';
import { SingleFeedComponent } from './components/news/single-feed/single-feed.component';
import { OtherFeedComponent } from './components/news/other-feed/other-feed.component';
import { PanelModule } from 'primeng/panel';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GraphicDashboardFinancialComponent } from './components/cryptos/graphic-dashboard-financial/graphic-dashboard-financial.component';

import { AgmCoreModule } from '@agm/core';

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
    TableComponent,
    CardDashboardGlobalComponent,
    CardDashboardComponent,
    FormatCurrencyPipe,
    FormatUrlPipe,
    FormatDatePipe,
    SubNavComponent,
    GraphicDashboardCoinComponent,
    GraphicDashboardTickersComponent,
    ExchangesComponent,
    NewsComponent,
    TableExchangesComponent,
    SingleFeedComponent,
    OtherFeedComponent,
    GraphicDashboardFinancialComponent,
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDYLsQ2-PsBiGy7Jkm1r2vqtfUmgEKjq5o',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [ConfirmationService],

  bootstrap: [AppComponent],
})
export class AppModule {}
