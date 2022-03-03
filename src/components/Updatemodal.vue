<template>
  <div class="bruh" @click.self="toggleModal2">
    <div class="card">
      <Form @submit="updatedProduct" :validation-schema="schema">
        <div class="form-group">
          <label for="name" style="padding-top: 13px">title</label>
          <Field
            name="name"
            type="text"
            class="form-content"
            :value="updateContent.name"
          />
          <div class="form-border"></div>
          <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="description" style="padding-top: 13px">description</label>
          <Field
            name="description"
            type="description"
            class="form-content"
            :value="updateContent.description"
          />
          <div class="form-border"></div>
          <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="img" style="padding-top: 13px">img</label>
          <Field
            name="img"
            type="img"
            class="form-content"
            :value="updateContent.img"
          />
          <div class="form-border"></div>
          <ErrorMessage name="img" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="price" style="padding-top: 13px">price</label>
          <Field
            name="price"
            type="price"
            class="form-content"
            :value="updateContent.price"
          />
          <div class="form-border"></div>
          <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group">
          <button
            id="submit-btn"
            class="btn btn-primary btn-block"
            @click="updateProduct(product)"
            :disabled="loading"
          >
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Add Product</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  props: ["updateContent"],
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      name: yup.string(),
      description: yup.string(),
      img: yup.string(),
      price: yup.string(),
    });
    return {
      loading: false,
      message: "",
      schema,
      showModal2: false,
    };
  },
  methods: {
    toggleModal2() {
      this.$emit("clicked");
    },
    updateProduct(product) {
      let _id = this.updateContent._id;
      this.loading = true;
      this.$store.dispatch("product/update", { ...product, _id }).then(
        () => {
          location.reload();
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style></style>
