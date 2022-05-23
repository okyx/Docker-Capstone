const { createContainer } = require('instances-container');
//usercase
const ImageUseCase = require('../applications/predict/ImageUseCase');
const CalculatorUseCase = require('../applications/Calculator/CalculatotUseCase');
const MealUseCase = require('../applications/Meals/MealUseCase');
const RecipeUseCase = require('../applications/Recipes/RecipeUseCase');
const AddUserUseCase = require('../applications/User/AddUserUseCase');
const EditUserUseCase = require('../applications/User/EditUserUseCase');
const LoginUseCase = require('../applications/Auth/LoginUseCase');
const LogoutUseCase = require('../applications/Auth/LogoutUseCase');
const RefreshTokenUseCase = require('../applications/Auth/RefreshTokenUseCase');
//Helper
const Fetching = require('../applications/Fetching/Fetching');
//domain
const Food = require('../domain/Predict/Food');
const Image = require('../domain/Image/Image');
const Calcultor = require('../domain/Calculator/Calculator');
const Meal = require('../domain/Meals/Meals');
const Recipes = require('../domain/Recipes/Recipe');
const User = require('../domain/User/User');
// service
const FoodPredict = require('./modelPredict/ImagePredict');
const ImageService = require('./modelPredict/ImageService');
const RecipesService = require('../infrastructures/Recipes/RecipesService');
const CalculatorService = require('../infrastructures/Calculator/CalculatorService');
const MealService = require('../infrastructures/Meals/MealService');
const UserService = require('../infrastructures/Users/Postgres/UserRepository');
const AuthService = require('../infrastructures/Auth/postgres/AuthRepository');
const TokenManager = require('../infrastructures/Security/TokenManager');
const HashManager = require('../infrastructures/Security/HashManager');


// library 
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const pool = require('./Database/Postgres/config');
const Auth = require('../domain/Authentications/Auth');
const container = createContainer();
container.register([
  {
    key: Food.name,
    Class: FoodPredict
  },
  {
    key: Image.name,
    Class: ImageService,
  },
  {
    key: Calcultor.name,
    Class: CalculatorService,
  },
  {
    key: Fetching.name,
    Class: Fetching,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'url',
          concrete: process.env.FLASK_URL
        }
      ]
    }
  },
  {
    key: Meal.name,
    Class: MealService,
    parameter: {
      injectType: 'parameter',
      dependencies: [
        {
          internal: Fetching.name
        }
      ]
    }
  },
  {
    key: Recipes.name,
    Class: RecipesService,
    parameter: {
      injectType: 'parameter',
      dependencies: [
        {
          internal: Fetching.name
        }
      ]
    }
  },
  {
    key: HashManager.name,
    Class:HashManager,
    parameter: {
      dependencies:[
        {
          concrete: bcrypt,
        }
      ]
    }
  },
  {
    key: TokenManager.name,
    Class:TokenManager,
    parameter: {
      dependencies:[
        {
          concrete: Jwt,
        }
      ]
    }
  },
  {
    key: User.name,
    Class: UserService,
    parameter: {
      dependencies:[
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ]
    }
  },
  {
    key: Auth.name,
    Class: AuthService,
    parameter: {
      dependencies:[
        {
          concrete: pool,
        }
      ]
    }
  },
]);
container.register([
  {
    key: ImageUseCase.name,
    Class: ImageUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'imageService',
          internal: Image.name
        },
        {
          name: 'predictService',
          internal: Food.name,
        },
      ]    
    }
  },
  {
    key: CalculatorUseCase.name,
    Class: CalculatorUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies:[
        {
          name: 'calculatorService',
          internal: Calcultor.name
        }
      ]
    }
  },
  {
    key: MealUseCase.name,
    Class: MealUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'calculatorUseCase',
          internal: CalculatorUseCase.name
        },
        {
          name: 'mealService',
          internal: Meal.name
        },
        {
          name: 'userService',
          internal: User.name
        }
      ]
    }
  },
  {
    key: RecipeUseCase.name,
    Class: RecipeUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'recipeService',
          internal: Recipes.name
        }
      ]
    }
  },
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'tokenManager',
          internal: TokenManager.name
        },
        {
          name: 'hashManager',
          internal: HashManager.name
        },
        {
          name: 'userService',
          internal: User.name
        },
        {
          name: 'authService',
          internal: Auth.name
        }
      ]
    }
  },
  {
    key: EditUserUseCase.name,
    Class: EditUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userService',
          internal: User.name
        },
        {
          name: 'authService',
          internal: Auth.name
        }
      ]
    }
  },
  {
    key: LoginUseCase.name,
    Class: LoginUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'tokenManager',
          internal: TokenManager.name
        },
        {
          name: 'hashManager',
          internal: HashManager.name
        },
        {
          name: 'userService',
          internal: User.name
        },
        {
          name: 'authService',
          internal: Auth.name
        }
      ]
    }
  },
  {
    key: LogoutUseCase.name,
    Class: LogoutUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authService',
          internal: Auth.name
        }
      ]
    }
  },
  {
    key: RefreshTokenUseCase.name,
    Class: RefreshTokenUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'tokenManager',
          internal: TokenManager.name
        },
        {
          name: 'authService',
          internal: Auth.name
        }
      ]
    }
  },
])
module.exports = container;