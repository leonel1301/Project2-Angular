import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArtistService } from 'src/app/service/artist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss']
})
export class EditOfferComponent {
  editOfferForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private artistService: ArtistService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  )
  {
    this.editOfferForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      points: ['', Validators.required],
      businessId: ['', Validators.required],
    });
  }

  loadOffer(id: number) {
    this.artistService.getItem(id.toString()).subscribe((data: any) => {
      this.editOfferForm.patchValue({
        title: data.title,
        description: data.description,
        points: data.points,
        businessId: data.businessId,
      });
    });
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        tap((params) => {
          const offerId = Number(params.get('id'));
          this.loadOffer(offerId);
        })
      )
      .subscribe();
  }
  
  onFormSubmit() {
    if (this.editOfferForm.valid) {
      const offerId = Number(this.route.snapshot.paramMap.get('id'));
      this.artistService.updateItem(offerId, this.editOfferForm.value).subscribe({
        next: (data) => {
          console.log('Offer updated', data);
          this.snackBar.open('Actualizado correctamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.router.navigate(['/admin/offers']); // Navegar de vuelta a la lista de ofertas
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
    }
  }
  
}