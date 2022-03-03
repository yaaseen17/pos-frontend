<template>
  <div class="form-bg">
    <div class="container">
      <div class="row">
        <div class="">
          <Form
            @submit="handleRegister"
            :validation-schema="schema"
            class="form-horizontal"
          >
            <span class="heading">Signup</span>
            <div v-if="!successful">
              <div class="form-group">
                <label for="name">Username</label>
                <Field
                  name="name"
                  type="text"
                  id="inputEmail3"
                  class="form-control"
                />
                <ErrorMessage name="username" class="error-feedback" />
                <i class="fa fa-user"></i>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <Field name="email" type="email" class="form-control" />
                <ErrorMessage name="email" class="error-feedback" />
              </div>
              <div class="form-group help">
                <label for="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  id="inputPassword3"
                  class="form-control"
                />
                <ErrorMessage name="password" class="error-feedback" />
                <i class="fa fa-lock"></i>
                <a href="#" class="fa fa-question-circle"></a>
              </div>
              <div class="form-group">
                <div class="main-checkbox">
                  <input
                    type="checkbox"
                    value="None"
                    id="checkbox1"
                    name="check"
                  />
                  <label for="checkbox1"></label>
                </div>
                <span class="text">Remember me</span>
                <button
                  type="submit"
                  class="btn btn-default"
                  :disabled="loading"
                >
                  <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  <span>Signup</span>
                </button>
              </div>
            </div>
          </Form>
          <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
          >
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      name: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>
<style scoped>
.form-bg {
  background: #00b4ef;
  padding: 20px;
  border-radius: 10%;
  width: fit-content;
  margin: 100px auto;
}
.form-horizontal {
  background: #fff;
  padding-bottom: 40px;
  border-radius: 15px;
  text-align: center;
}
.form-horizontal .heading {
  display: block;
  font-size: 35px;
  font-weight: 700;
  padding: 35px 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 30px;
}
.form-horizontal .form-group {
  padding: 0 40px;
  margin: 0 0 25px 0;
  position: relative;
}
.form-horizontal .form-control {
  background: #f0f0f0;
  border: none;
  border-radius: 20px;
  box-shadow: none;
  padding: 0 20px 0 45px;
  height: 40px;
  transition: all 0.3s ease 0s;
}

.form-horizontal .form-control:focus {
  background: #e0e0e0;
  box-shadow: none;
  outline: 0 none;
}
.form-horizontal .form-group i {
  position: absolute;
  top: 12px;
  left: 60px;
  font-size: 17px;
  color: #c8c8c8;
  transition: all 0.5s ease 0s;
}
.form-horizontal .form-control:focus + i {
  color: #00b4ef;
}
.form-horizontal .fa-question-circle {
  display: inline-block;
  position: absolute;
  top: 12px;
  right: 60px;
  font-size: 20px;
  color: #808080;
  transition: all 0.5s ease 0s;
}
.form-horizontal .fa-question-circle:hover {
  color: #000;
}
.form-horizontal .main-checkbox {
  float: left;
  width: 20px;
  height: 20px;
  background: #11a3fc;
  border-radius: 50%;
  position: relative;
  margin: 5px 0 0 5px;
  border: 1px solid #11a3fc;
}
.form-horizontal .main-checkbox label {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}
.form-horizontal .main-checkbox label:after {
  content: "";
  width: 10px;
  height: 5px;
  position: absolute;
  top: 5px;
  left: 4px;
  border: 3px solid #fff;
  border-top: none;
  border-right: none;
  background: transparent;
  opacity: 0;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.form-horizontal .main-checkbox input[type="checkbox"] {
  visibility: hidden;
}
.form-horizontal .main-checkbox input[type="checkbox"]:checked + label:after {
  opacity: 1;
}
.form-horizontal .text {
  float: left;
  margin-left: 7px;
  line-height: 20px;
  padding-top: 5px;
  text-transform: capitalize;
}
.form-horizontal .btn {
  float: right;
  font-size: 14px;
  color: #fff;
  background: #00b4ef;
  border-radius: 30px;
  padding: 10px 25px;
  border: none;
  text-transform: capitalize;
  transition: all 0.5s ease 0s;
}
@media only screen and (max-width: 479px) {
  .form-horizontal .form-group {
    padding: 0 25px;
  }
  .form-horizontal .form-group i {
    left: 45px;
  }
  .form-horizontal .btn {
    padding: 10px 20px;
  }
}
</style>
