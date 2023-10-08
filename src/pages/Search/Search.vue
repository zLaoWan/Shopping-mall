<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑 带有x的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="() => removeCategoryName()">x</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="() => removeKeyword()">x</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="() => removeTrademark()">x</i>
            </li>
            <!-- 平台售卖的属性值展示 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="() => removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="() => changeOrder('1')">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-up': isAcs, 'icon-down': isDesc }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="() => changeOrder('2')">
                  <a
                    >销量<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-up': isAcs, 'icon-down': isDesc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 在路由跳转时带id -->
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>&nbsp;
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >
                      {{ good.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="searchList.total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchSelector from "./SearchSelector/SearchSelector";
import {
  onBeforeMount,
  onMounted,
  computed,
  watch,
  ref,
  reactive,
  getCurrentInstance,
} from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

// 都3202年了 还用var？ const ？ let ？
// computed 里 你监听依赖数据必须也是数据响应式的 不然 computed也不会自动更新 看来你对响应式数据的理解还是太浅薄了 现在可以了 试试吧
const searchParams = reactive({
  category1Id: "",
  category2Id: "",
  category3Id: "",
  categoryName: "",
  keyword: "",
  order: "1:desc",
  pageNo: 1,
  pageSize: 3,
  props: [],
  trademark: "",
});
const store = useStore();
const route = useRoute();
const router = useRouter();
const cxt = getCurrentInstance();
const bus = cxt.appContext.config.globalProperties.$bus;

function getData() {
  store.dispatch("getSearchList", searchParams);
}
// 删除分类的名字
function removeCategoryName() {
  // 带给服务器的参数说明可有可无 属性为空的字符串还会将相应字段带给服务器 但如果为undefined 当前字段不会带给服务器
  searchParams.categoryName = undefined;
  searchParams.category1Id = undefined;
  searchParams.category2Id = undefined;
  searchParams.category3Id = undefined;
  getData();
  // 地址栏需要修改 路由跳转到自己 虽然会删除query 但params也会被删除 需要继续携带params
  if (route.params) {
    router.push({ name: "search", params: route.params });
  }
}
// 删除关键字
function removeKeyword() {
  // 给服务器带的参数searchParams的keyword置空
  searchParams.keyword = undefined;
  getData();
  // 通知兄弟组件清除关键字
  bus.emit("clear");
  // 进行路由跳转
  if (route.query) {
    router.push({ name: "search", query: route.query });
  }
}
// 自定义事件回调
function trademarkInfo(trademark) {
  // 整理品牌字段的参数 “ID:品牌名称
  searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
  getData();
}
// 删除品牌的信息
function removeTrademark() {
  searchParams.trademark = undefined;
  getData();
}
// 收集平台属性的回调
function attrInfo(attr, attrValue) {
  // 格式 ["属性ID:属性值:属性名"]
  let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
  // 数组去重
  if (searchParams.props.indexOf(props) == -1) searchParams.props.push(props);
  getData();
}
// 删除售卖的属性值
function removeAttr(index) {
  searchParams.props.splice(index, 1);
  getData();
}

// 排序的操作  flag代表当前点击对象
function changeOrder(flag) {
  // 获取存储状态
  let originFlag = searchParams.order.split(":")[0];
  let originSort = searchParams.order.split(":")[1];
  // 准备一个新的order属性
  let newOrder = "";
  if (flag == originFlag) {
    newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
  } else {
    newOrder = `${flag}:desc`;
  }
  // 将新的order赋予searchParams
  searchParams.order = newOrder;
  getData();
}
function getPageNo(page) {
  searchParams.pageNo = page;
  getData();
}

const isOne = computed(() => searchParams.order.indexOf("1") !== -1);
const isTwo = computed(() => searchParams.order.indexOf("2") !== -1);
const isAcs = computed(() => searchParams.order.indexOf("asc") !== -1);
const isDesc = computed(() => searchParams.order.indexOf("desc") != -1);

// 在挂载之前调用一次
onBeforeMount(() => {
  // 在请求发送前 把接口需要传递的参数整理
  // searchParams = { ...route.parent, ...route.query }
  Object.assign(searchParams, route.query, route.params);
});

onMounted(() => {
  getData();
});

watch(
  // 监听路由信息是否发生变化 若发生变化 再发起请求
  route,
  (newValue, oldValue) => {
    // 整理带给服务器的参数
    Object.assign(searchParams, route.query, route.params);
    // 再次发起ajax请求
    getData();

    // 每次亲求玩 应该把1 2 3级id清空 接收下一次的1 2 3
    // 分类名字于关键字不用清理 每一次路由发生变化 都回赋予新的数据
    searchParams.category1Id = undefined;
    searchParams.category2Id = undefined;
    searchParams.category3Id = undefined;
  }
);

const searchList = computed(() => store.state.search.searchList);
const goodsList = computed(() => store.getters["goodsList"]);
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>