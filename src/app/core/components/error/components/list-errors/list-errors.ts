import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Errors } from '../../models/errors';



@Component({
  selector: 'app-list-errors',
  imports: [CommonModule],
  templateUrl: './list-errors.html',
  styleUrl: './list-errors.css'
})
export class ListErrors {
 errorList: string[] = [];

  @Input() set errors(errorList: Errors | null) {
    this.errorList = errorList
      ? Object.keys(errorList.errors || {}).map(
          (key) => `${key} ${errorList.errors[key]}`,
        )
      : [];
  }
}
