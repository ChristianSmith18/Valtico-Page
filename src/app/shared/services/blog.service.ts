import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const token = localStorage.getItem('_token');
    const headers = new HttpHeaders().append(
      'authorization',
      `Bearer ${token}`
    );
    return this.http.get<Response>(`${environment.apiUrl}/blogs/all`, {
      headers,
    });
  }

  createBlog(blog: Blog) {
    const token = localStorage.getItem('_token');
    const headers = new HttpHeaders().append(
      'authorization',
      `Bearer ${token}`
    );
    return this.http.post(`${environment.apiUrl}/blogs`, blog, { headers });
  }
}
