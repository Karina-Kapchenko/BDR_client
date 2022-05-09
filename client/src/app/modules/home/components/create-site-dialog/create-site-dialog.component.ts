import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-create-site-dialog',
  templateUrl: './create-site-dialog.component.html',
  styleUrls: ['./create-site-dialog.component.scss'],
})
export class CreateSiteDialogComponent implements OnInit {
  public addWebsiteFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateSiteDialogComponent>,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {}

  addNewWebsite() {
    if (this.addWebsiteFormGroup.invalid) {
      return;
    }

    const websiteFormData = this.addWebsiteFormGroup.getRawValue();
    this.apiService
      .createWebsiteForQuestions(websiteFormData)
      .subscribe((res: any) => {
        if (res) {
          this.dialogRef.close({...websiteFormData, id: res.id})
        }
      });
  }
}
