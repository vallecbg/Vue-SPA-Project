import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import {
  default as blogState,
  createArticle
} from '../../../src/blog/blogState.js';
import AddArticle from '../../../src/blog/components/AddArticle.vue';

Vue.use(Vuetify);
Vue.use(VueRouter);

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Testing AddArticle.vue', () => {
  let actions;
  let state;
  let store;
  let vuetify;
  let router;
  let wrapper;
  let options;
  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();

    state = {};

    actions = {
      [createArticle]: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        blogState: {
          state,
          actions,
          getters: blogState.getters
        }
      }
    });

    options = {
      store,
      localVue,
      vuetify,
      router
    };

    wrapper = shallowMount(AddArticle, options);
  });

  it('Is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('Calls "createArticle" when "Create" button is clicked', async () => {
    const createArticle = jest.fn();
    wrapper.setMethods({
        createArticle
    });
    wrapper.find({ref: 'createArticleForm'}).trigger('submit');
    await wrapper.vm.$nextTick();
    expect(createArticle).toHaveBeenCalled();
  });
  
// //TODO: it throws error fix it
//   it('Dispatch action "createArticle" when "Create" button is clicked',async () => {
//     wrapper.find({ ref: 'createArticleForm' }).trigger('submit');
//     console.log(wrapper);
//     await wrapper.vm.$nextTick();
//     console.log(actions[createArticle]);
//     expect(actions[createArticle]).toHaveBeenCalled();
//   });

  it('Component has all required properties', () => {
    const requiredProps = [
      'title',
      'content',
      'image'
    ];
    const componentProps = Object.keys(wrapper.vm.$data);
    const hasAllProps = requiredProps.every(
      e => componentProps.indexOf(e) >= 0
    );
    expect(hasAllProps).toEqual(true);
  });

  it('Input fields should be "2"', () => {
    const textFields = wrapper.findAll('v-text-field-stub').length;
    const inputFields = wrapper.findAll('v-file-input-stub').length;
    const total = textFields + inputFields;
    expect(total).toEqual(2);
  });
});