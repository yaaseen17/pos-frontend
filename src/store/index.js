import { createStore } from "vuex";
import { auth } from "./auth.module";
import { product } from "./product.module";
const store = createStore({
  modules: {
    auth,
    product,
  },
});
export default store;
