<template>

    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-alert
                :title="promot"
                :type="promotType"
                center
                :closable="false"
                show-icon>
        </el-alert>
        <el-form-item label="员工编号">
            <el-input type="text" v-model="idnumber" disabled ></el-input>
        </el-form-item>
        <el-form-item label="员工姓名">
            <el-input type="text" v-model="username"></el-input>
        </el-form-item>

        <el-form-item label="新密码" >
            <el-input type="text" v-model="password"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>


</template>

<script>



    export default {
        name: "PersonalInformation",

        data() {


            return {
                idnumber:this.$store.state.user.userid,
                username:this.$store.state.user.uname,
                password:"",
                promot: "请确保信息的准确性",
                promotType: 'warning',

            };
        },
        methods: {
            submitForm() {
                var uname=this.username;
              //昵称仅限中文，英文，数字
                // [\u4e00-\u9fa5A-Za-z0-9]{4,20}
                var  name_reg=/^[\u4E00-\u9FA5a-zA-Z0-9_]{2,8}$/;

                if (false==name_reg.test(uname)||!(uname!="")){
                    this.promot = "用户姓名仅支持2-8位中文英文数字";
                    this.promotType = "warning";
                    console.log(name_reg.test(uname));
                    return false;
                }
                var pass_reg=/^[0-9a-zA-Z_]{3,16}$/;
                if(this.password==""){

                }else{
                    if(false==pass_reg.test(this.password)){

                        this.promot = "密码格式不允许,要求3-16位数字字母";
                        this.promotType = "warning";
                        console.log("密码"+pass_reg.test(this.password));
                        return false;
                    }
                }
                //修改用户信息或者密码
                this.$axios({
                    method: 'POST',
                    url: '/user/changeInfo',

                    data: {
                        idnumber:this.idnumber,
                        uname:this.username,
                        password:this.password


                    }
                }).then(response => {

                  var resdata = response.data;
                   // needClear
                    if (resdata.updateInfo === "ok") {
                        if(resdata.needClear==="ok"){
                            this.$store.commit("logout");
                            this.$message({
                                message: '更新密码成功',
                                type: 'success'
                            });
                        }else{

                            // this.$store.commit("login",resdata);
                            this.$store.commit("logout");
                            console.log("仅仅更改信息"+resdata.user)
                            this.$message({
                                message: '更新信息成功',
                                type: 'success'
                            });
                        }

                    } else {
                        this.$message.error('更改失败');
                    }
                })

            },
            resetForm() {
                this.username="";
                this.password="";
            }
        }
    }
</script>

<style scoped>

</style>