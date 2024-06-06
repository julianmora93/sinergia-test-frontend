import { AlertSnackbarTypeEnumEntity } from "../../3.transversal/3.0.entity/alert.snackbar.entity";
import { BreedCompositeDto, BreedDetailDto, BreedDto } from "../../3.transversal/3.5.dto/breed.dto";

export interface ContractNetworkingCats {
    getAllOutput?: ContractNetworkingCatsOutput;
    getAll(): void;

    getByIdOutput?: ContractNetworkingCatsByIdOutput;
    getById(id: string): void;

    getByParameterOutput?: ContractNetworkingCatsByParameterOutput;
    getByParameter(paameter: string): void;
}

export interface ContractNetworkingCatsOutput {
    getAllSuccessful(data: BreedDto[]): void;
    getAllFailure(message: string, type: AlertSnackbarTypeEnumEntity): void;
}

export interface ContractNetworkingCatsByIdOutput {
    getByIdSuccessful(data: BreedCompositeDto): void;
    getByIdFailure(message: string, type: AlertSnackbarTypeEnumEntity): void;
}

export interface ContractNetworkingCatsByParameterOutput {
    getByParameterSuccessful(data: BreedDetailDto[]): void;
    getByParameterFailure(message: string, type: AlertSnackbarTypeEnumEntity): void;
}