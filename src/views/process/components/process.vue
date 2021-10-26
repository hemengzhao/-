<template>
    <div class="process">
       
        <div v-for="(item, k) in data" :key='k'>
            <!-- 条件分支 -->
            <template v-if="item.type == 4">
                <NextLine :data='item' :type='0' :levelIndex='levelIndex' :index='k'/>
                 <div class="condition">
                     <el-button round class="addProcess" @click="addProcessFn(levelIndex == 0 ? k + '' : levelIndex + '-' + k, item.children.length)">添加条件</el-button>
                    <div class="branch" v-for="(_item, i) in item.children" :key='i'>
                        <div class="_line"></div>
                        <ConditionContent :right='item.children.length' :index='i + 1' 
                        @deleteFn='deleteFn(i, levelIndex == 0 ? k + "" : levelIndex + "-" + k, item.children.length)' 
                        @adjustLeftFn="adjustFn(0, i, levelIndex == 0 ? k + '' : levelIndex + '-' + k)" 
                        @adjustRightFn="adjustFn(1, i, levelIndex == 0 ? k + '' : levelIndex + '-' + k)"/>

                        <!-- 组件递归渲染 -->
                        <Process :data='_item.children' :levelIndex='levelIndex == 0 ? (k + "-" + i) : levelIndex + "-" + (k + "-" + i)'/>
                    </div>
                    
                </div>
            </template>
            <template v-else>
                <NextLine :data='item' :levelIndex='levelIndex' :index='k' v-if='item.type !== 1' :type='item.type  == 2 ? 1 : 0' />
                <UserBack :type='item.type' :levelIndex='levelIndex' :index='k'/>
            </template>
        </div>
        <NextLine :type='end ? 2 : 0'  :levelIndex='levelIndex' :index='data.length + 1'/>
        <div v-if="end">流程结束</div>
       
    </div>
</template>

<script setup lang="ts">

    // 1 发起人， 2 审批人， 3 抄送人  4条件分支
    import UserBack from './userBack.vue'
    import NextLine from './next.vue'
   
    import ConditionContent from "./conditionContent.vue"

    import {useProcessStore} from '@/store/model/process'
    import {swapArray} from '@/uilts/arrayFun';
    import {computed} from 'vue'
    const props = defineProps({
        data: Array,
        end: Boolean, //结束流程
        levelIndex: String //数据所在层级索引    1-2-3（arr[1][2][3]）
    })
      const store = useProcessStore();

    // 添加条件分支
    const addProcessFn = (levelIndex: string, index: number) => {
        let arr: any[] = JSON.parse(JSON.stringify(store.arrJson));
        if(levelIndex.indexOf('-') > 0){
            let a = arr;
            levelIndex.split('-').map((val: any) => {
                a = a[Number(val)].children;
            });
            a.push({
                name: '条件' + index + 1,
                children: [],
            });
        } else {
            arr[Number(levelIndex)].children.push({
                name: '条件' + index + 1,
                children: [],
            });
        }

        store.setArrJson(arr)
    }

    // 删除条件
    const deleteFn = (index: number, levelIndex: string, length: number) => {
        let arr: any[] = JSON.parse(JSON.stringify(store.arrJson));
        let a = arr;
        if(length <= 2){ //当条件分支只有两个时，删除条件会直接删除这个条件分支
              
               let _i = levelIndex.split('-').length - 1; // 获取层级长度
                levelIndex.split('-').map((val: any, k: number) => {//遍历获取当前层级数据
                    if(k == _i){ // 到达点击的父级层级
                        a.splice(index, 1); //删除条件分支
                    } else {
                        a = a[Number(val)].children;
                    }
                    
                });
        } else {
            //   直接删除当前点击的条件
            levelIndex.split('-').map((val: any) => {
                a = a[Number(val)].children;
            });
            a.splice(index, 1);
            
        }
        store.setArrJson(arr)
    }

    // 调整条件优先级
    const adjustFn = (type: Number, index: number, levelIndex: String) => {
        // type 0左侧点击向右调整 1右侧点击向左调整
        let arr: any[] = JSON.parse(JSON.stringify(store.arrJson));
        let a = arr;
        levelIndex.split('-').map((val: any) => {
            a = a[Number(val)].children;
        });
        // 对调条件优先级  左侧优先级高
        if(type){
            const item = a[index];
            a[index] = a[index + 1];
            a[index + 1] = item;

        } else {
            const item = a[index];
            a[index] = a[index - 1];
            a[index - 1] = item;
        }
         store.setArrJson(arr)
    }
</script>
<style scoped lang='scss'>
    .process{
      display: inline-flex;
      flex-direction: column;
      align-items: center;
       .condition{
        position: relative;
        width: auto;
        border-top: 2px solid #cacaca;
        border-bottom: 2px solid #cacaca;
        display: flex;
        z-index: 3;
        background-color: #e9eef3;
        .addProcess{
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
        }
       .branch{
           display: inline-block;
           padding: 40px 60px 20px;
           position: relative;
           z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            &:last-child, &:nth-child(2){
                &::before, &::after{
                    content: '';
                    height: 4px;
                    background: #e9eef3;
                    width: calc(50% - 1px);
                    position: absolute;
                }
                &::before{
                    top: -3px;
                }
                &::after{
                    bottom: -3px;
                }
            }
            &:last-child{
                &::before, &::after{
                    right: 0
                }
            }
            &:nth-child(2){
                &::before, &::after{
                    left: 0
                }
            }
            ._line{
                content: '';
                width: 2px;
                height: 100%;
                position: absolute;
                background-color: #cacaca;
                z-index: 0;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                z-index: -1;
            }
       }
    }
    }
</style>