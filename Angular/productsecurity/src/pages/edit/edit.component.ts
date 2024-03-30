import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  form!: FormGroup;
  constructor(){
    
  }
}
