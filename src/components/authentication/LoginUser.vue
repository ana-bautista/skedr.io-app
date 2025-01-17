
<template>
  <div>
    <v-progress-linear
      v-if="protectedUI"
      :indeterminate="true"
      color="accent"
      height="3"
      class="my-0 topFloat"
    />
    <v-toolbar dark color="primary">
      <v-toolbar-title v-t="'LoginUser.login'"/>
      <v-spacer/>
      <language-selector/>
    </v-toolbar>
    <v-card-text class="px-4 pb-4 pt-3">
      <form>
        <v-text-field
          v-model="form.username"
          :disabled="protectedUI"
          :rules="[rules.required, rules.email]"
          :label="$t('label.email')"
          autocomplete="username"
          class="data-hj-whitelist"
          required
          @update:error="username"
        />

        <v-text-field
          v-model="form.password"
          :append-icon="passVisibility ? 'visibility' : 'visibility_off'"
          :type="passVisibility ? 'password' : 'text'"
          :disabled="protectedUI"
          :rules="[rules.required, rules.lowerCaseLetters, rules.upperCaseLetters, rules.numbers, rules.specialCharacters, rules.length]"
          :label="$t('label.password')"
          required
          autocomplete="current-password"
          @click:append="() => (passVisibility = !passVisibility)"
          @update:error="password"/>
      </form>
    </v-card-text>
    <v-card-actions class="px-4">
      <v-spacer />
      <v-btn
        :disabled="!formIsValid || protectedUI"
        text-xs-right
        color="primary"
        @click="handleSubmit">
        {{ $t('btn.continue') }}
      </v-btn>
    </v-card-actions>

    <i18n
      path="AuthenticationFooter.reset_or_try_demo"
      tag="p"
      class="text-xs-center mb-0 grey--text subheading pb-2">
      <router-link :to="{name: 'ResetPassword'}" place="reset_password">{{ $t('ResetPassword.title') }}</router-link>
      <a
        place="demo_account"
        href="#"
        @click.prevent="setDemoAccount">Demo Account</a>
    </i18n>
    <p class="text-xs-center mb-0 grey--text subheading">
      {{ $t('AuthenticationFooter.not_account') }} <router-link :to="{name: 'Signup'}">{{ $t('AuthenticationFooter.sign_up') }}</router-link>
    </p>
  </div>
</template>

<script>
import { validations } from '@/mixins'
import { mapActions } from 'vuex'
import LanguageSelector from '@/components/layout/LanguageSelector'

export default {
  components: { LanguageSelector },
  mixins: [validations],
  data: () => {
    const defaultForm = Object.freeze({
      username: '',
      validUsername: false,
      password: '',
      validPassword: false
    })

    return {
      form: Object.assign({}, defaultForm),
      protectedUI: false,
      passVisibility: true
    }
  },
  computed: {
    formIsValid() {
      return this.form.validUsername && this.form.validPassword
    }
  },
  mounted() {
    const { demo = false } = this.$route.params
    if (demo === true) {
      this.setDemoAccount()
    }
  },
  methods: {
    ...mapActions({
      loginUser: 'user/loginUser'
    }),
    handleSubmit: async function() {
      this.protectedUI = true
      try {
        let path = (await this.loginUser(this.form)) ? '/' : '/verify'
        const { redirect = '' } = this.$route.query
        if (redirect !== '') {
          path = redirect
        }
        this.$store.dispatch('message/add', this.$i18n.t('LoginUser.login_successful'))
        this.$router.push(path)
      } catch (err) {
        this.$store.dispatch('message/add', err.message)
        this.protectedUI = false
      }
    },
    username(hasError) {
      this.form.validUsername = !hasError
    },
    password(hasError) {
      this.form.validPassword = !hasError
    },
    setDemoAccount() {
      this.form.username = 'info@skedr.io'
      this.form.password = 'Passw0rd!'
    }
  }
}
</script>
