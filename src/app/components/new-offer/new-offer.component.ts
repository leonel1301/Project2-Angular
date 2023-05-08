import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArtistService } from 'src/app/service/artist.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.scss']
})
export class NewOfferComponent {
  newOfferForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private artistService: ArtistService,
    private snackBar: MatSnackBar,
  ) {
    this.newOfferForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      points: ['', Validators.required],
      businessId: ['', Validators.required],
    });
  }

  onFormSubmit() {
    if (this.newOfferForm.valid) {
      this.artistService.createItem(this.newOfferForm.value).subscribe({
        next: (data) => {
          console.log('New offer created', data);
          this.snackBar.open('Guardado correctamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
          });
          // Redirect or perform another action after successfully creating the new offer
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
    }
  }
}