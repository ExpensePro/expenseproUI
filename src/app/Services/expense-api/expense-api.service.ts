import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseApiService {

  private baseUrl = 'http://localhost:3000/expenses';

  constructor(private http: HttpClient) { }

  public getExpenses(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  public deleteExpense(id: string): Observable<any> {
    return this.http.delete(this.baseUrl+'/'+id);
  }

  public addExpense(expense: any): Observable<any>{
    return this.http.post(this.baseUrl, expense);
  }
}
