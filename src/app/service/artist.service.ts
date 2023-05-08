import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter,Injectable, Output } from '@angular/core';
import { catchError, Observable, retry, throwError} from 'rxjs'
import { Artist } from '../models/artist.model';


@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  base_Url = 'http://localhost:3000/offers'

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  //http API Errors
  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log(`An error ocurred ${error.status}, body was: ${error.error}`);
    }
    else{
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

  createItem(item: any): Observable<Artist> {
    return this.http
      .post<Artist>(this.base_Url, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getList(): Observable<Artist> {
    return this.http
      .get<Artist>(this.base_Url)
      .pipe(retry(2), catchError(this.handleError));
  }

  getItem(id: string): Observable<Artist> {
    return this.http
    .get<Artist>(this.base_Url + '/' + id).pipe(retry(2),catchError(this.handleError));
  }

  updateItem(id: number, item: any): Observable<Artist> {
    return this.http
      .put<Artist>(this.base_Url + '/' + id, JSON.stringify(item),   this.httpOptions    
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteItem(id: string): Observable<Artist> {
    return this.http
      .delete<Artist>(this.base_Url + '/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
