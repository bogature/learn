import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../services/courses.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  upper = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

  categories = [];
  subCategoryies = [];
  topics = [];
  tests = [];
  activeTopic = {id: '', name: ''};
  activeTest;
  test;
  otvet = false;
  examAnswer = [];

  constructor(private api: CoursesService, private fb: FormBuilder) { }

  ngOnInit() {
    // this.getListAllCategory('1');
  }

  getListAllCategory = (page) => {
    this.api.getListAllCategory(page).subscribe(
      data => {
        console.log(data);
        this.categories = data.results;
      },
      error => {
        console.log(error);
      }
    );
  }

  getListSubCategory = (id, page) => {
    this.api.getListSubCategory(id, page).subscribe(
      data => {
        console.log(data);
        this.subCategoryies = [];
        this.topics = [];
        this.tests = [];
        this.subCategoryies = data.results;
      },
      error => {
        console.log(error);
      }
    );
  }

  getListTopic = (id, page) => {
    this.api.getListTopic(id, page).subscribe(
      data => {
        console.log(data);
        this.topics = [];
        this.tests = [];
        this.topics = data.results;
      },
      error => {
        console.log(error);
      }
    );
  }

  getListTest = (id, name, page) => {
    this.api.getListTest(id, page).subscribe(
      data => {
        console.log(data);
        this.tests = [];
        this.activeTopic.id = id;
        this.activeTopic.name = name;
        this.tests = data.results;

        this.setActiveTest(1);
      },
      error => {
        console.log(error);
      }
    );
  }

  setActiveTest(index: any) {
    console.log('Active' + index);
    this.activeTest = index;
    // this.test = this.tests[index - 1];
    this.test = {
      id: this.tests[index - 1].id,
      task: this.tests[index - 1].task,
      my_answer: [],
    };

    console.log('Test');
    console.log(this.test);
    this.examTest(index - 1);
  }

  shuffle(arr) {
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

  examTest(id) {
    this.examAnswer = [];
    this.otvet = false;
    console.log('Exem test');
    for (const el of this.tests[id].task) {
      for (const answer of el.others_answer) {
        this.examAnswer.push({id: answer.id, correct: false, task: null, text: answer.text, myAnswer: null, valid: null});
      }
      for (const answer of el.correct_answer) {
        this.examAnswer.push({id: answer.id, correct: true, task: el.id, text: answer.text, myAnswer: null, valid: null});
      }
    }

    console.log('Rez: ');
    this.examAnswer = this.shuffle(this.examAnswer);
    console.log(this.examAnswer);
  }

  setAnswer(i, task) {

    if (!this.otvet) {

      if (this.examAnswer[i].myAnswer == null) {
        this.examAnswer[i].myAnswer = task.id;
        if (this.examAnswer[i].task === this.examAnswer[i].myAnswer) {
          this.examAnswer[i].valid = true;
        } else {
          this.examAnswer[i].valid = false;
        }

      } else {
        this.examAnswer[i].myAnswer = null;
        this.examAnswer[i].valid = null;
      }

      console.log('Rezult');
      console.log(this.examAnswer);
    }
  }

  Otvet() {
    this.otvet = true;
  }

}
