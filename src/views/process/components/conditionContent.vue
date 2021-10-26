<template>
    <div class="conditionContent">
        <div class="header">
            <span class="_index">条件{{index}}</span>
            <span class="priority">优先级{{index}}</span>
            <span class="close">
                <el-icon @click="_deleteFn">
                    <close />
                </el-icon>
            </span>
        </div>
        <div class="content">请设置条件</div>
        <div class="provoke left" v-if='index > 1'>
            <el-icon @click="_adjustFn(0)">
                <arrow-left />
            </el-icon>
        </div>
        <div class="provoke right" v-if='right != index'>
            <el-icon @click="_adjustFn(1)">
                <arrow-right />
            </el-icon>
        </div>
    </div>
</template>
<script lang='ts' setup>

import { Close, ArrowLeft, ArrowRight } from '@element-plus/icons'
const props = defineProps({
    index: Number,
    right: Number
})
const emit = defineEmits(['deleteFn', 'adjustLeftFn', 'adjustRightFn'])
const _adjustFn = (type: Number) => {
    if(type){
        emit('adjustRightFn')
    } else {
        emit('adjustLeftFn')
    }
    
}
const _deleteFn = () => {
    emit('deleteFn')
}
</script>
<style lang="scss" scoped>
.conditionContent {
    width: 170px;
    min-height: 80px;
    background-color: #fff;
    overflow: hidden;
    border-radius: 6px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.3);
    cursor: pointer;
    position: relative;
    padding: 0 15px;
    font-size: 12px;
    .header {
        line-height: 20px;
        padding: 8px 0;
        height: 20px;

        display: flex;
        justify-content: space-between;
        ._index {
            color: #15bc83;
        }
        .close {
            display: none;
        }
        .priority {
            display: block;
        }
    }
    .content {
        text-align: left;
    }
    .provoke {
        display: none;
        height: 100%;
        position: absolute;
        top: 0;

        align-items: center;

        &:hover {
            background-color: #f1f1f1;
        }
        &.left {
            left: 0;
        }
        &.right {
            right: 0;
        }
    }
    &:hover {
        .header {
            ._index {
                border-bottom: 1px dashed #15bc83;
            }
            .close {
                display: block;
            }
            .priority {
                display: none;
            }
        }
        .provoke {
            display: flex;
        }
    }
}
</style>