import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

export class Login extends Component {

    constructor(props) {
        super(props);
        this.setLogin = this.setLogin.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            login: "",
            password: ""
        };
    }


    setPassword(val){
        this.setState({ password: val });
    }

    setLogin(val){
        this.setState({ login: val });
    }

    validateForm() {
        if (this.state.login === null || this.state.password === null) {
            alert("Логин или пароль не могут быть пустыми!");
            return false;
        }
        return true;
    }

    handleSubmit(event) {
        event.preventDefault();
        var form = new FormData();
        form.append("username", this.state.login);
        form.append("password", this.state.password);
        let url = "https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=famke";
        fetch(url, {
            crossDomain: true,
            method: "POST",
            mimeType: "multipart/form-data",
            contentType: false,
            processData: false,
            body: form,
            dataType: "json"
        }).then((response) => { return response.json(); }).then((resp) => {
            console.log(JSON.stringify(resp));
            console.log(resp.status);
            console.log(resp.message);
            if (resp.status === "ok") {
                alert(resp.message);
                sessionStorage.setItem('token', JSON.stringify(resp.message.token));
                console.log(JSON.stringify(resp.message.token));
                console.log(sessionStorage.getItem('token'));
                window.location = "/";
            } else {
                alert(resp.message);
            }
            
        });
    }

    render() {

        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group size="lg" controlId="text">
                        <Form.Label>Login</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={this.state.login}
                            onChange={(e) => this.setLogin(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={this.state.password}
                            onChange={(e) => this.setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!this.validateForm()}>
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}