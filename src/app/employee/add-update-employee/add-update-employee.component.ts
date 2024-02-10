import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ServiceService as EmployeeService} from "../service.service";
import {CoreService} from "../../core/core.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-add-update-employee',
  templateUrl: './add-update-employee.component.html',
  styleUrl: './add-update-employee.component.css'
})
export class AddUpdateEmployeeComponent implements OnInit{
  title: string = "";
  id: string = "";
  employeeForm: FormGroup;

ngOnInit(): void {
  this.route.data.subscribe((data) => {
    this.title = data['title'];
  });

  this.route.paramMap.subscribe((params: ParamMap) => {
    const idParam = params.get('id');
    console.log(typeof idParam)
    if (this.id !== null) {
      this.id = idParam!;
      this.employeeService.findById(this.id).subscribe({
        next:(res) => {
          console.log(res)
        }
      })
      this.getEmployee(this.id!); // tambahkan tanda seru (!) di sini
    }
  });
}


  getEmployee(id:string) {
    if (id !== null) {
      this.employeeService.findById(id!).subscribe({
        next:(response) => {
          this.employeeForm?.setValue({
            username:response.data.username,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            birthDate : response.data.birthDate,
            basicSalary: response.data.basicSalary,
            status: response.data.status,
            group:response.data.group,
            description:response.data.description,
          })
        }
      })
    }
  }

  group:string[] =[
    'HR',
    'Finance',
    'IT',
    'Marketing',
    'Sales',
    'Customer Service',
  ]

  status:string[] =[
    'Active',
    'Inactive'
  ]

  constructor(
              private route:ActivatedRoute,
              private router:Router,
              private fb:FormBuilder,
              private employeeService:EmployeeService,
              private coreService :CoreService,
  ) {
    this.employeeForm = this.fb.group({
      username:new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      birthDate : new FormControl('', [Validators.required]),
      basicSalary: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      group:new FormControl('', [Validators.required]),
      description:new FormControl('', [Validators.required]),
    })
  }

  onFormSubmit() {
    console.log(this.employeeForm.value, ' id nya', this.id)
    console.log(this.employeeForm.valid, ' validnya')

    if (this.employeeForm.valid) {
      if (this.id){
        // const update = {id:this.id, ...this.employeeForm.value};
        this.employeeService.updateEmployee(this.id, this.employeeForm.value).subscribe({
          next:(response) => {
            this.router.navigateByUrl("")
          }
        })
      } else {
        this.employeeService.addEmployee(this.employeeForm.value).subscribe({
          next:(response) => {
            this.router.navigateByUrl("")
          }
        })
      }
    } else {
      this.employeeForm?.markAllAsTouched();
    }
  }


}
