import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CoursesComponent} from './courses/courses.component';
import {ExaminationComponent} from './examination/examination.component';
import {TopicComponent} from './topic/topic.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'examination/:id', component: ExaminationComponent},
  {path: 'topic/:id', component: TopicComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
