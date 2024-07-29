import { Component } from '@angular/core';

import { FormGroup, FormArray, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nestedformarray';

  empForm:FormGroup;
 
constructor(private fb:FormBuilder) {
   this.empForm=this.fb.group({
     employees: this.fb.array([]) ,
   })
   console.log('constructor form creation');
   
}
ngOnInit() {
  
}
employees(): FormArray {
  console.log('employees()');
  return this.empForm.get("employees") as FormArray
}

newEmployee(): FormGroup {
  console.log('newEmployee()');
  return this.fb.group({
    firstName: '',
    lastName: '',
    skills:this.fb.array([])
  })
}

addEmployee() {
  console.log('addEmployee()');

  this.employees().push(this.newEmployee());
}

removeEmployee(empIndex:number) {
  console.log('removeEmployee()');
  this.employees().removeAt(empIndex);
}

employeeSkills(empIndex:number) : FormArray {
  console.log('employeeSkills()');
  return this.employees().at(empIndex).get("skills") as FormArray
}

newSkill(): FormGroup {
  console.log('newSkill()');
  return this.fb.group({
    skill: '',
    exp: '',
  })
}

addEmployeeSkill(empIndex:number) {
  console.log('addEmployeeSkill()');
  this.employeeSkills(empIndex).push(this.newSkill());
}

removeEmployeeSkill(empIndex:number,skillIndex:number) {
  console.log('removeEmployeeSkill()');
  this.employeeSkills(empIndex).removeAt(skillIndex);
}

onSubmit() {
  console.log(this.empForm.value);
}

}
