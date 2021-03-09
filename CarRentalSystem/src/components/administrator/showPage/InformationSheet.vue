<template>
  <el-table
      :data="tableData"
      style="width: 100%"
      :formatter="formatter"
      :default-sort = "{prop: 'date', order: 'ascending'}"
  >
    <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180">
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名"
        :sort-by='name'
        sortable
        width="180">
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "InformationSheet",
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: 'B',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: 'A',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: 'C',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: 'D',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    formatter(row) {
      return row.address;
    }
  }
}
</script>

<style scoped>

</style>