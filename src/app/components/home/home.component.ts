import { Component, OnInit } from '@angular/core';
import { ArtistService } from 'src/app/service/artist.service';
import { Artist } from 'src/app/models/artist.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  offersCount: number = 0;

  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
    this.getOffersCount();
  }

  getOffersCount() {
    this.artistService.getList().subscribe((data: Artist[] | any) => {
      if (Array.isArray(data)) {
        this.offersCount = data.length;
      }
    });
  }
}