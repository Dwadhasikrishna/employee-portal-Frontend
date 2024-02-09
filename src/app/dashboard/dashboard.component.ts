import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //conditionally rendering
  showSidebar:boolean=true

  employeeCount:Number=0

  adminName:any=""

  adminDetails:any={}

  selected: Date | null = new Date()

  Highcharts: typeof Highcharts = Highcharts;
  profileImage:string='./assets/images/user-icon.png'
  EditAdminStatus:boolean=false

  chartOptions = {}
  constructor(private api:AdminapiService){
    this.chartOptions = {
      
    chart: {
      type: 'pie'
  },
  title: {
      text: 'Employee Chart'
  },
  tooltip: {
      valueSuffix: '%'
  },
  plotOptions: {
      series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
              enabled: true,
              distance: 20
          }, {
              enabled: true,
              distance: -40,
              format: '{point.percentage:.1f}%',
              style: {
                  fontSize: '1.2em',
                  textOutline: 'none',
                  opacity: 0.7
              },
              filter: {
                  operator: '>',
                  property: 'percentage',
                  value: 10
              }
          }]
      }
  },
  credits:{
    enabled:false
  },
  series: [
      {
          name: 'project',
          colorByPoint: true,
          data: [
              {
                  name: 'Chrome',
                  y: 55.02
              },
              {
                  name: 'FireFox',
                  sliced: true,
                  selected: true,
                  y: 26.71
              },
              {
                  name: 'Safari',
                  y: 1.09
              },
              {
                  name: 'Edge',
                  y: 15.5
              },
              {
                  name: 'Opera',
                  y: 1.68
              }
          ]
      }
  ]

    }
    HC_exporting(Highcharts);
  }

 ngOnInit(): void {
 
  if(localStorage.getItem("name")){
    this.adminName=localStorage.getItem("name")
  }

  this.totalEmployee() 

  //fetch all the details of admin
  this.api.authorization().subscribe((res:any)=>{
    console.log(res);
    this.adminDetails=res
    if(res.picture){
      this.profileImage=res.picture
    }
  })
 }


  menuBar(){
    this.showSidebar=!this.showSidebar
  }

  //to get the count of employeee
  totalEmployee(){
    this.api.getEmployeeApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.employeeCount=res.length
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  edit(){
    this.EditAdminStatus=true
  }

  getFile(event:any){
    let fileDetails=event.target.files[0]
    console.log(fileDetails);
    //create an object for fileReader()class
    let fr = new FileReader()

    //read
    fr.readAsDataURL(fileDetails)
    //convert
    fr.onload=(event:any)=>{
      this.profileImage=event.target.result
      this.adminDetails.picture=this.profileImage
    }
    
  }

  updateAdmin(){
    this.api.updateAdminApi(this.adminDetails).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "wow...",
          text: "updated successfully",
        });
        localStorage.setItem("name",res.name)
        localStorage.setItem("password",res.password)
        this.adminName=localStorage.getItem("name")
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  cancel(){
    this.api.authorization().subscribe((res:any)=>{
      console.log(res);
      this.adminDetails=res
      if(res.picture){
        this.profileImage=res.picture
      }
      this.EditAdminStatus=false
    })
  }
  
}
