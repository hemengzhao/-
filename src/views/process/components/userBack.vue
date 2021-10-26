<template>
    <div class="userBack">
        <div class="header" :style="{backgroundColor: names[type]?.back}">
            <el-icon  v-if='type == 2'>
                <avatar/>
            </el-icon>
            <el-icon v-else-if='type == 3'>
                <promotion />
            </el-icon>
            {{names[type]?.name}}
            <span class="close" v-if="type != 1">
                <el-icon :size='14' @click="closeFn">
                    <close />
                </el-icon>
            </span>
            <el-icon>
      </el-icon>
        </div>
        <div class="content">
            <span>
                {{names[type]?.placeholder}}
            </span>
            <el-icon >
                <arrow-right />
            </el-icon>
        </div>
    </div>
</template>
<script setup lang="ts">
import {useProcessStore} from '@/store/model/process.ts'
import { Promotion, ArrowRight, Close, Avatar } from '@element-plus/icons'
    const props = defineProps({
        type: {
            type: Number,
            default: 1
        }, // 1发起人  2 审批人  3抄送人
        levelIndex: {
            type: String,
            default: '0'
        },
        index: Number,
    })
     const store = useProcessStore();

    const names: any[] = [{}, {
        name: '发起人',
        placeholder: '所有人',
        back: '#576a95'
    }, {
        name: '审批人',
        placeholder: '请设置审批人',
         back: '#ff9431'
    }, {
        name: '抄送人',
        placeholder: '请设置抄送人',
         back: '#3296fa'
    }];
    const closeFn = () => {
        
        let arr: any[] = JSON.parse(JSON.stringify(store.arrJson));
  
        if(props?.levelIndex?.indexOf('-') > 0){
         
             let a = arr;
            props.levelIndex?.split('-').map((val: any) => {
                a = a[Number(val)].children;
            });
            a.splice(Number(props?.index), 1);
        } else {
            arr.splice(Number(props?.index), 1);
        }
         store.setArrJson(arr)
    }
    
</script>
<style scoped lang="scss">
    .userBack{
      width: 200px;
      min-height: 80px;
      background-color: #fff;
      overflow: hidden;
      border-radius: 6px;
      box-shadow: 0 0 6px 0 rgba(0,0,0,0.3);
      cursor: pointer;
      .header{
          line-height: 30px;
          background-color: #3296fa;
          font-size: 12px;
          color: #fff;
          text-align: left;
          padding-left: 20px;
          .close{
                  display: none;
                  float: right;
                  margin-right: 10px;
            }
      }
      .content{
          line-height: 50px;
          display: flex;
          padding: 0 10px 0 20px;
          span{
              display: inline-block;
              flex: 1;
              text-align: left;
          }
          i{
              line-height: 50px;
          }
      }
      &:hover{
          .header{
              .close{
                  display: inline-block;
              }
          }
          
      }
    }
</style>