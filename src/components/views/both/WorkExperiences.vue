<template>
    <div>

        <div  v-if="showdiv===0">
            <div style="margin-top: 20px">
                <el-button type="primary" @click="showdiaog">新建发布</el-button>
                <el-button type="success">导出excel</el-button>
            </div>
            <el-table v-loading=""
                      ref="multipleTable"
                      :data="tableData"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="日期"
                        width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="涉及板块"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="问题"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="解决方案"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="发布人"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        @current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>
            </div>



        </div>
        <div  v-if="showdiv===1" class="container">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="问题概述">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="涉及板块">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="会议" value="shanghai"></el-option>
                        <el-option label="电话" value="beijing"></el-option>
                        <el-option label="创建板块" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
<!--                <el-form-item label="问题出现时间">-->
<!--                    <el-col :span="11">-->
<!--                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"-->
<!--                                        style="width: 100%;"></el-date-picker>-->
<!--                    </el-col>-->
<!--                    <el-col class="line" :span="2">-</el-col>-->
<!--                    <el-col :span="11">-->
<!--                        <el-time-picker placeholder="选择时间" v-model="form.date2"-->
<!--                                        style="width: 100%;"></el-time-picker>-->
<!--                    </el-col>-->
<!--                </el-form-item>-->
                <el-form-item label="是否解决">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="通知以下人员">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="SA" name="type"></el-checkbox>
                        <el-checkbox label="B" name="type"></el-checkbox>
                        <el-checkbox label="C" name="type"></el-checkbox>
                        <el-checkbox label="D" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
<!--                <el-form-item label="特殊资源">-->
<!--                    <el-radio-group v-model="form.resource">-->
<!--                        <el-radio label="线上品牌商赞助"></el-radio>-->
<!--                        <el-radio label="线下场地免费"></el-radio>-->
<!--                    </el-radio-group>-->
<!--                </el-form-item>-->
                <el-form-item label="问题解决途径">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>

    export default {
        name: "WorkExperiences",
        data() {
            return {

                showdiv: 0,
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',

                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                multipleSelection: [],
                //隐藏的表单
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },


        methods: {
            handleSizeChange() {
            }, handleCurrentChange() {
            }, currentPage4() {
            }, handleClick() {
            },
            handleSelectionChange() {
            },
            showdiaog() {

                this.showdiv = 1;
            },
            closediaog() {
                this.showdiv = 0;
            },
            getModeule() {
                this.$axios({
                    method: 'POST',
                    url: '/modulecreate/showModule',

                    data: {}
                }).then(response => {

                    var resdata = response.data;

                    if (resdata.needClear === "ok") {
                        this.$store.commit("logout");
                        return;
                    } else {
                        console.log(resdata.data + "为已创建的模块");

                    }
                })


            },
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>

</style>