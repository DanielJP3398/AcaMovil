import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  selectedRole: string = '';
  @Output() roleSelected = new EventEmitter<string>();

  onRoleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    if (value) {
      this.selectedRole = value;
      this.roleSelected.emit(value);
    }
  }
}
