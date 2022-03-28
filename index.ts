import {AcceptanceCriteriaFactory, IoService} from "./service";
import {CriteriaEnum} from "./data/common";

// run main
(async () => {
    const ioService = new IoService();
    const factory = new AcceptanceCriteriaFactory();

    // input
    const data = await ioService.readData();

    // criteria 1
    const firstCriteriaData = factory.getAcceptanceCriteria(data, CriteriaEnum.renewForSecondYear).buildQuery()
    // criteria 2
    const secondCriteriaData = factory.getAcceptanceCriteria(data, CriteriaEnum.extendTime).buildQuery()

    // criteria 3
    const thirdCriteriaData = factory.getAcceptanceCriteria(data, CriteriaEnum.removePilotCustomer).buildQuery()
    // output
    await ioService.writeData(`${firstCriteriaData}\n\n\n${secondCriteriaData}\n\n\n${thirdCriteriaData}`)
})()

