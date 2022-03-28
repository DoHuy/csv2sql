import {AcceptanceCriteriaInterface} from "./acceptanceCriteria.interface";
import { CsvData } from "../../data/common";
import { addYears } from "date-fns/fp";
import { uuid } from 'uuidv4';

export class RenewContractForSecondYearCriteria implements AcceptanceCriteriaInterface{
    private readonly orgs: CsvData[]
    constructor(orgs: CsvData[]) {
        this.orgs = orgs
    }
    buildQuery(): string {
        return this.orgs.reduce((acc: string, org) => {
            const priceMappingId = uuid()
            const billId = uuid()
            let queryInsertToBill = `INSERT INTO public.bill ("id", "totalPrice", "state", "subscriptionId", "organizationId", "paymentType", "dueDate", "action", "numberOfExtraSeats")\n`
            let queryInsertToPriceMapping = `INSERT INTO public.price_mapping ("id", "numberOfSeats", "price", "discount")\n`
            let queryUpdateToSubs = `UPDATE public.subscription \n`
            let queryInsertToPaymentMetaData = `INSERT INTO public.organization_payment_metadata ("firstName", "lastName", "email", "country", "seat", "billingPlan", "paymentType", "userId")\n`
            if(org.Company === 'IQE plc') {
                queryInsertToBill += `VALUES('${billId}', 3136, 'paid', '${org.SubscriptionId}', '${org.OrganizationId}', 'offline', date '2022-04-22' + INTERVAL '1 YEAR', 'Subscription Renewal', 3); \n`
                queryInsertToPriceMapping += `VALUES('${priceMappingId}', 3, 3136, 0.00); \n`
                queryUpdateToSubs += `SET "startDate"='2022-04-22', "endDate"=date '2022-04-22' + INTERVAL '1 YEAR', "priceMappingId"='${priceMappingId}'
                                        WHERE id=(SELECT public.organization."subscriptionId" FROM public.organization WHERE id = '${org.OrganizationId}');\n`
                queryInsertToPaymentMetaData += `VALUES('${org.BillContactFirstName}', '${org.BillContactLastName}', '${org.BillContactEmail}', '${org.BillContactCountry}', 3, 'Annually', 'offline', '10b8d9a0-9c78-4125-ada2-f79946133923'); \n`
            }
            if(org.Company === 'Woodbois Limited') {
                queryInsertToBill += `VALUES('${billId}', 3136, 'paid', '${org.SubscriptionId}', '${org.OrganizationId}', 'offline', date '2022-04-22' + INTERVAL '1 YEAR', 'Subscription Renewal', 4); \n`
                queryInsertToPriceMapping += `VALUES('${priceMappingId}', 4, 3136, 0.00); \n`
                queryUpdateToSubs += `SET "startDate"='2022-04-22', "endDate"=date date '2022-04-22' + INTERVAL '1 YEAR', "priceMappingId"='${priceMappingId}'
                                        WHERE id=(SELECT public.organization."subscriptionId" FROM public.organization WHERE id = '${org.OrganizationId}');\n`
                queryInsertToPaymentMetaData += `VALUES('${org.BillContactFirstName}', '${org.BillContactLastName}', '${org.BillContactEmail}', '${org.BillContactCountry}', 4, 'Annually', 'offline', '10b8d9a0-9c78-4125-ada2-f79946133923'); \n`
            }
            if(org.Company === 'Cacao Oro') {
                queryInsertToBill += `VALUES('${billId}', 1188, 'paid', '${org.SubscriptionId}', '${org.OrganizationId}', 'offline', date '2022-04-22' + INTERVAL '1 YEAR', 'Subscription Renewal', 1); \n`
                queryInsertToPriceMapping += `VALUES('${priceMappingId}', 1, 1188, 0.00); \n`
                queryUpdateToSubs += `SET "startDate"='2022-04-22', "endDate"=date '2022-04-22' + INTERVAL '1 YEAR', "priceMappingId"='${priceMappingId}'
                                        WHERE id = (SELECT public.organization."subscriptionId" FROM public.organization WHERE id = '${org.OrganizationId}');\n`
                queryInsertToPaymentMetaData += `VALUES('${org.BillContactFirstName}', '${org.BillContactLastName}', '${org.BillContactEmail}', '${org.BillContactCountry}', 1, 'Annually', 'offline', '10b8d9a0-9c78-4125-ada2-f79946133923'); \n`
            }
            return acc.concat(`${queryInsertToBill}\n${queryInsertToPriceMapping}\n${queryUpdateToSubs}\n${queryInsertToPaymentMetaData}\n`)
        }, '')
    }
}
