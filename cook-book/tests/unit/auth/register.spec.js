import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import {
  default as authModule,
  registerSuccess
} from '../../../src/auth/authState.js';
import AppRegister from '../../../src/auth/components/Register.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('Testing AppRegister.vue', () => {
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

    mutations = authModule.mutations;

    actions = {
      [registerSuccess]: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        authModule: {
          state,
          actions,
          mutations,
          getters: authModule.getters
        }
      }
    });

    options = {
      store,
      router,
      localVue,
      vuetify,
      stubs: {
        RouterLink: RouterLinkStub
      }
    };

    wrapper = shallowMount(AppRegister, options);
  });

  it('Is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('Calls "registerSuccess" when "Login" button is clicked',async () => {
    const register = jest.fn();
    wrapper.setMethods({
      register
    });
    wrapper.find({ ref: 'registerForm' }).trigger('submit');
    await wrapper.vm.$nextTick();
    expect(register).toHaveBeenCalled();
  });

  it('Dispatch action "register" when "register" button is clicked',async () => {
    wrapper.find({ ref: 'registerForm' }).trigger('submit');
    await wrapper.vm.$nextTick();
    expect(actions[registerSuccess]).toHaveBeenCalled();
  });

  it('Component should has all required properties', () => {
    const requiredProps = ['name', 'username', 'email', 'city', 'state', 'zip', 'country', 'password', 'repeatPassword'];
    const componentProps = Object.keys(wrapper.vm.$data);
    const hasAllProps = requiredProps.every(
      e => componentProps.indexOf(e) >= 0
    );
    expect(hasAllProps).toEqual(true);
  });

  it('All fields should equal 9', () => {
    const textFields = wrapper.findAll('v-text-field-stub').length;
    const autoCompleteFields = wrapper.findAll('v-autocomplete-stub').length;
    expect(textFields + autoCompleteFields).toEqual(9);
  });

  it('Router link should go to "/login"', () => {
    expect(wrapper.find(RouterLinkStub).props().to).toBe('/login');
  });
});