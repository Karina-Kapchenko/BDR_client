import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateSiteDialogComponent } from '../create-site-dialog/create-site-dialog.component';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.openCreateDialog();
  }

  openCreateDialog() {
    this.dialog.open(CreateSiteDialogComponent, {
      width: '100rem'
    })
  }
}
