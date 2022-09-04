<script>
import TreeMenu from './TreeMenu.vue'
import BreadCrumb from './BreadCrumb.vue'
export default {
  name: 'Home',
  components: { TreeMenu, BreadCrumb },
  data() {
    return {
      isCollapse: false,
      userInfo: this.$store.state.userInfo,
      noticeCount: 0,
      userMenu: [],
      activeMenu: location.hash.slice(1)
    }
  },
  computed: {
    noticeCount() {
      return this.$store.state.noticeCount
    }
  },
  mounted() {
    this.getNoticeCout()
    this.getMenuList()
  },
  methods: {
    toggle() {
      this.isCollapse = !this.isCollapse
    },
    handleLogout(key) {
      if (key == 'email') return
      this.$store.commit('saveUserInfo', '')
      this.userInfo = {}
      this.$router.push('/login')
    },
    async getNoticeCout() {
      try {
        const count = await this.$api.noticeCount()
        this.$store.commit('saveNoticeCount', count)
      } catch (error) {
        console.log(error)
      }
    },
    async getMenuList() {
      try {
        const { menuList, actionList } = await this.$api.getPermissionList()
        this.userMenu = menuList
        this.$store.commit('saveUserMenu', menuList)
        this.$store.commit('saveUserAction', actionList)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<template>
  <div class="basic-layout">
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <!-- 系统logo -->
      <div class="logo">
        <img src="./../assets/logo.png" alt="" />
        <span>Manager</span>
      </div>

      <!-- 导航菜单 -->
      <el-menu :default-active="activeMenu" class="nav-menu" background-color="#001529" text-color="#fff" router :collapse="isCollapse">
        <tree-menu :userMenu="userMenu" />
      </el-menu>
    </div>
    <div :class="['content-right', isCollapse ? 'fold' : 'undold']">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-fold" @click="toggle"><i class="el-icon-s-fold"></i></div>
          <div class="bread">
            <BreadCrumb />
          </div>
        </div>

        <div class="user-info">
          <el-badge :is-dot="noticeCount > 0 ? true : false" class="notice" type="danger" @click="$router.push('/audit/approve')">
            <i class="el-icon-bell"></i>
          </el-badge>
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{ userInfo.userName }}
              <i class="el-icon--right"></i>
            </span>
            <template v-slot:dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">邮箱：{{ userInfo.userEmail }}</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- <el-dropdown>
            <span class="el-dropdown-link"> 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <template v-slot:dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
        </div>
      </div>
      <div class="wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background: #001529;
    color: #fff;
    overflow: hidden;
    // overflow-y: auto;
    transition: width 0.5s;
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      img {
        margin: 1px 16px;
        width: 32px;
        height: 32px;
      }
    }
    .nav-menu {
      border-right: none;
      height: calc(100vh - 50px);
    }
    &.fold {
      width: 64px;
    }
    &.unfold {
      width: 200px;
    }
  }
  .content-right {
    margin-left: 200px;
    &.fold {
      margin-left: 64px;
    }
    &.unfold {
      margin-left: 200px;
    }
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-left {
        display: flex;
        align-items: center;
        .menu-fold {
          margin-right: 15px;
          font-size: 18px;
        }
      }
      .user-info {
        .notice {
          line-height: 30px;
          margin-right: 15px;
          cursor: pointer;
        }
        .user-link {
          cursor: pointer;
          color: #409eff;
          line-height: 50px;
        }
      }
    }
    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
      .main-page {
        background: #fff;
        height: 100%;
      }
    }
  }
}
</style>
