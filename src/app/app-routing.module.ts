import { NgModule } from '@angular/core';
// The Angular CommonModule exports all the basic Angular directives and pipes, such as NgIf, NgForOf, DecimalPipe, and so on.
// import { CommonModule } from '@angular/common';

// It imports RouterModule and Routes so the app can have routing functionality
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/notfound/notfound.component';

// here we configure the routes. Routes tell the Router which view to display when a user clicks a link or pastes a URL into the browser address bar.
//it has basically two propertis:
//path: a string that matches the URL in the browser address bar
//component: the component that the router should crete when navigating to this route.
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  /** We add the RouterModule to the AppRoutingModule imports array and configures it with the routes in one step by calling RouterModule.forRoot(). The method is called for Root() because you configure the router at the application's root level. */
  imports: [RouterModule.forRoot(routes)],
  /** It exports RouterModule so it will be available throughout the app. */
  exports: [RouterModule],
})
export class AppRoutingModule {}
