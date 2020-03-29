
import Parallax from "../users/components/shared/Parallax.vue";
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component(Parallax.name, Parallax);
  }
};

export default GlobalComponents;
