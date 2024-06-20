import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Driver from 'App/Models/Driver';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';
import DriverValidator from 'App/Validators/DriverValidator';

export default class DriversController {
  public async find({ params }: HttpContextContract) {
    if (params.id) {
      let theDriver = await Driver.findOrFail(params.id)
      return theDriver
    } else {
      let auxDriver: {}[] = [];
      let originalDriver: Driver[] = await Driver.query().preload("relocations");
      
      for (let i = 0; i < originalDriver.length; i++) {
        let api_response = await axios.get(`${Env.get('MS_SECURITY')}/users/${originalDriver[i].user_id}`);
        let data = {
          "id_driver": originalDriver[i].id_driver,
          "user_id": originalDriver[i].user_id,
          "name": api_response.data.name,
          "email": api_response.data.email,
          "license": originalDriver[i].license,
          "disponibility": originalDriver[i].disponibility, 
          "years_experience" : originalDriver[i].years_experience,
          "assigned_vehicle:" : originalDriver[i].assigned_vehicle,
          "relocations" : originalDriver[i].relocations
        };
        auxDriver.push(data);
      }

      return auxDriver
      return await Driver.query()
    }

  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(DriverValidator)
    const driver: Driver = await Driver.create(body);
    return driver

    
    }
    public async update({ params, request }: HttpContextContract) {
        const driver: Driver = await Driver.findOrFail(params.id);
        const body = request.body();
        driver.license = body.license;
        driver.disponibility = body.disponibility;
        driver.years_experience = body.years_experience;
        driver.assigned_vehicle = body.assigned_driver
        return driver.save();
      }

  public async delete({ params, response }: HttpContextContract) {
    const driver: Driver = await Driver.findOrFail(params.id);
    response.status(204);
    return driver.delete();
     }

}