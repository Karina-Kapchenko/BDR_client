import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/modules/core/services/api.service';
import { CreateSiteDialogComponent } from '../create-site-dialog/create-site-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {

  constructor(public dialog: MatDialog, private apiService: ApiService, private router: Router) { }
  
  public websites: any = []

  ngOnInit(): void {
    // this.openCreateDialog();
    this.getAllWebsites();
  }

  getAllWebsites() {
    this.apiService.getAllWebsites().subscribe((allWebsitesRes: any) => {
      console.log(allWebsitesRes);
      this.websites = allWebsitesRes.map((website: any) => {
        return {...website, average: website.average ? (+website.average).toFixed(1) : 0}
      })
    })
  }

  openCreateDialog() {
    const createWebsiteDialog = this.dialog.open(CreateSiteDialogComponent, {
      width: '100rem'
    })

    createWebsiteDialog.afterClosed().subscribe(createdElement => {
      if(createdElement) {
        this.websites.push({...createdElement, average: 0})
      }
    })
  }

  openWebsite(website: any) {
    this.router.navigate([`/home/websites/${website.id}`])
  }
}
