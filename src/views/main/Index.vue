<template>
	<div class="common-layout">
		<el-container>
			<el-header height="0px"><Header color="pink"></Header></el-header>
			<el-container>
				<el-aside width="200px" height="100%">
					<el-menu
						default-active="1"
						class="el-menu-vertical-demo side-menu"
						:collapse="isCollapse"
						background-color="white"
						collapse-transition="false"
						@open="handleOpen"
						@close="handleClose"
						style="overflow: hidden"
						@select="handleSelect"
					>
						<el-sub-menu index="1">
							<template #title>
								<el-icon><icon-menu /></el-icon>
								<span>菜品管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="1-1">item one</el-menu-item>
								<el-menu-item index="1-2">item two</el-menu-item>
							</el-menu-item-group>
						</el-sub-menu>

						<el-sub-menu index="2">
							<template #title>
								<el-icon><icon-menu /></el-icon>
								<span>员工管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="2-1">item one</el-menu-item>
								<el-menu-item index="2-2">item two</el-menu-item>
							</el-menu-item-group>
						</el-sub-menu>

						<el-sub-menu index="3">
							<template #title>
								<el-icon><icon-menu /></el-icon>
								<span>消费金额统计</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="3-1">item one</el-menu-item>
								<el-menu-item index="3-2">item two</el-menu-item>
							</el-menu-item-group>
						</el-sub-menu>
					</el-menu>
				</el-aside>
				<el-container>
					<el-main>
						<el-table :data="UserData" style="width: 100%">
							<el-table-column label="Date" prop="date" />
							<el-table-column label="Name" prop="name" />
							<el-table-column label="icon">
								<template #default="props">
									<el-row>
										<!-- 					{{props.row.icon}} -->
										<!-- 								<image :src="props.row.icon" style="width=100%;height=100%">456</image> -->

										<el-image :src="props.row.icon" :preview-src-list="[props.row.icon]" preview-teleported style="width: 130px; height: 100px" />
									</el-row>
								</template>
								<!-- 				<el-image  style="width: 50%; height: 50%;" :src=props.icon></el-image> -->
							</el-table-column>
							<el-table-column align="right">
								<template #header>
									<el-input v-model="search" size="small" placeholder="Type to search" />
								</template>
								<template #default="scope">
									<el-button size="small" @click="handleEdit(scope.$index, scope.row)">
										<el-button style="width= 100%; height = 100%" size="small" @click="dialogFormVisible = true">编辑</el-button>
									</el-button>
									<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>

						<!-- Form -->
						<el-dialog v-model="dialogFormVisible" title="用户修改">
							<el-form :model="updateUser">
								<el-form-item label=" name" :label-width="formLabelWidth"><el-input v-model="updateUser.name" autocomplete="off" /></el-form-item>

								<el-form-item label=" date" :label-width="formLabelWidth"><el-input v-model="updateUser.date" autocomplete="off" /></el-form-item>

								<el-form-item label=" address" :label-width="formLabelWidth"><el-input v-model="updateUser.address" autocomplete="off" /></el-form-item>

								<el-form-item label=" icon" :label-width="formLabelWidth"><el-image :src="updateUser.icon" style="width: 130px; height: 100px" /></el-form-item>
							</el-form>

							<template #footer>
								<span class="dialog-footer">
									<el-button @click="dialogFormVisible = false">Cancel</el-button>
									<el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
								</span>
							</template>
						</el-dialog>
						<!-- 分页 -->
				
						  <el-pagination
							small
							background
							layout="prev, pager, next"
							:total="100"
							class="mt-4"
							:page-size="10"
							@current-change="currentPageChange"
						  />
					</el-main>
					<el-footer height="0px"><Footer></Footer></el-footer>
				</el-container>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, getCurrentInstance, onMounted } from 'vue';
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import { Document, Menu as IconMenu, Location, Setting, CircleCloseFilled } from '@element-plus/icons-vue';
import { ElButton, ElDialog } from 'element-plus';


const instance = getCurrentInstance();
const { proxy } = getCurrentInstance();
const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};
const handleSelect = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};

import { Timer } from '@element-plus/icons-vue';

interface User {
	date: string;
	name: string;
	address: string;
	icon: string;
}

const search = ref('');
let EditIndex = ref('');

var updateUser = reactive({
	date: '',
	name: '',
	address: '',
	icon: ''
});

const handleEdit = (index: number, row: User) => {
	dialogFormVisible = true;
	EditIndex = index;
	updateUser.name = row.name;
	updateUser.address = row.address;
	updateUser.icon = row.icon;
	updateUser.date = row.date;
	instance.proxy.$forceUpdate();
	
};
const handleDelete = (index: number, row: User) => {
	console.log(index);
};

//登录
onMounted(() => {
	console.log('onMounted 节点挂载时调用');
	proxy.$http.get('http://192.168.1.6:8090/getList').then(response => {
		UserData =  response.data.data;
		instance.proxy.$forceUpdate();
	});
});

var UserData = reactive([
	{ date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', icon: 'http://chongpenghao.ltd/sad3/1231/845345fe-4225-4d28-ba8c-01208f894982' },
	{ date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', icon: 'http://chongpenghao.ltd/sad3/1231/845345fe-4225-4d28-ba8c-01208f894982' },
	{ date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', icon: 'http://chongpenghao.ltd/sad3/1231/845345fe-4225-4d28-ba8c-01208f894982' },
	{ date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', icon: 'http://chongpenghao.ltd/sad3/1231/845345fe-4225-4d28-ba8c-01208f894982' },
	
]);

let dialogFormVisible = ref(false);
const formLabelWidth = '140px';

const currentPageChange = (newPage : number) => {
	console.log(newPage)
	//请求后端数据
	proxy.$http.get('http://192.168.1.6:8090/getList').then(response => {
		UserData =  response.data.data;
		instance.proxy.$forceUpdate();
	});
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}
.side-menu {
	height: 100%;
}
.my-header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.el-button--text {
	margin-right: 15px;
}
.el-select {
	width: 300px;
}
.el-input {
	width: 300px;
}
.dialog-footer button:first-child {
	margin-right: 10px;
}
</style>
