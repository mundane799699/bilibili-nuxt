<script setup lang="ts">
import type { VideoItem } from "@/types/video";
// data是响应式数据，可以直接用于界面渲染
const { data: channelList } = await useFetch("/api/channel");

const { data: videoList } = await useFetch("/api/video");
const list = ref<VideoItem[]>([]);
const loading = ref(false);
const finished = ref(false);
let page = 1;
let pageSize = 20;
const onLoad = () => {
  loading.value = false;
  const data = videoList.value?.slice(
    (page - 1) * pageSize,
    page * pageSize
  ) as VideoItem[];
  list.value.push(...data);
  page++;
  if (videoList.value?.length === list.value.length) {
    finished.value = true;
  }
};
// 初始化加载 主动请求前20条数据用于首屏渲染，方便SEO抓取到数据
onLoad();
</script>

<template>
  <!-- 公共头部 -->
  <AppHeader />
  <!-- 频道模块 -->
  <van-tabs>
    <van-tab v-for="item in channelList" :key="item.id" :title="item.name" />
  </van-tabs>
  <!-- 视频列表 -->
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="去 bilibili App 看更多"
    @load="onLoad"
  >
    <div class="video-list">
      <AppVideo v-for="item in list" :key="item.bvid" :item="item" />
    </div>
  </van-list>
</template>

<style lang="scss">
// 视频列表
.video-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 5px;
}


</style>
