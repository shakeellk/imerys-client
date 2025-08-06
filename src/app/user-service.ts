import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Interface } from 'readline';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http:HttpClient) { }

  private user: string = "";
  private activeComponent = new BehaviorSubject<string>("Home");
  private activeComponentObs = this.activeComponent.asObservable();

  getActiveComponent(){
    return this.activeComponent.getValue();
  }

  setActiveComponent(data: string){
    this.activeComponent.next(data);
    console.log(this.activeComponent);
  }

  getActiveComponentObs():Observable<string> {
    return this.activeComponentObs;
  }

  getData(){
    return this.user;
  }

  changeData(data:string){
    this.user = data;
  }
 searchCustomers(customer: FormGroup): Observable<any> {
    return this.http.get('http://nodejs-app-env.eba-kxgefpxt.ap-south-1.elasticbeanstalk.com/api/customers/search', {
      params: {
        BA_Origin: customer.get('BA_Origin')?.value,
        Customer_Group_Calc: customer.get('Customer_Group_Calc')?.value,
        Cust_Name: customer.get('Cust_Name')?.value,
        Cust_No: customer.get('Cust_No')?.value,
        Cust_Elim_or_Name: customer.get('Cust_Elim_or_Name')?.value,
        Cust_Sales_Area: customer.get('Cust_Sales_Area')?.value,
        Company_Code: customer.get('Company_Code')?.value
      }
    });
  }

  userData:any = [];

  handleSearch(customer: FormGroup) {
    try {
      const response = this.searchCustomers(customer);
      response.subscribe(data => {
        this.userData.push(data.customers);
        console.log(this.userData);
      });
      
      
    } catch (error: any) {
      console.log("Error", error)
    }
  }
}
