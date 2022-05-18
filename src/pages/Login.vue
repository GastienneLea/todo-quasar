<template>
  <q-page
    class="
      bg-light-green
      window-height window-width
      row
      justify-center
      items-center
    "
  >
    <div class="column">
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="username"
                type="text"
                label="username"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="light-green-7"
              size="lg"
              class="full-width"
              label="Login"
              @click="login"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'src/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Login',

  setup() {
    const username = ref('');
    const $store = useStore();
    const $router = useRouter();

    const login = () => {
      $store
        .dispatch('user/login', username.value)
        .then(() => {
          void $router.push('/tasks');
        })
        .catch((er) => {
          console.log(er);
        });
    };

    return { username, login };
  },
});
</script>

<style>
.q-card {
  width: 360px;
}
</style>
