import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

export class Edit extends Component {

    constructor(props) {
        super(props);
        this.setText = this.setText.bind(this);
        this.setStatus = this.setStatus.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            status: "",
            text: ""
        };
    }
    componentDidMount() {
        console.log(this.props);
    }


    setStatus(val) {
        this.setState({ status: val });
    }

    setText(val) {
        this.setState({ text: val });
    }

    validateForm() {
        if (this.state.status === null || this.state.text === null) {
            return false;
        }
        return true;
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.props);
        var form = new FormData();
        form.append("token", this.props.token);
        form.append("status", this.state.status);
        form.append("text", this.state.text);

        let url = "https://uxcandy.com/~shapoval/test-task-backend/v2/edit/" + this.props.id + "?developer=famke";
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
            if (resp.status === "ok") { console.log(resp.status); window.location = "/";} else { console.log(resp.message.token); }
        });
    }

    render() {

        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group size="lg" controlId="text">
                        <Form.Label>Статус</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={this.state.status}
                            onChange={(e) => this.setStatus(e.target.value)}
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
                    <Button block size="lg" type="submit" disabled={!this.validateForm()}>
                        Сохранить изменения
                    </Button>
                </Form>
            </div>
        );
    }
}
