import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeListComponent} from "./employee/employee-list/employee-list.component";
import {DetailEmployeeComponent} from "./employee/detail-employee/detail-employee.component";
import { AddUpdateEmployeeComponent } from './employee/add-update-employee/add-update-employee.component';


const routes: Routes = [
  { path: "", component: EmployeeListComponent },
  { path: "add", component: AddUpdateEmployeeComponent },
  { path: "edit/:id", component: AddUpdateEmployeeComponent },
  { path: "detail/:id", component: DetailEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
