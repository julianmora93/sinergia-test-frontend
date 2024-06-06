import { NgModule } from "@angular/core";
import { ApiEndpoint } from "../../2.repository/2.0.common/api.endpoint";
import { LocalAuth } from "../../2.repository/2.2.local/local.auth";
import { NetworkingAccount } from "../../2.repository/2.3.networking/networking.account";
import { NetworkingBase } from "../../2.repository/2.0.common/networking.base";
import { NetworkingGql } from "../../2.repository/2.3.networking/networking.gql";

@NgModule({
    providers: [
        ApiEndpoint,
        LocalAuth,
        NetworkingBase,
        
        NetworkingAccount,
        NetworkingGql
    ]
})
export class AppProviderRepository { }