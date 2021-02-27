import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/BlogPost';

@Injectable({
  providedIn: 'root',
})
export class HTTPService {
  constructor(private http: HttpClient) {}

  API_URL = 'http://127.0.0.1:3000/';

  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get(this.API_URL + 'blogposts') as Observable<BlogPost[]>;
  }

  addBlogPost(blogPost) {
    let blogToAdd = { blogPost: blogPost };
    return this.http.post(this.API_URL + 'blogpost', blogToAdd);
  }
}
