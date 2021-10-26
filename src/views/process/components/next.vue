<template>
    <div :class="{nextLine: true, arrow: type == 1, radius: type == 2}">
            <el-popover
                placement="right"
                :width="230"
                trigger="click"
                :visible='visible'
            >
                <template #reference>
                    <el-button class="btn" type="primary" icon="el-icon-plus" circle @click="visible = !visible"></el-button>
                </template>
                <div class="operationBtn">
                    <div @click="onChangge(2)">
                        <div class="circleBtn">
                            <el-icon :size='30'>
                                <stamp />
                            </el-icon>
                        </div>
                        审批人
                    </div>
                    <div @click="onChangge(3)"> 
                        <div class="circleBtn">
                            <el-icon :size='30'>
                                <promotion />
                            </el-icon>
                        </div>
                        抄送人
                    </div>
                    <div @click="onChangge(4)">
                        <div class="circleBtn">
                            <el-icon :size='30'>
                                <rank />
                            </el-icon>
                        </div>
                        条件分支
                    </div>
                </div>
            </el-popover>
       
    </div>
</template>
<script setup lang="ts">
import {useProcessStore} from '@/store/model/process.ts'
import { Stamp, Promotion, Rank } from '@element-plus/icons'
import {ref} from 'vue'
    const props = defineProps({
        type: Number || String, // 1 箭头  2 圆点,
        levelIndex: {
            type: String,
            default: '0'
        },
        index: Number,
        
    })
    const store = useProcessStore();
    const visible = ref(false);

    const onChangge = (type: Number) => {
        visible.value = !visible;
        let obj = {
            type: type,
        }
        if(type == 4){
                obj.children = [{
                    name: '条件1',
                    children: [],
                }, {
                    name: '条件2',
                    children: [],
                }]
        }
        let arr: any[] = JSON.parse(JSON.stringify(store.arrJson));
      
        if(props?.levelIndex?.indexOf('-') > 0){
            let a = arr;
            props.levelIndex?.split('-').map((val: any) => {
                a = a[Number(val)].children;
                
            });
            a.splice(Number(props?.index), 0, obj);
        } else {
            arr.splice(Number(props?.index), 0, obj);
        }
       store.setArrJson(arr)

    }
</script>
<style scoped lang="scss">
   .nextLine{
       height: 80px;
       line-height: 50px;
       position: relative;
       padding-top: 30px;
        &::before{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            height: 100%;
            width: 2px;
            background-color: #cacaca;
        }
        &.arrow{
            &::after{
                content: '';
                width: 0;
                height: 0;
                border: 8px solid #cacaca;
                border-color: #cacaca transparent transparent;
                border-bottom: 0;
                position: absolute;
                bottom: 0px;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        &.radius{
            &::after{
                content: '';
                width: 0;
                height: 0;
                border: 5px solid #cacaca;
                border-radius: 50%;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        .btn{
            position: relative;
            z-index: 10;
            width: 40px;
            height: 40px;
            text-align: center;
            color: #fff;
        }
   }
   .operationBtn{
          
            &>div{
                display: inline-block;
                margin-left: 20px;
                text-align: center;
                line-height: 30px;
            }
            .circleBtn{
                 width: 50px;
                 height: 50px;
                 line-height: 50px;
                 text-align: center;
                 border-radius: 50%;
                 border: 1px solid #e5e5e5;
                 box-shadow: 0 0 6px 0 #e5e5e5;
                 &:hover{
                     background-color: #3296fa;
                     color: #fff
                 }
                 i{
                    vertical-align: middle;
                 }
            }
        }
</style>