import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Moment } from 'src/app/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Moment>();
@Input() btnText !: string;

//here the form is declared
momentForm!: FormGroup;
  constructor() { }

  //here the form initialize
  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image:new FormControl('')

    })
  }

  get title(){
    return this.momentForm.get('title')!;
  }

  get description(){
    return this.momentForm.get('description')!;
  }

  onFileSelected (event: any) {

    //get the first image in the array of images
    const file = event.target.files[0];

    //to insert the image into the form
    this.momentForm.patchValue({image: file})
  }
  submit(){
    if(this.momentForm.invalid){
      return;
    }
    console.log(this.momentForm.value);

    //send data to the father component
    this.onSubmit.emit(this.momentForm.value);
  }



}
