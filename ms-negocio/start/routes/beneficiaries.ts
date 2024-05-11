import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/beneficiaries', 'BeneficiariesController.find');
  Route.get('/beneficiaries/:id', 'BeneficiariesController.find');
  Route.post('/beneficiaries', 'BeneficiariesController.create');
  Route.put('/beneficiaries/:id', 'BeneficiariesController.update');
  Route.delete('/beneficiaries/:id', 'BeneficiariesController.delete');
})
