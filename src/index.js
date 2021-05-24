import ReactDom from 'react-dom';
import React, { Component } from 'react';
// importing websocket library
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Card, Avatar, Input, Typography } from 'antd';
import 'antd/dist/antd.css';
import './index.css'

const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;

// create connection -> programmed to connect to localhost 8000 ... where the WebSocket Server is already running
const client = new W3CWebSocket('ws://127.0.0.1:8000')

export default class App extends Component {

    state = {
        userName: '',
        isLoggedIn: false,
        messages: []
    }

    // push message (value of onButtonClick) to web socket server and the userName
    onButtonClick = (value) => {
        client.send(JSON.stringify({
          type: "message",
          msg: value,
          user: this.state.userName
        }));
        this.setState({ searchVal: '' })
      }
    

    // called whenever the client is able to connect to the server
    componentDidMount() {
        client.onopen = () => {
          console.log('WebSocket Client Connected');
        };
        //console.log message sent back from server
        client.onmessage = (message) => {
          const dataFromServer = JSON.parse(message.data);
          console.log('got reply! ', dataFromServer);
          if (dataFromServer.type === "message") {
            this.setState((state) =>
              ({
                messages: [...state.messages,
                {
                  msg: dataFromServer.msg,
                  user: dataFromServer.user
                }]
              })
            );
          }
        };
      }

    // use ternary operator to swap between login in view 
    // (if not logged in) and the send message view
    render() {
        return (
            <div className="main">
                {this.state.isLoggedIn ? 
            <div>
               <div className="title">
                   <Text type="secondary" style={{ fontSize: '36px' }}>Websocket Chat</Text>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 50}}>
                    {this.state.messages.map(message => 
                        <Card key={message.msg} style={{ width: 300, margin: ' 16px 4px 0 4px', alignSelf: this.state.userName === message.user ? 'flex-end' : 'flex-start'}} loading={false}>
                        <Meta
                  avatar={
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{message.user[0].toUpperCase()}</Avatar>
                  }
                  title={message.user+":"}
                  description={message.msg}
                />
              </Card> 
            )}
                </div>
                <div className="bottom">
                    <Search
                        placeholder="input message and send"
                        enterButton="Send"
                        value={this.state.searchVal}
                        size="large"
                        onChange={(e) => this.setState({ searchVal: e.target.value })}
                        onSearch={value => this.onButtonClick(value)}
                        />
                </div>
            </div>
                :
                <div style={{ padding: '200px 40px'  }}>
                    <Search
                        placeholder="enter username"
                        enterButton="Login"
                        size="large"
                        onSearch={value => this.setState({ isLoggedIn: true, userName: value })}
                        />
                    
                </div>
                }
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById('root'));