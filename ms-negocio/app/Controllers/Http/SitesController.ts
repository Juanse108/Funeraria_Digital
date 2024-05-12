import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Site from 'App/Models/Site';

export default class SitesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          return Site.findOrFail(params.id);
        } else {
          
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input("per_page", 20);
            return await Site.query().preload(('rooms')).paginate(page, perPage);
          } else {
            return await Site.query().preload(('rooms'))
          }
        }
      }
    
      public async create({ request }: HttpContextContract) {
        const body = request.body();
        const site: Site = await Site.create(body);
        return site;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const site: Site = await Site.findOrFail(params.id);
        const body = request.body();
        site.id_site_funeral = body.id_site_funeral;
        site.direction = body.direction;
        site.city = body.city;
        site.department = body.department;
        site.phone = body.phone;
        site.rooms_number = body.rooms_number;
        site.office_hours = body.office_hours
        site.rooms = body.rooms
        return site.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const site: Site = await Site.findOrFail(params.id);
        response.status(204);
        return site.delete
      }
}
