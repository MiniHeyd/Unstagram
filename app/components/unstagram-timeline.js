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
