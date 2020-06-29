# [IdenaPoll](https://idenapoll.com)

Polling website built for [Idena](https://idena.io/) identities, thus guaranteeing the uniqueness of each vote and creating sybil-resistant polls.

After logging in with an Idena Identity, any user will be able to create a public poll and customize its settings however they see fit.
The current supported poll settings include:
- Vote weight based on Idena Identity Status (_NEWBIE, VERIFIED, HUMAN_)
- Minimum Status required to vote
- Minimum account age required to vote (_in epochs_)
- Poll duration

Polls are shareable through a link and can be queried through a simple searchbar.
The most popular polls (_by number of votes_) and the most recent polls will be shown on IdenaPoll's homepage.

## Endpoint

IdenaPoll's API Endpoint can be found at https://json.idenapoll.com
IdenaPoll uses Json Server, to know more about it go to the public [Json Server Github](https://github.com/typicode/json-server).

Example API CALL to retrieve poll data: https://json.idenapoll.com/polls

## Feedback

If you want to give us feedback about IdenaPoll, or if you are a developer and want to know more about it, feel free to contact us in the Idena-Poll channel on [Idena's official Discord](https://discord.com/invite/8BusRj7)

# ANGULAR CLI INFO

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
