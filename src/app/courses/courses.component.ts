import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../services/courses.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private api: CoursesService, private fb: FormBuilder) { }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'no',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: true,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  fileToUpload: File = null;
  imageUrl = '';

  addTestForm: FormGroup;
  addCorrectAnswerForm: FormGroup;
  addOthersAnswerForm: FormGroup;
  createAnswerForm: FormGroup;

  categories = [];
  subCategoryies = [];
  topics = [];
  tests = [];
  activeTopic = {id: '', name: ''};

  question = [];
  correctAnswer = [];
  othersAnswer = [];

  listIdNewTasks = [];

  saveTaskId = 0;
  saveTestId = 0;

  examAnswer = [];

  ngOnInit() {
    this.getListAllCategory('1');

    this.addTestForm = this.fb.group({
      question: null,
      help: null,
    });
    this.addCorrectAnswerForm = this.fb.group({
      text: null,
    });
    this.addOthersAnswerForm = this.fb.group({
      text: null,
    });
    this.createAnswerForm = this.fb.group({
      text: null,
      corect: false,
    });
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
      },
      error => {
        console.log(error);
      }
    );
  }

  createTest() {
    console.log('Create');
    console.log(this.addTestForm.value);
    this.question = this.addTestForm.value;
  }

  addCorrectAnswer() {
    this.correctAnswer.push(this.addCorrectAnswerForm.value.text);
  }

  addOthersAnswer() {
    this.othersAnswer.push(this.addOthersAnswerForm.value.text);
  }


  createTestApi = (Topic) => {
    this.api.createTest(Topic).subscribe(
      data => {
        console.log(data);
        console.log('Print list test');
        this.getListTest(
          this.activeTopic.id,
          this.activeTopic.name,
          '1'
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  createNewTest() {
    console.log('New test');
    this.createTestApi(
      this.activeTopic.id,
    );
  }

  handleFileInput(files: any) {
    console.log(files);
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  start() {
    console.log(this.addTestForm.value.question);
    console.log(this.addTestForm.value.help);
  }

  patchTest = (id, Task) => {
    this.api.patchTest(id , Task).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  setPatchTest(id) {
    this.patchTest(
      id,
      this.listIdNewTasks,
    );

    this.getListTest(
      this.activeTopic.id,
      this.activeTopic.name,
      '1'
    );
  }

  createAnswer(Img, Text) {
    this.api.createAnswer(Img , Text).subscribe(
      data => {
        console.log(data);
        if (this.createAnswerForm.value.corect) {
          this.correctAnswer.push(data);
        } else {
          this.othersAnswer.push(data);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  btnCreateAnswer() {
    this.createAnswer(
      this.fileToUpload,
      this.createAnswerForm.value.text
    );
    this.getListTest(
      this.activeTopic.id,
      this.activeTopic.name,
      '1'
    );
  }


  cleanImg() {
    this.fileToUpload = null;
    this.imageUrl = '';

    this.correctAnswer = [];
    this.othersAnswer = [];
    this.listIdNewTasks = [];
  }

  createTaskApi(Img, Question, Help) {
    console.log('createTask');
    this.api.createTask(Img, Question, Help).subscribe(
      data => {
        console.log(data);
        this.listIdNewTasks.push(data.id);
      },
      error => {
        console.log(error);
      }
    );
  }

  patchTaskApi(id, Correct, Others) {
    console.log('patch');
    this.api.patchTask(id, Correct, Others).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
    this.getListTest(
      this.activeTopic.id,
      this.activeTopic.name,
      '1'
    );
  }

  createTask() {
    this.createTaskApi(
      this.fileToUpload,
      this.addTestForm.value.question,
      this.addTestForm.value.help,
    );
  }

  patchTask(id) {
    console.log('11111111111');
    this.patchTaskApi(
      id,
      this.correctAnswer,
      this.othersAnswer
    );
  }

  setIdTask(id: any) {
    this.saveTaskId = id;
  }

  setIdTest(id: any) {
    console.log('set test');
    this.saveTestId = id;
  }

  examTest(id) {
    this.examAnswer = [];
    console.log('Exem test');
    for (const el of this.tests[id].task) {
      for (const answer of el.others_answer) {
        this.examAnswer.push({id: answer.id, correct: false, task: el.id, myAnswer: null});
      }
      for (const answer of el.correct_answer) {
        this.examAnswer.push({id: answer.id, correct: true, task: el.id, myAnswer: null});
      }
    }

    console.log('Rez: ');
    console.log(this.examAnswer);
  }
}
