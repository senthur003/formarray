import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      categories: this.fb.array([])  // Outer FormArray
    });
  }

  // Get the outer FormArray (categories)
  get categoriesArray(): FormArray {
    return this.registerForm.get('categories') as FormArray;
  }

  // Get the inner FormArray (items) for a specific category
  getItemsArray(index: number): FormArray {
    return this.categoriesArray.at(index).get('items') as FormArray;
  }

  // Create a new FormGroup for the outer array (category)
  createCategoryFormGroup(): FormGroup {
    return this.fb.group({
      categoryName: [''],
      items: this.fb.array([])  // Inner FormArray
    });
  }

  // Create a new FormGroup for the inner array (item)
  createItemFormGroup(): FormGroup {
    return this.fb.group({
      itemName: [''],
      itemCode: ['']
    });
  }

  // Add a new category to the outer FormArray
  addCategory(): void {
    this.categoriesArray.push(this.createCategoryFormGroup());
  }

  // Add a new item to the inner FormArray for a specific category
  addItem(categoryIndex: number): void {
    const itemsArray = this.getItemsArray(categoryIndex);
    itemsArray.push(this.createItemFormGroup());
  }

  // Remove a category from the outer FormArray
  removeCategory(index: number): void {
    this.categoriesArray.removeAt(index);
  }

  // Remove an item from the inner FormArray for a specific category
  removeItem(categoryIndex: number, itemIndex: number): void {
    const itemsArray = this.getItemsArray(categoryIndex);
    itemsArray.removeAt(itemIndex);
  }

   // view a category in the outer FormArray
  categoriesView(){
    console.log(this.categoriesArray.value);
  }

 // view a item in the inner FormArray
  viewItem(cat:number,item:number){
    console.log(this.getItemsArray(cat).value[item]);
  }

  editItem(categoryIndex: number, itemIndex: number): void {
    const itemsArray = this.getItemsArray(categoryIndex);
    const item = itemsArray.at(itemIndex);

    // Here, for simplicity, we are setting a new value. In real scenarios, this could open a modal or input fields to edit.
    const newValue = prompt('Enter new item name', item.value.itemName);

    if (newValue) {
      // Update the form control value for the specific item
      item.patchValue({
        itemName: newValue
      });
    }
  }

  // Edit a category in the outer FormArray
  editCategory(categoryIndex: number): void {
    const category = this.categoriesArray.at(categoryIndex);

    // Get the current category name and prompt the user for a new value
    const newCategoryName = prompt('Enter new category name', category.value.categoryName);

    if (newCategoryName) {
      // Update the form control value for the category
      category.patchValue({
        categoryName: newCategoryName
      });
    }
  }
}