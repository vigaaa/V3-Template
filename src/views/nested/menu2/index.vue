<template>
  <base-page>
    <base-box>
      <el-space>
        嵌套菜单2
        <el-rate v-model="value" class="ml10" />
      </el-space>
      <base-input v-model="inputValue" />
    </base-box>
  </base-page>
</template>

<script lang="ts" setup>
const value = ref(2)
const inputValue = ref('嵌套菜单2')
</script>

<style scoped></style>
