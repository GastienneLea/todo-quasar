<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        @keyup.enter="addTask"
        filled
        v-model="newTask"
        placeholder="Add Task"
        dense
        bg-color="white"
        class="col"
        square
      >
        <template v-slot:append>
          <q-btn round dense flat icon="add" @click="addTask" />
        </template>
      </q-input>
    </div>
    <q-list separator bordered class="bg-white">
      <q-item
        v-for="task in tasks"
        :key="task.title"
        :class="{ 'done bg-blue-1': task.isCompleted }"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-checkbox
            v-model="task.isCompleted"
            color="primary"
            @update:model-value="toggleTaskStatus(task)"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn
            @click.stop="deleteTask(task)"
            flat
            round
            color="primary"
            icon="delete"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="!tasks.length" class="no-tasks absolute-center">
      <q-icon name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">No Tasks</div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Task, User } from 'src/models';
import { User as UserInterface } from 'src/store/user';
import { useStore } from 'src/store';
import { defineComponent, ref, onMounted, computed } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const newTask = ref('');
    const user = ref<User | null>(null);
    const $store = useStore();
    const storeUser = $store.getters['user/getUser'] as UserInterface;
    const tasks = computed(() => {
      return user.value?.tasks || [];
    });

    const castUser = () => {
      return user.value as User;
    };

    const addTask = () => {
      if (newTask.value === '') return;

      let task = new Task({ title: newTask.value });
      user.value?.tasks.push(task);

      const userObj = castUser();

      void userObj.save({ with: 'tasks' });

      newTask.value = '';
    };

    const deleteTask = (task: Task) => {
      task.isMarkedForDestruction = true;
      void castUser().save({ with: 'tasks' });
    };

    const toggleTaskStatus = (task: Task) => {
      void task.save();
    };

    onMounted(async () => {
      user.value = (await User.includes('tasks').find(storeUser.id)).data;
    });

    return { tasks, addTask, newTask, toggleTaskStatus, deleteTask };
  },
});
</script>
