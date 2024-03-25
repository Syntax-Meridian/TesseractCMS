import Ajv from 'ajv'
import { NextFunction, Request, Response } from 'express'
const ajv = new Ajv()

const createPageValidate = function(req: Request, res: Response, next: NextFunction) {
    // req validation
    const schema = {
        type: "object",
        properties: {
            slug: { type: "string", minLength: 3 },
            layoutType: { type: "string", minLength: 3 },
            contentData: {
                type: "object",
                properties: {
                    leftData: { type: "string" },
                    rightData: { type: "string" }
                }
            }
        },
        required: ["slug", "layoutType", "contentData"],
    }

    const validate = ajv.compile(schema)
    const valid = validate(req.body)

    if (!valid) {
        res.status(422)
        const error =  Error(validate.errors?.map(e => e.message)[0])
        next(error)
    }

    next()
}

export { createPageValidate }
