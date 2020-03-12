import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CoursesService} from '../services/courses.service';
import {Test} from '../model/test';
import {log} from 'util';
import {of} from 'rxjs';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  upper = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

  categories = [];
  tests = [];
  activeTest;
  test = null;
  listTests: Test[] = [];
  activeMyTest = null;


  constructor(private api: CoursesService, private router: ActivatedRoute) {}

  ngOnInit() {
    this.getListTest(this.router.snapshot.paramMap.get('id'), '1');
  }

  shuffle(arr) {
    // tslint:disable-next-line:one-variable-per-declaration
    let i,
      j,
      temp;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  getListTest = (id, page) => {
    this.tests = [];
    this.api.getListTest(id, page).subscribe(
      data => {
        console.log(data.results);
        const listTest = [];

        for (const test of data.results) {
          const questions = [];
          const answer = [];
          for (const task of test.task) {
            questions.push(task.question);
            for (const item of task.others_answer) {
              answer.push({id: item.id, text: item.text, active: null});
            }
            for (const item of task.correct_answer) {
              answer.push({id: item.id, text: item.text, active: null});
            }
          }

          const listQuestion = [];

          for (let i = 0; i < questions.length; i++) {
            listQuestion.push({question: questions[i], index: i, answer});
          }
          console.log(listQuestion);
          listTest.push({test: test.id, topic: test.topic, listQuestion});
        }
        console.log(listTest);

        this.listTests = listTest;
      },
      error => {
        console.log(error);
      }
    );
  }

  openTest(id: number) {
    this.activeMyTest = id;
    this.test = this.listTests[id];
  }

  setOtvet(question: any, indexQ: number, answer: any, indexA: number) {

    this.listTests[this.activeMyTest].listQuestion[indexQ].answer[indexA].active = false;
    // console.log(this.listTests[this.activeMyTest].listQuestion[indexQ]);
    //
    // for (const el of this.listTests[this.activeMyTest].listQuestion.filter(elem => elem.index === indexQ)) {
    //   el.answer.filter(item => item.id === answer.id)[0].active = true;
    // }

    console.log('Rez');
    console.log(this.listTests);

  }



}
