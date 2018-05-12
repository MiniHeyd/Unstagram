import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Controller.extend({
  photos: [],
  page: 1,

  unsplash: service(),

  init() {
    this._super(...arguments);
    this.send('getPhotos');
  },

  actions: {
    async getPhotos() {
      let page = get(this, 'page');
      let json = await get(this, 'unsplash').getPhotosByPage(page);
      let photos = get(this, 'photos');
      json.map(function(item){
        let photoUrl = item.urls.regular;
        let { likes, user } = item;
        photos.pushObject({
          likes: likes,
          photoUrl: photoUrl,
          photographer: user
        });
      });
      this.incrementProperty('page');
    }
  }
});
