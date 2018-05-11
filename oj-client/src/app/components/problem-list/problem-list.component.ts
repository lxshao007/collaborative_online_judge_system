import { Component, OnInit } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../service/data.service';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
  problems: Problem[];
  subsriptionProblems: Subscription;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.problems = this.dataService.getProblems();
    this.getProblems();
  }
  getProblems() {
    this.subsriptionProblems = this.dataService.getProblems()
      .subscribe(problems => this.problems = problems);
  }
}
