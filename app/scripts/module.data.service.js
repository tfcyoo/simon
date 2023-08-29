'use strict';

ModuleDataService.$inject = ['$log', '$q', '$http', 'trialDataService'];

function ModuleDataService($log, $q, $http, trialDataService) {
  $log.debug('ModuleDataService: initialized');

  var data = {};

  // initialize modules db
  data.openModulesDB = function(userName, mode, callback) {
    // we don't need to to open a connection in remote mode
    data.api = mode;

    if (callback !== null) {
      callback();
    }
  };

  // return all modules from DB
  data.getAllModules = function() {
    var deferred = $q.defer();

    $http.get('/api/' + data.api + '/modules')
      .then(function onSuccess(response) {
        if (response.data === 'null') {
          response.data = null;
        }
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  // return all repository modules from DB
  data.getRepositoryModules = function() {
    var deferred = $q.defer();

    $http.get('/api/' + data.api + '/repository')
      .then(function onSuccess(response) {
        if (response.data === 'null') {
          response.data = null;
        }
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  // get a module from db by its moduleId
  data.getModule = function(moduleId) {
    var deferred = $q.defer();

    $http.get('/api/' + data.api + '/modules/' + moduleId)
      .then(function onSuccess(response) {
        if (response.data === 'null') {
          response.data = null;
        }
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  // get a public module
  data.getPublicModule = function(moduleId) {
    var deferred = $q.defer();
    $http.get('/public/run/' + moduleId)
      .then(function onSuccess(response) {
        if (response.data === 'null') {
          response.data = null;
        }
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  // get a module from the repository by its moduleId
  data.getRepositoryModule = function(moduleId) {
    var deferred = $q.defer();

    $http.get('/api/' + data.api + '/repository/' + moduleId)
      .then(function onSuccess(response) {
        if (response.data === 'null') {
          response.data = null;
        }
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  // add new module to db
  data.addModule = function(module) {
    var deferred = $q.defer();
    var moduleJson = JSON.parse(JSON.stringify(module));

    $http.post('/api/' + data.api + '/modules/' + module.moduleId, moduleJson)
      .then(function onSuccess(response) {
        if (response.data === 'null') {
          response.data = null;
        }
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  data.installModule = function(moduleId) {
    var deferred = $q.defer();

    $http.post('/api/' + data.api + '/modules/' + moduleId + '/install')
      .then(function onSuccess(response) {
        if (response.data === 'null') {
          response.data = null;
        }
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  data.inviteUser = function(moduleId, user) {
    var deferred = $q.defer();

    $http.post('/api/' + data.api + '/repository/' + moduleId + '/invite', user)
      .then(function onSuccess(response) {
        if (response.data === 'null') {
          response.data = null;
        }
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  data.removeInvite = function(moduleId, user) {
    var deferred = $q.defer();

    $http.post('/api/' + data.api + '/repository/' + moduleId + '/invite/remove', user)
      .then(function onSuccess(response) {
        if (response.data === 'null') {
          response.data = null;
        }
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  data.replyInvite = function(moduleId, response) {
    var deferred = $q.defer();

    $http.post('/api/' + data.api + '/modules/' + moduleId + '/invite/' + response)
      .then(function onSuccess(response) {
        if (response.data === 'null') {
          response.data = null;
        }
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  // publish module to repository
  data.publishModule = function(moduleId, moduleType) {
    var deferred = $q.defer();

    $http.post('/api/' + data.api + '/modules/' + moduleId + '/publish/' + moduleType)
      .then(function onSuccess(response) {
        if (response.data === 'null') {
          response.data = null;
        }
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  // unpublish module from repository
  data.unpublishModule = function(moduleId) {
    var deferred = $q.defer();

    $http.get('/api/' + data.api + '/modules/' + moduleId + '/unpublish')
      .then(function onSuccess(response) {
        if (response.data === 'null') {
          response.data = null;
        }
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  // delete a module and all of its trials
  data.deleteModule = function(userName, moduleId) {
    var deferred = $q.defer();

    $http.delete('/api/' + data.api + '/modules/' + moduleId)
      .then(function onSuccess(response) {
        if (response.data === 'null') {
          response.data = null;
        }
        trialDataService.deleteModuleTrials(userName, moduleId, data.api).then(
          function(data) {
            deferred.resolve(data);
          },
          function() {
            deferred.reject('Error during removal of module trials.');
          });
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  // get all projects a user has access to
  data.getProjects = function() {
    var deferred = $q.defer();

    $http.get('/api/' + data.api + '/projects')
      .then(function onSuccess(response) {
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  // get all projects
  data.getAllProjects = function() {
    var deferred = $q.defer();

    $http.get('/api/admin/projects')
      .then(function onSuccess(response) {
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  // add project
  data.addProject = function(project) {
    var deferred = $q.defer();

    $http.post('/api/admin/projects/' + project.access + '/' + project.name, project)
      .then(function onSuccess(response) {
        if (response.data === 'null') {
          response.data = null;
        }
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  // delete a module and all of its trials
  data.deleteProject = function(project) {
    var deferred = $q.defer();

    $http.delete('/api/admin/projects/' + project.access + '/' + project.name)
      .then(function onSuccess(response) {
        if (response.data === 'null') {
          response.data = null;
        }
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  // get all analytics enabled modules
  data.getAllModuleAnalytics = function() {
    var deferred = $q.defer();

    $http.get('/api/analytics/modules')
      .then(function onSuccess(response) {
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  // get analytics of one module
  data.getModuleAnalytics = function(moduleId) {
    var deferred = $q.defer();

    $http.get('/api/analytics/modules/' + moduleId)
      .then(function onSuccess(response) {
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  // delete module analytics
  data.deleteModuleAnalytics = function(moduleId) {
    var deferred = $q.defer();

    $http.delete('/api/analytics/modules/' + moduleId)
      .then(function onSuccess(response) {
        if (response.data === 'null') {
          data = null;
        }
        deferred.resolve(data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  // delete user analytics data
  data.deleteModuleAnalyticsUser = function(moduleId, userCode) {
    var deferred = $q.defer();

    $http.delete('/api/analytics/modules/' + moduleId + '/' + userCode)
      .then(function onSuccess(response) {
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  // get user analytics data
  data.getModuleAnalyticsUserData = function(moduleId, userCode) {
    var deferred = $q.defer();

    $http.get('/api/analytics/data/modules/' + moduleId + ((userCode) ? '/' + userCode : ''))
      .then(function onSuccess(response) {
        deferred.resolve(response.data);
      })
      .catch(function onError(error) {
        $log.error(error);
        deferred.reject(error.message);
      });

    return deferred.promise;
  };

  return data;

}

export default ModuleDataService;