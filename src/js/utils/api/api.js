define((require) => {

  const $ = require('jquery');

  class API {

    constructor({ url }) {
      this.url = url;
      this.endpoints = {};
    }

    /**
     * Create and store a single entity's endpoints
     * @param {A entity Object} entity
     */
    createEntity(entity) {
      this.endpoints[entity.name] = this.createBasicCRUDEndpoints({ path: entity.path, headers: entity.headers });
    }

    createEntities(arrayOfEntities) {
      arrayOfEntities.forEach(this.createEntity.bind(this));
    }


    /**
     * createAjaxRequest - Creates Ajax Request
     *
     * @param  {Object} requestOptions
     * @return {ajax Object}
     */
    createAjaxRequest({ rMethod, rUrl, rHeaders, rData, rOptions, rSuccess, rFailed, rAlways }) {
      const request = {
        method: rMethod,
        url: rUrl,
        headers: rHeaders,
        data: rMethod !== 'GET' && rData !== null ? JSON.stringify(rData) : null,
        success: rSuccess,
        error: rFailed,
        complete: rAlways
      };

      for (let attrname in rOptions) { request[attrname] = rOptions[attrname] }
      return $.ajax(request);
    }


    /**
     * createURLQuery - Creates an URL query string
     *
     * @param  {query} query
     * @return {string}
     */
    createURLQuery(query) {
      if (typeof query === 'object') {
        let queryString = '?';
        for (let attrname in query) queryString += `${attrname}=${query[attrname]}&`;
        return queryString.slice(0, queryString.length - 1);
      }

      return query;
    }

    /**
     * createBasicCRUDEndpoints - Creates basic CRUD methods for a given path
     *
     * @param  {A entity Object} entity
     * @return {Object}
     */
    createBasicCRUDEndpoints({ path, headers }) {
      const endpoint = {};

      endpoint.resourceURL = this.url + path;
      endpoint.headers = headers;

      endpoint.getAll = ({ query, headers, options, success, failed, always } = {}) => this.createAjaxRequest({
        rMethod: 'GET',
        rUrl: query ? endpoint.resourceURL + this.createURLQuery(query) : endpoint.resourceURL,
        rHeaders: headers ? headers : endpoint.headers,
        rOptions: options,
        rSuccess: success,
        rFailed: failed,
        rAlways: always
      });

      endpoint.getOne = ({ id, headers, options, success, failed, always } = {}) => this.createAjaxRequest({
        rMethod: 'GET',
        rUrl: `${endpoint.resourceURL}/${id}`,
        rHeaders: headers ? headers : endpoint.headers,
        rOptions: options,
        rSuccess: success,
        rFailed: failed,
        rAlways: always
      });

      endpoint.create = (toCreate, { headers, options, success, failed, always } = {}) => this.createAjaxRequest({
        rMethod: 'POST',
        rUrl: endpoint.resourceURL,
        rHeaders: headers ? headers : endpoint.headers,
        rData: toCreate,
        rOptions: options,
        rSuccess: success,
        rFailed: failed,
        rAlways: always
      });

      endpoint.update = (toUpdate, { idAttribute, headers, options, success, failed, always } = {}) => this.createAjaxRequest({
        rMethod: 'PUT',
        rUrl: `${endpoint.resourceURL}/${toUpdate[idAttribute]}`,
        rHeaders: headers ? headers : endpoint.headers,
        rData: toUpdate,
        rOptions: options,
        rSuccess: success,
        rFailed: failed,
        rAlways: always
      });

      endpoint.delete = ({ id, headers, options, success, failed, always } = {}) => this.createAjaxRequest({
        rMethod: 'DELETE',
        rUrl: `${endpoint.resourceURL}/${id}`,
        rHeaders: headers ? headers : endpoint.headers,
        rOptions: options,
        rSuccess: success,
        rFailed: failed,
        rAlways: always
      });

      return endpoint;
    }
  }

  return API;
});
