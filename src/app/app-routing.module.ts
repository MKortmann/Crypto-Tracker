import { NgModule } from '@angular/core';
// The Angular CommonModule exports all the basic Angular directives and pipes, such as NgIf, NgForOf, DecimalPipe, and so on.

import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { CryptosComponent } from './components/cryptos/cryptos.component';
import { AboutComponent } from './components/about/about.component';
import { ExchangesComponent } from './components/exchanges/exchanges.component';
import { NewsComponent } from './components/news/news.component';
import { TradesComponent } from './components/trades/trades.component';
import { NotFoundComponent } from './components/notfound/notfound.component';

/* here we configure the routes. Routes
tell the Router which view to display when
a user clicks a link or pastes a URL into
the browser address bar*/
// it has basically two propertis:
/*path: a string that matches the URL in
the browser address bar*/
/*component: the component that the router should crete when navigating to this route.*/
const routes: Routes = [
  // { path: '', redirectTo: '/cryptos', pathMatch: 'full' },
  { path: '', component: CryptosComponent },
  { path: 'cryptos', component: CryptosComponent },
  { path: 'about', component: AboutComponent },
  { path: 'exchanges', component: ExchangesComponent },
  { path: 'news', component: NewsComponent },
  { path: 'trades', component: TradesComponent },
  { path: '**', component: NotFoundComponent },
];

/**
 * We add the RouterModule to the  AppRoutingModule imports array and
 *  configures it with the routes in one
 *  step by calling RouterModule.forRoot()
 * The method is called for Root()
 * because you configure the router at the application's root level.
 */

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload',
  scrollPositionRestoration: 'enabled',
};

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, routerOptions)],
  /** It exports RouterModule so it will be available throughout the app. */
  exports: [RouterModule],
})
export class AppRoutingModule {}
