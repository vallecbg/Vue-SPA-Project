import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import {
  default as blogModule,
  getArticle,
  deleteArticle
} from '../../../src/blog/blogState.js';
import { default as userModule, getUser } from '../../../src/users/usersState';
import Details from '../../../src/blog/components/Details.vue';
import VueDisqus from 'vue-disqus';

Vue.use(Vuetify);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(VueDisqus);

describe('Testing Details.vue', () => {
  let store;
  let state;
  let actions;
  let mutations;
  let router;
  let vuetify;
  let wrapper;
  let options;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
    state = {
        article: {
            _id: '5e8b858fbc9ff90016bded9c',
            _acl: {"creator":"5e7208cd77bd160016dd56a5"},
            title: "eqweqweqweq",
            content: "<h1>Some initial content</h1>",
            imageUrl: "https://res.cloudinary.com/vallec/image/upload/v1586201997/qpicdbxvkbls2u1wszbv.jpg",
            creator: "5e7208cd77bd160016dd56a5"
        },
    };

    mutations = blogModule.mutations;

    actions = {
      [getArticle]: jest.fn(),
      [deleteArticle]: jest.fn(),
      [getUser]: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        blogModule: {
          state,
          actions,
          mutations,
          getters: blogModule.getters
        },
        userModule: {
          state: {
            user: {
              _id: '5e7208cd77bd160016dd56a5',
              _acl: {"creator": '5e7208cd77bd160016dd56a5'},
              email: 'dasd@abv.bg',
              username: "asdasdqwe",
              name: "asdasdas",
              city: "fsdfsdfsd",
              state: '432423',
              zip: '4234',
              country: 'Bulgaria'
            },
          },
          actions: {},
          getters: userModule.getters
        }
      }
    });

    options = {
      store,
      router,
      localVue,
      vuetify,
    };

    wrapper = shallowMount(Details, options);
  });

  it('Is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('Dispatched action "getArticle" in created hook', () => {
    expect(actions[getArticle]).toHaveBeenCalled();
  });

  it('Dispatched action "getUser" in created hook', () => {
    expect(actions[getUser]).toHaveBeenCalled();
  });

  it('Renders the props correctly', () => {
      const title = wrapper.vm.$store.getters['article'].title;
      const titleHtml = wrapper.find('#title').html();
      expect(titleHtml).toContain(title);
      
      const imageUrl = wrapper.vm.$store.getters['article'].imageUrl;
      const imageHtml = wrapper.find('#image-url').html();
      expect(imageHtml).toContain(imageUrl);

      const user = wrapper.vm.$store.getters['user'].name;
      const userHtml = wrapper.find('#user-name').html();
      expect(userHtml).toContain(user);

      const content = wrapper.vm.$store.getters['article'].content;
      const contentHtml = wrapper.find('#content').html();
      expect(contentHtml).toContain(content);
  })

  it('Calls "deleteArticle" when "delete" button is clicked', async () => {
    wrapper.setData({currentUser: '5e7208cd77bd160016dd56a5'});
    const deleteArticle = jest.fn();
    wrapper.setMethods({
        deleteArticle,
    });
    const input = wrapper.find('#delete-article')
    input.trigger('click');
    await wrapper.vm.$nextTick();
    expect(deleteArticle).toHaveBeenCalled();
  });
});