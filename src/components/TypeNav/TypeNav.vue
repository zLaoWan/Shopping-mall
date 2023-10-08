<template>
  <div>
    <!-- 商品分类导航 -->
    <div class="type-nav">
      <div class="container">
        <!-- 事件委派|事件代理 -->
        <div @mouseleave="() => leaveShow()" @mouseenter="() => enterShow()">
          <h2 class="all">全部商品分类</h2>
          <transition name="sort">
            <!-- 三级联动 -->
            <div class="sort" v-show="show">
              <!-- 利用事件委派 + 编程式导航实现路由的跳转与传递参数 -->
              <div class="all-sort-list2" @click="goSearch">
                <div
                  class="item"
                  v-for="(c1, index) in categoryList"
                  :key="c1.categoryId"
                  :class="{ cur: currentIndex == index }"
                >
                  <h3 @mouseenter="() => changeIndex(index)">
                    <a
                      :data-categoryName="c1.categoryName"
                      :data-category1Id="c1.categoryId"
                      >{{ c1.categoryName }}</a
                    >
                  </h3>
                  <!-- 二级 三级分类 -->
                  <div
                    class="item-list clearfix"
                    :style="{
                      display: currentIndex == index ? 'block' : 'none',
                    }"
                  >
                    <div
                      class="subitem"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dl class="fore">
                        <dt>
                          <a
                            :data-categoryName="c2.categoryName"
                            :data-category2Id="c2.categoryId"
                            >{{ c2.categoryName }}</a
                          >
                        </dt>
                        <dd>
                          <em
                            v-for="c3 in c2.categoryChild"
                            :key="c3.categoryId"
                          >
                            <a
                              :data-categoryName="c3.categoryName"
                              :data-category3Id="c3.categoryId"
                              >{{ c3.categoryName }}</a
                            >
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, reactive, computed, ref } from "vue";
import { useStore, mapState } from "vuex";
import { useRouter, useRoute } from "vue-router";
import throttle from "lodash/throttle";

let currentIndex = ref(null);
let show = ref(true);
const store = useStore();
const router = useRouter();
const route = useRoute();
const mitt = defineEmits([""]);

const throttleIndex = throttle(function(index){
  currentIndex.value=index
}, 200)

// 鼠标移入修改响应式数据currentIndex属性
function changeIndex(index) {
  // index：树标杆移动到某一个一级分类的元素索引值
  // 正常情况 慢慢操作：鼠标进入 每一个一级分类h3 都会触发鼠标进入事件
  // 非常正常情况 快速操作：原一级分类都应该触发鼠标进入事件 但只有部分触发
  // 用户行为过快 导致浏览器反应不来 当前回调函数中有些大量业务 可能出现卡顿现象
  throttleIndex(index)
}

// 当鼠标离开 商品列表隐藏
function leaveShow() {
  currentIndex.value = -1;
  if (route.path != "/home") {
    show.value = false;
  }
}
// 当鼠标进入 商品列表显示
function enterShow() {
  show.value = true;
}

// 进行路由跳转的方法
function goSearch(event) {
  // 解决方案 编程式导航 + 事件委派
  let targetNode = event.target;
  let { categoryname, category1id, category2id, category3id } =
    targetNode.dataset;
  // console.log(categoryname, category1id, category2id, category3id);
  if (categoryname) {
    let locations = { name: "search" };
    let query = { categoryName: categoryname };

    if (category1id) {
      query.category1Id = category1id;
    } else if (category2id) {
      query.category2Id = category2id;
    } else {
      query.category3Id = category3id;
    }

    // 如果路由跳转的时候 带有params参数 也需要传递过去
    if (route.params) {
      locations.params = route.params;
      locations.query = query;
      router.push(locations);
    }
    // console.log(locations)
  }
}

onMounted(() => {
  // 当组件挂完毕 如果不是home路由组件 让show属性变为false 将typeNav进行隐藏
  if (route.path != "/home") {
    show.value = false;
  }
});

const categoryList = computed(() => store.state.home.categoryList);
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      // height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .cur {
          background: skyblue !important;
        }
      }
    }

    // 过渡动画的样式
    // 过渡动画开始状态
    .sort-enter-from {
      height: 0px !important;
    }
    // 过渡动画结束状态
    .sort-enter-to {
      height: 461px !important;
    }
    .sort-enter-active {
      transition: all 0.5s linear !important;
    }
  }
}
</style>