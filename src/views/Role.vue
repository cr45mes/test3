<template>
  <div class="role-manage">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryForm.menuName" placeholder="请输入角色名称" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getRoleList">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd">创建</el-button>
      </div>
      <el-table :data="roleList">
        <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :formatter="item.formatter"> </el-table-column>
        <el-table-column label="操作" width="260">
          <template v-slot="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="handleOpenPermission(scope.row)">设置权限</el-button>
            <el-button type="danger" size="mini" @click="handleDel(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" background layout=" ->, prev, pager, next" :total="pager.total" :page-size="pager.pageSize" @current-change="handleCurrentChange" />
    </div>
    <el-dialog title="创建角色" v-model="showModal">
      <el-form ref="dialogForm" :model="roleForm" label-width="150px" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" rows="2" v-model="roleForm.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 权限弹框 -->
    <el-dialog title="权限设置" v-model="showPermission">
      <el-form label-width="150px">
        <el-form-item label="角色名称">
          {{ curRoleName }}
        </el-form-item>
        <el-form-item label="选择权限"> <el-tree ref="permissionTree" :data="menuList" show-checkbox node-key="_id" :props="{ label: 'menuName' }" default-expand-all /> </el-form-item>
      </el-form>
      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="showPermission = false">取 消</el-button>
          <el-button type="primary" @click="handlePermissionSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { trigger } from '@vue/reactivity'
import utils from './../utils/utils'
export default {
  name: 'role',
  data() {
    return {
      queryForm: {
        roleName: ''
      },

      columns: [
        {
          label: '角色名称',
          prop: 'roleName'
        },
        {
          label: '备注',
          prop: 'remark'
        },
        {
          label: '权限列表',
          prop: 'permissionList',
          width: 200,
          formatter: (row, column, value) => {
            let names = []
            let list = value.halfCheckedKeys || []
            list.map((key) => {
              let name = this.actionMap[key]
              if (key && name) names.push(name)
            })
            return names.join(',')
          }
        },
        {
          label: '创建时间',
          prop: 'createTime',
          formatter(row, column, value) {
            return utils.formateDate(new Date(value))
          }
        },
        {
          label: '更新时间',
          prop: 'updateTime',
          formatter(row, column, value) {
            return utils.formateDate(new Date(value))
          }
        }
      ],
      roleList: [],
      pager: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      roleForm: {},
      showModal: false,
      action: 'create',
      rules: {
        roleName: [
          {
            required: true,
            message: '请输入角色名称'
          }
        ]
      },
      //权限展示
      showPermission: false,
      curRoleId: '',
      curRoleName: '',
      menuLidt: [],
      //菜单映射表
      actionMap: {}
    }
  },
  mounted() {
    this.getRoleList()
    this.getMenuList()
  },
  methods: {
    //角色列表初始化
    async getRoleList() {
      try {
        let { list, page } = await this.$api.getRoleList({ ...this.queryForm, ...this.pager })
        this.roleList = list
        this.pager.total = page.total
      } catch (error) {
        throw new Error(error)
      }
    },
    //菜单列表初始化
    async getMenuList() {
      try {
        let list = await this.$api.getMenuList()
        this.menuList = list
        this.getActionMap(list)
      } catch (error) {
        throw new Error(error)
      }
    },
    //表单重置

    handleReset(form) {
      this.$refs[form].resetFields()
    },
    //角色添加
    handleAdd() {
      this.showModal = true
      this.handleReset('dialogForm')
      this.action = 'create'
    },
    //角色编辑
    handleEdit(row) {
      this.showModal = true
      this.action = 'edit'
      this.$nextTick(() => {
        this.roleForm = { _id: row._id, roleName: row.roleName, remark: row.remark }
      })
    },
    //角色删除
    async handleDel(_id) {
      await this.$api.roleOperate({ _id, action: 'delete' })
      this.$message.success('删除成功')
      this.getRoleList()
    },
    //弹框关闭
    handleClose() {
      this.showModal = false
      this.handleReset('dialogForm')
    },
    //角色提交
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let { roleForm, action } = this
          let params = { ...roleForm, action }
          let res = await this.$api.roleOperate(params)
          if (res) {
            this.showModal = false
            this.$message.success('创建成功')
            this.handleReset('dialogForm')
            this.getRoleList()
          }
        }
      })
    },
    handleCurrentChange(current) {
      this.pager.pageNum = current
      this.getRoleList()
    },

    handleOpenPermission(row) {
      this.curRoleId = row._id
      this.curRoleName = row.roleName
      this.showPermission = true
      let { checkedKeys } = row.permissionList
      setTimeout(() => {
        this.$refs.permissionTree.setCheckedKeys(checkedKeys)
      })
    },
    async handlePermissionSubmit() {
      let nodes = this.$refs.permissionTree.getCheckedNodes()
      let halfKeys = this.$refs.permissionTree.getHalfCheckedNodes()
      let checkedKeys = []
      let parentKeys = []
      nodes.map((node) => {
        if (!node.children) {
          checkedKeys.push(node._id)
        } else {
          parentKeys.push(node._id)
        }
      })
      let params = {
        _id: this.curRoleId,
        permissionList: {
          checkedKeys,
          halfCheckedKeys: parentKeys.concat(halfKeys)
        }
      }
      await this.$api.updatePermission(params)
      this.showPermission = false
      this.$message.success('设置成功')
      this.getRoleList()
    },
    getActionMap(list) {
      let actionMap = {}
      const deep = (arr) => {
        while (arr.length) {
          let item = arr.pop()
          if (item.children && item.action) {
            actionMap[item._id] = item.menuName
          }
          if (item.children && !item.action) {
            deep(item.children)
          }
        }
      }
      deep(JSON.parse(JSON.stringify(list)))
      this.actionMap = actionMap
    }
  }
}
</script>

<style></style>
