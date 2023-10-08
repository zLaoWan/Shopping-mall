<template>
  <div>
    <h1>效果一： 显示TODO列表时 已完成的TODO为绿色</h1>

    <List :todos="todos">
      <template v-slot="{ todo }">
        <h1 :style="{ color: todo.isComplete ? 'green' : 'red' }">
          {{ todo.text }}
        </h1>
      </template>
    </List>

    <h1>效果二： 显示TODO列表时 带序号 TODO的颜色为蓝绿搭配</h1>
    <List1 :todos="todos">
      <template v-slot="todo">
          {{ todo }}
      </template>
    </List1>
  </div>
</template>

<script type="text/ecmascript-6">
import List from "./List";
import List1 from "./List1";
export default {
  name: "ScopeSlotTest",
  data() {
    return {
      todos: [
        { id: 1, text: "AAA", isComplete: false },
        { id: 2, text: "BBB", isComplete: true },
        { id: 3, text: "CCC", isComplete: false },
        { id: 4, text: "DDD", isComplete: false },
      ],
    };
  },

  components: {
    List,
    List1
  },
};
</script>
