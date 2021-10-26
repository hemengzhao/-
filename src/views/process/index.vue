<template>
    <div class="rightMin">
       <el-input-number v-model="num" class="scaleNum" :min="10" :step="5" :max="150" size="small"/>
       <div :style="{display: 'inline-block', transform: `scale(${num / 100})`}">
            <Process :data='store.arrJson' end levelIndex='0'/>
       </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    // 1 发起人， 2 审批人， 3 抄送人  4条件分支
    import Process from './components/process.vue'
    import {useProcessStore} from '@/store/model/process.ts'
    const store = useProcessStore();
    const num = ref(100);

</script>
<style scoped lang='scss'>
    .scaleNum{
        position: fixed;
        top: 70px;
        right: 50px;
        z-index: 100;
    }
</style>