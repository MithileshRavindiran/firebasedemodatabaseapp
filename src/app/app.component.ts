import { Component, OnDestroy } from '@angular/core';
import {AngularFireDatabase, AngularFireList}  from  'angularfire2/database';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements   OnDestroy {
  title = 'firebase-demo';
  courses: any;
  courses$ : Observable<unknown[]>;
  course$;
  author$;
  subscription : Subscription;
  constructor(private db :AngularFireDatabase) {

    this.courses$ = db.list('/courses').valueChanges();

    this.course$ = db.object('/courses/1').valueChanges();

    this.author$=db.object('/authors/1').valueChanges();

   this.subscription = db.list('/courses').valueChanges().subscribe(response => {
     this.courses = response;
    });
  }

  addCourses(course: HTMLInputElement) {
    this.db.list('/courses')
    .push(course.value);
    
    course.value = '';
  }

  updateCourse(course) {
    console.log(course.$key);
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }
}
