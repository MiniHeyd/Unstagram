import Service from '@ember/service';
import { get, set } from '@ember/object';
import Unsplash from 'unsplash-js';
import config from 'unstagram/config/environment';
import _ from 'lodash';

export default Service.extend({
  unsplash: null,
  preloaded: [],
  pageLimit: 10,
  preloadPage: 1,

  init() {
    this._super(...arguments);
    let { access, secret, callbackUrl } = config.APP.unsplash
    let unsplash = new Unsplash({
      access,
      secret,
      callbackUrl
    });
    set(this, 'unsplash', unsplash);
    this.preloadData();
  },

  async preloadData() {
    let pageLimit = get(this, 'pageLimit');
    let page = get(this, 'preloadPage');
    let res = await get(this, 'unsplash').photos.listPhotos(page, (pageLimit * 3));
    let json = await res.json();
    let paginated = _.chunk(json, 10);
    let existing = get(this, 'preloaded');
    let preloaded = _.concat(existing, paginated);
    set(this, 'preloaded', preloaded);
    this.incrementProperty('preloadPage');
  },

  async getPhotosByPage(page) {
    let preloadedLength = get(this, 'preloaded.length');
    if( page == (preloadedLength - 1) || ! preloadedLength ) {
      this.preloadData();
      if( ! preloadedLength ) {
        let res = await get(this, 'unsplash').photos.listPhotos(page, 10);
        let json = await res.json();
        return json;
      }
    }
    let preloaded = get(this, 'preloaded');
    return preloaded[page];
  }
});
