import { Component, OnInit } from '@angular/core';
import { Book } from './model/book';
import { BookService } from './product-list.component.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  bookService: BookService;
  data: any;
  books: Book[] =[];

  filteredBooks: Book[] = [];
  minPriceFilter!: number;
  maxPricefilter!: number;


  constructor(bookService: BookService) {
    this.bookService = bookService;
  }

  ngOnInit(): void {
    this.bookService.getBook().subscribe((data => {
      this.data = data;
      this.books = this.data.books;
      for (let i = 0; i < 10; i++) {
        this.books[i].price = +this.data.books[i].price.slice(1, 6);
      }
      this.filteredBooks = this.books;
    }));
  }

  filter(title: string, min: number, max: number) {
    let filteredBooksByTitle = this.books.filter((book: Book) => book.title.toLocaleLowerCase().indexOf(title.toLocaleLowerCase()) > -1);

    this.filteredBooks = [];

    for (let book of filteredBooksByTitle) {
      if (book.price >= min && book.price <= max) {
        this.filteredBooks.push(book);
      }
    }
  }

  refresh() {
    window.location.reload();
  }


}
