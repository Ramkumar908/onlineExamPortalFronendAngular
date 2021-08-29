import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-study-material',
  templateUrl: './study-material.component.html',
  styleUrls: ['./study-material.component.css']
})
export class StudyMaterialComponent implements OnInit {
   isLoggedIn:boolean=false;
   filename:string;
   selectedFile: File = null;


   studyMaterialFilePdf:any;
  constructor(
    private login:LoginService,
    private router:Router,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    if(this.isLoggedIn)
    {
      
    }
    else
    {
     Swal.fire("Please login for download Study Material");
     this.router.navigateByUrl("/login");
    }


  }
  getStudyMaterislpdf()
  {

    this.userService.studyMaterialdownload()
    Swal.fire("File download successfully");
    //console.log("calling from getStudyMaterial");
  }
  
  handleStudyMaterialUpload(event)
  {
    console.log("calling from file upload  function");
    this.studyMaterialFilePdf= event.target.files[0];
    this.selectedFile = <File>event.target.files[0];
    this.filename = this.selectedFile.name;
    console.log("filename is"+this.filename);

    var size = Math.round(this.selectedFile.size/1024);

    var imageType = ["application/pdf"];

    if(this.selectedFile.type!=""){
      var imageStatus = imageType.includes(this.selectedFile.type);
    }else{
      var imageStatus = false;
    }

    if(!imageStatus){
      this.studyMaterialFilePdf = "";
      //this.toastrService.error("Wrong file format.Please upload image only.")
      this.selectedFile=null;
      return false;
    }else{
      this.selectedFile = null;
      this.filename = "";
    }

    if(size>=10240){
      Swal.fire("file size is to large please upload ")
     // this.toastrService.error("Size of image is very large. Only 10MB is allowed.")
      //this.activationImage= "";
    }

    if(this.studyMaterialFilePdf!=null)
    {
      const claim = new FormData();
      claim.append("studyMaterialPdf",this.studyMaterialFilePdf);
      this.userService.uploadStudyMaterial(claim).subscribe((response:any)=>{
      if(response.statusCode==200)
      {
        Swal.fire("file upload successfully")
      }
      else{
        Swal.fire("file upload failed");
      }

        console.log("file upload successfully ")
      })
      
      //claim.append("countryId",localStorage.getItem("countryId"));
      //claim.append("userId",""+this.user.userId);

       
    }
    //console.log(this.studyMaterialFilePdf);
  }


 

}
