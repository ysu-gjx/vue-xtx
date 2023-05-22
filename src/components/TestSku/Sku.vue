<script setup>
import { onMounted, watchEffect } from 'vue'

import bwPowerSet from './power-set'

// 商品数据
const props = defineProps({
  goods: {
    type: Object,
    default: () => ({ specs: [], skus: [] })
  }
})
const emit = defineEmits(['change'])

let pathMap = {}

onMounted(() => {
  pathMap = getPathMap(props.goods)

  initlDisabledStatus(props.goods.specs, pathMap)
})

const changeSelectedStatus = (item, val) => {
  if (val.disabled) return

  if (val.selected) {
    val.selected = false
  } else {
    item.values.forEach((x) => {
      x.selected = false
    })
    val.selected = true
  }

  // 更新禁用状态
  updateDisabledStatus(props.goods.specs, pathMap)

  // 产出 SKU 对象数据
  const selectedValues = getSelectedValues(props.goods.specs)
  const isValid = selectedValues.includes(undefined)
  if (isValid) {
    emit('change', {})
    return
  }

  // 如果有效，就根据id 生成有效sku
  const key = selectedValues.join('-')
  const skuIds = pathMap[key]
  const skuObj = props.goods.skus.find((sku) => sku.id === skuIds[0])

  emit('change', skuObj)
}

// 根据 有效sku 的字段 生成有效路径字典
const getPathMap = (goods) => {
  const pathMap = {}
  // *1. 根据库存字段得到有效的Sku数组
  const effectiveSkus = goods.skus.filter((sku) => sku.inventory > 0)

  // *2. 根据有效的Sku数组使用powerSet算法得到所有子集[1,2] -> [[1],[2],[1,2]]
  effectiveSkus.forEach((sku) => {
    // 2.1 获取匹配的valueName 组成的数组 [蓝色，10cm,中国]
    const selectedValArr = sku.specs.map((i) => i.valueName)
    // 2.2 使用算法获取 每个 sku 对应的valueName 子集
    const valueArrPowerSet = bwPowerSet(selectedValArr)

    // 3. 把得到的子集生成最终的路径字典对象
    valueArrPowerSet.forEach((arr) => {
      // 初始化 key, 数组 join -> 字符串
      const key = arr.join('-')
      // 如果已经存在当前key,那就往数组中直接添加skuId, 否则，初始化赋值
      if (pathMap[key]) {
        pathMap[key].push(sku.id)
      } else {
        pathMap[key] = [sku.id]
      }
    })
  })
  return pathMap
}

// 初始化规格禁用状态
const initlDisabledStatus = (specs, pathMap) => {
  specs.forEach((item) => {
    item.values.forEach((val) => {
      if (!pathMap[val.name]) {
        val.disabled = true
      } else {
        val.disabled = false
      }
    })
  })
}

// 获取选中项的匹配数组  ['蓝色', '10cm', undefined]
const getSelectedValues = (specs) => {
  const attrArr = []
  specs.forEach((spec) => {
    const selectedValue = spec.values.find((x) => x.selected)
    if (selectedValue) {
      attrArr.push(selectedValue.name)
    } else {
      attrArr.push(undefined)
    }
  })

  return attrArr
}

// 规格禁用 点击处理
const updateDisabledStatus = (specs, pathMap) => {
  /**
   * ! 思路：
   *  * 1. 按照顺序给属性生成  数组 ['蓝色', '10cm', undefined]
   *  * 2. 遍历每一个规格
   *      2.1 把name字段的值填充到对应的位置
   *      2.2 过滤掉undefined项使用join方法形成一个有效的key
   *      2.3 使用key去pathMap中进行匹配，匹配不上，则当前项禁用
   *
   *  * 2. 遍历所有规格，同时替换自己在数组中的位置，去生成key，对比是否在路径字典中
   *      -例如 ,选中的 ['黑色', '30cm', undefined]，想看看10cm 是否禁用，就把 10cm 替换 30cm
   *        生成['黑色', '10cm', undefined],对用 key: '黑色-10cm' 是否在pathMap中，不在就禁用
   */
  const selectedValues = getSelectedValues(specs)

  specs.forEach((i, index) => {
    const copy = selectedValues.slice(0)
    i.values.forEach((t) => {
      copy.splice(index, 1, t.name)

      const key = copy.filter((x) => x).join('-')

      if (pathMap[key]) {
        t.disabled = false
      } else {
        t.disabled = true
      }
    })
  })
}
</script>
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <!-- 图片类型规格 -->
          <img
            v-if="val.picture"
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="($event) => changeSelectedStatus(item, val)"
            :src="val.picture"
            :title="val.name"
          />
          <!-- 文字类型规格 -->
          <span
            v-else
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="($event) => changeSelectedStatus(item, val)"
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<style lang="scss" scoped>
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: #27ba9b;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>
