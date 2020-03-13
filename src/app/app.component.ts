import { Component } from '@angular/core';
import {CoursesService} from './services/courses.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'learn';

  categories = [];
  subCategoryies = [];

  constructor(private api: CoursesService, private fb: FormBuilder, private router: Router) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.getListAllCategory('1');
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
        this.subCategoryies = data.results;
      },
      error => {
        console.log(error);
      }
    );
  }

  getListTopic = (id, page) => {
    this.subCategoryies = [];
    this.router.navigate(['/topic/' + id]);
  }


}
