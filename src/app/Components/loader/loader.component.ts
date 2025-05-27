import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoaderService } from 'src/app/Services/loader-service/loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  constructor(public loaderService: LoaderService) { }
}
