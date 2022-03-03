<template>
  <section class="the">
    <h1>Lets Sell or Buy</h1>
    <br />
    <button id="submit-btn" class="addp" @click="toggleModal">
      ADD A PRODUCTS
    </button>
    <div class="container1">
      <div v-for="(product, i) in content" :key="product.id" class="product">
        <div class="card">
          <div class="content">
            <ul class="sci">
              <div class="card-content">
                <img :src="product.img" />
                <h4>{{ product.name }}</h4>
                <p>{{ product.description }}</p>
                <p>R{{ product.price }}</p>
                <div class="d-flex mb-3">
                  <input
                    type="number"
                    class="form-control"
                    value="1"
                    min="1"
                    :id="`qty${i}`"
                  />
                </div>
                <div class="d-flex justify-content-end card-footer">
                  <button
                    id="edit"
                    type="button"
                    class="btn btn-warning w-50"
                    @click="toggleModal2"
                  >
                    Edit
                  </button>

                  <button
                    id="delete"
                    type="button"
                    class="btn btn-danger w-70 ms-3"
                    @click="deleteProduct(product._id)"
                  >
                    Delete
                  </button>
                  <div class="access">
                    <button
                      class="btn"
                      @click="addToCart(product, i)"
                      style="font-size: 25px"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fill="currentColor"
                        class="bi bi-cart"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <Modal @clicked="toggleModal" v-if="showModal" />
      <Updatemodal
        :updateContent="updateContent"
        @clicked="toggleModal2"
        v-if="showModal2"
      />
    </div>
  </section>
</template>

<script>
import Modal from "../components/Modal.vue";
import UserService from "../services/user.service";
import Updatemodal from "../components/Updatemodal.vue";
export default {
  components: { Modal, Updatemodal },
  name: "Products",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      content: "",
      showModal: false,
      showModal2: false,
      UpdateContent: "",
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    toggleModal2() {
      this.showModal2 = !this.showModal2;
    },
    changeUpdater(i) {
      this.updateContent = this.content[i];
      this.showModal2 = !this.showModal2;
    },
    deleteProduct(product) {
      this.loading = true;
      this.$store.dispatch("product/delete", product).then(
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
    addToCart(product, i) {
      let qty = document.querySelector(`#qty${i}`).value;
      fetch("https://pointos-backend.herokuapp.com/cart/" + product._id, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
        body: JSON.stringify({ qty: parseInt(qty) }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          localStorage.setItem("user", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },

  mounted() {
    this.loading = true;
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>

<style scoped>
h1 {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
img {
  height: 150px;
  width: 150px;
}
.the {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: white;
}
.container1 {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 40px 0;
}

.container1 .card {
  position: relative;
  width: 300px;
  height: fit-content;
  background: rgba(255, 255, 255, 0.05);
  margin: 20px;
  box-shadow: 0 15px 35px rgba(95, 91, 91, 0.5);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
}

.container1 .card .content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: 0.5s;
  margin-top: 500px;
  height: fit-content;
}

.container1 .card:hover .content {
  transform: translateY(-20px);
}

.container1 .card .content .imgBx {
  position: relative;
  width: 150px;
  height: 200px;
  overflow: hidden;
}

.container1 .card .content .imgBx img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.container1 .card .content .contentBx h3 {
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  margin: 20px 0 10px;
  line-height: 1.1em;
}

.container1 .card .content .contentBx h3 span {
  font-size: 12px;
  font-weight: 300;
  text-transform: initial;
}

.container1 .card .sci {
  position: absolute;
  bottom: 50px;
  display: flex;
}

.container1 .card .sci li {
  list-style: none;
  margin: 0 10px;
  transform: translateY(40px);
  transition: 0.5s;
  opacity: 0;
}
.addp {
  width: fit-content;
  border: 2px solid #00b4ef;
  border-radius: 10px;
  margin-left: 10%;
  background-color: #00b4ef;
  font-weight: 500;
}
.container1 .card:hover .sci li {
  transform: translateY(0px);
  opacity: 1;
}

.container1 .card .sci li a {
  color: #fff;
  font-size: 20px;
}
</style>
