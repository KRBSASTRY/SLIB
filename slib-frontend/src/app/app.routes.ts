import { provideRouter, Routes } from '@angular/router';
import { LibraryListComponent } from './components/library-list/library-list.component';
import { LibraryComparisonComponent } from './components/library-comparison/library-comparison.component';

export const routes: Routes = [
    { path: '', component: LibraryListComponent },  // ✅ Home Page
    { path: 'compare', component: LibraryComparisonComponent },  // ✅ Comparison Page
    { path: '**', redirectTo: '' }  // ✅ Redirect unknown routes
];

export const appConfig = {
  providers: [provideRouter(routes)],
};
