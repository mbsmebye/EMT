import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { TaskComponent } from "./situations/task/task.component";
import { BaseQuestionComponent } from "./situations/questions/base-question.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SituationControllerComponent } from "./situations/situation-controller/situation-controller.component";
import { QuestionDirective } from "./situations/questions/question.directive";
import { MultipleChoiceQuestionComponent } from "./situations/questions/question-types/multiple-choice-question/multiple-choice-question.component";
import { PriorityQuestionComponent } from "./situations/questions/question-types/priority-question/priority-question.component";

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    BaseQuestionComponent,
    SituationControllerComponent,
    QuestionDirective,
    MultipleChoiceQuestionComponent,
    PriorityQuestionComponent
  ],
  entryComponents: [
    BaseQuestionComponent,
    MultipleChoiceQuestionComponent,
    PriorityQuestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
