import { Request, Response} from 'express'
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository'
import { SurveysRepository } from '../repositories/SurveysRepository'
import { SurveysUserRepository } from '../repositories/SurveysUserRepository';
import SendMailService from '../services/SendMailService';

class SendMailController{
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveysUserRepository = getCustomRepository(SurveysUserRepository)

        const userAlreadyExists = await usersRepository.findOne({ email })

        if(!userAlreadyExists){
            return response.status(400).json({
                error:'User does not exists',
            })
        }

        const survey = await surveysRepository.findOne({ id: survey_id })

        if(!survey) {
            return response.status(400).json({
                error:'Survey does not exists',
            })
        }

        const surveyUser = surveysUserRepository.create({
           user_id:  userAlreadyExists.id,
           survey_id
        })
        await surveysUserRepository.save(surveyUser);

        await SendMailService.execute(email,survey.title, survey.description)

        return response.json(surveyUser)
    }
}

export { SendMailController }