import { User } from '../entity/User';
import { Request, Response } from 'express'

const Google = async(req: Request, res: Response) =>
{
    res
    req
    console.log("asdasd")
}

const Kakao = async(req: Request, res: Response) =>
{
    console.log("asdasd")
}

export {
    Google,
    Kakao
}
