export interface Bill {
    subscriptionId: string
}

export const DATA_COLUMN_HEADERS = ['OrganizationId', 'UserId', 'Company', 'SubscriptionId', 'NumberOfSeats', 'billStatus', 'BillContactFirstName', 'BillContactLastName', 'BillContactEmail', 'BillContactCountry', 'BillContactAddressLineOne', 'BillContactAddressLineTwo', 'BillContactCity', 'BillContactZipOrPostalCode']

export type CsvData = {
    OrganizationId: string,
    UserId: string,
    SubscriptionId: string,
    Company: string,
    NumberOfSeats: string,
    BillStatus: string,
    BillContactFirstName: string,
    BillContactLastName: string,
    BillContactEmail: string,
    BillContactCountry: string,
    BillContactAddressLineOne: string,
    BillContactAddressLineTwo: string,
    BillContactCity: string,
    BillContactZipOrPostalCode: string,
}

export enum CriteriaEnum {
    extendTime = 'extendTime',
    renewForSecondYear = 'renewForSecondYear',
    removePilotCustomer = 'removePilotCustomer'
}

