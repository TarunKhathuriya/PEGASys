<template>
  <div class="">
    <!-- <q-select
          dense
          outlined
          v-model="project"
          :options="optionProjects"
          label="Projects"
          multiple
          emit-value
          map-options
          use-input
          @filter="filterFn"
      >
        <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
          <q-item
            v-bind="itemProps"
            v-on="itemEvents"
          >
            <q-item-section side>
              <q-toggle :value="selected" @input="toggleOption(opt)" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="opt.label" ></q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select> -->

    <q-select
      dense
      input-debounce="0"
      outlined
      fill-input
      multiple
      use-chips
      v-model="selectedData"
      :options="optionProjects"
      label="Project"
      use-input
      @filter="filterFn"
    >
      <template v-slot:option="scope">
        <div class="row col-12">
          <div class="col-12 add-timesheet-select-project">
            <q-checkbox
              v-model="optionProjects[scope.index].checked"
              @input="selectGroup(scope.opt, scope.index)"
              :label="optionProjects[scope.index].label"
            />
          </div>
        </div>
      </template>
    </q-select>
  </div>
</template>
<script>
import projectsService from "../TimeSheets../../../services/projects.service";

export default {
  name: "SelectorBox",
  data() {
    return {
      selectedString: "No Selected",

      groupSelected: [],
      project: [],
      selectedData: [],
      selected: null,
      // listData: [],
      //client:[{clientName: "",clientId:"",projects: []}],
      projectOptions: [],
      optionProjects: [],
    };
  },
  watch: {
    selectedData: {
      handler: function (newValue) {
        var b = true;
        console.log("optionProjecct" + JSON.stringify(this.optionProjects));
        this.optionProjects.forEach((opdata, index) => {
          console.log(newValue);
          newValue.forEach((sdata) => {
            // console.log(opdata.value);
            // console.log(sdata.value);
            if (opdata.value == sdata.value) {
              b = false;
            }
          });
          if (b) {
            this.optionProjects[index].checked = false;
          }
          b = true;
        });
      },
      deep: true,
    },
    // project: function () {
    //   console.log("##******************************");
    //   console.log(JSON.stringify(this.project));
    //   this.optionProjects.forEach((obj) => {
    //     this.project.forEach((ele) => {
    //       if (obj.value === ele) {
    //         if (this.groupSelected.includes((v) => v.projectId === obj.value)) {
    //           var index = this.groupSelected.indexOf(
    //             (v) => v.projectId === obj.value
    //           );
    //           this.groupSelected.splice(index, 1);
    //         } else {
    //           this.groupSelected.push({
    //             projectId: obj.value,
    //             projectName: obj.label,
    //           });
    //         }
    //       }
    //     });
    //   });
    //   console.log("##&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    //   console.log(JSON.stringify(this.groupSelected));
    // },
    // selected: function(value) {
    //   console.log("##******************************")
    //   console.log(this.selected);
    //   console.log("%%%%%%%********************")
    //   console.log(value);
    // }

    // groupSelected: function (value) {
    //   this.$emit("selectedBox", value);
    // },

    //Running
    // model: {
    //   handler: function (val) {
    //     // alert("watch")
    //    // alert(JSON.stringify(val));
    //     this.groupSelected = [];
    //     // this.selectManage(val);
    //     val.forEach((parentData) => {
    //       if (parentData.checked) {
    //         this.groupSelected.push({
    //           clientId: parentData.id,
    //           clientName: parentData.label,
    //           project: [],
    //         });
    //         parentData.options.forEach((childData) => {
    //           if (childData.checked) {
    //             this.groupSelected.project.push({
    //               projectId: childData.id,
    //               projectName: childData.name,
    //             });
    //           }
    //         });
    //       }
    //     });
    //     console.log("model: " + this.listData);
    //     this.$emit("selectedBox", this.listData);
    //   },
    //   deep: true,

    // },
    projectOptions: {
      handler: function (newValue) {
        // alert(this.mainprojects+"  "+newValue)
        var sendProjects = [];
       
        newValue.forEach((val) => {
          if (val.checked) {
            sendProjects.push(val);
          }
        });
        //alert(JSON.stringify(sendProjects))
        this.$emit("projects", sendProjects);
      },
      deep: true,
    },
  },
  methods: {
    toggleOption(opt) {
      // console.log("^*******************************");
      // console.log(opt);
    },
    selectGroup(obj, idx) {
      console.log("Before: " + JSON.stringify(obj));
      if (obj.checked) {
        obj.checked = true;
        this.selectedData.push(obj);
      } else {
        obj.checked = false;
        var str = this.selectedData.indexOf(obj);
        //alert(str);
        this.selectedData.splice(str, 1);
        //var arr = this.selectedData;

        // this.selectedData = arr.filter((val) => {
        //   val != obj.label;
        // });
      }
      console.log("later: " + JSON.stringify(this.selectedData));
    },

    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.optionProjects = this.projectOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.optionProjects = [];
        this.projectOptions.forEach((option) => {
          if (option.label.toString().toLowerCase().indexOf(needle) > -1) {
            this.optionProjects.push(option);
          }
        });
      });
    },
    // selectManage(val) {
    //   val.forEach((optn) => {
    //     optn.options.forEach((child) => {
    //       if (child.checked) {
    //         optn.checked = true;
    //       }
    //     });
    //   });
    // },
    // async getUserList() {
    //   var pId = 100;
    //   this.listData = [];
    //   if (this.groupSelected.id == 0) {
    //     const response = await usersService.fetchUsers();
    //     response.data.forEach((user) => {
    //       user.departments.forEach((dept) => {
    //         if (this.groupSelected.options.includes(dept._id)) {
    //           var found;
    //           if (this.listData.length > 0)
    //             found = this.listData.some((list) => list.id === user._id);
    //           else found = false;
    //           if (!found) {
    //             this.listData.push({
    //               fname: user.firstName,
    //               lname: user.lastName,
    //               id: user._id,
    //             });
    //             pId = 0;
    //           }
    //         }
    //       });
    //     });
    //   }
    //   if (this.groupSelected.id == 1) {
    //     const response = await skillRatingsService.fetchAllSkills();
    //     this.groupSelected.options.forEach((pskill, index) => {
    //       response.data.forEach((skill) => {
    //         this.listData.push({
    //           fname: skill.name,
    //           lname: "",
    //           id: skill._id,
    //         });
    //       });
    //     });
    //     pId = 1;
    //   }
    //   this.$emit("selectedBox", this.listData);
    //   this.$emit("parentId", pId);
    // },
    // selectGroup(val, idx) {
    // this.Subgroup(val, idx);

    // this.rearrangeGroupSelected(val, idx);
    // if (this.model[idx].checked) {
    //   this.groupSelected.id = idx;
    //   this.groupSelected.parent = val.label;
    // } else {
    //   this.groupSelected = { id: "", options: [], names: [], parent: "" };
    // }
    // this.model[idx].options.forEach((row) => {
    //   row.checked = this.model[idx].checked;
    //   if (row.checked) {
    //     this.groupSelected.options.push(row.id);
    //     this.groupSelected.names.push(row.name);
    //   }
    // });
    // this.$forceUpdate();
    // this.onDisplaySelected();

    // // this.getUserList();
    // //console.log("selectGroup: " + JSON.stringify(this.groupSelected));
    // },
    // Subgroup(obj, idx) {
    //   if (obj.checked) {
    //     this.model[idx].options.forEach((optn) => {
    //       optn.checked = true;
    //     });
    //   } else {
    //     this.model[idx].options.forEach((optn) => {
    //       optn.checked = false;
    //     });
    //   }
    // },
    // selectSubGroup(val, pval, idx, pindex) {
    //  // this.rearrangeGroupSelected(pindex);
    //  //alert(JSON.stringify(val)+""+JSON.stringify(pval)+""+ idx+""+pindex)
    //   this.groupSelected.id = pindex;
    //   this.groupSelected.parent = pval.label;
    //   if(this.groupSelected.length>0){
    //   }
    //   else{
    //   }
    //   //console.log(JSON.stringify(val));
    //   if (!this.model[pindex].options[idx].checked) {
    //     var index = this.groupSelected.options.indexOf(val.id);
    //     this.groupSelected.options.splice(index, 1);
    //     var indexOfName = this.groupSelected.names.indexOf(val.name);
    //     this.groupSelected.names.splice(indexOfName, 1);
    //     if (this.groupSelected.options.length === 0) {
    //       this.model[pindex].checked = false;
    //       this.groupSelected.id = "";
    //       this.groupSelected.parent = "";
    //       this.selectedString = "No Selected";
    //     }
    //   } else {
    //     this.model[pindex].checked = true;
    //     this.groupSelected.options.push(val.id);
    //     this.groupSelected.names.push(val.name);
    //   }
    //   this.$forceUpdate();
    //   this.onDisplaySelected();
    //   //console.log("selectSubGroup: " + JSON.stringify(this.groupSelected));
    //   this.getUserList();
    // },

    rearrangeGroupSelected(selectedObject, index) {
      if (
        this.groupSelected.length > 0 &&
        this.groupSelected !== selectedObject
      )
        //{
        console.log("hello inside1: " + JSON.stringify(selectedObject.id));
      console.log("here: " + JSON.stringify(this.model[index].options));
      var arr = [];
      this.model[index].options.forEach((ele) => {
        arr.push(ele.id);
      });

      this.model[index].checked = true;
      this.model[index].options.forEach((row) => {
        row.checked = this.model[index].checked;
        if (row.checked) {
          if (this.groupSelected.options.length > 0) {
            this.groupSelected.options.push(row.id);
          } else {
            this.groupSelected.push({
              id: selectedObject.id,
              options: [row.id],
              checked: true,
            });
          }

          //     this.groupSelected.options.push(row.id);
          //     this.groupSelected.names.push(row.name);
        }
      });
      console.log(JSON.stringify(this.groupSelected));
      return false;
      // this.groupSelected = { id: "", options: [], names: [], parent: "" };
      // }
    },

    clearSingleFilter() {
      this.model.forEach((project) => {
        project.checked = false;
        project.options.forEach((option) => {
          option.checked = false;
        });
      });
      this.groupSelected = { id: "", options: [], names: [], parent: "" };
      this.selectedString = "No Selected";
      this.$forceUpdate();
      this.getUserList();

      //console.log(this.groupSelected.options.length);
    },
    onDisplaySelected() {
      this.selectedString = "No Selected";
      if (this.groupSelected.options.length !== 0) {
        this.selectedString =
          this.groupSelected.parent +
          ": [" +
          this.groupSelected.names.join() +
          "]";
      }
    },

    async getAllProjects() {
      this.projectOptions = [];

      const response = await projectsService.fetchAllProjects();
      response.data.forEach((project) => {
        this.projectOptions.push({
          value: project._id,
          label: project.name,
          checked: false,
        });
      });
      // console.log(this.projectOptions);
      // console.log(this.gotProject);

      this.optionProjects = this.projectOptions;

      this.projectOptions.forEach((project) => {
        if (this.gotProject.includes(project.label.toLowerCase())) {
          project.checked = true;
          this.selectedData.push(project);
        }
      });
    },
    // async getAllProjectsWithClients() {
    //   const response = await projectsService.fetchAllClientsProjects();
    //   // alert("mbnm")
    //   this.model = [];
    //   response.data.forEach((data) => {
    //     data.projects.forEach((project, index) => {
    //       if (index == 0) {
    //         //  alert(data.clientId._id)
    //         this.model.push({
    //           label: data.clientId.name,
    //           id: data.clientId._id,
    //           checked: false,
    //           options: [
    //             {
    //               id: project.projectId,
    //               name: project.projectName,
    //               checked: false,
    //             },
    //           ],
    //         });
    //       } else {
    //         this.model[index].options.push({
    //           id: project.projectId,
    //           name: project.projectName,
    //           checked: false,
    //         });
    //       }
    //     });
    //   });
    //   // this.$emit("selectedBox", this.listData);
    // },
  },

  async mounted() {
    // await this.getAllProjectsWithClients();
    await this.getAllProjects();
  },
  props: {
    gotProject: {
      default: () => [],
    },
  },
};
</script>
<style>
.add-timesheet-select-project .q-checkbox {
  width: 100% !important;
}
</style>