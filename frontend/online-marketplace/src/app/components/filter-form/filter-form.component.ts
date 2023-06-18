import { Component, Input } from '@angular/core';
import { FilterOption } from 'src/interfaces/FilterOption';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent {
  @Input() option!: FilterOption
}
