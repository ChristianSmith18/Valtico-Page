import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Blog } from './../models/blog.interface';

interface Response {
  ok: boolean;
  blogs: Blog[];
  count: number;
}

interface SingleResponse {
  ok: boolean;
  blog: Blog;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient, private _token: TokenService) {}

  public getAllBlogs(admin: boolean) {
    if (admin) {
      return this.http.get<Response>(`${environment.apiUrl}/blogs/all`);
    }
    return this.http.get<Response>(`${environment.apiUrl}/blogs/all-filter`);
  }

  public getOneBlog(id: string) {
    return this.http.get<SingleResponse>(
      `${environment.apiUrl}/blogs?id=${id}`
    );
  }

  public createBlog(blog: Blog) {
    return this.http.post<Blog>(`${environment.apiUrl}/blogs`, blog, {
      headers: this._token.generateSecurityToken(),
    });
  }

  public updateBlog(id: string, blog: Blog) {
    return this.http.put<Blog>(`${environment.apiUrl}/blogs?id=${id}`, blog, {
      headers: this._token.generateSecurityToken(),
    });
  }

  public changeState(id: string, newState: boolean) {
    return this.http.put<Blog>(
      `${environment.apiUrl}/blogs/state?id=${id}`,
      { enabled: newState },
      {
        headers: this._token.generateSecurityToken(),
      }
    );
  }
}
