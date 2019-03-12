<template>
  <div>
    <Breadcrumb separator=">" :style="{margin: '16px 0'}">
      <BreadcrumbItem :to='item.src' v-for='(item,index) in dataSource' :key='index'>{{item.title}}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
export default {
     props:['dataSource'],
};
</script>

<style>
.demo-breadcrumb-separator {
  color: #ff5500;
  padding: 0 5px;
}
</style>
