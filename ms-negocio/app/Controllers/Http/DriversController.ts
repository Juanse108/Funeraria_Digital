import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Driver from 'App/Models/Driver';

export default class DriveresController {
    public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return Driver.findOrFail(params.id);
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await Driver.query().paginate(page, perPage);
      } else {
        return await Driver.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const driver: Driver = await Driver.create(body);
    return driver

    
    }
    public async update({ params, request }: HttpContextContract) {
        const driver: Driver = await Driver.findOrFail(params.id);
        const body = request.body();
        driver.id_driver = body.id_driver;
        driver.name = body.name;
        driver.lastname = body.lastname;
        driver.citizen_document = body.citizen_document;
        driver.age = body.age;
        driver.license = body.license;
        driver.disponibility = body.disponibility;
        driver.years_experience = body.years_experience;
        driver.phone = body.phone;
        driver.email = body.email;
        driver.assigned_vehicle = body.assigned_driver
        

        return driver.save();
      }

  public async delete({ params, response }: HttpContextContract) {
    const driver: Driver = await Driver.findOrFail(params.id);
    response.status(204);
    return driver.delete();
     }

}