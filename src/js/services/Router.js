import module from "../Module"

/**
 * @type {Symbol}
 */
const stateSymbol = Symbol("State");

/**
 * Angular router
 */
export class Router
{
    /**
     * Default route
     */
    static DEFAULT_ROUTE = undefined;

    /**
     * Defines a new route onto the current router
     * @param controller
     * @param state
     */
    static route(controller, state)
    {
        if (controller instanceof Function) {
            controller[stateSymbol] = state;
        }
        state.controller = controller;
        module.config($stateProvider => $stateProvider.state(state));
    }

    /**
     * Specifies the default state which is called when
     * @param controller
     * @param state
     */
    static default(controller, state)
    {
        if (Router.DEFAULT_ROUTE) {
            let error = new Error("Default route is already defined");
            error.route = Router.DEFAULT_ROUTE;
            throw error;
        }

        Router.route(controller, state);
        module.config($urlRouterProvider => {
            $urlRouterProvider.otherwise(($injector) => {
                $injector.invoke(['$state', function ($state) {
                    $state.go(state.name, {}, {location: "replace"});
                }]);
            });
        });

        Router.DEFAULT_ROUTE = state;
    }

    /**
     * @param $state
     */
    constructor($state)
    {
        this.$state = $state;
    }

    /**
     * Transits to the given state controller
     * @param targetController
     * @param params
     * @param config
     */
    go(targetController, params, config)
    {
        let state = targetController[stateSymbol];
        if (!state) {
            throw new Error(`Controller ${targetController.name} is not associated with a state`);
        }
        this.$state.go(state.name, params, config);
    }
}

module.service("Router", Router);