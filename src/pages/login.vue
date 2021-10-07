<template lang="pug">
div.t2s-cc-login
  div.t2s-cc-login--main-container
    div.t2s-cc-login--sidebar
      div.t2s-cc-login__header
        img.logo-header(src="../static/img/logo.svg", valt="Target2Sell")
      div.t2s-cc-login__wrapper
        h2 {{('Sign in')}}
        el-alert(show-icon, type="warning", , v-if="authError")
        br
        el-form.t2s-cc-login__form(ref="form", :model="user", :rules="rules", @keyup.enter.native="submitLogin")
          el-form-item(prop="login")
            el-input#username(:placeholder="'login'", type="text", v-model="user.login")
              template(#prepend)
                span.fa.fa-user
            span.t2s-cc-error-label {{ 'wrong user' }}
          el-form-item(prop="password")
            el-input#password(:placeholder="('password')", type="password", v-model="user.password")
              template(#prepend)
                span.fa.fa-lock
            span.t2s-cc-error-label {{ ('wrong password') }}
          div.t2s-cc-login__form--password-reset
            el-button(type="text" ref="forgotPassword" @click="showAskResetPassword") {{ ('forgot password') }}
          el-form-item
            el-button#submit.t2s-cc-confirm.bold(type="primary", @click="submitLogin") {{ ('confirm') }}
      span.t2s-cc-version version&nbsp;
        i {{ version }}
    div.t2s-cc-login-background
  el-dialog(:title="('forgot password')", :visible.sync="askResetPassword", width="40%")
  el-dialog(:title="('forgot password')", :visible.sync="resetPassword", width="40%" )
</template>

<script>
import _ from 'lodash'
// import { mapGetters, mapActions } from 'vuex'
// import AskResetPassword from '@/components/AskResetPassword'
// import ResetPassword from '@/components/ResetPassword'

export default {
  name: 'login',
  data () {
    return {
      httpConfig: {
        emulateJSON: true,
        headers: {
          'X-CC-API': 'CCAPITOKEN'
        }
      },
      user: {
        login: '',
        password: ''
      },
      rules: {
        login: [
          {required: true, message: ('required field'), trigger: 'blur'}
        ],
        password: [
          {required: true, message: ('required field'), trigger: 'blur'}
        ]
      },
      askResetPassword: false,
      resetPassword: false
    }
  },
  computed: {
    // ...mapGetters(['version', 'authError', 'currentCustomer', 'invalidToken', 'userName'])
  },
  async created () {
    if (!_.isNil(this.$route.query.token)) {
      await this.getTokenInfo({token: this.$route.query.token})
      if (_.isNil(this.invalidToken) || _.isEmpty(this.invalidToken)) {
        this.resetPassword = true
      } else {
        this.$notify({
          type: 'error',
          title: this.$t('reset password'),
          message: this.$t(this.invalidToken)
        })
      }
    }
  },
  methods: {
    // ...mapActions([
    //   'login',
    //   'setAuthError',
    //   'getTokenInfo'
    // ]),
    showAskResetPassword () {
      this.askResetPassword = true
    },
    hiddenAskResetPassword () {
      this.askResetPassword = false
    },
    hidePwdResetWindow (newPassword) {
      this.resetPassword = false
      this.$router.push({query: ''})
      this.user.login = this.userName
      this.user.password = newPassword
      setTimeout(() => {
        this.submitLogin()
      }, 1400)
    },
    submitLogin () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$http.post('/rest/1.1/user/auth', this.user, this.httpConfig)
            .then(({body}) => {
              let data = body.body
              data.user = this.user.login
              this.login(data)
            }, ({body}) => {
              this.setAuthError(body.errorLabel)
              return false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
@use 'sass:math';
 @import "../sass/utils";


$login-width: math.percentage(math.div(480, ($base-width)));

.t2s-cc-login {
  &__form {
    &--password-reset {
      text-align: right;
    }
  }
  .el-alert {
    text-align: left;
  }

  &--main-container {
    background-color: $robins-egg-blue;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-content: stretch;
  }

  &--sidebar {
    width: $login-width;
    background-color: $white;
    border: 1px solid $athens-gray;
    box-shadow: 0 0 10px rgba(0, 0, 0, .25);
    padding: pxtoem(25) pxtoem(40) pxtoem(25) pxtoem(30);
    position: relative;

    .t2s-cc-error-label {
      margin: 0 pxtoem(32);
    }

    .t2s-cc-version {
      position: absolute;
      bottom: 25px;
      font-size: pxtoem(14);
      color: $oslo-gray;
    }
  }

  &__header {
    height: pxtoem(28);
    text-align: left;

    .logo-header {
      height: 100%;
    }
  }

  &__wrapper {
    margin: pxtoem(180) 0 pxtoem(30);
    padding: 0 pxtoem(5) pxtoem(15);
    text-align: center;

    h2 {
      font-size: pxtoem(46);
      font-weight: 300;
      font-family: $base-font-family;
      line-height: 1.5;
      position: relative;

      &:after {
        content: "";
        width: math.percentage(math.div(55, (408)));
        border-bottom: 1px dotted $iron;
        position: absolute;
        bottom: -25px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

  }
  &-background {
    background: url('../static/img/bg.jpg') no-repeat left top;
    width: (100 - $login-width);
  }
}

</style>
