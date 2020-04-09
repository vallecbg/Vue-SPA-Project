import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import {
  default as blogModule,
  getArticle
} from '../../../src/blog/blogState.js';
import { default as userModule, getUser } from '../../../src/users/usersState';
import ArticleCard from '../../../src/blog/components/ArticleCard.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('Testing ArticleCard.vue', () => {
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
    state = {};

    mutations = blogModule.mutations;

    actions = {
      [getArticle]: jest.fn(),
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
      propsData: {
        article: {
              _id: '5e8b858fbc9ff90016bded9c',
              _acl: {"creator":"5e7208cd77bd160016dd56a5"},
              title: "eqweqweqweq",
              content: "<h1>Some initial content</h1>",
              imageUrl: "https://res.cloudinary.com/vallec/image/upload/v1586201997/qpicdbxvkbls2u1wszbv.jpg",
              creator: "5e7208cd77bd160016dd56a5"
        },
      }
    };

    wrapper = shallowMount(ArticleCard, options);
  });

  it('Is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('Renders the article title', () => {
    const articleTitle = wrapper.vm.$options.propsData.article.title;
    const htmlElement = wrapper.find('#title').html();
    expect(htmlElement).toContain(articleTitle);
  });

  it('Renders the creator name correctly', () => {
    const creatorName = wrapper.vm.$store.getters['user'].name;
    const htmlElement = wrapper.find('#user-name').html();
    expect(htmlElement).toContain(creatorName);
  })

  it('Renders the image url correctly', () => {
    const imageUrl = wrapper.vm.$options.propsData.article.imageUrl;
    const htmlElement = wrapper.find('#image-url').html();
    expect(htmlElement).toContain(imageUrl);
  })

  it('Redirect to "/articles/:id" after the button "Read more" is clicked', async () => {
    const article = wrapper.vm.$options.propsData.article;
    const route = `/articles/${article._id}`;
    wrapper.find('#read-more').trigger('click');
    await wrapper.vm.$nextTick();
    wrapper.vm.$router.push(route);
    expect(wrapper.vm.$route.path).toEqual(route);
  });
});