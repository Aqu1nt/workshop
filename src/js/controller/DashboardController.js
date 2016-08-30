import {Router} from "../services/Router"
import {LoginController} from "./LoginController"

export class DashboardController
{

    /**
     * @param {AuthenticationService} AuthenticationService
     * @param Router
     */
    constructor(AuthenticationService, Router)
    {
        this.AuthenticationService = AuthenticationService;
        this.Router = Router;
    }

    logout()
    {
        this.AuthenticationService.logout();
        this.Router.go(LoginController);
    }
}

Router.route(DashboardController, {
    name : "dashboard",
    url : "/dashboard",
    controllerAs : "dashCtrl",
    templateUrl : "views/dashboard.html"
});