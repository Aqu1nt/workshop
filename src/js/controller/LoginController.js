import {Router} from "../services/Router"
import {DashboardController} from "./DashboardController"
import {RegisterController} from "./RegisterController"

export class LoginController
{
    /**
     * @type {string}
     */
    email = "";

    /**
     * @type {string}
     */
    password = "";

    /**
     * @param {AuthenticationService} AuthenticationService
     * @param {Router} Router
     * @param {ModalService} ModalService
     * @param $stateParams
     */
    constructor(AuthenticationService, Router, ModalService, $stateParams)
    {
        this.AuthenticationService = AuthenticationService;
        this.Router = Router;
        this.ModalService = ModalService;
        this.email = $stateParams.email || "";
    }

    /**
     * Transitions to the register state
     */
    register()
    {
        this.Router.go(RegisterController);
    }

    /**
     * Attempts to log the user in and redirects on success
     */
    async login()
    {
        try
        {
            await this.AuthenticationService.login(this.email, this.password);
            this.Router.go(DashboardController);
        }
        catch (e)
        {
            this.ModalService.alert("Login failed!");
            this.password = "";
        }
    }
}

///Login route
Router.default(LoginController, {
    name : "login",
    url : "/login",
    controllerAs : "loginCtrl",
    templateUrl : "views/login.html"
});