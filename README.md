# GLSL Parser
This is a GLSL parser written as a webpack loader, this loader will mangleyour GLSL code with the following modificitons.

Modifications 
------------- 
* Obfuscates private variables. 
* Removes comments.
* Removes whitespaces.

## Getting Started

These instructions will help you .

### Prerequisites

* Install Node.Js if you have not already.
* nstall webpack Version 4.3.2

```
npm install --save-dev webpack@4.3.2
```


## Deployment

* Make sure that your root file ( index.js ) is in the src directory.
* Copy the glsl_loader.js file in your root project directory.
* Copy webpack.config.js file in your root project directory.
* To make a build run the following command in the terminal.
```
npm run build
```
* The build will be created as bundle.js in the Build directory.

## Built With

* [NodeJs](https://nodejs.org/en/docs/)
* [Webpack](https://webpack.js.org/concepts/loaders)

## License

This project is licensed under the MIT License.



