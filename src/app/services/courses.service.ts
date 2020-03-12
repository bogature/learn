import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  baseurl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getListAllCategory(page: string): Observable<any> {
    return this.http.get(this.baseurl + '/api/v1/post/category/list/?page=' + page);
  }

  getListSubCategory(id: string, page: string): Observable<any> {
    return this.http.get(this.baseurl + '/api/v1/post/sub/category/list/' + id + '/?page=' + page);
  }

  getListTopic(id: string, page: string): Observable<any> {
    return this.http.get(this.baseurl + '/api/v1/post/topic/list/' + id + '/?page=' + page);
  }

  getListTest(id: string, page: string): Observable<any> {
    return this.http.get(this.baseurl + '/api/v1/post/test/list/' + id + '/?page=' + page);
  }

  createTest(Topic): Observable<any> {
    const body = new FormData();
    // if (Img != null) {
    //   body.append('img', Img);
    // }
    // body.append('question', Question);
    // body.append('help', Help);
    // body.append('count_correct_answer', Count);
    body.append('topic', Topic);
    return this.http.post(this.baseurl + '/api/v1/post/test/', body);
  }

  createTask(Img: File, Question, Help): Observable<any> {
    const body = new FormData();
    if (Img != null) {
      body.append('img', Img);
    }
    body.append('question', Question);
    body.append('help', Help);
    return this.http.post(this.baseurl + '/api/v1/post/task/', body);
  }

  patchTest(id: string, Task): Observable<any> {
    // tslint:disable-next-line:max-line-length
    const body = {task: Task};
    return this.http.patch(this.baseurl + '/api/v1/post/patch/test/' + id + '/', body);
  }

  patchTask(id: string, Correct, Others): Observable<any> {
    // tslint:disable-next-line:max-line-length
    const body = {others_answer: Others, correct_answer: Correct};
    return this.http.patch(this.baseurl + '/api/v1/post/patch/task/' + id + '/', body);
  }

  createAnswer(Img: File, Text): Observable<any> {
    const body = new FormData();
    if (Img != null) {
      body.append('img', Img);
    }
    body.append('text', Text);
    return this.http.post(this.baseurl + '/api/v1/post/answer/', body);
  }

}
