<template>
	<div class="l" style="position:absolute; left:0; top:0; width:100%;height:100%;">
		<div class="loginInput" style="width:500px;height:380px;position:absolute;left:50%;margin-left:-250px;top:50%;margin-top:-190px;">
			<div style="margin-top: 100px;">
				<div class="login">
					<div class="login2">
						<h3 style="display: flex; justify-content: center">后台管理系统登录</h3>
						<el-card>
							<el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules" label-width="100">
								<el-form-item label="账号" prop="loginName"><el-input v-model="LoginUser.username" placeholder="请输入账号" /></el-form-item>
								<el-form-item label="密码" prop="password"><el-input type="password" v-model="LoginUser.password" placeholder="请输入密码" /></el-form-item>
							</el-form>
							<el-button class="login-btn" type="primary" :loading="loading" @click="signin">{{ status }}</el-button>
							<div>
								<span @click="status = '登录'">登录 |</span>
								<span @click="status = '注册'">注册</span>
							</div>
						</el-card>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance , computed} from 'vue';
import { FormInstance, FormRules, ElMessage } from 'element-plus';
import { useStore } from 'vuex'

const store = useStore();

const res = computed(()=>{
		return store.state.name
	})

//点击改变vuex仓库中的name数据 
function changeData(){
//异步调用 dispatch
	store.dispatch('sub')
}

const { proxy } = getCurrentInstance();
const loginFormRef = ref<FormInstance>();

const LoginUser = reactive({
	username: '',
	password: ''
});
const loading = ref(false);

const loginFormRules = reactive<FormRules>({
	loginName: [{ required: true, message: '请输入账户名', trigger: 'blur' }, { min: 8, message: '账户长度大于8位', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 8, message: '密码长度大于8位', trigger: 'blur' }]
});

//登录
const signin = async () => {
	console.log('singin');
	const obj = { username: LoginUser.username, password: LoginUser.password };
	await proxy.$http.post('http://192.168.1.6:8090/login', LoginUser).then(response => {
		const token = response.data.msg;
		localStorage.setItem('token', token);
		console.log(localStorage.getItem('token'));
	});
};
const status = ref('登录');
const cover = 'cover';
</script>

<style  lang="less">
.l {
	height: 100vh;
	background: url(http://chongpenghao.ltd/sad3/1231/97af518e-b63b-4176-a594-a18e55f9b48c) no-repeat center fixed;
	background-size: cover;
	color: rgba(255, 255, 255, 0.95);
}

</style>
