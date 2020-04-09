import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import {
  default as recipeModule,
  getRecipe,
  deleteRecipe
} from '../../../src/recipes/recipesState';
import { default as userModule, getUser } from '../../../src/users/usersState';
import Details from '../../../src/recipes/components/Details.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

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
        recipe: {
            _id: '5e8b880961b69200170225bc',
            _acl: {"creator":"5e7208cd77bd160016dd56a5"},
            title: "eqweqw",
            description: "The shrimp and chickpeas simmer in the skillet with the harissa, and then they are finished with fresh herbs and lemon juice, which brighten up the whole dish",
            category: "With Meat",
            subCategory: "Супи : Чорби и супи",
            prepTime: 2,
            cookTime: 3,
            servings: 4,
            ingredients: [{"value":"1 teaspoon extra virgin olive oil"},{"value":"2 cloves garlic, sliced thin"},{"value":"1 10 ounce jar mild harissa sauce, (I like Mina)"},{"value":" 2 15-ounce can chickpeas or white beans, rinsed and drained"},{"value":" 1 pound peeled and deveined jumbo shrimp"},{"value":" juice of 1/2 lemon"},{"value":"4 tablespoons each of chopped mint and/or cilantro"},{"value":"crusty bread, optional for serving"}],
            steps: [{"value":"Heat oil in a large skillet over medium heat. When hot add the garlic, and cook to nearly golden, about 1 minute."},{"value":"Reduce heat to low and add the harissa, 1/4 cup water and chickpeas. Bring to a boil and cover. Simmer on medium-low 5 minutes to let the flavors meld."},{"value":"Add the shrimp, cover and cook until the shrimp are cooked through and no longer opaque, about 2 to 3 minutes."},{"value":"Squeeze with lemon juice and garnish with chopped herbs. Divide in 4 bowls."}],
            imageUrl: "https://res.cloudinary.com/vallec/image/upload/v1585255560/joakdx711kd2woo2vztc.jpg",
            creator: "5e7208cd77bd160016dd56a5"
      },
    };

    mutations = recipeModule.mutations;

    actions = {
      [getRecipe]: jest.fn(),
      [deleteRecipe]: jest.fn(),
      [getUser]: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        recipeModule: {
          state,
          actions,
          mutations,
          getters: recipeModule.getters
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

  it('Dispatched action "getRecipe" in created hook', () => {
    expect(actions[getRecipe]).toHaveBeenCalled();
  });

  it('Dispatched action "getUser" in created hook', () => {
    expect(actions[getUser]).toHaveBeenCalled();
  });

  it('Renders the props correctly', () => {
      const title = wrapper.vm.$store.getters['recipe'].title;
      const titleHtml = wrapper.find('#title').html();
      expect(titleHtml).toContain(title);
      
      const imageUrl = wrapper.vm.$store.getters['recipe'].imageUrl;
      const imageHtml = wrapper.find('#image-url').html();
      expect(imageHtml).toContain(imageUrl);

      const user = wrapper.vm.$store.getters['user'].name;
      const userHtml = wrapper.find('#user-name').html();
      expect(userHtml).toContain(user);

      const category = wrapper.vm.$store.getters['recipe'].category;
      const categoryHtml = wrapper.find('#category').html();
      expect(categoryHtml).toContain(category);

      const subcategory = wrapper.vm.$store.getters['recipe'].subCategory;
      const subcategoryHtml = wrapper.find('#subCategory').html();
      expect(subcategoryHtml).toContain(subcategory);

      const prepTime = wrapper.vm.$store.getters['recipe'].prepTime;
      const prepTimeHtml = wrapper.find('#prepTime').html();
      expect(prepTimeHtml).toContain(prepTime);

      const cookTime = wrapper.vm.$store.getters['recipe'].cookTime;
      const cookTimeHtml = wrapper.find('#cookTime').html();
      expect(cookTimeHtml).toContain(cookTime);

      const servings = wrapper.vm.$store.getters['recipe'].servings;
      const servingsHtml = wrapper.find('#servings').html();
      expect(servingsHtml).toContain(servings);

      const description = wrapper.vm.$store.getters['recipe'].description;
      const descriptionHtml = wrapper.find('#description').html();
      expect(descriptionHtml).toContain(description);
  })

  it('Calls "deleteRecipe" when "delete" button is clicked', async () => {
    wrapper.setData({currentUser: '5e7208cd77bd160016dd56a5'});
    const deleteRecipe = jest.fn();
    wrapper.setMethods({
        deleteRecipe,
    });
    const input = wrapper.find('#delete-recipe')
    input.trigger('click');
    await wrapper.vm.$nextTick();
    expect(deleteRecipe).toHaveBeenCalled();
  });
});