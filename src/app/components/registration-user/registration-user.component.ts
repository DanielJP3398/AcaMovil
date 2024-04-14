import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Register } from 'src/app/core/model/register';

@Component({
  selector: 'app-registration-user',
  templateUrl: './registration-user.component.html',
  styleUrls: ['./registration-user.component.css']
})
export class RegistrationUserComponent implements OnInit {

  registrerForm!: FormGroup;

  ngOnInit(): void {
    this.registrerForm = this.formBuilder.group(
      {
        nombre: [ '', Validators.required ],
        apellido: ['',Validators.required ]
      }
    );
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  private ValidatorForm(formValues: any): boolean{
    if(this.registrerForm.valid){
      return true;
    }else{
      return false
    }
  }

  register() {
    var formValues = this.registrerForm.value;
    if(this.ValidatorForm(formValues)){
     const register = new Register(formValues.nombre, formValues.apellido);

      this.router.navigate(['/login']).then(r => r)
    }
  }

}
