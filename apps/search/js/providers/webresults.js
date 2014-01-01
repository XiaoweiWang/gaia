(function() {

  'use strict';

  function WebResults(eme) {}

  WebResults.prototype = {

    __proto__: AppProvider.prototype,

    name: 'WebResults',

    init: function() {
      AppProvider.prototype.init.apply(this, arguments);
      eme.init();
    },

    click: function(e) {
      var url = e.target && e.target.dataset.url;
      if (url) {
        Search.browse(url);
      }
    },

    search: function(input, type) {
      this.clear();
      var request = eme.api.Apps.search({
        'query': input
      });

      request.then((function resolve(data) {
        var response = data.response;
        if (response && response.apps && response.apps.length) {
          var results = response.apps.map(function each(app) {
            return {
              title: app.name,
              icon: app.icon,
              dataset: {
                url: app.appUrl
              }
            };
          });
          this.render(results);
        }
      }).bind(this), function reject(reason) {
        // handle errors
      });
    }

  };

  Search.provider(new WebResults(window.eme));

}());
