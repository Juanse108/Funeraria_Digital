/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'



Route.get('/', async () => {
  return { hello: 'world' }
})

import './routes/customers'
import './routes/comment_ratings'
import './routes/service_plans'
import './routes/service_executions'
import './routes/chats'
import './routes/rooms'
import './routes/sites'
import './routes/owners'
import './routes/drivers'
import './routes/services'
import './routes/relocations'
import './routes/messages'
import './routes/payments'
import './routes/subscriptions'
import './routes/plans'
import './routes/beneficiaries'
import './routes/administrators'
import './routes/cremations'
import './routes/burials'