import {Router} from "../services/Router"
import {LoginController} from "./LoginController"
import {DashboardController} from "./DashboardController"

export class RegisterController
{
    /**
     * @type {string}
     */
    username = "";

    /**
     * @type {string}
     */
    password = "";

    /**
     * @type {string}
     */
    email = "";

    /**
     * @param {Router} Router
     * @param {AuthenticationService} AuthenticationService
     * @param {ModalService} ModalService
     */
    constructor(Router, AuthenticationService, ModalService)
    {
        this.AuthenticationService = AuthenticationService;
        this.Router = Router;
        this.ModalService = ModalService;
    }

    /**
     * Attempts to register the user
     */
    async register()
    {
        try {
            await this.AuthenticationService.register(this.username, this.email, this.password);
            this.Router.go(DashboardController);
        } catch (e)
        {
            this.ModalService.alert("Register failed! (Username could already be taken)");
        }
    }

    cancel()
    {
        this.Router.go(LoginController);
    }
}

Router.route(RegisterController, {
    name : "register",
    url : "/register",
    controllerAs : "regCtrl",
    templateUrl : "views/register.html"
});
