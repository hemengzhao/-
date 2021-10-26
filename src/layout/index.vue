<template> 
    <el-container>
      <el-header><TopNav/></el-header>
      <el-container>
        <el-aside ><Navbar/></el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
<script setup lang="ts">
    import TopNav from "./components/TopNav.vue"
     import Navbar from "./components/Navbar.vue"
</script>
<style scoped>
    .el-container{
        height: 100vh;
        overflow: hidden;
    }
    .el-header {
        background-color: #b3c0d1;
        color: var(--el-text-color-primary);
        text-align: center;
        height: auto;
        padding: 0;
    }
    .el-aside {
        background-color: #fff;
        color: var(--el-text-color-primary);
        text-align: center;
        width: auto;
    }

    .el-main {
        background-color: #e9eef3;
        color: var(--el-text-color-primary);
        text-align: center;
    }
</style>