import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-library',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-library.component.html',
  styleUrls: ['./add-library.component.scss'],
})
export class AddLibraryComponent {
  library = {
    name: '',
    category: '',
    os: '',
    version: '',
    cost: '',
    description: '',
    dependencies: '',
  };

  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  addLibrary() {
    // Validate all required fields
    if (!this.library.name || !this.library.category || !this.library.os || !this.library.version || !this.library.cost || !this.library.description) {
      this.errorMessage = "⚠️ All fields are required!";
      return;
    }
    this.errorMessage = ''; // Clear previous errors

    // Convert OS input from comma-separated string to an array
    let formattedOs = this.library.os.split(',').map((os) => os.trim());

    // Convert dependencies input (optional) from comma-separated string to an array
    let formattedDependencies = this.library.dependencies
      ? this.library.dependencies.split(',').map((dep) => dep.trim())
      : [];

    // Prepare data for API request
    const requestData = {
      ...this.library,
      os: formattedOs, // Send OS as an array
      dependencies: formattedDependencies, // Send Dependencies as an array
    };

    // Call API to add library
    this.apiService.addLibrary(requestData).subscribe({
      next: (response) => {
        console.log("✅ Library added successfully!", response);
        this.resetForm();
        alert("✅ Library added successfully!");
      },
      error: (err) => {
        console.error("❌ Error adding library:", err);
        this.errorMessage = "❌ Failed to add library. Please try again.";
      },
    });
  }

  resetForm() {
    this.library = {
      name: '',
      category: '',
      os: '',
      version: '',
      cost: '',
      description: '',
      dependencies: '',
    };
    this.errorMessage = ''; // Clear error message
  }
}
