import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Moment } from 'src/app/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css'],
})
export class MomentFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() btnText!: string;
  @Input() momentData: Moment | null = null;

  //here the form is declared
  momentForm!: FormGroup;
  constructor() {}

  //here the form initialize
  ngOnInit(): void {
    this.momentForm = new FormGroup({
      //if momentData (is only available in edit button) so show the data inside the form. else show ""
      id: new FormControl(this.momentData ? this.momentData.id : ''),
      title: new FormControl(this.momentData ? this.momentData.title :'', [Validators.required]),
      description: new FormControl(this.momentData ? this.momentData.description :'', [Validators.required]),
      image: new FormControl(''),
    });
  }

  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any) {
    //get the first image in the array of images
    const file = event.target.files[0];

    //to insert the image into the form
    this.momentForm.patchValue({ image: file });
  }
  submit() {
    if (this.momentForm.invalid) {
      return;
    }
    console.log(this.momentForm.value);

    //send data to the father component
    this.onSubmit.emit(this.momentForm.value);
  }
}
