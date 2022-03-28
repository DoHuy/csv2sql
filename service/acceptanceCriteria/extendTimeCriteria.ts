import {AcceptanceCriteriaInterface} from "./acceptanceCriteria.interface";
import {CsvData} from "../../data/common";

export class ExtendTimeCriteria implements AcceptanceCriteriaInterface{
    private readonly csvData: CsvData[]
    constructor(csvData: CsvData[]) {
        this.csvData = csvData
    }
    buildQuery(): string {
        return this.csvData.reduce((acc: string, org: CsvData) => {
            let queryUpdateToSubs = `UPDATE public.subscription \n`
            let queryUpdateToBill = `UPDATE public.bill \n`
            let queryUpdateToPriceMaping = `UPDATE public.price_mapping \n`
            if(org.Company === 'Hafnia') {
                queryUpdateToSubs += `SET "endDate"=date '2022-04-22' + INTERVAL '6 MONTHS'
                                        WHERE id=(SELECT public.organization."subscriptionId" FROM public.organization WHERE id = '${org.OrganizationId}');\n`
                queryUpdateToBill += `SET "dueDate"=date '2022-04-22' + INTERVAL '6 MONTHS'
                                     WHERE public.bill."id"=(select public.bill."id" from public.bill where public.bill."organizationId"='${org.OrganizationId}' AND public.bill."action" = 'Create Subscription' AND public.bill."paymentType" = 'offline' order by "dueDate" desc limit 1);\n`
            }
            if(org.Company === 'Luxembourg Stock Exchange') {
                queryUpdateToSubs += `SET "endDate"=date '2022-04-22' + INTERVAL '3 MONTHS'
                                        WHERE id=(SELECT public.organization."subscriptionId" FROM public.organization WHERE id = '${org.OrganizationId}');\n`
                queryUpdateToBill += `SET "dueDate"=date '2022-04-22' + INTERVAL '3 MONTHS'
                                     WHERE public.bill."id"=(select public.bill."id" from public.bill where public.bill."organizationId"='${org.OrganizationId}' AND public.bill."action" = 'Create Subscription' AND public.bill."paymentType" = 'offline' order by "dueDate" desc limit 1);\n`
            }
            if(org.Company === 'Hong Kong Rugby Union') {
                queryUpdateToSubs += `SET "endDate"=date '2022-04-22' + INTERVAL '6 MONTHS'
                                        WHERE id=(SELECT public.organization."subscriptionId" FROM public.organization WHERE id = '${org.OrganizationId}');\n`
                queryUpdateToBill += `SET "dueDate"=date '2022-04-22' + INTERVAL '6 MONTHS'
                                     WHERE public.bill."id"=(select public.bill."id" from public.bill where public.bill."organizationId"='${org.OrganizationId}' AND public.bill."action" = 'Create Subscription' AND public.bill."paymentType" = 'offline' order by "dueDate" desc limit 1);\n`
                queryUpdateToPriceMaping += `SET "numberOfSeats"=7 WHERE id=(select public.subscription."priceMappingId" from public.subscription where public.subscription."id"='${org.SubscriptionId}');\n`
                queryUpdateToBill += queryUpdateToPriceMaping
            }
            if(org.Company === 'CAMARA DE COMERCIO DE SANTIAGO') {
                queryUpdateToSubs += `SET "endDate"=date '2022-04-22' + INTERVAL '3 MONTHS'
                                        WHERE id=(SELECT public.organization."subscriptionId" FROM public.organization WHERE id = '${org.OrganizationId}');\n`
                queryUpdateToBill += `SET "dueDate"=date '2022-04-22' + INTERVAL '3 MONTHS'
                                     WHERE public.bill."id"=(select public.bill."id" from public.bill where public.bill."organizationId"='${org.OrganizationId}' AND public.bill."action" = 'Create Subscription' AND public.bill."paymentType" = 'offline' order by "dueDate" desc limit 1);\n`
                queryUpdateToPriceMaping += `SET "numberOfSeats"=4 WHERE id=(select public.subscription."priceMappingId" from public.subscription where public.subscription."id"='${org.SubscriptionId}');\n`
                queryUpdateToBill += queryUpdateToPriceMaping
            }
            return acc.concat(`${queryUpdateToSubs}\n${queryUpdateToBill}\n`)
        }, '');
    }

}
