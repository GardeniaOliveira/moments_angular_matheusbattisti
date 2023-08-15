import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { Comment } from 'src/app/Comment';
import { CommentService } from 'src/app/services/comment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  moment ?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  commentForm !: FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));

      this.commentForm = new FormGroup({
        text: new FormControl("", [Validators.required]),
        username: new FormControl("", [Validators.required])
      });
  }

  get text(){
    return this.commentForm.get('text')!;
  }

  get username(){
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add('Moment removed successfully');

    this.router.navigate(['/']);
  }

  //send data comments to backend
  async onSubmit(formDirective: FormGroupDirective) {

    //if the validator in the form is equals to invalid the process stop with the return
    if (this.commentForm.invalid) {
      return;
    }

    //how we need to put more data into the form we don't send the all form only the add data
    const data: Comment = this.commentForm.value;

    //when will send the data to backend the moment already exist here so because of it there is a ! to indicate there is a moment
    data.momentId = Number(this.moment!.id);

    await this.commentService
    .createComment(data)
    .subscribe((comment) => this.moment!.comments!.push(comment.data));

    this.messagesService.add("added comment");

    //reset the form
    this.commentForm.reset();

    formDirective.resetForm();
  }
}
