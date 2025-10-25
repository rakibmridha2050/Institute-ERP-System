import { Component, OnInit } from '@angular/core';
import { SectionDTO } from 'src/app/model/section.model';
import { SectionService } from 'src/app/service/section.service';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.scss']
})
export class SectionListComponent implements OnInit {
  sections: SectionDTO[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private sectionService: SectionService) { }

  ngOnInit(): void {
    this.loadSections();
  }

  loadSections(): void {
    this.isLoading = true;
    this.sectionService.getAllSections().subscribe({
      next: (data) => {
        this.sections = data;
        console.log(this.sections);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load sections';
        this.isLoading = false;
        console.error('Error loading sections:', error);
      }
    });
  }

  deleteSection(id: number): void {
    if (confirm('Are you sure you want to delete this section? This action can be undone.')) {
      this.sectionService.deleteSection(id).subscribe({
        next: () => {
          this.successMessage = 'Section deleted successfully';
          this.loadSections(); // Reload the list
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to delete section';
          console.error('Error deleting section:', error);
        }
      });
    }
  }

  restoreSection(id: number): void {
    this.sectionService.restoreSection(id).subscribe({
      next: () => {
        this.successMessage = 'Section restored successfully';
        this.loadSections();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to restore section';
        console.error('Error restoring section:', error);
      }
    });
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
