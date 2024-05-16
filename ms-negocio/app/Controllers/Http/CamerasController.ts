import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Camera from 'App/Models/Camera';
import CameraValidator from 'App/Validators/CameraValidator';

export default class CamerasController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          return Camera.findOrFail(params.id);
        } else {
    
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input("per_page", 20);
            return await Camera.query().paginate(page, perPage);
          } else {
            return await Camera.query()
          }
        }
      }


    public async create({ request }: HttpContextContract) {
        const body = await request.validate(CameraValidator)
        const camera: Camera = await Camera.create(body)
        return camera;
      }
}
