<template>
    <v-app>
      <div class="login-box">
        <v-card class="login-from">
          <v-card-title class="login-title">SingUp</v-card-title>
          <v-card-subtitle>ユーザー情報をご入力ください</v-card-subtitle>
          <v-btn text color="light-blue" to="singup">ログインはこちら</v-btn>
          <v-form ref="form" v-model="valid" lazy-validation>


            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="UserName"
              required
            ></v-text-field>
  
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
  
            <v-btn color="success" 
            class="login-btn"
            @click="submit"
            :disabled="idValid"
            >
              SingUp
            </v-btn>

            <v-btn>
              CLEAR
            </v-btn>
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
  .error-message {
    margin-top: 20px;
  }
  .success-message {
    margin-top: 20px;
  }
  </style>
  
  <script>
    import firebase from "@/firebase/firebase";

    export default {
      name:'SingUp',
      data: () => ({
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        password:'',
        email: '',
        message: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        errorMessage:''
      }),
      mounted(){
        if(localStorage.message){
            this.message = localStorage.message;
            this.message ='';
        }
      },
      computed: {
        idValid() {
          return !this.valid;
        }
      },
      methods: {
        validate () {
          this.$refs.form.validate()
        },
        reset () {
          this.$refs.form.reset()
        },
        resetValidation () {
          this.$refs.form.resetValidation()
        },
        submit(){
            firebase.auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(async (result)=> {
                console.log("success", result)
                await result.user.updateProfile(
                    {displayName: this.name}
                );
               
                localStorage.message ="新規作成に成功しました。";
                this.$router.push('/login');
            })
            .catch((error)=>{
                console.log("fali", error)
                this.errorMessage = "ユーザーの新規作成に失敗しました。";
            })
        }
      },
    }
  </script>
  