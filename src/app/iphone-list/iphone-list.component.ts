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
  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    // w czasie inicjaizacji wywolujemy komponent
    this.getIphones();
  }


  // METHODA - Z PIPE
  getIphonesPipe(): void { // 1. Definicja metody
    // Http methoda get
    // 2. Wyślij żądanie HTTP GET, otrzymasz tablice Iphonow, wysij pod URL iphonow)
    this.httpClient.get<Iphone[]>(this.iphonesUrl)

      // error handling
      .pipe( // 3. Użyj operatorów RxJS
        catchError(error => { // 4. Złap potencjalny błąd
          console.error('Błąd podczas ładowania produktów:', error); // 5. Zapisz błąd w konsoli
          return []; // 6. Zwróć pustą tablicę w razie błędu (INTENCJA)
        })
      )

// subskrybuj
      .subscribe(data => { // 7. Zasubskrybuj, aby otrzymać dane (lub fallback)
        this.iphones = data; // 8. Przypisz otrzymane dane do właściwości komponentu
        console.log('Iphony załadowane:', this.iphones); // 9. Zapisz wynik w konsoli
      });
  }

  // METHODA - PROSTSZA - BEZ PIPE
  getIphones(): void {

    this.httpClient.get<Iphone[]>(this.iphonesUrl)

      .subscribe({ // Przekazujemy JEDEN obiekt

        next: (data) => {
          // Kod dla sukcesu
          this.iphones = data;
          console.log('Iphony załadowane:', this.iphones);
        },

        error: (error) => {
          // Kod dla błędu
          console.error('Błąd podczas ładowania produktów:', error);
          this.iphones = [];
          console.log('Wystąpił błąd, ustawiono pustą tablicę iPhonów.');
        },

        // complete: () => { /* Opcjonalny kod po zakończeniu */ }
      });
  }
}


