import { CUSTOM_ELEMENTS_SCHEMA, Component, WritableSignal, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { RootPage } from '../root.page/root.page';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertSnackbarComponent } from '../../1.0.component/alert.snackbar.component/alert.snackbar.component';
import { UtilDefaultAlertSnackbarDuration } from '../../../3.transversal/3.1.util/util.constant';
import { AlertSnackbarTypeEnumEntity } from '../../../3.transversal/3.0.entity/alert.snackbar.entity';
import { ContractNetworkingCatsByIdOutput, ContractNetworkingCatsOutput } from '../../../2.repository/2.1.contract/contract.networking.cats';
import { NetworkingGql } from '../../../2.repository/2.3.networking/networking.gql';
import { BreedCompositeDto, BreedDto } from '../../../3.transversal/3.5.dto/breed.dto';
import CatsPopup from '../../1.0.component/cats.popup/cats.popup';

@Component({
    selector: 'cats-page',
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
    templateUrl: './cats.page.html',
    styleUrl: './cats.page.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class CatsPage implements ContractNetworkingCatsOutput, ContractNetworkingCatsByIdOutput {

    showProgressBar: WritableSignal<boolean> = signal(false);
    responseText: WritableSignal<string> = signal('Holis');
    breedDetail: WritableSignal<BreedCompositeDto | null> = signal(null);
    breedList: BreedDto[] = [];

    private _rootPage: RootPage = inject(RootPage);
    private _formBuilder: FormBuilder = inject(FormBuilder);
    private _dialog: MatDialog = inject(MatDialog);
    private _snackBar: MatSnackBar = inject(MatSnackBar);
    private _networkingGql: NetworkingGql = inject(NetworkingGql);

    form: FormGroup = this._formBuilder.group({
        breed: new FormControl('', Validators.required)
    });

    constructor(){
        this._networkingGql.getAllOutput = this;
        this._networkingGql.getByIdOutput = this;
        this._rootPage.rootTitle = 'Gatos';
        this._rootPage.setMenuById(2);
        
        this.showProgressBar.set(true);
        this._networkingGql.getAll();
    }

    onExecute(){
        this.form.markAllAsTouched();
        if(this.form.valid){
            this.showProgressBar.set(true);
            this._networkingGql.getById(this.form.value.breed);
        }
    }

    openDialog(){
        this._dialog.open(CatsPopup);
    }

    getAllSuccessful(data: BreedDto[]): void {
        this.showProgressBar.set(false);
        this.breedList = data;
    }
    
    getAllFailure(message: string, type: AlertSnackbarTypeEnumEntity): void {
        this.showProgressBar.set(false);
        this._snackBar.openFromComponent(AlertSnackbarComponent, {
            duration: UtilDefaultAlertSnackbarDuration,
            data: {
                buttonText: 'OK',
                dialogType: type,
                informationText: message
            }
        });
    }

    getByIdSuccessful(data: BreedCompositeDto): void {
        this.showProgressBar.set(false);
        this.breedDetail.set(data);
    }

    getByIdFailure(message: string, type: AlertSnackbarTypeEnumEntity): void {
        this.showProgressBar.set(false);
        this._snackBar.openFromComponent(AlertSnackbarComponent, {
            duration: UtilDefaultAlertSnackbarDuration,
            data: {
                buttonText: 'OK',
                dialogType: type,
                informationText: message
            }
        });
    }

}