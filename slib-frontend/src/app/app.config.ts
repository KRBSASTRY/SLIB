import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

// Import Components
import { LibraryListComponent } from './components/library-list/library-list.component';
import { LibraryComparisonComponent } from './components/library-comparison/library-comparison.component';

const routes: Routes = [
  { path: '', component: LibraryListComponent },
  { path: 'compare', component: LibraryComparisonComponent },
];

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([])),
    MatTableModule, // Ensure MatTableModule is included
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
};
