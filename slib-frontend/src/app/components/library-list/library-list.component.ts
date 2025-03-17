import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-library-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, NgFor, 
    MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, 
    MatCardModule, MatCheckboxModule, MatButtonModule
  ],
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.scss'],
})
export class LibraryListComponent {
  libraries: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  categories: string[] = [];
  selectedLibraries: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadLibraries();
    this.apiService.onLibraryAdded().subscribe((newLibrary) => {
      this.libraries.push(newLibrary);
      this.updateCategories();
    });
  }

  loadLibraries() {
    this.apiService.getLibraries().subscribe((data) => {
      this.libraries = data;
      this.updateCategories();
    });
  }

  updateCategories() {
    this.categories = [...new Set(this.libraries.map((lib) => lib.category))];
  }

  toggleSelection(library: any) {
    const index = this.selectedLibraries.findIndex((lib) => lib._id === library._id);
    if (index !== -1) {
      this.selectedLibraries.splice(index, 1);
    } else if (this.selectedLibraries.length < 2) {
      this.selectedLibraries.push(library);
    }
  }

  filteredLibraries() {
    return this.libraries.filter((lib) =>
      lib.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedCategory ? lib.category === this.selectedCategory : true)
    );
  }

  compareLibraries() {
    if (this.selectedLibraries.length === 2) {
      this.router.navigate(['/compare'], {
        queryParams: {
          lib1: JSON.stringify(this.selectedLibraries[0]),
          lib2: JSON.stringify(this.selectedLibraries[1])
        }
      });
    } else {
      alert('⚠️ Please select exactly 2 libraries to compare.');
    }
  }
}
