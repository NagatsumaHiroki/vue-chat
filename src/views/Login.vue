<template>
  <v-app>
    <div class="login-box">
      <v-card class="login-from">
        <v-card-title class="login-title">Login</v-card-title>
        <v-card-subtitle>ユーザー情報をご入力ください</v-card-subtitle>
        <v-btn text color="light-blue" to="singup">新規登録はこちら</v-btn>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            type="password"
            label="Password"
            required
          ></v-text-field>

          <v-btn
            color="success"
            class="login-btn"
            :disabled="idValid"
            @click="submit"
          >
            LOGIN
          </v-btn>
          <v-btn> CLEAR </v-btn>

          <v-alert
            dense
            text
            type="success"
            class="success-message"
            v-if="message"
          >
            {{ message }}
          </v-alert>
          <v-alert
            dense
            outlined
            type="error"
            class="error-message"
            v-if="errorMessage"
          >
            {{ errorMessage }}
          </v-alert>
        </v-form>
      </v-card>
    </div>
  </v-app>
</template>
<style scoped>
.login-from {
  margin: 150px;
  padding: 30px;
}
.login-box {
  width: 50%;
  margin: 0px auto;
  padding: 30px;
}
.login-title {
  display: inline-block;
}
.login-btn {
  margin-right: 20px;
}
</style>

<script>
import firebase from "@/firebase/firebase";

export default {
  name: "Login",
  data: () => ({
    valid: true,
    password: "",
    email: "",
    message: "",
    errorMessage: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  mounted() {
    if (localStorage.message) {
      this.message = localStorage.message;
      this.message = "";
    }
  },
  computed: {
    idValid() {
      return !this.valid;
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          console.log(result);

          console.log('--------URL------');
          console.log(result.user.photoURL);

          const auth = {
            displayName: result.user.displayName,
            email:result.user.email,
            uid: result.user.uid,
            refreshToken: result.user.refreshToken,
            photoURL: result.user.photoURL
          }

          sessionStorage.setItem('user', JSON.stringify(auth));
          this.$router.push('/');
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = "ログインに失敗しました。";
        });
    },
  },
};
</script>
