import {AcceptanceCriteriaInterface} from "./acceptanceCriteria.interface";
import {CsvData} from "../../data/common";

export class RemovePilotCriteria implements AcceptanceCriteriaInterface {
    private readonly csvData: CsvData[]
    constructor(csvData: CsvData[]) {
        this.csvData = csvData
    }
    buildQuery(): string {
        return this.csvData.reduce((acc: string, org: CsvData) => {
            const queryUpdateToUser = `UPDATE public."user" SET "status" = 'locked' WHERE public."user"."id" IN (SELECT public.organization_user."userId" FROM public.organization_user WHERE public.organization_user."organizationId" = '${org.OrganizationId}');\n`
            const queryUpdateToOrganization = `UPDATE public."organization" SET "status" = 'inactive' WHERE public."organization"."id" = '${org.OrganizationId}';\n`
            const queryUpdateToSubscription = `UPDATE public."subscription" SET "status" = 'cancelled' WHERE public."subscription"."id" = '${org.SubscriptionId}';\n`
            return acc.concat(`${queryUpdateToUser}\n${queryUpdateToOrganization}\n${queryUpdateToSubscription}\n`)
        }, '');
    }

}
