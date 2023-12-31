<template>
  <el-tooltip placement="bottom" content="搜索">
    <div
      class="action-item box-hover flex cursor-pointer items-center"
      @click="showDialog = true"
    >
      <base-icon name="local-search" size="20" class="mr-1" />
      <kbd class="DocSearch-Button-Key">
        <svg width="15" height="15" class="DocSearch-Control-Key-Icon">
          <path
            d="M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953"
            stroke-width="1.2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="square"
          ></path>
        </svg>
      </kbd>
      <kbd class="DocSearch-Button-Key">K</kbd>
    </div>
  </el-tooltip>
  <base-dialog
    v-model:visible="showDialog"
    top="80px"
    title=""
    class="search-dialog"
    min-height="200px"
    width="750px"
    closeOnPressEscape
    modal-type="dialog-blur"
  >
    <base-input
      v-model="searchKey"
      placeholder="搜索"
      prefix-icon="el-icon-Search"
      size="large"
    />
    <div class="nav-search-list mt-4" v-if="searchList.length > 0">
      <div
        class="nav-search-item flex items-center justify-between"
        :class="{ active: index === activeIndex }"
        v-for="(item, index) in searchList"
        :key="item.name"
        @click="handleRedirect"
        @mouseenter="handleMouseenter(index)"
      >
        <div class="flex items-center">
          <base-icon :name="item.meta.icon" size="20" />
          <span class="nav-search-item-title">{{ item.meta.title }}</span>
        </div>
        <base-icon name="local-confirm" size="20" />
      </div>
    </div>
    <el-empty description="暂无搜索结果" :image-size="64" v-else />
    <template #footer>
      <el-space :size="10" class="mt-5">
        <div class="flex items-center">
          <base-icon name="local-confirm" class="nav-search-icon" size="19" />
          <span>确认</span>
        </div>
        <div class="flex items-center">
          <base-icon name="local-up" class="nav-search-icon" size="19" />
          <base-icon name="local-down" class="nav-search-icon" size="19" />
          <span>切换</span>
        </div>
        <div class="flex items-center">
          <base-icon name="local-esc" class="nav-search-icon" size="19" />
          <span>关闭</span>
        </div>
      </el-space>
    </template>
  </base-dialog>
</template>

<script lang="ts" setup>
import { usePermissionStoreWithOut } from '/@/store/modules/permission'
import { useRouter } from 'vue-router'
import { deepClone } from '/@/utils/common'
import { getOS } from '/@/utils/navigator'
import { onKeyStroke, useDebounceFn } from '@vueuse/core'
const showDialog = ref(false)
const searchKey = ref('')
const activeIndex = ref(-1)

const searchList = ref<any[]>([])

const router = useRouter()

const { getRoute } = usePermissionStoreWithOut()
const handleSearchMenu = (val: string) => {
  const keyword = val?.trim().toLocaleLowerCase()
  if (!keyword) {
    searchList.value = []
    return
  }
  searchList.value = filterMenu(deepClone(unref(getRoute)), keyword)
  activeIndex.value = unref(searchList).length > 0 ? 0 : -1
}
const searchMenu = useDebounceFn(handleSearchMenu, 250)

const filterMenu = (menuList: any[], keyword: string, parent?: any) => {
  const res: any[] = []
  menuList.forEach((item) => {
    Object.assign(item.meta, {
      icon: parent ? parent.meta.icon : item.meta.icon,
      title: parent
        ? `${parent.meta.title} > ${item.meta.title}`
        : item.meta.title,
    })
    if (
      !item.meta.hidden &&
      item.meta.title.toLocaleLowerCase().includes(keyword)
    ) {
      res.push(item)
    }
    if (!item.meta.hideChildren && item.children) {
      res.push(...filterMenu(item.children, keyword, item))
    }
  })
  return res
}

const handleRedirect = () => {
  if (unref(searchList).length === 0 || unref(activeIndex) < 0) {
    return
  }
  showDialog.value = false
  router.push({
    name: unref(searchList)[unref(activeIndex)].name,
  })
  reset()
}

const handleMouseenter = (index: number) => {
  activeIndex.value = Number(index)
}

const handleUp = () => {
  if (!searchList.value.length) return
  activeIndex.value--
  if (activeIndex.value < 0) {
    activeIndex.value = searchList.value.length - 1
  }
}

const handleDown = () => {
  if (!searchList.value.length) return
  activeIndex.value++
  if (activeIndex.value > searchList.value.length - 1) {
    activeIndex.value = 0
  }
}

const reset = () => {
  searchKey.value = ''
  searchList.value = []
}
const isMac = getOS().includes('Mac')
const comboKey = isMac ? ['Cmd', 'K'] : ['alt', 'k']
onKeyStroke('Enter', handleRedirect)
onKeyStroke(comboKey, (e) => {
  if (!unref(showDialog)) {
    showDialog.value = true
  }
  e.preventDefault()
})
onKeyStroke('ArrowUp', handleUp)

onKeyStroke('ArrowDown', handleDown)

watch(searchKey, () => {
  searchMenu(searchKey.value)
})
</script>

<style lang="scss">
@use './index.scss';
</style>
