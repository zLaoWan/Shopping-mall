<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="() => goPageNo(pageNo - 1)">
      上一页
    </button>
    <button
      :class="{ active: pageNo == 1 }"
      v-if="startNumAndEndNum().start > 1"
      @click="() => goPageNo(1)"
    >
      1
    </button>
    <button v-if="startNumAndEndNum().start > 2">···</button>

    <button
      :class="{ active: pageNo == page }"
      v-for="(page, index) in startNumAndEndNum().end"
      :key="index"
      v-show="page >= startNumAndEndNum().start"
      @click="() => goPageNo(page)"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum().end < totalPage - 1">···</button>
    <button
      :class="{ active: pageNo == totalPage }"
      v-if="startNumAndEndNum().end < totalPage"
      @click="() => goPageNo(totalPage)"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="() => goPageNo(pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // 当前页面
  pageNo: Number,
  // 单个页面展示数
  pageSize: Number,
  // 总数据个数
  total: Number,
  // 连续页面
  continues: Number,
});
const emit = defineEmits(["getPageNo"]);

// 页面跳转
function goPageNo(page) {
  emit("getPageNo", page);
}

const totalPage = computed(() => Math.ceil(props.total / props.pageSize));

// 计算连续页码的起始数字与结束数字 连续页码数字至少是5
const startNumAndEndNum = () => {
  const { continues, pageNo } = props;
  // 定义两个起始值 结束值
  let start = 0,
    end = 0;
  // 当总页数小于连续页码多
  if (continues > totalPage) {
    start = 1;
    end = totalPage;
  } else {
    // 当总页数大于连续页码
    start = pageNo - parseInt(continues / 2);
    end = pageNo + parseInt(continues / 2);

    if (start < 1) {
      start = 1;
      end = continues;
    }
    if (end > totalPage.value) {
      start = totalPage.value - continues + 1;
      end = totalPage.value;
    }
  }
  return { start, end };
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background: #409eff;
}
</style>