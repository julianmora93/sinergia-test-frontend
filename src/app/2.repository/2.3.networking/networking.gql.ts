import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { ContractNetworkingCats, ContractNetworkingCatsByIdOutput, ContractNetworkingCatsByParameterOutput, ContractNetworkingCatsOutput } from "../2.1.contract/contract.networking.cats";
import { AlertSnackbarTypeEnumEntity } from "../../3.transversal/3.0.entity/alert.snackbar.entity";
import { UtilMessages } from "../../3.transversal/3.1.util/util.labels";
import { BreedCompositeDto, BreedDetailDto, BreedDto } from "../../3.transversal/3.5.dto/breed.dto";

@Injectable({
    providedIn: 'root'
})
export class NetworkingGql implements ContractNetworkingCats {

    getAllOutput?: ContractNetworkingCatsOutput | undefined;
    getByIdOutput?: ContractNetworkingCatsByIdOutput | undefined;
    getByParameterOutput?: ContractNetworkingCatsByParameterOutput | undefined;

    constructor(private apollo: Apollo){ }

    getByParameter(paameter: string): void {
        const queryText = gql`
        query Search($q: String!) {
            search(q: $q) {
                id
                name
                temperament
                origin
                description
                energy_level
                intelligence
                social_needs
                hairless
                life_span
            }
        }`;
        this.apollo.watchQuery<BreedDetailDto[]>({ query: queryText, variables: { q: paameter}, errorPolicy: 'all' }).valueChanges.subscribe({
            next:(response: any) => {
                if((response.networkStatus === 8 && response.hasOwnProperty("errors")) || (response.networkStatus === 7 && response.data.search === null)){
                    if(response.networkStatus === 8 && response.hasOwnProperty("errors")){
                        this.getByParameterOutput?.getByParameterFailure(response.errors[0].message, AlertSnackbarTypeEnumEntity.ERROR);
                    }else{
                        this.getByParameterOutput?.getByParameterFailure(UtilMessages.webServiceError, AlertSnackbarTypeEnumEntity.ERROR);
                    }
                }else{
                    this.getByParameterOutput?.getByParameterSuccessful(response.data.search);
                }
            }
        });
    }
    
    getById(id: string): void {
        const queryText = gql`
            query GetDetail($breedId: String!) {
                getImageById(id: $breedId) {
                    url
                }
                getById(id: $breedId) {
                    id
                    name
                    temperament
                    origin
                    description
                    energy_level
                    intelligence
                    social_needs
                    hairless
                    life_span
                }
            }`;
        this.apollo.watchQuery<BreedCompositeDto>({ query: queryText, variables: { breedId: id}, errorPolicy: 'all' }).valueChanges.subscribe({
            next:(response: any) => {
                if((response.networkStatus === 8 && response.hasOwnProperty("errors")) || (response.networkStatus === 7 && response.data.getById === null)){
                    if(response.networkStatus === 8 && response.hasOwnProperty("errors")){
                        this.getByIdOutput?.getByIdFailure(response.errors[0].message, AlertSnackbarTypeEnumEntity.ERROR);
                    }else{
                        this.getByIdOutput?.getByIdFailure(UtilMessages.webServiceError, AlertSnackbarTypeEnumEntity.ERROR);
                    }
                }else{
                    this.getByIdOutput?.getByIdSuccessful(response.data);
                }
            }
        });
    }
    
    getAll(): void {
        const queryText = gql`
            {   
                getAll {
                    id
                    name
                }
            }
        `;
        this.apollo.watchQuery<BreedDto[]>({ query: queryText, errorPolicy: 'all' }).valueChanges.subscribe({
            next:(response: any) => {
                if((response.networkStatus === 8 && response.hasOwnProperty("errors")) || (response.networkStatus === 7 && response.data.getAll === null)){
                    if(response.networkStatus === 8 && response.hasOwnProperty("errors")){
                        this.getAllOutput?.getAllFailure(response.errors[0].message, AlertSnackbarTypeEnumEntity.ERROR);
                    }else{
                        this.getAllOutput?.getAllFailure(UtilMessages.webServiceError, AlertSnackbarTypeEnumEntity.ERROR);
                    }
                }else{
                    this.getAllOutput?.getAllSuccessful(response.data.getAll);
                }
            }
        });
    }
    
}