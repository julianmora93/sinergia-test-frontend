import { CUSTOM_ELEMENTS_SCHEMA, Component, WritableSignal, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertSnackbarComponent } from '../../1.0.component/alert.snackbar.component/alert.snackbar.component';
import { UtilDefaultAlertSnackbarDuration } from '../../../3.transversal/3.1.util/util.constant';
import { AlertSnackbarTypeEnumEntity } from '../../../3.transversal/3.0.entity/alert.snackbar.entity';
import { ContractNetworkingCatsByIdOutput, ContractNetworkingCatsByParameterOutput, ContractNetworkingCatsOutput } from '../../../2.repository/2.1.contract/contract.networking.cats';
import { NetworkingGql } from '../../../2.repository/2.3.networking/networking.gql';
import { BreedCompositeDto, BreedDetailDto, BreedDto } from '../../../3.transversal/3.5.dto/breed.dto';

@Component({
    selector: 'cats-popup',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatTooltipModule,
        MatIconModule,
        MatSelectModule,
        MatNativeDateModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
        AlertSnackbarComponent,
        MatProgressBarModule
    ],
    templateUrl: './cats.popup.html',
    styleUrl: './cats.popup.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class CatsPopup implements ContractNetworkingCatsByParameterOutput {

    showProgressBar: WritableSignal<boolean> = signal(false);
    breedDetail: BreedDetailDto[] = [];

    private _dialogRef: MatDialogRef<CatsPopup> = inject(MatDialogRef<CatsPopup>);
    private _formBuilder: FormBuilder = inject(FormBuilder);
    private _snackBar: MatSnackBar = inject(MatSnackBar);
    private _networkingGql: NetworkingGql = inject(NetworkingGql);

    form: FormGroup = this._formBuilder.group({
        filter: new FormControl('', Validators.required)
    });

    constructor(){
        this._networkingGql.getByParameterOutput = this;
    }

    closeDialog = (status: boolean): void => this._dialogRef.close(status);

    onFilter(){
        this.form.markAllAsTouched();
        if(this.form.valid){
            this.showProgressBar.set(true);
            this._networkingGql.getByParameter(this.form.value.filter);
        }
    }

    getByParameterSuccessful(data: BreedDetailDto[]): void {
        this.showProgressBar.set(false);
        this.breedDetail = data;
        console.log('DATA => ', data);
    }

    getByParameterFailure(message: string, type: AlertSnackbarTypeEnumEntity): void {
        this.showProgressBar.set(false);
    }

}