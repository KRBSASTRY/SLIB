import { Component } from '@angular/core';
import { LibraryListComponent } from './components/library-list/library-list.component';
import { AddLibraryComponent } from './components/add-library/add-library.component';

@Component({
  selector: 'app-root',
  standalone: true,  // ✅ Mark as a standalone component
  imports: [LibraryListComponent, AddLibraryComponent], // ✅ Import components here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SLIB Directory';
}
