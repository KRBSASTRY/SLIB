import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-library-comparison',
  standalone: true,
  imports: [CommonModule, MatTableModule], // ✅ Added MatTableModule
  templateUrl: './library-comparison.component.html',
  styleUrls: ['./library-comparison.component.scss'],
})
export class LibraryComparisonComponent implements OnInit {
  libraries: any[] = [];
  displayedColumns: string[] = ['property', 'library1', 'library2'];
  dataSource = new MatTableDataSource<any>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['libraries']) {
      this.libraries = state['libraries'];
      this.prepareComparisonData();
      this.renderChart();
    }
  }

  prepareComparisonData() {
    const comparisonData = [
      { property: 'Category', library1: this.libraries[0]?.category, library2: this.libraries[1]?.category },
      { property: 'Operating System', library1: this.libraries[0]?.os.join(', '), library2: this.libraries[1]?.os.join(', ') },
      { property: 'Version', library1: this.libraries[0]?.version, library2: this.libraries[1]?.version },
      { property: 'Cost', library1: this.libraries[0]?.cost, library2: this.libraries[1]?.cost },
    ];

    this.dataSource.data = comparisonData;
  }

  renderChart() {
    const ctx = document.getElementById('comparisonChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Dependencies'],
        datasets: [
          {
            label: this.libraries[0]?.name,
            data: [this.libraries[0]?.dependencies.length],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
          {
            label: this.libraries[1]?.name,
            data: [this.libraries[1]?.dependencies.length],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          },
        ],
      },
    });
  }
}
