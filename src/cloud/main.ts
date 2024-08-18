import { Request, Response, Application, raw } from "express";
import { Companies } from "./companies";
import { applyBeforeFind } from "./guards";

export class Cloud {
    static async init(): Promise<void> {
        Parse.Cloud.define("threadTest", () => {
            return "test";
        });
        // add more cloud functions here
        new Companies();
    }
}

export class Webhooks {
    static async init(app: Application): Promise<void> {
        app.post("/webhooks/test", raw({ type: "application/json" }), (request: Request, response: Response) => {
            response.status(200).json({});
        });
    }
}

export class Jobs {
    static async init(): Promise<void> {
        Parse.Cloud.job("test", async () => {
            return;
        });
    }
}

export class Guards {
    classNames: string[];

    constructor(classNames: string[]) {
        this.classNames = classNames;
        this.beforeFind()
    }

    private beforeFind() {
        // this.classNames.forEach(applyBeforeFind)
    }

}