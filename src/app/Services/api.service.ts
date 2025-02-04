import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  GOOGLE_API_KEY: string = 'AIzaSyCz5Il-ZtclMhdPzOubaPQySPR1X43co30';
  API_REQUEST_URL: string = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${this.GOOGLE_API_KEY}`;
  constructor(private http: HttpClient) {}

  fetchData(chatHistory: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ contents: chatHistory });

    return this.http.post<any>(this.API_REQUEST_URL, body, { headers });
  }
}
