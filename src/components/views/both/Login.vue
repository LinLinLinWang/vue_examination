<template>
    <div class="parent-dom">
        <vue-scroll :ops="ops">
            <div class="child-dom">
                <div class="logindiv">
                    <div class="ms-login">
                        <div class="ms-title">运维工作知识库</div>
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
                                        <el-input v-model="ruleForm.idnumber" placeholder="请输入工号">
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
                                        <el-input v-model="registerRuleForm.idnumber" placeholder="请输入工号"
                                                  v-on:input="getRealIdNumber"
                                                  required>
                                            <el-button slot="prepend">
                                                <svg-icon icon-class="证件"/>
                                            </el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="username">
                                        <el-input v-model="registerRuleForm.username"
                                                  :disabled="registerRuleForm.disabled"
                                                  placeholder="请输入姓名"
                                                  v-on:input="validateUsername"
                                                  required>
                                            <el-button slot="prepend">
                                                <svg-icon icon-class="手机号"/>
                                            </el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="password">
                                        <el-input v-model="registerRuleForm.password"
                                                  :disabled="registerRuleForm.disabled"
                                                  placeholder="请输入密码"
                                                  v-on:input="getRealTimePassword"
                                                  required>
                                            <el-button slot="prepend">
                                                <svg-icon icon-class="手机号"/>
                                            </el-button>
                                        </el-input>
                                    </el-form-item>

<!--                                    <el-form-item prop="validatecode">-->
<!--                                        <el-row>-->
<!--                                            <el-col :span="15">-->
<!--                                                <el-input v-model="registerRuleForm.validatecode"-->
<!--                                                          placeholder="请输入验证码">-->
<!--                                                    <el-button slot="prepend">-->
<!--                                                        <svg-icon icon-class="验证码"/>-->
<!--                                                    </el-button>-->
<!--                                                </el-input>-->
<!--                                            </el-col>-->
<!--                                            <el-col :span="5">-->
<!--                                                <el-button-->
<!--                                                        type="primary"-->
<!--                                                        round-->
<!--                                                        @click="registerGetPhoneValidateCode"-->
<!--                                                        :disabled="registerChangeCodeDisabled"-->
<!--                                                        v-bind:style="{opacity:registerChangeCodeOpacity}">-->
<!--                                                    {{registerCodemsg}}-->
<!--                                                </el-button>-->
<!--                                            </el-col>-->
<!--                                        </el-row>-->

<!--                                    </el-form-item>-->
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


                //定时器
                timer: '',
                num:3,//定时器时间
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
                    idnumber: '',
                    password: ''
                },
                rules: {
                    phone: [
                        {required: true, message: '请输入工号', trigger: 'blur'}
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
                    password:'',
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
                        {required: true, message: '请输入工号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },

                promot: "请确保信息的准确性",
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
          //  this.CheckUserTypeEnv();
        },
        mounted() {
            // eslint-disable-next-line no-console
            // console.clear();
        },
        methods: {
            //判断登录类型
            CheckUserTypeEnv() {
              //  console.log(this.$store.state.token);

            },
            //获取登录验证码
            getPhoneValidateCode() {
                this.$message.error('内网环境，未接入互联网');
            },
            //改变获取验证码按钮样式
            changeGetCodeButtonStyle() {

            },
            //验证码登录
            submitCodeForm() {
                this.$message.error('内网环境，禁止使用互联网方式');

            },
            //提交登录（密码）
            submitForm() {
                this.$axios({
                    method: 'POST',
                    url: '/user/loginByPassword',

                    data: {
                        idnumber : this.ruleForm.idnumber,
                        password:this.ruleForm.password

                    }
                }).then(response => {

                    var resdata = response.data;

                    console.log(resdata)
                     if(resdata.isExist=="yes"){
                         if(resdata.isThisGuy=="yes"){
                             //设置token以及
                             var jsonuser = eval('(' + resdata.user + ')');
                             this.$store.commit("login", {token: resdata.token, user: jsonuser});
                             let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                             this.$router.push({
                                 path: redirect
                             });

                         }else{
                             alert("密码错误");
                         }
                     }else{
                         this.$message.error('该工号尚未注册');
                     }


                })

            },

            //注册部分
            //检测名字
            validateUsername() {
                this.promotType = "info";
                let uname = this.registerRuleForm.username;
                let reg = /^[\u4E00-\u9FA5]+$/;
                if (!reg.test(uname)&&(uname!="")){
                    this.promot = "用户姓名仅支持中文";
                    this.promotType = "warning";
                    this.registerRuleForm.username= this.registerRuleForm.username.replace( this.registerRuleForm.username,"非法字符")
                    return false;
                } else {
                    this.promot = "姓名符合规范";
                    this.promotType = "success";
                }
                if (uname.length > 20 || uname.length <=1) {
                    this.promot = "用户姓名长度限制在2--20位";
                    this.promotType = "warning";
                    this.registerRuleForm.username = uname.substring(0, 20);
                    return false;
                } else {
                    return true;
                }
            },


            //实时获取用户输入的密码
            getRealTimePassword() {
                this.promot = "密码不超过16位，且仅为英文数字下划线";
                this.promotType = "warning";
                var reg=/^[0-9a-zA-Z_]{1,16}$/;
                if(reg.test(this.registerRuleForm.password)){

                    this.promot = "密码格式允许";
                    this.promotType = "success";
 return;
                }
                else{

                    this.promot = "密码不超过16位，且仅为英文数字下划线";
                    this.promotType = "warning";
                    this.registerRuleForm.password='';
                }

            },
            //实时获取用户输入的学号
            getRealIdNumber() {
                if(this.registerRuleForm.idnumber.length<6){
                    var reg=/[0-9]+$/;
                    if(!reg.test(this.registerRuleForm.idnumber))//不支持
                    {
                        this.promot = "工号仅能为六位数字，您输入的有误";
                        this.promotType = "warning";
                        this.registerRuleForm.idnumber='';
                    }
                    return;
                }
               if(this.registerRuleForm.idnumber.length==6){
                   let that=this;
                   var reg_=/[0-9]{6}/;
                   if(!reg_.test(this.registerRuleForm.idnumber))//不支持
                   {
                       this.promot = "工号仅能为六位数字，您输入的有误";
                       this.promotType = "warning";
                       this.registerRuleForm.idnumber='';
                       return;
                   }else{

                       this.$axios({
                           method: 'POST',
                           url: '/user/IdnumberIsOrNotExist',

                           data: {
                               idnumber : that.registerRuleForm.idnumber

                           }
                       }).then(response => {

                           var resdata = response.data;

                           if (resdata.isExist === "yes") {
                               this.$message.error('该工号已被注册');
                               this.registerRuleForm.idnumber="";

                           } else {
                               this.$message.success('该工号可以注册');
                           }
                       })


                   }




               }
                this.promot = "工号为六位数字";
                this.promotType = "warning";
                if(this.registerRuleForm.idnumber.length>6){
                    this.promot = "工号为六位数字,禁止继续录入";
                    this.promotType = "warning";
                    this.registerRuleForm.idnumber=  this.registerRuleForm.idnumber.substring(0,6);
                }
            },

            //获取注册验证码
            registerGetPhoneValidateCode() {

            },
            //提交注册
            submitRegisterForm() {
                let that=this;
               if(this.registerRuleForm.idnumber.length<6||this.registerRuleForm.username.length<2){
                   this.$message.error('请仔细检查各项信息');
                   return;
               }
               this.$axios({
                    method: 'POST',
                    url: '/user/registe',
                    data: {
                        idnumber: this.registerRuleForm.idnumber,
                        password: this.registerRuleForm.password,
                        uname:this.registerRuleForm.username
                    }
                }).then(response => {
                    var resdata = response.data;
                    if(resdata.saveuser=="yes"){




                        //计时二秒
                        that.timer = setInterval(function () {


                            if(that.num!=0){
                                that.$message.success('注册成功，'+that.num+"秒后跳转");
                                that.num--;

                            }else{
                                clearInterval(that.timer);
                                that.$router.push({name:'/login',query:""});
                                that.num=3;
                            }



                        }, 1000);


                    }else{
                        this.$message.error('注册失败，请仔细检查各项信息');
                    }

                })

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
