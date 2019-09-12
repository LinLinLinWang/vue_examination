<template>
    <div class="parent-dom">
        <vue-scroll :ops="ops">
            <div class="child-dom">
                <div class="logindiv">
                    <div class="ms-login">
                        <div class="ms-title">考试系统</div>
                        <el-tabs
                                type="border-card"
                                :stretch=true
                        >
                            <el-tab-pane>
                                <span slot="label"><i class="el-icon-date"></i> 验证码登录</span>
                                <el-form :model="ruleFormCode" :rules="rulesCode" ref="ruleFormCode" label-width="0px"
                                         class="ms-content">
                                    <el-form-item prop="phone">
                                        <el-input v-model="ruleFormCode.phone" placeholder="请输入手机号"
                                                  :disabled="ruleFormCode.disable">
                                            <el-button slot="prepend">
                                                <svg-icon icon-class="手机号"/>
                                            </el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-row>
                                        <el-col :span="15">
                                            <el-input v-model="ruleFormCode.code"
                                                      placeholder="请输入验证码">
                                                <el-button slot="prepend">
                                                    <svg-icon icon-class="验证码"/>
                                                </el-button>
                                            </el-input>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-button
                                                    type="primary"
                                                    round
                                                    @click="getPhoneValidateCode"
                                                    v-bind:disabled="changeCodeDisabled"
                                                    v-bind:style="{opacity:changeCodeOpacity}"
                                            >{{codemsg}}
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                    <div class="login-btn">
                                        <el-button type="primary" @click="submitCodeForm('ruleFormCode')">登录</el-button>
                                    </div>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane>
                                <span slot="label"><i class="el-icon-date"></i> 密码登录</span>
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px"
                                         class="ms-content">
                                    <el-form-item prop="phone">
                                        <el-input v-model="ruleForm.phone" placeholder="请输入工号">
                                            <el-button slot="prepend">
                                                <svg-icon icon-class="people"/>
                                            </el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="password">
                                        <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password">
                                            <el-button slot="prepend">
                                                <svg-icon icon-class="密码"/>
                                            </el-button>
                                        </el-input>
                                    </el-form-item>
                                    <div class="login-btn">
                                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                                    </div>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane>
                                <span slot="label"><i class="el-icon-date"></i> 新用户注册</span>
                                <el-form :model="registerRuleForm" :rules="registerRules" label-width="0px"
                                         ref="registerRuleForm"
                                         class="ms-content">
                                    <el-alert
                                            :title="promot"
                                            :type="promotType"
                                            center
                                            :closable="false"
                                            show-icon>
                                    </el-alert>

                                    <el-form-item prop="username">

                                    </el-form-item>
                                    <el-form-item prop="idnumber">
                                        <el-input v-model="registerRuleForm.idnumber" placeholder="请输入学号"
                                                  v-on:input="getRealIdNumber"
                                                  required>
                                            <el-button slot="prepend">
                                                <svg-icon icon-class="证件"/>
                                            </el-button>
                                        </el-input>
                                    </el-form-item>

                                    <el-form-item prop="userphone">
                                        <el-input v-model="registerRuleForm.userphone"
                                                  :disabled="registerRuleForm.disabled"
                                                  placeholder="请输入手机号"
                                                  v-on:input="getRealTimePhone"
                                                  required>
                                            <el-button slot="prepend">
                                                <svg-icon icon-class="手机号"/>
                                            </el-button>
                                        </el-input>
                                    </el-form-item>

                                    <el-form-item prop="validatecode">
                                        <el-row>
                                            <el-col :span="15">
                                                <el-input v-model="registerRuleForm.validatecode"
                                                          placeholder="请输入验证码">
                                                    <el-button slot="prepend">
                                                        <svg-icon icon-class="验证码"/>
                                                    </el-button>
                                                </el-input>
                                            </el-col>
                                            <el-col :span="5">
                                                <el-button
                                                        type="primary"
                                                        round
                                                        @click="registerGetPhoneValidateCode"
                                                        :disabled="registerChangeCodeDisabled"
                                                        v-bind:style="{opacity:registerChangeCodeOpacity}">
                                                    {{registerCodemsg}}
                                                </el-button>
                                            </el-col>
                                        </el-row>

                                    </el-form-item>
                                    <div class="login-btn">
                                        <el-button type="primary" @click="submitRegisterForm('registerRuleForm')">注册
                                        </el-button>
                                    </div>

                                </el-form>

                            </el-tab-pane>
                        </el-tabs>


                    </div>

                 <footer_></footer_>
                </div>
            </div>
        </vue-scroll>
    </div>


</template>

<script type="application/ecmascript">

    import footer_ from './Footer';
    export default {
        components: {
            footer_,

        },
        name: '',
        data() {
            return {
                /*滚动条设置*/
                ops: {
                    vuescroll: {
                        mode: 'native',
                    },
                    scrollPanel: {},
                    rail: {},
                    bar: {}
                },
                UserTypeEnv: '',
                msg: '',
                //密码登录
                ruleForm: {
                    phone: '',
                    password: ''
                },
                rules: {
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                //验证码登录
                ruleFormCode: {
                    phone: '',
                    code: '',
                    disable: false,
                },
                rulesCode: {
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                },
                changeCodeDisabled: false,
                changeCodeOpacity: "1",
                codemsg: "获取验证码",

                //注册
                registerRuleForm: {
                    username: '',
                    userphone: '',
                    validatecode: '',
                    idnumber: '',
                    disabled: false,
                },
                registerRules: {
                    username: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    userphone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'}
                    ],
                    idnumber: [
                        {required: true, message: '请输入学号', trigger: 'blur'}
                    ]
                },

                promot: "请确保信息的准确性,工号与手机号绑定后不可修改",
                promotType: 'warning',
                registerCodemsg: "获取验证码",

                registerChangeCodeDisabled: false,
                registerChangeCodeOpacity: "1"

            }
        },
        beforeCreate(){

            //

        },
        created() {
            this.CheckUserTypeEnv();
        },
        mounted() {
            // eslint-disable-next-line no-console
            // console.clear();
        },
        methods: {
            //判断登录类型
            CheckUserTypeEnv() {

            },
            //获取登录验证码
            getPhoneValidateCode() {

            },
            //改变获取验证码按钮样式
            changeGetCodeButtonStyle() {

            },
            //验证码登录
            submitCodeForm(formName) {

            },
            //提交登录（密码）
            submitForm(formName) {

            },

            //注册部分
            //检测名字
            validateUsername() {



            },


            //实时获取用户输入的手机号
            getRealTimePhone() {

            },
            //实时获取用户输入的学号
            getRealIdNumber() {


            },

            //获取注册验证码
            registerGetPhoneValidateCode() {

            },
            //提交注册
            submitRegisterForm(formName) {

            },
            //改变获取验证码按钮样式
            registerChangeGetCodeButtonStyle() {

            }
        }

    }

</script>


<style scoped>

    .parent-dom {
        background-image: url(https://ps.ssl.qhmsg.com/sdr/400__/t01174bd12b648c1236.jpg);
        background-repeat: repeat-y;
        background-size: 100%;
        height: 100%;
    }

    .logindiv {
        width: 100%;
        height: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        max-width: 410px;
        margin: 0 auto;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
    }

    .login-btn {
        text-align: center;
        margin-top: 35px;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    #footer {
        color: #ffffff;
        text-align: center;
        position: fixed;
        bottom: 5px;
        left: 5%;
        right: 5%;
    }


    @media (max-height: 520px) {
        #footer {
            display: none;
        }
    }


</style>
