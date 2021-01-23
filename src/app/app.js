import React, {Component} from 'react';

class App extends Component{

    constructor(){
        super();
        this.state ={
            title:'',
            description: '',
            tasks:[],
            _id: '',
            tasks: []

        };
        this.handleChange =this.handleChange.bind(this);
        this.addTask =this.addTask.bind(this);
    }
    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });

    }
    
    addTask(e) {
        e.preventDefault();
        if(this.state._id) {
          fetch(`/api/tasks/${this.state._id}`, {
            method: 'PUT',
            body: JSON.stringify({
              title: this.state.title,
              description: this.state.description
            }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              window.M.toast({html: 'Tarea Actualizada'});
              this.setState({_id: '', title: '', description: ''});
              this.fetchTasks();
            });
        } else {
          fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              window.M.toast({html: 'Tarea guardada'});
              this.setState({title: '', description: ''});
              this.fetchTasks();
            })
            .catch(err => console.error(err));
        }
    
      }
    
   
    

    deleteTask(id){
       if (confirm('¿Estas seguro de eliminar la tarea?')){
        fetch(`/api/tasks/${id}`,{
            method: 'DELETE',
            headers:{
                'Accept' :'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            M.toast({html: 'Tarea eliminada'});
            this.fetchTasks();
        });
       }
    }

    editTask(id){
        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            });
        });
    }

    componentDidMount(){
        this.fetchTasks();
    }


    fetchTasks(){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});
                console.log(this.state.tasks);
            });

    }
   

    render(){
        return(
            <div>
                {/*Navegacion */}
                <nav className="light-blue darken-4"> 
                    <div className="container">
                        <a className="brand-logo" href="/"> To-Do List</a>  
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit ={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange}
                                                 type ="text" placeholder="Titulo de la tarea" 
                                                 value={this.state.title}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea  name="description" onChange={this.handleChange}
                                                 placeholder="Descripcion de la tarea"
                                                className="materialize-textarea"
                                                value={this.state.description}></textarea>

                                            </div>
                                             <button type="sudmit" className= "btn light-blue darken-4">
                                                 Enviar
                                             </button>
                        
                            
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Descripcion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task =>{
                                            return(
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4">
                                                        <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4"
                                                        style={{margin: '4px'}}
                                                        onClick={() => this.deleteTask (task._id)} >
                                                        <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        } )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div >

            </div>
        )
    }
}


export default App;