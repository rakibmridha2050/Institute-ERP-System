import { Component, OnInit } from '@angular/core';
import { FeeStructure } from 'src/app/model/payment.models';
import { FeeStructureService } from 'src/app/service/fee-structure.service';

@Component({
  selector: 'app-fee-structure',
  templateUrl: './fee-structure.component.html',
  styleUrls: ['./fee-structure.component.scss']
})
export class FeeStructureComponent implements OnInit {
  feeStructures: FeeStructure[] = [];
  loading = false;
  error = '';

  constructor(private feeStructureService: FeeStructureService) {}

  ngOnInit(): void {
    this.loadFeeStructures();
  }

  loadFeeStructures(): void {
    this.loading = true;
    this.error = '';
    
    this.feeStructureService.getAllFeeStructures().subscribe({
      next: (data) => {
        this.feeStructures = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load fee structures';
        this.loading = false;
        console.error('Error loading fee structures:', error);
      }
    });
  }

  deleteFeeStructure(id: number): void {
    if (confirm('Are you sure you want to delete this fee structure?')) {
      this.feeStructureService.deleteFeeStructure(id).subscribe({
        next: () => {
          this.loadFeeStructures();
        },
        error: (error) => {
          this.error = 'Failed to delete fee structure';
          console.error('Error deleting fee structure:', error);
        }
      });
    }
  }

  getStatusBadgeClass(isActive: boolean): string {
    return isActive ? 'status-badge status-paid' : 'status-badge status-overdue';
  }

  getStatusText(isActive: boolean): string {
    return isActive ? 'Active' : 'Inactive';
  }
}
