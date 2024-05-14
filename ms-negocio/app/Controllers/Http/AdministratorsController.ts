import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrator from 'App/Models/Administrator';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

export default class AdministratorsController {
  public async find({ params }: HttpContextContract) {
    if (params.id) {

      let auxAdministrator: {}[] = [];
      let originalAdministrator: Administrator[] = await Administrator.query();
      
      for (let i = 0; i < originalAdministrator.length; i++) {
        let api_response = await axios.get(`${Env.get('MS_SECURITY')}/users/${originalAdministrator[i].user_id}`);
        let data = {
          "id": originalAdministrator[i].id,
          "user_id": originalAdministrator[i].user_id,
          "name": api_response.data.name,
          "email": api_response.data.email,
          "status": originalAdministrator[i].status,
          "registration_date": originalAdministrator[i].registration_date
        };
        auxAdministrator.push(data);
      }

      return auxAdministrator
    } else {
      return await Administrator.query()
    }

  }

  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const administrator: Administrator = await Administrator.create(body);
    return administrator;
  }

  public async update({ params, request }: HttpContextContract) {
    const administrator: Administrator = await Administrator.findOrFail(params.id);
    const body = request.body();
    administrator.registration_date = body.registration_date
    administrator.status = body.status;
    return administrator.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const administrator: Administrator = await Administrator.findOrFail(params.id);
    response.status(204);
    return administrator.delete();
  }
}
