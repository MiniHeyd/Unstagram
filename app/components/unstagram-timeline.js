import Ember from 'ember';
import _ from 'lodash';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  buttonLabel: computed('page', function() {
    return 'Get Page ' + get(this, 'page');
  }),

  didInsertElement() {
    let scrollTimeout,
        offset = window.innerHeight*2,
        loadMore = true;
    let scroll = _.debounce(() => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop,
          windowHeight = window.innerHeight,
          documentHeight = document.documentElement.scrollHeight,
          trigger = (scrollTop + windowHeight) >= (documentHeight - offset);
      if(trigger && loadMore) {
        loadMore = false;
        this.sendAction('getPhotos');
      } else {
        loadMore = true;
      }
    });
    window.onscroll = scroll;
  }
});
