import Component from '@ember/component';
import _ from 'lodash';

export default Component.extend({
  likes: 0,
  photographer: null,
  photoUrl: null,

  didInsertElement() {
    let scrollTimeout,
        offset = window.innerHeight;
    let scroll = _.debounce(() => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop,
          windowHeight = window.innerHeight,
          documentHeight = document.documentElement.scrollHeight,
          trigger = (scrollTop + windowHeight) >= (documentHeight - offset);
      if(trigger) this.sendAction('getPhotos');
    });
    window.onscroll = scroll;
  }
});
