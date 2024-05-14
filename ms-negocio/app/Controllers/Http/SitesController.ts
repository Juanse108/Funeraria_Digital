import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Site from 'App/Models/Site';
import SiteValidator from 'App/Validators/SiteValidator';
import axios from 'axios';

export default class SitesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      return Site.findOrFail(params.id);
    } else {

      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await Site.query().paginate(page, perPage);
      } else {
        return await Site.query()
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(SiteValidator)
    // Asociar la ciudad con la información de la API externa
    const cityName = body.city;
    const apiUrl = `https://api-colombia.com/api/v1/City/name/${cityName}`;
    const response = await axios.get(apiUrl);
    const cityData = response.data;

    const siteData = {
      direction: body.direction,
      city: cityData.name, // Asignar el nombre de la ciudad
      department: cityData.departmentId.name, // Asignar el nombre del departamento
      phone: body.phone,
      rooms_number: body.rooms_number,
      office_hours: body.office_hours
    };
    const site: Site = await Site.create(siteData);
    return site;
  }

  public async update({ params, request }: HttpContextContract) {
    const site: Site = await Site.findOrFail(params.id);
    const body = request.body();
    site.direction = body.direction;
    site.city = body.city;
    site.department = body.department;
    site.phone = body.phone;
    site.rooms_number = body.rooms_number;
    site.office_hours = body.office_hours
    return site.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const site: Site = await Site.findOrFail(params.id);
    response.status(204);
    return site.delete
  }
}
