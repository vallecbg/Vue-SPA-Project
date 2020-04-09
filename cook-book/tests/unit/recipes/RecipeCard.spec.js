import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import {
  default as recipeModule,
  getRecipe
} from '../../../src/recipes/recipesState';
import { default as userModule, getUser } from '../../../src/users/usersState';
import RecipeCard from '../../../src/recipes/components/RecipeCard.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('Testing RecipeCard.vue', () => {
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

    mutations = recipeModule.mutations;

    actions = {
      [getRecipe]: jest.fn(),
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
      propsData: {
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
      }
    };

    wrapper = shallowMount(RecipeCard, options);
  });

  it('Is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('Renders the course title', () => {
    const recipeTitle = wrapper.vm.$options.propsData.recipe.title;
    const htmlElement = wrapper.find('#title').html();
    expect(htmlElement).toContain(recipeTitle);
  });

  it('Renders the creator name correctly', () => {
    const creatorName = wrapper.vm.$store.getters['user'].name;
    const htmlElement = wrapper.find('#user-name').html();
    expect(htmlElement).toContain(creatorName);
  })

  it('Renders the image url correctly', () => {
    const imageUrl = wrapper.vm.$options.propsData.recipe.imageUrl;
    const htmlElement = wrapper.find('#image-url').html();
    expect(htmlElement).toContain(imageUrl);
  })

  it('Renders the image url correctly', () => {
    const description = wrapper.vm.$options.propsData.recipe.description;
    const htmlElement = wrapper.find('#description').html();
    expect(htmlElement).toContain(description);
  })

  it('Redirect to "/recipes/:id" after the button "Read more" is clicked', async () => {
    const recipe = wrapper.vm.$options.propsData.recipe;
    const route = `/recipes/${recipe._id}`;
    wrapper.find('#read-more').trigger('click');
    await wrapper.vm.$nextTick();
    wrapper.vm.$router.push(route);
    expect(wrapper.vm.$route.path).toEqual(route);
  });
});