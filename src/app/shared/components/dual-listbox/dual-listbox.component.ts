import { CommonModule } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListItem } from './models/ListItem';

@Component({
  selector: 'ngx-dual-listbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dual-listbox.component.html',
  styleUrl: './dual-listbox.component.css',
})
export class DualListboxComponent {

  /* ===============================
   * INPUTS (source externe)
   * =============================== */

  availableItems = input<ListItem[]>([]);
  selectedItems  = input<ListItem[]>([]);

  showSearchBox = input(true);
  readOnly      = input(false);

  availableItemsTitle = signal('Liste des éléments disponibles');
  selectedItemsTitle  = signal('Liste des éléments sélectionnés');

  /* ===============================
   * OUTPUTS (notifications)
   * =============================== */

  availableItemChange = output<any[]>();
  selectedItemChange  = output<any[]>();

  /* ===============================
   * INTERNAL STATE
   * =============================== */

  selectedItem = signal<ListItem | null>(null);

  availableSearchTerm = signal('');
  selectedSearchTerm  = signal('');

  /* ===============================
   * DERIVED STATE (computed)
   * =============================== */

  availableFilteredItems = computed(() => {
    const term = this.availableSearchTerm().toLowerCase();
    return this.availableItems().filter(item =>
      item.label.toLowerCase().includes(term)
    );
  });

  selectedFilteredItems = computed(() => {
    const term = this.selectedSearchTerm().toLowerCase();
    return this.selectedItems().filter(item =>
      item.label.toLowerCase().includes(term)
    );
  });

  /* ===============================
   * SELECTION
   * =============================== */

  selectItem(item: ListItem | null): void {
    this.selectedItem.set(item);
  }

  /* ===============================
   * MOVE ACTIONS
   * =============================== */

  moveToSelected(): void {

    if (this.readOnly()) return;

    // destination = selectedItems

    const item = this.selectedItem();
    if (!item) return;
   
   // destination = selectedItems
   const selectedIds = new Set(
    this.selectedItems().map(i => i.id)
   );

    //  déjà présent → on stop
    if (selectedIds.has(item.id)) return;

    const newAvailable =
      this.availableItems().filter(i => i.id !== item.id);

    const newSelected =
      [...this.selectedItems(), item];

    this.selectedItem.set(null);

    this.availableItemChange.emit(newAvailable);
    this.selectedItemChange.emit(newSelected);
  }

  moveToAvailable(): void {
    if (this.readOnly()) return;

    const item = this.selectedItem();
    if (!item) return;

    // destination = availableItems
    const availableIds = new Set(
    this.availableItems().map(i => i.id)
    );
   
    //  déjà présent → on stop
    if (availableIds.has(item.id)) return;


    const newSelected =
      this.selectedItems().filter(i => i.id !== item.id);

    const newAvailable =
      [...this.availableItems(), item];

    this.selectedItem.set(null);

    this.availableItemChange.emit(newAvailable);
    this.selectedItemChange.emit(newSelected);
  }

  moveAllToSelected(): void {
    if (this.readOnly()) return;
    if (!this.availableItems().length) return;

    const newSelected = [
      ...this.selectedItems(),
      ...this.availableItems(),
    ];

    this.selectedItem.set(null);

    this.availableItemChange.emit([]);
    this.selectedItemChange.emit(newSelected);
  }

  moveAllToAvailable(): void {
    if (this.readOnly()) return;
    if (!this.selectedItems().length) return;

    const newAvailable = [
      ...this.availableItems(),
      ...this.selectedItems(),
    ];

    this.selectedItem.set(null);

    this.availableItemChange.emit(newAvailable);
    this.selectedItemChange.emit([]);
  }


  /* ===============================
   * INITIAL SYNC (optional helper)
   * =============================== */

  removeSelectedFromAvailable(): void {
    const selectedIds = new Set(
      this.selectedItems().map(i => i.id)
    );

    const newAvailable =
      this.availableItems().filter(i => !selectedIds.has(i.id));

    this.availableItemChange.emit(newAvailable);
  }
}
