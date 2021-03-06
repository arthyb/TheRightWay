'use strict';

angular.module('fcApp.services').factory('NativeService', ['ENV', '$http', '$timeout', '$rootScope',
function(ENV, $http, $timeout, $rootScope) {
    return {

        alert : function(message, alertCallback, title, buttonText) {
            if(navigator.notification) {
                navigator.notification.alert(message, alertCallback, title, buttonText);
            } else {
                alertCallback();
            }
        },

        fetchJsonBundle : function(selectedLanguage, successCb, errorCb) {
            if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
                cordova.exec(function(result) {
                    localStorage.setItem('bundle-url', result);
                    $http.get(result + "app.json"  + "?" + new Date(), {cache: false}).success(successCb);
                }, function(error) {
                    errorCb();
                }.bind(this), "DownloadZip", "DownloadFile", [selectedLanguage.bundlePath, selectedLanguage.code, selectedLanguage.version]);
            } else {
                $http.get(selectedLanguage.bundlePath + "?" + new Date(), {cache: false}).success(successCb);
            }
        },
        
        downloadPDFfromUrl: function(url, successCb, errorCb) {
            if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
                $timeout(function() {
                    $rootScope.loading = true;
                });
                var forceDownload = false;
                $http.get(ENV.serverPath + "languages.json?" + new Date()).success(function(response) {
                    var language = response.languages.findBy('code', localStorage.getItem('appLanguage'));
                    if(parseInt(localStorage.getItem('codeOfConductHandbookVersion')) != language.codeOfConductHandbookVersion){
                        forceDownload= true;
                    }
                    $rootScope.loading = false;
                    cordova.exec(function(result) {
                        if(result.indexOf('Cancel') === -1){
                            localStorage.setItem('codeOfConductHandbookVersion', language.codeOfConductHandbookVersion);
                            successCb(result);
                        }
                    }, function(error) {
                        errorCb();
                    }.bind(this), "DownloadPdf", "DownloadFile", [url, forceDownload]);
                }).error(function() {
                    $rootScope.loading = false;
                    cordova.exec(function(result) {
                        if(result.indexOf('Cancel') === -1){
                            successCb(result);
                        }
                    }, function(error) {
                        errorCb();
                    }.bind(this), "DownloadPdf", "DownloadFile", [url, forceDownload]);
                });
            } else {
                successCb(url);
            }
      
    };
}]);
