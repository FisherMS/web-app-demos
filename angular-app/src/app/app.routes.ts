import { Routes } from '@angular/router';
import { PortfolioComponent } from './pages/portfolio/portfolio';
import { ServicesComponent } from './pages/services/services';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
    { path: '', component: PortfolioComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', redirectTo: '' }
];
