<template>  
    <el-menu
        :collapse="false"
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        style="width: 250px"
      >
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span>审批模版</span>
        </el-menu-item>
       
    </el-menu>
</template>
<script setup lang="ts">

</script>
<style scoped lange='sss'>
    .nav{
        width: 300px;

    }
</style>