import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DataService {
  //list of problems
  private _problemSource = new BehaviorSubject<Problem[]>([]);

  constructor(private httpClient: HttpClient) { }

  getProblems(): Observable<Problem[]> {
    this.httpClient.get('api/v1/problems')
      .toPromise()
      .then((res: any) => {
        this._problemSource.next(res);
      })
      .catch(this.handleError);
    return this._problemSource.asObservable();
  }

  getProblem(id: number): Promise<Problem> {
    return this.httpClient.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res: any) => res)
      .catch(this.handleError);
  }

  addProblem(problem: Problem) {
    const options = {headers: new HttpHeaders( {
      'Content-Type': 'application/json'})};
      return this.httpClient.post('api/v1/problems', problem, options)
        .toPromise()
        .then((res: any) => {
          //update the _problemSource
          this.getProblems();
          return res;
        })
        .catch(this.handleError);
  }

  private handleError(err: any): Promise<any> {
    console.error('an error occured', err);
    return Promise.reject(err.body || err);
  }
}
