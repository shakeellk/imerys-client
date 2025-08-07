import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardLgImage, MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserService } from '../user-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
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
`],

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
  userData: any = [];
  customerData!: FormGroup;
  constructor(private router: Router, private userservice: UserService, private fb: FormBuilder) {
    this.selectedRows = new Array(this.tableData.length).fill(false);
    this.customerData = this.fb.group({
      username: ['']
    })
    this.userservice.paginatorCount.subscribe(data => {
      this.paginatorCount = data;
    })

  }


  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Helper method for safe property access
  getRowValue(row: any, field: string): string {
    return row[field] || '';
  }

  toggleSection(section: string) {
    switch (section) {
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
  customer = new FormGroup({
    BA_Origin: new FormControl(''),
    Customer_Group_Calc: new FormControl(''),
    Cust_Name: new FormControl(''),
    Cust_No: new FormControl(''),
    Cust_Elim_or_Name: new FormControl(''),
    Cust_Sales_Area: new FormControl(''),
    Company_Code: new FormControl(''),
    Company_Full_Name: new FormControl(''),
    Segment: new FormControl(''),
    Sales_Person_Name: new FormControl(''),
    Market_Code: new FormControl(''),
    Operational_Hub_Code: new FormControl(''),
    Operational_Site_Group: new FormControl(''),
    Plant_Code: new FormControl(''),
    Plant_Name: new FormControl(''),
    Commercial_Name: new FormControl(''),
    Package_Type: new FormControl(''),
    Product_Code: new FormControl(''),
    Mineral_Calc: new FormControl(''),
    SOP_Mineral_Group: new FormControl(''),
    page: new FormControl(1)

  });

  customersFields = [
    { id: 1, name: 'BA_Origin' },
    { id: 2, name: 'Customer_Group_Calc' },
    { id: 3, name: 'Cust_Name' },
    { id: 4, name: 'Cust_No' },
    { id: 5, name: 'Cust_Elim_or_Name' },
    { id: 6, name: 'Cust_Sales_Area' },
    { id: 7, name: 'Company_Code' },
    { id: 8, name: 'Company_Full_Name' },
    { id: 9, name: 'Segment' },
    { id: 10, name: 'Sales_Person_Name' },
    { id: 11, name: 'Market_Code' },
    { id: 12, name: 'Operational_Hub_Code' },
    { id: 13, name: 'Operational_Site_Group' },
    { id: 14, name: 'Plant_Code' },
    { id: 15, name: 'Plant_Name' },
    { id: 16, name: 'Commercial_Name' },
    { id: 17, name: 'Package_Type' },
    { id: 18, name: 'Product_Code' },
    { id: 19, name: 'Mineral_Calc' },
    { id: 20, name: 'SOP_Mineral_Group' },
  ];

  paginatorCount:any;

  handleCustomerSearch() {
    this.userservice.handleSearch(this.customer, 1);
    this.userData = this.userservice.userData;
    this.userservice.paginatorCount.subscribe(data => {
      this.paginatorCount = data;
    })
    console.log(this.userData);
    console.log(this.paginatorCount);
  }

  onPageChange(e: PageEvent) {
    this.userservice.handleSearch(this.customer, e.pageIndex + 1);
    this.userData = this.userservice.userData;
    console.log(this.userData);
  }
  resetData() {
    this.customer.setValue({
      BA_Origin: '',
      Customer_Group_Calc: '',
      Cust_Name: '',
      Cust_No: '',
      Cust_Elim_or_Name: '',
      Cust_Sales_Area: '',
      Company_Code: '',
      Company_Full_Name: '',
      Segment: '',
      Sales_Person_Name: '',
      Market_Code: '',
      Operational_Hub_Code: '',
      Operational_Site_Group: '',
      Plant_Code: '',
      Plant_Name: '',
      Commercial_Name: '',
      Package_Type: '',
      Product_Code: '',
      Mineral_Calc: '',
      SOP_Mineral_Group: '',
      page: 1
    });

    // Reset site group checkboxes
    this.siteGroups.forEach(group => group.selected = false);
    this.baOrigins.forEach(origin => origin.selected = false);
    this.marketCodes.forEach(code => code.selected = false);

    // Optional: clear table data
    this.userData = [];
  }
  onSubmit() {
    if (this.customer.invalid) {
      this.customer.markAllAsTouched();
      return;
    }

    // Proceed with your search only when form is valid
    this.handleCustomerSearch();
  }


}