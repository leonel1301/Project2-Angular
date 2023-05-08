import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArtistService } from 'src/app/service/artist.service';
import { MatDialog } from '@angular/material/dialog';
import { NewOfferComponent } from '../new-offer/new-offer.component';
import { EditOfferComponent } from '../edit-offer/edit-offer.component';  
import { Artist } from 'src/app/models/artist.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.scss']
})
export class ListOffersComponent {
  displayedColumns: string[] = ['id', 'title', 'description', 'points', 'businessId', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort; // no sera nula en tiempo de ejecución

  deleteSuccess: boolean = false;

  constructor(private artistService: ArtistService, private dialog: MatDialog, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getOffers();
  }

  getOffers() {
    this.artistService.getList().subscribe((data: any) => {
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //El código abre un diálogo utilizando MatDialog, y cuando el diálogo se cierra, 
  //se llama al método getOffers() para actualizar la lista de ofertas en la vista principal. 
  //Esto permite refrescar los datos después de que se realicen cambios en el diálogo.
  openDialog() {
    const dialogRef = this.dialog.open(NewOfferComponent, {
      data: {},
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.getOffers();
    });
  }

  /*editOffers(id: number) {
    const offers = this.dataSource.data.find((m: Artist) => m.id === id);
    if (offers) {
      const dialogRef = this.dialog.open(CreateOfferComponent, {
        data: {
          offers: offers,
        },
      });

      dialogRef.afterClosed().subscribe(() => {
        this.getOffers();
      });
    }
  }*/
  /*editOffers(id: number) {
    const artist = this.dataSource.data.find((m: Artist) => m.id === id);
    if (artist) {
      const dialogRef = this.dialog.open(CreateOfferComponent, {
        data: {
          artist: artist,
        },
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.getOffers();
      });
    }
  }*/
  editOffer(offerId: number) {
    this.router.navigate([`/admin/offers/edit/${offerId}`]);
  }

  deleteOffers(id: string) {
    this.artistService.deleteItem(id).subscribe(
      () => {
        this.getOffers();
        this.deleteSuccess = true;
        setTimeout(() => {
          this.deleteSuccess = false;
        }, 3000);
      },
      (error: any) => {
        alert('There was an error!');
        console.error(error);
      }
    );
  }
}