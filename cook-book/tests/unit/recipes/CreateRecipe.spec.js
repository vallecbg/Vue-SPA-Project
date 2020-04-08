import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import {
  default as recipeModule,
  createRecipe
} from '../../../src/recipes/recipesState.js';
import CreateRecipe from '../../../src/recipes/components/CreateRecipe.vue';

Vue.use(Vuetify);
Vue.use(VueRouter);

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Testing CreateRecipe.vue', () => {
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
      [createRecipe]: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        recipeModule: {
          namespaced: true,
          state,
          actions,
          getters: recipeModule.getters
        }
      }
    });

    options = {
      store,
      localVue,
      vuetify,
      router
    };

    wrapper = shallowMount(CreateRecipe, options);
  });

  it('Is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('Calls "createRecipe" when "Create" button is clicked', async () => {
    const createRecipe = jest.fn();
    wrapper.setMethods({
      createRecipe
    });
    wrapper.find({ref: 'createRecipeForm'}).trigger('submit');
    await wrapper.vm.$nextTick();
    expect(createRecipe).toHaveBeenCalled();
  });
  
//TODO: it throws error fix it
//   it('Dispatch action "createRecipe" when "Create" button is clicked',async () => {
//     wrapper.find({ ref: 'createRecipeForm' }).trigger('submit');
//     await wrapper.vm.$nextTick();
//     console.log(actions);
//     expect(actions[createRecipe]).toHaveBeenCalled();
//   });

  it('Component has all required properties', () => {
    const requiredProps = [
      'title',
      'category',
      'subCategory',
      'prepTime',
      'cookTime',
      'servings',
      'ingredients',
      'steps',
      'image',
      'description'
    ];
    const componentProps = Object.keys(wrapper.vm.$data);
    const hasAllProps = requiredProps.every(
      e => componentProps.indexOf(e) >= 0
    );
    expect(hasAllProps).toEqual(true);
  });

  it('Input fields should be "8"', () => {
    const textFields = wrapper.findAll('v-text-field-stub').length;
    const inputFields = wrapper.findAll('v-file-input-stub').length;
    const autoCompleteFields = wrapper.findAll('v-autocomplete-stub').length;
    const textAreaFields = wrapper.findAll('v-textarea-stub').length;
    const totalFileds = textAreaFields + inputFields + autoCompleteFields + textFields;
    expect(totalFileds).toEqual(8);
  });
});