import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, Subject, map } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {
  private readonly url = 'api/userPreferences';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private lastChange = new Subject<Date>();
  onChange$ = this.lastChange.asObservable();
  constructor(private http: HttpClient) { }

  add(userPreference: User): Observable<User> {
    return this.http.post<User>(this.url, userPreference, this.httpOptions)
      .pipe(catchError(this.handleError<User>('add')))
      .pipe(this.notifyChange());
  }

  update(userPreference: User): Observable<any> {
    return this.http.put(this.url, userPreference, this.httpOptions)
      .pipe(catchError(this.handleError<any>('Update User Preferences')))
      .pipe(this.notifyChange());
  }

  delete(id: number): Observable<any> {
    return this.http.delete<User>(`${this.url}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError<any>('Delete User Preferences')))
      .pipe(this.notifyChange());
  }

  get(id: string): Observable<User | undefined> {
    return this.http.get<User>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError<User>(`Get  User Preferences id=${id}`)));
  }

  list(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
      .pipe(catchError(this.handleError<User[]>('Get Users Preferences', [])));
  }

  private notifyChange() {
    return map<any, any>(data => {
      this.lastChange.next(new Date());
      return data;
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      //this.logService.add({error});
      //this.userNotification(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
