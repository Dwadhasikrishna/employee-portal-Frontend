import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employeeModel } from '../employee.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminapiService {

  constructor(private http:HttpClient) { }

  server_URL = 'https://employee-portal-ferg.onrender.com'

  //create an object for behavioursubject
  public shareData = new BehaviorSubject(false)

  updatedata(data:any){
    this.shareData.next(data)
  }
  

  //authorization of admin
  authorization(){
   return this.http.get(`${this.server_URL}/employee/1`)
  }

  //adding employees
  addEmployeeApi(employee:employeeModel){
  return this.http.post(`${this.server_URL}/employee`,employee)
  }

  //getting employees
  getEmployeeApi(){
    return this.http.get(`${this.server_URL}/employee`)
  }

  //delete employees
  deleteEmployeeApi(id:string){
    return this.http.delete(`${this.server_URL}/employee/${id}`)
  }

  //get and edit
  viewEmployeeApi(id:string){
    return  this.http.get(`${this.server_URL}/employee/${id}`)
  }

  //update
  updateEmployeeApi(id:any,employee:any){
  return this.http.put(`${this.server_URL}/employee/${id}`,employee)
  }

  updateAdminApi(admin:any){
  return this.http.put(`${this.server_URL}/employee/1`,admin)
  }
}
