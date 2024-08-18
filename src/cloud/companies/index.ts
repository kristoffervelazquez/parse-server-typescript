import CRUDService from "../utils/CRUDService";
import { ClassNames } from '../../schema/index';

export class Companies {
    constructor() {
        Companies.CloudFunctions();
        Companies.Triggers();
    }


    static async CloudFunctions(): Promise<void> {
        Parse.Cloud.define('createCompany', async req => {
            const { name, phone } = req.params;
            const user = req.user;

            const body = {
                name,
                phone,
                owner: user,
            };

            return await CRUDService.createObject(ClassNames.COMPANY, body)
        });

        Parse.Cloud.define('updateCompany', async req => {
            const user = req.user;

            return await CRUDService.updateObject(ClassNames.COMPANY, req.params.objectId, req.params)
        })

        Parse.Cloud.define('deleteCompany', async req => {
            return await CRUDService.deleteObject(ClassNames.COMPANY, req.params.objectId)
        })

        Parse.Cloud.define('getCompanies', async req => {
            return await CRUDService.queryObject({
                className: ClassNames.COMPANY,
                params: req.params,
            })
        })


        Parse.Cloud.define('asyncFunction', async req => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return 'Hi async';
        });

        Parse.Cloud.define('Test', () => {
            throw new Parse.Error(1, 'Saving test objects is not available.');
        });

    }

    static async Triggers() {
        Parse.Cloud.afterSave('Company', async req => {
            const { object, user, } = req;
            console.log(req);
            // user.set('company', object);
            console.log('Company saved', object);
        });
    }

    static async Webhooks() {

    }
}
