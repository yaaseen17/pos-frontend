<template>
  <h1>hos</h1>
  <div v-for="product in products" :key="product._id">
    <img :src="product.img" alt="" />
  </div>
</template>

<script>
export default {
  name: "products",
  data() {
    return {
      products: [],
    };
  },

  mounted() {
    fetch("https://pointos-backend.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => (this.products = data))
      .catch((err) => concole.log(err.message));
  },
};
</script>

<style>
img {
  height: 100px;
  width: 100px;
}
</style>
