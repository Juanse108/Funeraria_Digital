import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cremation from 'App/Models/Cremation';

export default class CremationsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return Cremation.findOrFail(params.id);
        } else {

            const data = request.all();
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Cremation.query().paginate(page, perPage);
            } else {
                return await Cremation.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const cremation: Cremation = await Cremation.create(body);
        return cremation;
    }

    public async update({ params, request }: HttpContextContract) {
        const cremation: Cremation = await Cremation.findOrFail(params.id);
        const body = request.body();
        cremation.id_cremation = body.id_cremation;
        cremation.destination_ashes = body.destination_ashes;
        cremation.urn_type = body.urn_type;
        cremation.id_service = body.id_service;
        return cremation.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const cremation: Cremation = await Cremation.findOrFail(params.id);
        response.status(204);
        return cremation.delete();
    }
}

