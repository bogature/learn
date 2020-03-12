import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../services/courses.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  topics = [];

  constructor(private api: CoursesService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.getListTopic(this.router.snapshot.paramMap.get('id'), '1');
  }

  getListTopic = (id, page) => {
    this.api.getListTopic(id, page).subscribe(
      data => {
        console.log(data);
        this.topics = data.results;
      },
      error => {
        console.log(error);
      }
    );
  }


}
