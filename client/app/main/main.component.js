import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  $http;
  $interval;

  awesomeThings = [];
  newThing = '';

  /*@ngInject*/
  constructor($http, $interval) {
    this.$http = $http;
    this.$interval = $interval;
  }

  $onInit() {
    this.startBot();

    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
      });
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }

  startBot() {
    var self = this;
    this.$interval(function () {
      self.$http.get("https://www.youtube.com/watch?v=4Ionk3jA6lI")
        .then(response => {
          console.log(response);
        });
    }, 5000);
  }
}

export default angular.module('botApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
