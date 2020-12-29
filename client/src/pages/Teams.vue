<template>
  <div class="teamsPage">
    <div class="row">
      <div class="col-12">
        <FilterTeams
          :getProjectIdForEdit="editData"
          @searchProject="getSearchProjectInput"
        />
      </div>
      <div class="col-12 filterRow q-mt-sm">
        <ProjectList
          :clients="allProject"
          :searchProject="searchProject"
          @openEditWithProjectId="getProjectId"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FilterTeams from '../components/Teams/FilterTeams.vue';
import ProjectList from '../components/Teams/ProjectList.vue';
import projectsService from "../services/projects.service";

export default {
    name: "Teams",
    created() {
      this.getAllProjects();
    },
    components: {
        FilterTeams,
        ProjectList
        
    },
    data() {
        return {
            allProject: [],
            clients: [
                // {
                //     clientId: "5fd88a1f3268464358710c9d",
                //     clientName: 'Daniel',
                //     projects: [
                //         {
                //             id: 1,
                //             name: 'Hunter',
                //             department: 'Development',
                //             lead: 'Shrikant Jaiswal',
                //             poc: 'Rahul holani',
                //             spentTimeTotal: 150
                //         },
                //         {
                //             id: 2,
                //             name: 'Bluehire',
                //             department: 'Development',
                //             lead: 'Tarun Khathuriya',
                //             poc: 'Tarun Khathuriya',
                //             spentTimeTotal: 180
                //         },
                //         {
                //             id: 3,
                //             name: 'Examination',
                //             department: 'Development',
                //             lead: 'Ankit Singh',
                //             poc: 'Ankit Singh',
                //             spentTimeTotal: 250
                //         },
                //         {
                //             id: 4,
                //             name: 'Internal PHP',
                //             department: 'Development',
                //             lead: 'Sushmita Soni',
                //             poc: 'Sushmita Soni',
                //             spentTimeTotal: 325
                //         },
                //         {
                //             id: 5,
                //             name: 'Tekyz',
                //             department: 'Development',
                //             lead: 'Rahul Holani',
                //             poc: 'Rahul Holani',
                //             spentTimeTotal: 1100
                //         },
                //         {
                //             id: 6,
                //             name: 'Zenbiz',
                //             department: 'Development',
                //             lead: 'Shrikant Jaiswal',
                //             poc: 'Shrikant Jaiswal',
                //             spentTimeTotal: 3000
                //         }
                //     ],
                //     users: [
                //         {
                //             id: 8,
                //             name: 'Rahul Holani',
                //             totalTimeSpent: 180       //Total time [40 + 50 + 90] in differet project of same client
                //         },
                //         {
                //             id: 9,
                //             name: 'Tarun Khathuriya',
                //             totalTimeSpent: 280
                //         },
                //         {
                //             id: 10,
                //             name: 'Shrikant Jaiswal',
                //             totalTimeSpent: 1000
                //         },
                //         {
                //             id: 1,
                //             name: 'Rahul Holani',
                //             totalTimeSpent: 180       //Total time [40 + 50 + 90] in differet project of same client
                //         },
                //         {
                //             id: 2,
                //             name: 'Tarun Khathuriya',
                //             totalTimeSpent: 280
                //         },
                //         {
                //             id: 15,
                //             name: 'Shrikant Jaiswal',
                //             totalTimeSpent: 1000
                //         },
                //     ],
                //     opt: [
                //         [250, 10],       //[ hours, weeks ] 
                //         [300, 15],
                //         [350, 20],
                //         [400, 10],
                //         [450, 5],
                //         [500, 2],
                //         [550, 40]
                //     ]
                // },
                // {
                //     clientId: 2,
                //     clientName: 'Zee',
                //     projects: [
                //         {
                //             id: 1,
                //             name: 'Zenbiz',
                //             department: 'Development',
                //             lead: 'Shrikant Jaiswal',
                //             poc: 'Shrikant Jaiswal',
                //             spentTimeTotal: 3000
                //         },
                //         {
                //             id: 2,
                //             name: 'Xamrin',
                //             department: 'Development',
                //             lead: 'Rahul Holani',
                //             poc: 'Rahul Holani',
                //             spentTimeTotal: 4502
                //         },
                //         {
                //             id: 4,
                //             name: 'HRMS',
                //             department: 'Development',
                //             lead: 'Sushmita Soni',
                //             poc: 'Sushmita Soni',
                //             spentTimeTotal: 350
                //         },
                //     ],
                //     users: [
                //         {
                //             id: 3,
                //             name: 'Sushmita Soni',
                //             totalTimeSpent: 480
                //         },
                //         {
                //             id: 4,
                //             name: 'Tarun Khathuriya',
                //             totalTimeSpent: 350
                //         },
                //         {
                //             id: 5,
                //             name: 'Kanchan Tiwari',
                //             totalTimeSpent: 400
                //         },
                //         {
                //             id: 1,
                //             name: 'Sushmita Soni',
                //             totalTimeSpent: 480
                //         },
                //         {
                //             id: 2,
                //             name: 'Tarun Khathuriya',
                //             totalTimeSpent: 350
                //         },
                //         {
                //             id: 6,
                //             name: 'Kanchan Tiwari',
                //             totalTimeSpent: 400
                //         },
                //     ],
                //     opt: [
                //         [254, 10],
                //         [385, 20],
                //         [421, 4],
                //         [450, 12],
                //         [536, 5],
                //         [600, 40],
                //         [747, 50]
                //     ]
                // },
                // {
                //     clientId: 25,
                //     clientName: 'Alsu',
                //     projects: [
                //         {
                //             id: 1,
                //             name: 'Internal PHP',
                //             department: 'Development',
                //             lead: 'Sushmita Soni',
                //             poc: 'Sushmita Soni',
                //             spentTimeTotal: 325
                //         },
                //         {
                //             id: 2,
                //             name: 'Tekyz',
                //             department: 'Development',
                //             lead: 'Rahul Holani',
                //             poc: 'Rahul Holani',
                //             spentTimeTotal: 1100
                //         },
                //         {
                //             id: 3,
                //             name: 'Zenbiz',
                //             department: 'Development',
                //             lead: 'Shrikant Jaiswal',
                //             poc: 'Shrikant Jaiswal',
                //             spentTimeTotal: 3000
                //         },
                //         {
                //             id: 4,
                //             name: 'Zoo',
                //             department: 'Testing',
                //             lead: 'Shrikant Jaiswal',
                //             poc: 'Shrikant Jaiswal',
                //             spentTimeTotal: 5000
                //         },
                //         {
                //             id: 6,
                //             name: 'HRMS',
                //             department: 'Development',
                //             lead: 'Sushmita Soni',
                //             poc: 'Sushmita Soni',
                //             spentTimeTotal: 350
                //         },
                //     ],
                //     users: [
                //         {
                //             id: 5,
                //             name: 'Shrikant Jaiswal',
                //             totalTimeSpent: 200
                //         },
                //         {
                //             id: 6,
                //             name: 'Sushmita Soni',
                //             totalTimeSpent: 150
                //         },
                //         {
                //             id: 7,
                //             name: 'Rishabh',
                //             totalTimeSpent: 400
                //         },
                //     ],
                //     opt: [
                //         [154, 10],
                //         [285, 15],
                //         [321, 40],
                //         [450, 1],
                //         [450, 5],
                //         [500, 25],
                //         [600, 20]
                //     ]
                // }
            ],
            searchProject: '',
            editData: '',
        };
    },
    methods: {
        getSearchProjectInput(searchStr) {
            this.searchProject = searchStr;
        },
        getProjectId(editObj) {
            console.log(editObj);
            var newEditObj = null;
            this.allProject.forEach(client => {
                if(editObj.clientId === client.clientId) {
                    client.projects.forEach(project => {
                        if(project.id == editObj.projectId) {
                            newEditObj = { clientId: client.clientId, project: project }
                        }
                    });
                }
            });
            if(newEditObj != null) {
                this.editData = newEditObj;
            } else {
                alert("Sorry!")
            }
        },
        async getAllProjects(){
            const response = await projectsService.fetchAllProjects();
            console.log(response);
            var checkUniqueClient = ["5vhiue"];
            response.data.forEach(projects => {
                if(!checkUniqueClient.includes(projects.client._id)){
                    checkUniqueClient.push(projects.client._id);
                    this.allProject.push({
                        clientId: projects.client._id,
                        clientName: projects.client.name,
                        projects: [
                            {
                                id: projects._id,
                                name: projects.name,
                                lead: {
                                    id: projects.lead._id,
                                    name: projects.lead.firstName + ' ' + projects.lead.lastName
                                },
                                poc: {
                                    id: projects.POC._id,
                                    name: projects.POC.firstName + ' ' + projects.POC.lastName
                                }
                            }
                        ]
                    })
                } else{
                    console.log('into the else');
                    var index = this.allProject.findIndex(x => x.clientId == projects.client._id);
                    this.allProject[index].projects.push({
                        id: projects._id,
                        name: projects.name,
                        lead: {
                            id: projects.lead._id,
                            name: projects.lead.firstName + ' ' + projects.lead.lastName
                        },
                        poc: {
                            id: projects.POC._id,
                            name: projects.POC.firstName + ' ' + projects.POC.lastName
                        }
                    });
                    console.log(index);
                }
            });
            console.log(this.allProject);
        }
    },
};
</script>

<style>
.filterRow {
  height: 467px !important;
  /* border: 1px solid #443f3f; */
  overflow-y: scroll;
}
</style>