import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { colorsDomain } from '../data/color.domain';
import { User } from '../interfaces/user';
import { UserPreferenceService } from '../services/user-preference.service';

@Component({
  selector: 'app-user-preference-detail',
  templateUrl: './user-preference-detail.component.html',
  styleUrls: ['./user-preference-detail.component.scss']
})

export class UserPreferenceDetailComponent {
  userPreference: Partial<User> = {};
  form = new FormGroup({
    firstName: new FormControl<string | undefined>(undefined, [Validators.required, Validators.min(2)]),
    lastName: new FormControl<string | undefined>(undefined, [Validators.required, Validators.min(2)]),
    age: new FormControl<number | undefined>(undefined, [Validators.required, Validators.min(1), Validators.max(150)]),
    colorName: new FormControl<string | undefined>(undefined, [Validators.required]),
  });
  colorsDomain = colorsDomain;
  constructor(
    private userPreferenceService: UserPreferenceService,
    public dialogRef: MatDialogRef<User, boolean>,
    @Inject(MAT_DIALOG_DATA) userPreference: User
  ) {
    this.setUserPreference(userPreference);
  }

  get colorName(): string {
    return (this.form.get('colorName') as FormControl).value;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.userPreference = Object.assign(this.userPreference, this.form.value);

    if (!this.userPreference!.id) {
      this.userPreferenceService.add(this.userPreference as User)
        .subscribe(() => this.close(true));

    } else {
      this.userPreferenceService.update(this.userPreference as User)
        .subscribe(() => this.close(true));
    }
  }

  cancel(): void {
    this.close();
  }

  private setUserPreference(userPreference: User): void {
    this.userPreference = Object.assign({}, userPreference);;
    this.form.patchValue(this.userPreference);
  }

  private close(saved: true | undefined = undefined): void {
    this.dialogRef.close(saved);
  }
}
