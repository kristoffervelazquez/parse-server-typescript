import { ClassNames } from '../../schema/index';

interface IQuery {
    className: string;
    params: any;
    limit?: number;
    skip?: number;
    select?: string[];
    sort?: string;
    include?: string[];
}

class CRUDService {
    static async createObject(className: ClassNames, params: any) {
        try {
            const Obj = Parse.Object.extend(className)
            const obj = new Obj(params);
            const savedObj = await obj.save();

            return { message: "Object created successfully", data: savedObj };
        } catch (error) {
            console.log("error", error);
            return new Parse.Error(error.code, error.message);
        }
    }

    static async updateObject(className: ClassNames, objectId: string, params: any) {
        try {
            const Obj = Parse.Object.extend(className);
            const obj = new Obj();
            const updatedObj = await obj.save({ ...params, objectId });

            return { message: "Object updated successfully", data: updatedObj };

        } catch (error) {
            console.log("error", error);
            return new Parse.Error(error.code, error.message);
        }
    }

    static async deleteObject(className: ClassNames, objectId: string) {
        try {
            const Obj = Parse.Object.extend(className);
            const obj = new Obj({ objectId });
            await obj.destroy();

            return { message: `Object with objectId: ${objectId} deleted successfully` };
        } catch (error) {
            console.log("error", error);
            return new Parse.Error(error.code, error.message);
        }
    }

    static async queryObject(query: IQuery) {
        try {
            const { className, params, limit, skip, select, sort, include } = query;
            const Obj = Parse.Object.extend(className);
            const queryObj = new Parse.Query(Obj);

            if (limit) queryObj.limit(limit);
            if (skip) queryObj.skip(skip);
            if (select) queryObj.select(select);
            if (sort) queryObj.ascending(sort);
            if (include) queryObj.include(include);

            const objects = await queryObj.find();

            return { message: "Objects fetched successfully", data: objects };
        } catch (error) {
            console.log("error", error);
            return new Parse.Error(error.code, error.message);
        }
    }


}


export default CRUDService;