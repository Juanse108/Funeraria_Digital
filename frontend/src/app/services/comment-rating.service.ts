import { Injectable } from '@angular/core';
import { CommentRating } from '../models/comment-rating.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentRatingService {

  constructor(private http: HttpClient) { }
  list(): Observable<CommentRating[]> {
    return this.http.get<CommentRating[]>(`${environment.url_ms_negocio}/comment_ratings`);
    
  }

  view (id: number): Observable<CommentRating>{
    return this.http.get<CommentRating>(`${environment.url_ms_security}/comment_ratings/${id}`,
    );
  }

  create (newCommentRating: CommentRating):Observable<CommentRating> {
    return this.http.post<CommentRating>(`${environment.url_ms_security}/comment_ratings`, newCommentRating);
  }

  update (theCommentRating: CommentRating):Observable<CommentRating> {
    return this.http.put<CommentRating>(`${environment.url_ms_security}/comment_ratings/${theCommentRating.id}`, theCommentRating);
  }

  delete(id:number): Observable<CommentRating>{
    return this.http.delete<CommentRating>(`${environment.url_ms_negocio}/comment_ratings/${id}`);
  }}
