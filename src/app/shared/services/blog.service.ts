import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Blog } from './../models/blog.interface';

interface Response {
  ok: boolean;
  blogs: Blog;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  getAllBlogs() {
    return this.http.get<Response>(`${environment.apiUrl}/blogs`);
  }
}
