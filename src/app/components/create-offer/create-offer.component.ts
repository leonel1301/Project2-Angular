import { DialogRef } from '@angular/cdk/dialog';
import { Component, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArtistService } from 'src/app/service/artist.service';
import { Artist } from 'src/app/models/artist.model';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent {
  createForm: FormGroup;

  offerId: number | undefined = undefined;
  constructor(
    private fb: FormBuilder,
    private artistService: ArtistService,
    private dialogRef: DialogRef<CreateOfferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { artist?: Artist }
  ) {
    console.log(data.artist);
    if (data?.artist) {
      this.offerId = data.artist.id.toString();
      this.createForm = this.fb.group({
        title: [data.artist.title, Validators.required],
        description: [data.artist.description, Validators.required], // Cambiado de 'rating' a 'description'
        rating: [data.artist.points, Validators.required], // Cambiado de 'year' a 'rating'
        businessId: [data.artist.businessId, Validators.required], // Cambiado de 'image' a 'businessId'
      });
    } else {
      this.createForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required], // Cambiado de 'rating' a 'description'
        rating: ['', Validators.required], // Cambiado de 'year' a 'rating'
        businessId: ['', Validators.required], // Cambiado de 'image' a 'businessId'
      });
    }
  }

  onFormSubmit() {
    if (this.createForm.valid) {
      if (this.offerId == undefined) {
        this.artistService.createItem(this.createForm.value).subscribe({
          next: (data) => {
            console.log('artist created', data);
            this.dialogRef.close();
          },
          error: (error) => {
            console.error('There was an error!', error);
          },
        });
      } else {
        
        this.artistService
          .updateItem(this.offerId, this.createForm.value)
          .subscribe({
            next: (data) => {
              console.log('artist Updated', data);
              this.dialogRef.close();
            },
            error: (error) => {
              console.error('There was an error!', error);
            },
          });
      }
    }
  }
}