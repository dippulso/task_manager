import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import "./Login.css";

export class Add extends Component {

    constructor(props) {
        super(props);
        this.setUsername = this.setUsername.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setText = this.setText.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {username: "", email: "", text: ""};
    }
    componentDidMount() {
        console.log(this.props);
    }

    setUsername = (val) => { this.setState({ username: val }); }
    setEmail = (val) => { this.setState({ email: val }); }
    setText = (val) => { this.setState({ text: val }); }
    validateForm = () => { if (this.state.username !== "" || this.state.email !== "" || this.state.text !== "") { return true; } return false; }

    handleSubmit = (e) => {
        e.preventDefault();
        var form = new FormData();
        form.append("username", this.state.username);
        form.append("email", this.state.email);
        form.append("text", this.state.text);
        let url = "https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=famke";
        console.log(url);
        for (var pair of form.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        fetch(url, {
            crossDomain: true,
            method: 'POST',
            mimeType: "multipart/form-data",
            contentType: false,
            processData: false,
            body: form,
            dataType: "json"
        }).then((response) => { return response.json(); }).then((resp) => {
            console.log(resp);
            if (resp.status === "ok") { alert("Задача успешно добавлена"); window.location = "/";} else { console.log(resp.message.username); }
        });

    }

    render() {

        return (
            <Modal.Dialog size="lg" className="lol" >
                <Modal.Header>
                    <Modal.Title>Добавить новое задание:</Modal.Title>
                </Modal.Header>

                <Modal.Body >
                    <div className="Login">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group size="lg" controlId="text">
                                <Form.Label>Имя пользователя</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="text"
                                    value={this.state.username}
                                    onChange={(e) => this.setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="text">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={this.state.email}
                                    onChange={(e) => this.setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="text">
                                <Form.Label>Текст</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={this.state.text}
                                    onChange={(e) => this.setText(e.target.value)}
                                />
                            </Form.Group>
                            <Button block size="lg" type="submit" disabled={!this.validateForm()} >
                                Добавить
                            </Button>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal.Dialog>
        );
    }
}
