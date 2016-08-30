import module from "../Module"

export class AuthenticationService
{
    /**
     * Event fired on successful authentication
     * @type {string}
     */
    static TOKEN_KEY = "auth.token";

    /**
     * Event fired on logout
     * @type {string}
     */
    static USER_KEY = "auth.user";

    /**
     * The legged in user
     * @type {*}
     */
    user = null;

    /**
     * @param {ApiService} ApiService
     * @param {StorageService} StorageService
     */
    constructor(ApiService, StorageService)
    {
        this.ApiService = ApiService;
        this.StorageService = StorageService;

        if (StorageService.has(AuthenticationService.TOKEN_KEY)) {
            //Restore the user
            this.user = StorageService.get(AuthenticationService.USER_KEY);

            //Restore the token and let the ApiService authenticate with it
            this.ApiService.authenticateWith(StorageService.get(AuthenticationService.TOKEN_KEY));
        }
    }

    /**
     * Attempts to log the user in with the provided credentials
     * @param email
     * @param password
     */
    async login(email, password)
    {
        let response = await this.ApiService.post("/login", {email, password});
        this.$$processResponse(response);
        return response.user;
    }

    /**
     * Logs the user out
     */
    logout()
    {
        this.user = null;
        this.ApiService.dontAuthenticate();
    }

    /**
     * Attempts to register a new user with the given values
     */
    async register(username, email, password)
    {
        let response = await this.ApiService.post("/register", {name : username, email, password});
        this.$$processResponse(response);
        return response.user;
    }

    /**
     * @return {boolean} true if the user is logged in
     */
    get loggedIn() {
        return !!this.user;
    }

    /**
     * @param response
     */
    $$processResponse(response)
    {
        this.user = response.user;
        this.ApiService.authenticateWith(response.token);
        this.StorageService.set(AuthenticationService.USER_KEY, response.user);
        this.StorageService.set(AuthenticationService.TOKEN_KEY, response.token);
    }
}

module.service("AuthenticationService", AuthenticationService);