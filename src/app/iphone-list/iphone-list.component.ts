import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Iphone} from '../iphone';
import {catchError} from 'rxjs';


@Component({
  selector: 'app-iphone-list',
  standalone: false,
  templateUrl: './iphone-list.component.html',
  styleUrl: './iphone-list.component.css'
})
export class IphoneListComponent implements OnInit {

  iphones: Iphone[] = [
  ];
  private iphonesUrl = 'assets/iphonejson.json';

  // wstrzykuje
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    // w czasie inicjaizacji wywolujemy komponent
    this.getIphones();
  }

  getIphones(): void {
    this.http.get<Iphone[]>(this.iphonesUrl).pipe(
      catchError(error => {
        console.error('Błąd podczas ładowania produktów:', error);
        return [];
      })
    ).subscribe(data => {
      this.iphones = data;
      console.log('Iphony załadowane:', this.iphones);
    });
  }

}
