# DcdUiAngular


## Intallation

- `npm install`
- `cd project/ui-angular` & `npm install`

## Build and start

- `npm run start`
- Go to http://localhost:4200/

## UI angular library devellopement

Run `ng generate component component-name --project ui-angular` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ui-angular`.
> Note: Don't forget to add `--project ui-angular` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `npm run build-lib` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `npm run build-lib`, go to the dist folder `cd dist/ui-angular` and run `npm publish`.



