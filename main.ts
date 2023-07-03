import { menuRouter } from "./menu/menu.router";
import { orderRouter } from "./orders/orders.router";
import { restaurantsRouter } from "./restaurants/restaurants.router";
import { reviewsRouter } from "./reviews/reviews.router";
import { Server } from "./server/server";
import { usersRouter } from "./users/users.router";

const server = new Server()

server.bootstrap([
    usersRouter,
    restaurantsRouter,
    reviewsRouter,
    orderRouter,
    menuRouter
]).then(server => {
    console.log('Server is listening on:', server.application.address())
}).catch(error => {
    console.log('Server failed to start')
    console.error(error)
    process.exit(1)
})