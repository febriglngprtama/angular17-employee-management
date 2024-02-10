import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }
  getAllEmployee():Observable<any>{
      return this.http.get('http://localhost:8000/employees');
  }

  addEmployee(data:any):Observable<any>{
    return this.http.post('http://localhost:8000/employees',data);
  }

  findById(id: string):Observable<any>{
    return this.http.get(`http://localhost:8000/employees/${id}`)
  }

  updateEmployee(id: string, data: any):Observable<any>{
    return this.http.put(`http://localhost:8000/employees/${id}`,data);
  }

  deteleEmployee(id: number):Observable<any>{
    return this.http.delete(`http://localhost:8000/employees/${id}`);
  }

}
