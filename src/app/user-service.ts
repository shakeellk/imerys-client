import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor() { }

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
}
