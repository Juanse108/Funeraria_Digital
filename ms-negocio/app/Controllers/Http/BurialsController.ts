import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Burial from 'App/Models/Burial';


export default class BurialsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return Burial.findOrFail(params.id);
        } else {

            const data = request.all();
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Burial.query().paginate(page, perPage);
            } else {
                return await Burial.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const burial: Burial = await Burial.create(body);
        return burial;
    }

    public async update({ params, request }: HttpContextContract) {
        const burial: Burial = await Burial.findOrFail(params.id);
        const body = request.body();
        burial.id_burial = body.id_burial;
        burial.land_location = body.land_location;
        burial.casket_type = body.casket_type;
        burial.id_service = body.id_service;
        return burial.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const burial: Burial = await Burial.findOrFail(params.id);
        response.status(204);
        return burial.delete();
    }
}
