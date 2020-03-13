import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CoursesService} from '../services/courses.service';
import {Test} from '../model/test';
import {log} from 'util';
import {of} from 'rxjs';
import {element} from 'protractor';

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
  activeMyQuestion = null;

  listAnser = [];
  listQuestion = [];
  listTask = [];
  listAnswer = [];

  text = '';


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
        for (const test of data.results) {
          this.listQuestion = [];
          const answer = [];
          const listAnswer = [];
          for (const task of test.task) {

            for (const item of task.others_answer) {
              answer.push({id: item.id, question: null, text: item.text, correct: false});
              listAnswer.push(null);
            }
            for (const item of task.correct_answer) {
              answer.push({id: item.id, question: task.question, text: item.text, correct: true});
              listAnswer.push(null);
            }

            const answerRez = this.shuffle(answer);

            this.listQuestion.push({question: task.question, answer: listAnswer, correctAns: answerRez, countCorrect:  task.correct_answer.length});
          }

          this.listTask.push({test: test.id, question: this.listQuestion});
        }

        console.log('rez');
        console.log(this.listTask);
        this.listQuestion = []
      },
      error => {
        console.log(error);
      }
    );
  }

  openTest(id: number) {
    this.activeMyTest = id;
    this.test = this.listTask[id];
    this.listQuestion = [];
    this.listQuestion = this.listTask[id].question;
    this.listAnswer = this.listTask[id].question[0].correctAns;
  }

  setOtvet(question: any, indexQ: number, answer: any, indexA: number) {

    const listAns = [];

    for (const el of this.listTask[this.activeMyTest].question[indexQ].answer) {
      listAns.push(el);
    }
  
    if (listAns[indexA] == null) {
      if (this.listTask[this.activeMyTest].question[indexQ].answer.filter(el => el !== null).length < this.listTask[this.activeMyTest].question[indexQ].countCorrect) {
        listAns[indexA] = true;
        this.text = '';
      } else {
        this.text = 'Кількість правильних відповідей: ' + this.listTask[this.activeMyTest].question[indexQ].countCorrect;
      }
    } else {
      listAns[indexA] = null;
      this.text = '';
    }

    this.listTask[this.activeMyTest].question[indexQ].answer = listAns;
  }


  saveTest() {
    this.listTask[this.activeMyTest].end = true;
    this.test = this.listTask[this.activeMyTest];
  }

  nextTest() {
    if  (this.listTask.length > this.activeMyTest + 1){
      this.openTest(this.activeMyTest + 1);
    }
  }

}
