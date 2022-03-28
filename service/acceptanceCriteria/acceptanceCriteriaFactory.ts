import {CriteriaEnum, CsvData} from "../../data/common";
import {ExtendTimeCriteria} from "./extendTimeCriteria";
import {AcceptanceCriteriaInterface} from "./acceptanceCriteria.interface";
import {RenewContractForSecondYearCriteria} from "./renewContractForSecondYearCriteria";
import {RemovePilotCriteria} from "./removePilotCriteria";

export class AcceptanceCriteriaFactory {
    private convertData(data: CsvData[], companyNames: string[]): CsvData[] {
        return data
            .filter( org => companyNames.includes(org.Company))
            .reduce((acc: CsvData[], el) => {
                const existed = acc.find(org => el.Company === org.Company)
                if(!existed) {
                    return acc.concat(el)
                }
                return acc
            }, [])
    }

    getAcceptanceCriteria(data: CsvData[], criteria: CriteriaEnum): AcceptanceCriteriaInterface {
        switch (criteria) {
            case CriteriaEnum.extendTime:
                const csvData = this.convertData(data, ['Hafnia', 'Luxembourg Stock Exchange', 'Hong Kong Rugby Union', 'CAMARA DE COMERCIO DE SANTIAGO'])
                return new ExtendTimeCriteria(csvData)
            case CriteriaEnum.renewForSecondYear:
                const csvData2 = this.convertData(data, ['IQE plc', 'Woodbois Limited', 'Cacao Oro'])
                return new RenewContractForSecondYearCriteria(csvData2)
            case CriteriaEnum.removePilotCustomer:
                const csvData3 = this.convertData(data, ['N1 Singer', 'Xoomworks Ltd', 'GRI', 'Elevate Limited', 'Earth First Food Ventures'])
                return new RemovePilotCriteria(csvData3)
        }
    }
}
