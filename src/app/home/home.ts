import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './home.html',
  styles: [`
 

  .mat-checkbox-frame {
    border-color: black !important;
  }

  .mat-checkbox-checkmark-path {
    stroke: black !important;
  }

  .no-outline .mat-checkbox-inner-container {
    outline: none !important;
  }

  .filter-checkbox-container {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px; /* Increased font size */
  }

  .black-checkbox .mat-checkbox-frame {
    border-color: black !important;
  }

  .black-checkbox.mat-accent .mat-checkbox-background,
  .black-checkbox .mat-checkbox-checked.mat-checkbox-checked.mat-accent .mat-checkbox-background {
    background-color: black !important;
  }

  .filter-columns-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
`]

})
export class Home {
  // Image paths
  filterIcon = 'assets/icons/filter.png';
  searchIcon = 'assets/icons/search.png';
  closeIcon = 'assets/icons/close.png';
  
  // Data arrays
  siteGroups = [
    { id: 1, name: 'Site Group 1', selected: false },
    { id: 2, name: 'Site Group 2', selected: false },
    { id: 3, name: 'Site Group 3', selected: false },
  ];

  baOrigins = [
    { id: 1, name: 'BA Origin 1', selected: false },
    { id: 2, name: 'BA Origin 2', selected: false },
    { id: 3, name: 'BA Origin 3', selected: false },
  ];

  marketCodes = [
    { id: 1, name: 'Market Code 1', selected: false },
    { id: 2, name: 'Market Code 2', selected: false },
    { id: 3, name: 'Market Code 3', selected: false },
  ];

  searchFilterInputs = [
    { id: 1, name: 'BA Origin' },
    { id: 2, name: 'Cust Group' },
    { id: 3, name: 'Cust Name' },
    { id: 4, name: 'Cust No' },
    { id: 5, name: 'Cust Elim or Name' },
    { id: 6, name: 'Cust Sales Area' },
    { id: 7, name: 'Company Code' },
  ];

  filterColumns = [
    { id: 1, name: 'BA Origin', selected: false },
    { id: 2, name: 'Cust Group', selected: false },
    { id: 3, name: 'Cust Name', selected: false },
    { id: 4, name: 'Cust No', selected: false },
    { id: 5, name: 'Cust Elim or Name', selected: false },
    { id: 6, name: 'Cust Sales Area', selected: false },
    { id: 7, name: 'Company Code', selected: false },
    { id: 8, name: 'Company Full Name', selected: false },
    { id: 9, name: 'Sales Person Name', selected: false },
    { id: 10, name: 'Operational Hub Name', selected: false },
    { id: 11, name: 'Operational Site Group', selected: false },
    { id: 12, name: 'Market Code', selected: false },
  ];

  inputs = [
    { id: 1, name: 'BA Origin', field: 'baOrigin' },
    { id: 2, name: 'Cust Group', field: 'custGroup' },
    { id: 3, name: 'Cust Name', field: 'custName' },
    { id: 4, name: 'Cust No', field: 'custNo' },
    { id: 5, name: 'Cust Elim or Name', field: 'custElimOrName' },
    { id: 6, name: 'Cust Sales Area', field: 'custSalesArea' },
    { id: 7, name: 'Company Code', field: 'companyCode' },
  ];

  tableData = [
    { 
      baOrigin: 'Value 1', 
      custGroup: 'Value 1', 
      custName: 'Value 1', 
      custNo: 'Value 1', 
      custElimOrName: 'Value 1', 
      custSalesArea: 'Value 1', 
      companyCode: 'Value 1' 
    },
  ];

  // UI state
  activeTab = "Customer";
  tabs = [
    { id: 1, name: 'Customer' },
    { id: 2, name: 'Company Info' },
    { id: 3, name: 'Market' }
  ];

  showSiteGroups = false;
  showBAOrigins = false;
  showMarketCodes = false;
  filterButtonActive = false;
  selectedRows: boolean[] = [];

  constructor(private router: Router) {
    this.selectedRows = new Array(this.tableData.length).fill(false);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Helper method for safe property access
  getRowValue(row: any, field: string): string {
    return row[field] || '';
  }

  toggleSection(section: string) {
    switch(section) {
      case 'siteGroups': this.showSiteGroups = !this.showSiteGroups; break;
      case 'baOrigins': this.showBAOrigins = !this.showBAOrigins; break;
      case 'marketCodes': this.showMarketCodes = !this.showMarketCodes; break;
    }
  }

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }

  handleFilterButtonClick() {
    this.filterButtonActive = !this.filterButtonActive;
  }

  checkboxChanged(index: number) {
    console.log(`Checkbox ${index} changed to ${this.selectedRows[index]}`);
  }
}