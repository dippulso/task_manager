import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';
import { Edit } from './Edit';
import { Add } from './Add';


export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            info: null, loading: true, add: false, sort_field: "id", sort_direction: "desc", size: 0,
            isAuthenticated: false, token: null, id: null, edit: false
        }
        this.setAdd = this.setAdd.bind(this);
        this.page = this.page.bind(this);
        this.edit = this.edit.bind(this);
        this.setSortField = this.setSortField.bind(this);
        this.setSortDirection = this.setSortDirection.bind(this);
        this.changeSort = this.changeSort.bind(this);
    }

    setSortField = (e) => { this.setState({ sort_field: e.target.value }) }
    setSortDirection = (e) => { this.setState({ sort_direction: e.target.value }) }  

    setAdd = () => { console.log("button triggered"); this.setState({ add: true }); console.log(this.state.add); }

    edit = (id, text, status) => {
        this.setState({ id: id, edit_text: text, edit_status: status}, () => {
            this.setState({ edit: true });
        });
    }

    page = (e, num) => {
        fetch('https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=famke&sort_field=' + this.state.sort_field + '&sort_direction=' + this.state.sort_direction + '&page=' + num)
        .then((response) => { return response.json() })
        .then((json) => {
            if (json.status === "ok") {
                this.setState({ info: json.message.tasks });
            } else if (json.status === "error") {
                alert(json.message);
            } 
        });
    }

    changeSort = () => {
        fetch('https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=famke&sort_field=' + this.state.sort_field + '&sort_direction=' + this.state.sort_direction +'&page=1')
            .then((response) => { return response.json() })
            .then((json) => {
                if (json.status === "ok") {
                    this.setState({ info: json.message.tasks });
                } else if (json.status === "error") {
                    alert(json.message);
                }
            });
    }

    async componentDidMount() {
        const response = await fetch('https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=famke&sort_field=id&sort_direction=desc&page=1');
        const data = await response.json();
        console.log(data.message);
        if (data.status === "ok") {
            this.setState({ info: data.message.tasks, loading: false, size: data.message.total_task_count });
        } else if(data.status === "error") {
            alert(data.message);
        }
        const tokenString = sessionStorage.getItem('token');
        console.log(tokenString);
        if (tokenString !== null) {
            const userToken = JSON.parse(tokenString);
            console.log(userToken);
            this.setState({ isAuthenticated: true, token: userToken });
        }

    }

    render() {
        let items = [];
        for (let number = 1; number <= Math.ceil(this.state.size/3); number++) {
            items.push(
                <Pagination.Item key={number}  onClick={(e) => { this.page(e, number); }}>
                    {number}
                </Pagination.Item>,
            );
        }

        let edit = this.state.edit ? <Edit id={this.state.id} token={this.state.token} status={this.state.edit_status} text={this.state.edit_text}></Edit> : null;

        let add = this.state.add ? <Add></Add> : null;
             
      return (
          this.state.loading ? <Spinner></Spinner> : 
              <div>
                  <div>Отсоритовать по: </div>
                  <div onChange={this.setSortField}>
                      <input type="radio" value="id" name="sort_field" defaultChecked/> id
                      <input type="radio" value="username" name="sort_field" /> username
                      <input type="radio" value="email" name="sort_field" /> email
                      <input type="radio" value="status" name="sort_field" /> status
                  </div>
                  <div onChange={this.setSortDirection}>
                      <input type="radio" value="asc" name="sort_direction" /> asc
                      <input type="radio" value="desc" name="sort_direction" defaultChecked/> desc
                  </div>
                  <Button onClick={this.changeSort}>Отсортировать</Button>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Имя пользователя</th>
                        <th>Е-mail</th>
                        <th>Текст задачи</th>
                        <th>Статус задачи</th>
                        {this.state.isAuthenticated === true ? <th>Отредактировать</th> : null}
                        {this.state.isAuthenticated === true ? <th>Выполнено</th> : null}
                    </tr>
                </thead>
                      <tbody>
                          {this.state.isAuthenticated ? 
                              this.state.info.map((val, index) => {
                                  return <tr key={val.id}><td>{val.username}</td><td>{val.email}</td><td>{val.text}</td><td>{val.status}</td><td><Button onClick={() => { this.edit(val.id, val.text, val.status) }}>Отредактировать</Button></td>
                                      {(val.status === "10" || val.status === "11") ? <td>Да</td> : <td>Нет</td>}
                                  </tr> 
                              })
                                  :
                              this.state.info.map((val, index) => { 
                                  return <tr key={val.id}><td>{val.username}</td><td>{val.email}</td><td>{val.text}</td><td>{val.status}</td></tr>
                              })
                          }
                      </tbody>
                  </Table>
                  <div>
                      <Pagination>{items}</Pagination>
                      <br />
                  </div>
                  <Button onClick={this.setAdd}>Добавить новое задание</Button>
                  {add}
                  {edit}
        </div>
    );
  }
}
