import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {ServiceService as ServiceEmployee} from "../service.service";
import {MatPaginator} from "@angular/material/paginator";
import {CoreService} from "../../core/core.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit, AfterViewInit{

  constructor(private serviceEmployee:ServiceEmployee,private _liveAnnouncer: LiveAnnouncer, private coreService:CoreService) {
  }
  ngOnInit(): void {
    this.getAllEmployee()
  }
  getAllEmployee(){
    this.serviceEmployee.getAllEmployee().subscribe({
      next:(response) => {
        console.log(response)
        this.dataSource = new MatTableDataSource<any>(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort =this.sort;
      }, error:(err) => {
        console.log(err)
      }
    })
  }


  displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'email', 'birthDate', 'basicSalary', 'status', 'group', 'description','action'];
  dataSource! : MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deleteEmployee(id: number) {
    const  isConfirm = confirm("Are sure to remove ?");
      if (isConfirm) {
        this.serviceEmployee.deteleEmployee(id).subscribe({
          next:(res) => {
            // console.log("Employee Data Deleted Successfully")
            this.coreService.openSnackBar("Employee Data Deleted Successfully")
            this.getAllEmployee();
          },
          error: console.log
        })
      }
  }



  protected readonly console = console;
}
